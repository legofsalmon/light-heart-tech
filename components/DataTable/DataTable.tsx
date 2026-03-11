'use client';

import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Search } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

interface Column<T> {
  key: keyof T & string;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: string;
}

interface DataTableProps<T extends Record<string, unknown>> {
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchKeys?: (keyof T & string)[];
  statusKey?: keyof T & string;
  statusColors?: Record<string, string>;
  compact?: boolean;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchable = true,
  searchKeys,
  statusKey,
  statusColors,
  compact = false,
}: DataTableProps<T>) {
  const { isDarkMode } = useTheme();
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const gold = '#c4a265';
  const muted = isDarkMode ? '#888' : '#666';
  const headerBg = isDarkMode ? 'rgba(196, 162, 101, 0.08)' : 'rgba(196, 162, 101, 0.06)';
  const rowBorder = isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';
  const hoverBg = isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)';

  // Unique status values for filter
  const statusValues = useMemo(() => {
    if (!statusKey) return [];
    const values = new Set(data.map((row) => String(row[statusKey] || '')));
    return Array.from(values).filter(Boolean);
  }, [data, statusKey]);

  // Filter + sort
  const processedData = useMemo(() => {
    let result = [...data];

    // Text search
    if (search) {
      const keys = searchKeys || columns.map((c) => c.key);
      const lower = search.toLowerCase();
      result = result.filter((row) =>
        keys.some((k) => String(row[k] || '').toLowerCase().includes(lower)),
      );
    }

    // Status filter
    if (statusKey && statusFilter) {
      result = result.filter((row) => String(row[statusKey]) === statusFilter);
    }

    // Sort
    if (sortKey) {
      result.sort((a, b) => {
        const av = a[sortKey as keyof T];
        const bv = b[sortKey as keyof T];
        const cmp = String(av || '').localeCompare(String(bv || ''), undefined, { numeric: true });
        return sortDir === 'asc' ? cmp : -cmp;
      });
    }

    return result;
  }, [data, search, searchKeys, columns, statusKey, statusFilter, sortKey, sortDir]);

  const toggleSort = (key: string) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const pad = compact ? '0.4rem 0.6rem' : '0.6rem 0.9rem';

  return (
    <div style={{ borderRadius: 8, border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.08)'}`, overflow: 'hidden' }}>
      {/* Toolbar */}
      {(searchable || statusValues.length > 0) && (
        <div style={{
          display: 'flex', gap: '0.5rem', padding: '0.5rem 0.75rem', alignItems: 'center', flexWrap: 'wrap',
          background: isDarkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.02)',
          borderBottom: `1px solid ${rowBorder}`,
        }}>
          {searchable && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', flex: 1, minWidth: 120 }}>
              <Search size={13} style={{ color: muted }} />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                style={{
                  background: 'transparent', border: 'none', outline: 'none',
                  color: isDarkMode ? '#e0e0e0' : '#333', fontSize: '0.8rem', width: '100%',
                }}
              />
            </div>
          )}
          {statusValues.length > 0 && (
            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
              <button
                onClick={() => setStatusFilter(null)}
                style={{
                  fontSize: '0.7rem', padding: '2px 8px', borderRadius: 4, cursor: 'pointer',
                  border: `1px solid ${!statusFilter ? gold : 'transparent'}`,
                  background: !statusFilter ? `${gold}15` : 'transparent',
                  color: !statusFilter ? gold : muted,
                }}
              >
                All
              </button>
              {statusValues.map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(statusFilter === s ? null : s)}
                  style={{
                    fontSize: '0.7rem', padding: '2px 8px', borderRadius: 4, cursor: 'pointer',
                    border: `1px solid ${statusFilter === s ? (statusColors?.[s] || gold) : 'transparent'}`,
                    background: statusFilter === s ? `${statusColors?.[s] || gold}15` : 'transparent',
                    color: statusFilter === s ? (statusColors?.[s] || gold) : muted,
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: compact ? '0.8rem' : '0.85rem' }}>
          <thead>
            <tr style={{ background: headerBg }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && toggleSort(col.key)}
                  style={{
                    padding: pad, textAlign: 'left', cursor: col.sortable !== false ? 'pointer' : 'default',
                    color: gold, fontWeight: 600, fontSize: compact ? '0.7rem' : '0.75rem',
                    letterSpacing: '0.05em', whiteSpace: 'nowrap',
                    borderBottom: `1px solid ${rowBorder}`, width: col.width,
                    userSelect: 'none',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {col.label}
                    {sortKey === col.key && (
                      sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedData.map((row, i) => (
              <tr
                key={i}
                style={{ borderBottom: `1px solid ${rowBorder}` }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = hoverBg; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
              >
                {columns.map((col) => (
                  <td key={col.key} style={{ padding: pad, color: isDarkMode ? '#ccc' : '#333' }}>
                    {col.render
                      ? col.render(row[col.key], row)
                      : String(row[col.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
            {processedData.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{ padding: '1.5rem', textAlign: 'center', color: muted, fontSize: '0.8rem' }}
                >
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Count */}
      <div style={{
        padding: '0.3rem 0.75rem', fontSize: '0.7rem', color: muted,
        borderTop: `1px solid ${rowBorder}`, textAlign: 'right',
        background: isDarkMode ? 'rgba(0,0,0,0.2)' : 'rgba(0,0,0,0.01)',
      }}>
        {processedData.length} of {data.length} items
      </div>
    </div>
  );
}
