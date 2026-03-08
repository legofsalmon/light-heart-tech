#!/usr/bin/env node

/**
 * sync-doc.mjs v2
 * Fetches the published Google Doc and extracts:
 * - Full verbatim text per section (preserving exact wording)
 * - All tables as structured data
 * - Section metadata
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

function stripTags(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/?(p|div|li)[^>]*>/gi, '\n')
    .replace(/<\/?(h[1-6])[^>]*>/gi, '\n')
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
  let m;
  while ((m = tableRegex.exec(html)) !== null) {
    const rows = [];
    const rowRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    let rm;
    while ((rm = rowRegex.exec(m[1])) !== null) {
      const cells = [];
      const cellRegex = /<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi;
      let cm;
      while ((cm = cellRegex.exec(rm[1])) !== null) {
        cells.push(stripTags(cm[1]).trim());
      }
      if (cells.length > 0) rows.push(cells);
    }
    if (rows.length > 0) tables.push(rows);
  }
  return tables;
}

function extractListItems(html) {
  const items = [];
  const liRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  let m;
  while ((m = liRegex.exec(html)) !== null) {
    const text = stripTags(m[1]).trim();
    if (text) items.push(text);
  }
  return items;
}

function tableToKeyValue(table) {
  const result = {};
  for (const row of table) {
    if (row.length >= 2 && row[0]) result[row[0]] = row[1];
  }
  return result;
}

function tableToObjects(table) {
  if (table.length < 2) return [];
  const headers = table[0];
  return table.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i] || ''; });
    return obj;
  });
}

async function main() {
  console.log('Fetching Google Doc...');
  const response = await fetch(DOC_URL);
  if (!response.ok) { console.error(`Failed: ${response.status}`); process.exit(1); }
  const html = await response.text();
  console.log(`Fetched ${html.length} bytes`);

  // ── Split by H1/H2 section headers ──
  // Google Docs published HTML uses <h1> for top-level headings with emoji prefixes
  const sectionSplits = html.split(/<h[12][^>]*>/i);
  const sections = [];

  for (let i = 1; i < sectionSplits.length; i++) {
    const endTag = sectionSplits[i].match(/<\/h[12]>/i);
    if (!endTag) continue;
    const endIdx = sectionSplits[i].indexOf(endTag[0]);
    const rawTitle = stripTags(sectionSplits[i].substring(0, endIdx)).trim();
    const content = sectionSplits[i].substring(endIdx + endTag[0].length);

    // Clean the title (remove emoji prefixes)
    const title = rawTitle.replace(/^[📑📄💼🎯📽️🔗🖌️👁️⚙️🔊🖇️⏱️💻❄️📩🕶️]\s*/u, '').trim();

    const tables = extractTables(content);
    const listItems = extractListItems(content);
    const fullText = stripTags(content);

    // Extract H3 subsections with their full verbatim text
    const subsections = [];
    const h3Parts = content.split(/<h3[^>]*>/i);
    for (let j = 1; j < h3Parts.length; j++) {
      const h3End = h3Parts[j].indexOf('</h3>');
      if (h3End === -1) continue;
      const subTitle = stripTags(h3Parts[j].substring(0, h3End)).trim();
      const subContent = h3Parts[j].substring(h3End + 5);
      const subTables = extractTables(subContent);
      const subText = stripTags(subContent);
      const subLists = extractListItems(subContent);
      subsections.push({ title: subTitle, text: subText, tables: subTables, lists: subLists });
    }

    // Extract H4 subsections too
    const h4Subsections = [];
    const h4Parts = content.split(/<h4[^>]*>/i);
    for (let j = 1; j < h4Parts.length; j++) {
      const h4End = h4Parts[j].indexOf('</h4>');
      if (h4End === -1) continue;
      const subTitle = stripTags(h4Parts[j].substring(0, h4End)).trim();
      const subContent = h4Parts[j].substring(h4End + 5);
      const subText = stripTags(subContent);
      h4Subsections.push({ title: subTitle, text: subText });
    }

    sections.push({
      title,
      fullText,
      tables,
      listItems,
      subsections,
      h4Subsections,
    });
  }

  console.log(`Parsed ${sections.length} sections`);

  // ── Build named data structures ──
  const allTables = [];
  for (const s of sections) {
    allTables.push(...s.tables);
    for (const sub of s.subsections) allTables.push(...sub.tables);
  }

  const specData = {
    _meta: {
      source: DOC_URL,
      syncedAt: new Date().toISOString(),
      sectionCount: sections.length,
      tableCount: allTables.length,
      version: 2,
    },

    // Full sections with verbatim text
    sections,

    // Named parsed data for quick access
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

  // Match tables to named structures
  for (const table of allTables) {
    if (table.length < 2) continue;
    const allFirst = table.map(r => (r[0] || '').toLowerCase()).join(' ');

    if (allFirst.includes('location') && allFirst.includes('venue type') && allFirst.includes('target opening')) {
      specData.projectAtAGlance = tableToKeyValue(table); continue;
    }
    if (allFirst.includes('room 1') && allFirst.includes('floor projection') && allFirst.includes('lensing')) {
      specData.projectionSystems = tableToKeyValue(table); continue;
    }
    if (allFirst.includes('primary servers') && allFirst.includes('gui control')) {
      specData.mediaServers = tableToKeyValue(table); continue;
    }
    if (allFirst.includes('platform') && allFirst.includes('room 1 speakers')) {
      specData.audioSystem = tableToKeyValue(table); continue;
    }
    if (allFirst.includes('core switches') && allFirst.includes('edge switches')) {
      specData.networkInfrastructure = tableToKeyValue(table); continue;
    }
    if (allFirst.includes('racks') && allFirst.includes('ups') && allFirst.includes('power draw')) {
      specData.serverRoom = tableToKeyValue(table); continue;
    }
    if (allFirst.includes('heat load server room') && allFirst.includes('heat load projectors')) {
      specData.heatLoad = tableToKeyValue(table); continue;
    }
    if (table[0]?.[0]?.toLowerCase() === 'category' && table[0]?.[1]?.toLowerCase() === 'amount') {
      specData.budgetSummary = tableToObjects(table); continue;
    }
    if (allFirst.includes('audio') && allFirst.includes('projection') && allFirst.includes('media servers') && allFirst.includes('network')) {
      specData.vendorStatus = tableToKeyValue(table); continue;
    }
    if (allFirst.includes('specification') && allFirst.includes('technology') && allFirst.includes('bandwidth')) {
      specData.signalTransport = table; continue;
    }
    if (table[0]?.[0]?.toLowerCase() === 'metric' && table[0]?.[1]?.toLowerCase() === 'value') {
      specData.projectorTotals = tableToKeyValue(
        table.slice(1).map(row => [row[0], row[1] + (row[2] ? ` (${row[2]})` : '')])
      );
      continue;
    }
  }

  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, JSON.stringify(specData, null, 2), 'utf-8');

  console.log(`\nWritten to: ${OUTPUT_PATH}`);
  console.log(`\nSection titles:`);
  sections.forEach((s, i) => {
    const textLen = s.fullText.length;
    const tableCount = s.tables.length;
    const subCount = s.subsections.length;
    console.log(`  ${i + 1}. "${s.title}" (${textLen} chars, ${tableCount} tables, ${subCount} subsections)`);
  });
  console.log(`\nNamed data:`);
  console.log(`  projectAtAGlance: ${Object.keys(specData.projectAtAGlance).length} fields`);
  console.log(`  budgetSummary: ${specData.budgetSummary.length} items`);
  console.log(`  vendorStatus: ${Object.keys(specData.vendorStatus).length} vendors`);
  console.log(`  projectorTotals: ${Object.keys(specData.projectorTotals).length} fields`);
}

main().catch(err => { console.error('Sync failed:', err); process.exit(1); });
