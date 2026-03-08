import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Lock, Eye, MousePointer2, Move, ZoomIn } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface VisualizationPageProps {
  isDarkMode: boolean;
}

const viewers = [
  {
    name: 'Room 1 — Main Gallery',
    description: 'Primary immersive space with wall and floor projection arrays. 3 central floor projectors omitted for seating/subs placement.',
    url: 'https://editor.mappingmatter.com/viewer/699369c8b09455001aef7c8a/HeXPCRkW0iOTVWJNGcLKNW6WXrOK6uPQNczAfh3W',
    password: 'lightheart',
  },
  {
    name: 'Room 2 — Secondary Gallery',
    description: 'Scaled configuration with accurate lens calculations. Projector body orientation requires manual mesh attachment.',
    url: 'https://editor.mappingmatter.com/viewer/69a0b8f815149f001a5b64b8/jXiQSpeeZHu9qw6UomCvQul9rMfqnSU8yYE6eAcQ',
    password: 'lightheart',
  },
];

export default function VisualizationPage({ isDarkMode }: VisualizationPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);
  const [unlockedViewers, setUnlockedViewers] = useState<Set<number>>(new Set([0, 1]));
  const [passwordInput, setPasswordInput] = useState('');

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
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        },
      });
    }, page);

    return () => ctx.revert();
  }, []);

  const handleUnlock = (index: number) => {
    if (passwordInput === viewers[index].password) {
      setUnlockedViewers(prev => new Set([...prev, index]));
      setPasswordInput('');
    } else {
      alert('Incorrect password');
    }
  };

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const subTextColor = isDarkMode ? '#A0A0A0' : '#666666';

  return (
    <div ref={pageRef} className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: accentColor }}
            />
            <span 
              className="text-xs mono tracking-wider"
              style={{ color: subTextColor }}
            >
              SECTION 14
            </span>
          </div>
          <h1 
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
            style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
          >
            3D VISUALIZATION
          </h1>
          <p 
            className="max-w-2xl text-sm sm:text-base"
            style={{ color: subTextColor }}
          >
            Interactive 3D models showing projector placement and coverage in both rooms. 
            Navigate with left click (orbit), right click (pan), scroll (zoom).
          </p>
        </div>

        {/* Navigation Controls Info */}
        <div 
          className="p-4 mb-6 sm:mb-8"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            border: `1px solid ${borderColor}`
          }}
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <MousePointer2 className="w-5 h-5 mx-auto mb-2" style={{ color: accentColor }} />
              <div 
                className="text-xs font-medium mb-1"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                ORBIT
              </div>
              <div className="text-[10px]" style={{ color: subTextColor }}>Left Click + Drag</div>
            </div>
            <div>
              <Move className="w-5 h-5 mx-auto mb-2" style={{ color: accentColor }} />
              <div 
                className="text-xs font-medium mb-1"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                PAN
              </div>
              <div className="text-[10px]" style={{ color: subTextColor }}>Right Click + Drag</div>
            </div>
            <div>
              <ZoomIn className="w-5 h-5 mx-auto mb-2" style={{ color: accentColor }} />
              <div 
                className="text-xs font-medium mb-1"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                ZOOM
              </div>
              <div className="text-[10px]" style={{ color: subTextColor }}>Scroll Wheel</div>
            </div>
          </div>
        </div>

        {/* Viewers */}
        <div className="space-y-6 sm:space-y-8">
          {viewers.map((viewer, index) => {
            const isUnlocked = unlockedViewers.has(index);

            return (
              <div key={index} className="viewer-container">
                <div 
                  className="overflow-hidden"
                  style={{ 
                    backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    border: `1px solid ${borderColor}`
                  }}
                >
                  {/* Header */}
                  <div 
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                    style={{ borderBottom: `1px solid ${borderColor}` }}
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Box className="w-4 h-4" style={{ color: accentColor }} />
                        <h3 
                          className="font-display text-base sm:text-lg font-bold"
                          style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
                        >
                          {viewer.name}
                        </h3>
                      </div>
                      <p 
                        className="text-xs sm:text-sm"
                        style={{ color: subTextColor }}
                      >
                        {viewer.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: accentColor }}
                      />
                      <span 
                        className="text-xs mono"
                        style={{ color: accentColor }}
                      >
                        ACTIVE
                      </span>
                    </div>
                  </div>

                  {/* Viewer */}
                  <div 
                    className="relative aspect-[16/10]"
                    style={{ backgroundColor: isDarkMode ? '#0A0A0A' : '#F5F5F5' }}
                  >
                    {!isUnlocked ? (
                      <div 
                        className="absolute inset-0 flex flex-col items-center justify-center"
                        style={{ backgroundColor: isDarkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)' }}
                      >
                        <Lock className="w-10 h-10 mb-3" style={{ color: accentColor }} />
                        <div 
                          className="text-sm mb-3"
                          style={{ color: subTextColor }}
                        >
                          Password Required
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="Enter password"
                            className="px-3 py-2 text-sm focus:outline-none w-40"
                            style={{ 
                              backgroundColor: isDarkMode ? '#1F1F1F' : '#FFFFFF',
                              border: `1px solid ${borderColor}`,
                              color: isDarkMode ? '#FFFFFF' : '#000000'
                            }}
                            onKeyDown={(e) => e.key === 'Enter' && handleUnlock(index)}
                          />
                          <button
                            onClick={() => handleUnlock(index)}
                            className="px-4 py-2 text-sm font-medium transition-colors"
                            style={{ 
                              backgroundColor: accentColor,
                              color: isDarkMode ? '#000000' : '#FFFFFF'
                            }}
                          >
                            UNLOCK
                          </button>
                        </div>
                        <div 
                          className="mt-3 text-xs"
                          style={{ color: subTextColor }}
                        >
                          Password: <span style={{ color: accentColor }}>{viewer.password}</span>
                        </div>
                      </div>
                    ) : (
                      <iframe
                        src={viewer.url}
                        title={viewer.name}
                        className="absolute inset-0 w-full h-full border-0"
                        allow="fullscreen"
                      />
                    )}
                  </div>

                  {/* Footer */}
                  <div 
                    className="p-3 sm:p-4 flex items-center justify-between"
                    style={{ backgroundColor: isDarkMode ? 'rgba(31,31,31,0.5)' : 'rgba(245,245,245,0.5)' }}
                  >
                    <div 
                      className="text-xs mono"
                      style={{ color: subTextColor }}
                    >
                      MAPPINGMATTER VIEWER
                    </div>
                    {isUnlocked && (
                      <div className="flex items-center gap-2">
                        <Eye className="w-3 h-3" style={{ color: '#39FF14' }} />
                        <span className="text-xs mono" style={{ color: '#39FF14' }}>LIVE</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div 
          className="mt-6 sm:mt-8 p-4"
          style={{ 
            backgroundColor: isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
            border: `1px solid ${borderColor}`
          }}
        >
          <div className="text-xs" style={{ color: subTextColor }}>
            <span className="font-medium" style={{ color: accentColor }}>Note:</span> These 3D visualizations require an internet connection. 
            For best performance, use a desktop browser with WebGL support. Mobile viewing is available but may have limited functionality.
          </div>
        </div>
      </div>
    </div>
  );
}
