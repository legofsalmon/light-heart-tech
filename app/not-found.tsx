import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '4rem 1.5rem',
        gap: '1rem',
      }}
    >
      <span
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem',
          letterSpacing: '0.1em',
          color: '#ff8c00',
          textTransform: 'uppercase',
        }}
      >
        ERROR 404
      </span>
      <h1
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '2rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        PAGE NOT FOUND
      </h1>
      <p style={{ color: '#999', maxWidth: '24rem', lineHeight: 1.6 }}>
        The section you&apos;re looking for doesn&apos;t exist in the
        specification document.
      </p>
      <Link
        href="/"
        style={{
          marginTop: '1rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#00F0FF',
          textDecoration: 'none',
          padding: '0.75rem 1.5rem',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          borderRadius: '4px',
        }}
      >
        Return to Overview
      </Link>
    </div>
  );
}
