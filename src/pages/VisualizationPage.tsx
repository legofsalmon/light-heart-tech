import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Copy, Check, MousePointer2, Move, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VisualizationPageProps {
  isDarkMode: boolean;
}

const VIEWER_PASSWORD = 'lightheart';

const viewers = [
  {
    name: 'Room 1 — Main Gallery',
    description: 'Primary immersive space with wall and floor projection arrays. 3 central floor projectors omitted for seating/subs placement.',
    url: 'https://editor.mappingmatter.com/viewer/699369c8b09455001aef7c8a/HeXPCRkW0iOTVWJNGcLKNW6WXrOK6uPQNczAfh3W',
  },
  {
    name: 'Room 2 — Secondary Gallery',
    description: 'Scaled configuration with accurate lens calculations. Projector body orientation requires manual mesh attachment.',
    url: 'https://editor.mappingmatter.com/viewer/69a0b8f815149f001a5b64b8/jXiQSpeeZHu9qw6UomCvQul9rMfqnSU8yYE6eAcQ',
  },
];

export default function VisualizationPage({ isDarkMode }: VisualizationPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from('.viewer-container', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: page,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }, page);

    return () => ctx.revert();
  }, []);

  const handleCopyPassword = async () => {
    try {
      await navigator.clipboard.writeText(VIEWER_PASSWORD);
    } catch (_err) {
      const ta = document.createElement('textarea');
      ta.value = VIEWER_PASSWORD;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const subTextColor = isDarkMode ? '#A0A0A0' : '#666666';

  return (
    <div ref={pageRef} className="page-enter min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
            <span className={`text-xs mono tracking-wider ${isDarkMode ? 'text-[#A0A0A0]' : 'text-gray-500'}`}>
              SECTION 14
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
            style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
          >
            3D VISUALIZATION
          </h1>
          <p className="max-w-2xl text-sm sm:text-base" style={{ color: subTextColor }}>
            Interactive 3D models showing projector placement and coverage in both rooms.
            Navigate with left click (orbit), right click (pan), scroll (zoom).
          </p>
        </div>

        {/* Password + Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-8">
          {/* Password card */}
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg"
            style={{
              backgroundColor: isDarkMode ? 'rgba(0, 240, 255, 0.06)' : 'rgba(0, 102, 204, 0.06)',
              border: `1px solid ${isDarkMode ? 'rgba(0, 240, 255, 0.15)' : 'rgba(0, 102, 204, 0.15)'}`,
            }}
          >
            <span className="text-xs tracking-wider" style={{ color: subTextColor }}>
              Viewer Password:
            </span>
            <code className="font-mono text-sm px-2 py-0.5 rounded"
              style={{
                color: accentColor,
                backgroundColor: isDarkMode ? 'rgba(0, 240, 255, 0.08)' : 'rgba(0, 102, 204, 0.08)',
              }}
            >
              {VIEWER_PASSWORD}
            </code>
            <button
              onClick={handleCopyPassword}
              className="flex items-center gap-1 px-2 py-1 rounded text-[10px] uppercase tracking-wider transition-all"
              style={{
                color: accentColor,
                border: `1px solid ${isDarkMode ? 'rgba(0, 240, 255, 0.2)' : 'rgba(0, 102, 204, 0.2)'}`,
              }}
            >
              {copied ? <><Check size={12} /> Copied</> : <><Copy size={12} /> Copy</>}
            </button>
          </div>

          {/* Navigation controls */}
          <div className="flex items-center gap-6 px-4 py-3 rounded-lg"
            style={{
              backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
              border: `1px solid ${borderColor}`,
            }}
          >
            <div className="flex items-center gap-2">
              <MousePointer2 className="w-4 h-4" style={{ color: accentColor }} />
              <span className="text-[10px] tracking-wider" style={{ color: subTextColor }}>ORBIT</span>
            </div>
            <div className="flex items-center gap-2">
              <Move className="w-4 h-4" style={{ color: accentColor }} />
              <span className="text-[10px] tracking-wider" style={{ color: subTextColor }}>PAN</span>
            </div>
            <div className="flex items-center gap-2">
              <ZoomIn className="w-4 h-4" style={{ color: accentColor }} />
              <span className="text-[10px] tracking-wider" style={{ color: subTextColor }}>ZOOM</span>
            </div>
          </div>
        </div>

        {/* Viewers */}
        <div className="space-y-6 sm:space-y-8">
          {viewers.map((viewer, index) => (
            <div key={index} className="viewer-container">
              <div className="overflow-hidden rounded-lg"
                style={{
                  backgroundColor: isDarkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                  border: `1px solid ${borderColor}`,
                }}
              >
                {/* Header */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  style={{ borderBottom: `1px solid ${borderColor}` }}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Box className="w-4 h-4" style={{ color: accentColor }} />
                      <h3 className="font-display text-base sm:text-lg font-bold"
                        style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                      >
                        {viewer.name}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm" style={{ color: subTextColor }}>
                      {viewer.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: accentColor }} />
                    <span className="text-xs mono" style={{ color: accentColor }}>ACTIVE</span>
                  </div>
                </div>

                {/* Embed */}
                <div className="relative aspect-[16/10]"
                  style={{ backgroundColor: isDarkMode ? '#0A0A0A' : '#F5F5F5' }}
                >
                  <iframe
                    src={viewer.url}
                    title={viewer.name}
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 'none' }}
                    allow="fullscreen"
                  />
                </div>

                {/* Footer */}
                <div className="px-4 py-2 flex items-center justify-between"
                  style={{
                    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)',
                    borderTop: `1px solid ${borderColor}`,
                  }}
                >
                  <span className="text-[10px] tracking-wider" style={{ color: subTextColor }}>
                    MAPPINGMATTER VIEWER
                  </span>
                  <a href={viewer.url} target="_blank" rel="noopener noreferrer"
                    className="text-[10px] tracking-wider transition-colors"
                    style={{ color: accentColor }}
                  >
                    Open in new tab
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
