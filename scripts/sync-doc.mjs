#!/usr/bin/env node

/**
 * sync-doc.mjs
 * Fetches the published Google Doc and extracts structured data
 * into src/data/specData.json for use by the website.
 *
 * Usage: node scripts/sync-doc.mjs
 * Or:    npm run sync
 */

const DOC_URL = 'https://docs.google.com/document/d/e/2PACX-1vSJ8rnmkn1zCp507nFc3UPsdmSSrHNW4vzEv1AQnuyF73XIIx9vU3vRShav2kqxNhbdsMky_7s035VO/pub';

import { writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = join(__dirname, '..', 'src', 'data', 'specData.json');

// ─── HTML helpers ──────────────────────────────────────
function stripTags(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(p|div|li|h[1-6])[^>]*>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&euro;/g, '€')
    .replace(/\u00a0/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractTables(html) {
  const tables = [];
  const tableRegex = /<table[^>]*>([\s\S]*?)<\/table>/gi;
  let tableMatch;

  while ((tableMatch = tableRegex.exec(html)) !== null) {
    const tableHtml = tableMatch[1];
    const rows = [];
    const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let rowMatch;

    while ((rowMatch = rowRegex.exec(tableHtml)) !== null) {
      const cells = [];
      const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
      let cellMatch;

      while ((cellMatch = cellRegex.exec(rowMatch[1])) !== null) {
        cells.push(stripTags(cellMatch[1]).trim());
      }
      if (cells.length > 0) {
        rows.push(cells);
      }
    }
    if (rows.length > 0) {
      tables.push(rows);
    }
  }
  return tables;
}

function extractSections(html) {
  const sections = [];
  // Split by h2 headings (section markers in Google Docs published HTML)
  const parts = html.split(/<h2[^>]*>/i);

  for (let i = 1; i < parts.length; i++) {
    const endIdx = parts[i].indexOf('</h2>');
    if (endIdx === -1) continue;

    const title = stripTags(parts[i].substring(0, endIdx)).trim();
    const content = parts[i].substring(endIdx + 5);
    const tables = extractTables(content);

    // Extract h3 subsections
    const subsections = [];
    const h3Parts = content.split(/<h3[^>]*>/i);
    for (let j = 1; j < h3Parts.length; j++) {
      const h3End = h3Parts[j].indexOf('</h3>');
      if (h3End === -1) continue;
      const subTitle = stripTags(h3Parts[j].substring(0, h3End)).trim();
      const subContent = h3Parts[j].substring(h3End + 5);
      const subTables = extractTables(subContent);
      const subText = stripTags(subContent).substring(0, 2000);
      subsections.push({ title: subTitle, text: subText, tables: subTables });
    }

    sections.push({
      title,
      tables,
      subsections,
      textPreview: stripTags(content).substring(0, 500),
    });
  }
  return sections;
}

function tableToKeyValue(table) {
  const result = {};
  for (const row of table) {
    if (row.length >= 2 && row[0]) {
      result[row[0]] = row[1];
    }
  }
  return result;
}

function tableToObjects(table) {
  if (table.length < 2) return [];
  const headers = table[0];
  return table.slice(1).map(row => {
    const obj = {};
    headers.forEach((header, idx) => {
      obj[header] = row[idx] || '';
    });
    return obj;
  });
}

// ─── Main ──────────────────────────────────────────────
async function main() {
  console.log('Fetching Google Doc...');
  const response = await fetch(DOC_URL);

  if (!response.ok) {
    console.error(`Failed to fetch: ${response.status} ${response.statusText}`);
    process.exit(1);
  }

  const html = await response.text();
  console.log(`Fetched ${html.length} bytes`);

  const allTables = extractTables(html);
  const sections = extractSections(html);

  console.log(`Found ${allTables.length} tables, ${sections.length} sections`);

  // ─── Build structured data ───────────────────────────
  const specData = {
    _meta: {
      source: DOC_URL,
      syncedAt: new Date().toISOString(),
      tableCount: allTables.length,
      sectionCount: sections.length,
    },
    sections: sections.map(s => ({
      title: s.title,
      textPreview: s.textPreview,
      subsections: s.subsections.map(sub => ({
        title: sub.title,
        text: sub.text,
      })),
    })),
    tables: {
      raw: allTables,
    },
    // ─── Parsed named data (keyed for easy page access) ──
    projectAtAGlance: {},
    projectionSystems: {},
    mediaServers: {},
    audioSystem: {},
    networkInfrastructure: {},
    serverRoom: {},
    heatLoad: {},
    budgetSummary: [],
    vendorStatus: {},
    signalTransport: [],
    projectorTotals: {},
  };

  // Try to match tables to known structures by header content
  for (const table of allTables) {
    if (table.length < 2) continue;
    const firstCell = (table[0]?.[0] || '').toLowerCase();
    const secondCell = (table[0]?.[1] || '').toLowerCase();
    const allFirstCells = table.map(r => (r[0] || '').toLowerCase()).join(' ');

    // Project at a Glance
    if (allFirstCells.includes('location') && allFirstCells.includes('venue type') && allFirstCells.includes('target opening')) {
      specData.projectAtAGlance = tableToKeyValue(table);
      continue;
    }

    // Projection Systems
    if (allFirstCells.includes('room 1') && allFirstCells.includes('floor projection') && allFirstCells.includes('lensing')) {
      specData.projectionSystems = tableToKeyValue(table);
      continue;
    }

    // Media Servers
    if (allFirstCells.includes('primary servers') && allFirstCells.includes('gui control')) {
      specData.mediaServers = tableToKeyValue(table);
      continue;
    }

    // Audio System
    if (allFirstCells.includes('platform') && allFirstCells.includes('room 1 speakers')) {
      specData.audioSystem = tableToKeyValue(table);
      continue;
    }

    // Network Infrastructure
    if (allFirstCells.includes('core switches') && allFirstCells.includes('edge switches')) {
      specData.networkInfrastructure = tableToKeyValue(table);
      continue;
    }

    // Server Room
    if (allFirstCells.includes('racks') && allFirstCells.includes('ups')) {
      specData.serverRoom = tableToKeyValue(table);
      continue;
    }

    // Heat Load
    if (allFirstCells.includes('heat load server room') && allFirstCells.includes('heat load projectors')) {
      specData.heatLoad = tableToKeyValue(table);
      continue;
    }

    // Budget Summary
    if (firstCell === 'category' && secondCell === 'amount') {
      specData.budgetSummary = tableToObjects(table);
      continue;
    }

    // Vendor Status
    if (allFirstCells.includes('audio') && allFirstCells.includes('projection') && allFirstCells.includes('media servers') && allFirstCells.includes('signal transport')) {
      specData.vendorStatus = tableToKeyValue(table);
      continue;
    }

    // Signal Transport Comparison
    if (allFirstCells.includes('specification') && allFirstCells.includes('technology') && allFirstCells.includes('bandwidth')) {
      specData.signalTransport = table;
      continue;
    }

    // Projector Totals
    if (firstCell === 'metric' && secondCell === 'value') {
      specData.projectorTotals = tableToKeyValue(
        table.slice(1).map(row => [row[0], row[1] + (row[2] ? ` (${row[2]})` : '')])
      );
      continue;
    }
  }

  // ─── Write output ────────────────────────────────────
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(specData, null, 2), 'utf-8');

  console.log(`\nWritten to: ${OUTPUT_PATH}`);
  console.log('\nParsed data summary:');
  console.log(`  Project at a Glance: ${Object.keys(specData.projectAtAGlance).length} fields`);
  console.log(`  Projection Systems: ${Object.keys(specData.projectionSystems).length} fields`);
  console.log(`  Media Servers: ${Object.keys(specData.mediaServers).length} fields`);
  console.log(`  Audio System: ${Object.keys(specData.audioSystem).length} fields`);
  console.log(`  Network Infra: ${Object.keys(specData.networkInfrastructure).length} fields`);
  console.log(`  Server Room: ${Object.keys(specData.serverRoom).length} fields`);
  console.log(`  Heat Load: ${Object.keys(specData.heatLoad).length} fields`);
  console.log(`  Budget Summary: ${specData.budgetSummary.length} items`);
  console.log(`  Vendor Status: ${Object.keys(specData.vendorStatus).length} vendors`);
  console.log(`  Signal Transport: ${specData.signalTransport.length} rows`);
  console.log(`  Projector Totals: ${Object.keys(specData.projectorTotals).length} fields`);
  console.log('\nDone! Run "npm run build" to deploy with updated data.');
}

main().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
