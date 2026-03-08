import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Box, Lock, ExternalLink, Eye } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const viewers = [
  {
    name: 'Room 1 — Main Gallery',
    description: 'Primary immersive space with wall and floor projection arrays. Note: 3 central floor projectors omitted for seating/subs placement.',
    url: 'https://editor.mappingmatter.com/viewer/699369c8b09455001aef7c8a/HeXPCRkW0iOTVWJNGcLKNW6WXrOK6uPQNczAfh3W',
    password: 'lightheart',
    type: 'mappingmatter',
  },
  {
    name: 'Room 2 — Secondary Gallery',
    description: 'Scaled configuration with accurate lens calculations. Projector body orientation requires manual mesh attachment.',
    url: 'https://editor.mappingmatter.com/viewer/69a0b8f815149f001a5b64b8/jXiQSpeeZHu9qw6UomCvQul9rMfqnSU8yYE6eAcQ',
    password: 'lightheart',
    type: 'mappingmatter',
  },
];

export default function VisualizationSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [passwordInput, setPasswordInput] = useState('');
  const [unlockedViewers, setUnlockedViewers] = useState<Set<number>>(new Set());

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.viewer-card', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

    }, section);

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

  return (
    <section
      ref={sectionRef}
      id="visualization"
      className="relative py-24 md:py-32 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="status-led cyan" />
            <span className="text-xs mono text-soft-gray tracking-wider">
              SECTION 14 — 3D VISUALIZATION
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            3D VISUALIZATION
          </h2>
          <p className="text-soft-gray max-w-2xl">
            Interactive 3D models showing projector placement and coverage in both rooms. 
            Navigate with left click (orbit), right click (pan), scroll (zoom).
          </p>
        </div>

        {/* Viewer Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {viewers.map((viewer, index) => {
            const isUnlocked = unlockedViewers.has(index);

            return (
              <div key={index} className="viewer-card">
                <div className="glass-panel overflow-hidden">
                  {/* Header */}
                  <div className="p-6 border-b border-void-gray">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-display text-xl font-bold text-white">
                        {viewer.name}
                      </h4>
                      <Box className="w-5 h-5 text-neon-cyan" />
                    </div>
                    <p className="text-sm text-soft-gray">
                      {viewer.description}
                    </p>
                  </div>

                  {/* Viewer Area */}
                  <div className="relative aspect-video bg-void-charcoal">
                    {!isUnlocked ? (
                      // Password overlay
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80">
                        <Lock className="w-12 h-12 text-neon-cyan mb-4" />
                        <div className="text-sm text-soft-gray mb-4">
                          Password protected
                        </div>
                        <div className="flex gap-2">
                          <input
                            type="password"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            placeholder="Enter password"
                            className="px-4 py-2 bg-void-gray border border-void-gray text-white text-sm focus:border-neon-cyan focus:outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && handleUnlock(index)}
                          />
                          <button
                            onClick={() => handleUnlock(index)}
                            className="px-4 py-2 bg-neon-cyan text-black text-sm font-medium hover:bg-neon-cyan/80 transition-colors"
                          >
                            UNLOCK
                          </button>
                        </div>
                      </div>
                    ) : (
                      // Embedded viewer or link
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <Eye className="w-12 h-12 text-neon-cyan mb-4" />
                        <div className="text-sm text-soft-gray mb-4 text-center px-4">
                          3D viewer ready to load
                        </div>
                        <a
                          href={viewer.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-6 py-3 bg-neon-cyan text-black font-medium hover:bg-neon-cyan/80 transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          OPEN VIEWER
                        </a>
                        <div className="mt-4 text-xs text-soft-gray">
                          Opens in new tab
                        </div>
                      </div>
                    )}

                    {/* Decorative grid */}
                    <div 
                      className="absolute inset-0 pointer-events-none opacity-10"
                      style={{
                        backgroundImage: `
                          linear-gradient(rgba(0, 240, 255, 0.5) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0, 240, 255, 0.5) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px',
                      }}
                    />
                  </div>

                  {/* Footer */}
                  <div className="p-4 bg-void-gray/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs mono text-soft-gray">TYPE:</span>
                      <span className="text-xs mono text-neon-cyan uppercase">
                        {viewer.type}
                      </span>
                    </div>
                    {isUnlocked && (
                      <div className="flex items-center gap-2">
                        <span className="status-led lime" />
                        <span className="text-xs mono text-neon-lime">UNLOCKED</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Instructions */}
        <div className="mt-12 glass-panel p-6">
          <h4 className="font-display text-lg font-bold text-white mb-4">
            NAVIGATION CONTROLS
          </h4>
          <div className="grid grid-cols-3 gap-6">
            {[
              { action: 'Orbit', control: 'Left Click + Drag', icon: 'rotate' },
              { action: 'Pan', control: 'Right Click + Drag', icon: 'move' },
              { action: 'Zoom', control: 'Scroll Wheel', icon: 'zoom' },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-sm font-medium text-white mb-1">{item.action}</div>
                <div className="text-xs mono text-soft-gray">{item.control}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Password hint */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-void-gray">
            <Lock className="w-4 h-4 text-soft-gray" />
            <span className="text-xs mono text-soft-gray">
              Password: <span className="text-neon-cyan">lightheart</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
