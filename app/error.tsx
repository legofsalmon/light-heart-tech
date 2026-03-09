'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
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
          color: '#ff3333',
          textTransform: 'uppercase',
        }}
      >
        APPLICATION ERROR
      </span>
      <h1
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: '2rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        SOMETHING WENT WRONG
      </h1>
      <p style={{ color: '#999', maxWidth: '24rem', lineHeight: 1.6 }}>
        An unexpected error occurred while loading this section.
        {error.digest && (
          <span
            style={{
              display: 'block',
              marginTop: '0.5rem',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              color: '#666',
            }}
          >
            Digest: {error.digest}
          </span>
        )}
      </p>
      <button
        onClick={reset}
        style={{
          marginTop: '1rem',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: '#00F0FF',
          background: 'none',
          cursor: 'pointer',
          padding: '0.75rem 1.5rem',
          border: '1px solid rgba(0, 240, 255, 0.25)',
          borderRadius: '4px',
        }}
      >
        Try Again
      </button>
    </div>
  );
}
