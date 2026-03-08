import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Speaker, Radio, Cable } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const room1Config = {
  speakers: [
    { type: 'X8i Surround', qty: 20, spl: '129 dB' },
    { type: 'X6i Height', qty: 20, spl: '123 dB' },
    { type: 'SYVA SUB', qty: 8, spl: '128 dB' },
  ],
  electronics: [
    { name: 'LA7.16i CE', qty: 3, desc: '16-channel amplified controller' },
    { name: 'L-ISA Processor II', qty: 1, desc: 'Spatial audio processor' },
    { name: 'LS10 AVB Switch', qty: 2, desc: 'Milan-certified network' },
  ],
};

const room2Config = {
  speakers: [
    { type: 'X8i Surround', qty: 14, spl: '129 dB' },
    { type: 'X6i Height', qty: 17, spl: '123 dB' },
    { type: 'SYVA SUB', qty: 8, spl: '128 dB' },
  ],
  electronics: [
    { name: 'LA7.16i CE', qty: 3, desc: '16-channel amplified controller' },
    { name: 'L-ISA Processor II', qty: 1, desc: 'Shared license' },
    { name: 'LS10 AVB Switch', qty: 2, desc: 'Milan-certified network' },
  ],
};

export default function AudioSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const speakerMapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const speakerMap = speakerMapRef.current;

    if (!section || !speakerMap) return;

    const ctx = gsap.context(() => {
      // Speaker positions pop in
      const speakers = speakerMap.querySelectorAll('.speaker-position');
      gsap.from(speakers, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      });

      // Room config cards
      gsap.from('.room-config-card', {
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 50%',
          toggleActions: 'play none none reverse',
        },
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="audio"
      className="relative py-24 md:py-32 px-4 md:px-8"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('/images/audio-speakers.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/95 to-black" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="status-led cyan" />
            <span className="text-xs mono text-soft-gray tracking-wider">
              SECTION 08 — AUDIO SYSTEM / L-ISA
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            SPATIAL AUDIO
          </h2>
          <p className="text-soft-gray max-w-2xl">
            L-Acoustics L-ISA immersive audio system. Object-based spatial audio 
            with 71 speakers positioned around and above visitors.
          </p>
        </div>

        {/* Speaker Array Visualization */}
        <div className="mb-12">
          <h3 className="font-display text-lg font-bold text-white mb-6">
            ROOM 1 — SPEAKER ARRAY
          </h3>

          <div 
            ref={speakerMapRef}
            className="relative aspect-video bg-void-charcoal border border-void-gray max-w-3xl mx-auto"
          >
            {/* Room outline */}
            <div className="absolute inset-8 border-2 border-void-gray">
              {/* Speaker positions - simplified representation */}
              {/* Top row - X8i */}
              {[20, 35, 50, 65, 80].map((x, i) => (
                <div
                  key={`top-${i}`}
                  className="speaker-position absolute w-4 h-4 bg-neon-cyan rounded-full shadow-neon-cyan"
                  style={{ left: `${x}%`, top: '10%', transform: 'translate(-50%, -50%)' }}
                />
              ))}
              
              {/* Side columns - X8i */}
              {[25, 50, 75].map((y, i) => (
                <>
                  <div
                    key={`left-${i}`}
                    className="speaker-position absolute w-4 h-4 bg-neon-cyan rounded-full shadow-neon-cyan"
                    style={{ left: '10%', top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  />
                  <div
                    key={`right-${i}`}
                    className="speaker-position absolute w-4 h-4 bg-neon-cyan rounded-full shadow-neon-cyan"
                    style={{ left: '90%', top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  />
                </>
              ))}

              {/* Bottom row - X8i */}
              {[20, 35, 50, 65, 80].map((x, i) => (
                <div
                  key={`bottom-${i}`}
                  className="speaker-position absolute w-4 h-4 bg-neon-cyan rounded-full shadow-neon-cyan"
                  style={{ left: `${x}%`, top: '90%', transform: 'translate(-50%, -50%)' }}
                />
              ))}

              {/* Center - Subwoofers */}
              <div className="speaker-position absolute w-8 h-8 bg-neon-magenta rounded-sm shadow-neon-magenta flex items-center justify-center"
                style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
              >
                <span className="text-[8px] text-white font-bold">SUB</span>
              </div>

              {/* Height speakers - X6i (smaller, inner ring) */}
              {[30, 50, 70].map((x, i) => (
                <div
                  key={`height-top-${i}`}
                  className="speaker-position absolute w-3 h-3 bg-neon-lime rounded-full shadow-neon-lime"
                  style={{ left: `${x}%`, top: '25%', transform: 'translate(-50%, -50%)' }}
                />
              ))}
              {[35, 65].map((x, i) => (
                <div
                  key={`height-bottom-${i}`}
                  className="speaker-position absolute w-3 h-3 bg-neon-lime rounded-full shadow-neon-lime"
                  style={{ left: `${x}%`, top: '75%', transform: 'translate(-50%, -50%)' }}
                />
              ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-2 left-2 right-2 flex flex-wrap justify-center gap-4 text-xs mono">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neon-cyan" />
                <span className="text-soft-gray">X8i SURROUND (20)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-neon-lime" />
                <span className="text-soft-gray">X6i HEIGHT (20)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-neon-magenta rounded-sm" />
                <span className="text-soft-gray">SYVA SUB (8)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Room Configurations */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Room 1 */}
          <div className="room-config-card glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-display text-xl font-bold text-white">
                ROOM 1 — MAIN GALLERY
              </h4>
              <span className="status-led cyan" />
            </div>

            <div className="space-y-6">
              {/* Speakers */}
              <div>
                <h5 className="text-xs mono text-soft-gray mb-3">SPEAKER CONFIGURATION</h5>
                <div className="space-y-2">
                  {room1Config.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-void-gray">
                      <div className="flex items-center gap-3">
                        <Speaker className="w-4 h-4 text-neon-cyan" />
                        <span className="text-white text-sm">{speaker.type}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-neon-cyan font-display font-bold">{speaker.qty}</span>
                        <span className="text-soft-gray text-xs mono">{speaker.spl}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Electronics */}
              <div>
                <h5 className="text-xs mono text-soft-gray mb-3">ELECTRONICS & PROCESSING</h5>
                <div className="space-y-2">
                  {room1Config.electronics.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-void-gray">
                      <div className="flex items-center gap-3">
                        <Radio className="w-4 h-4 text-neon-cyan" />
                        <div>
                          <span className="text-white text-sm block">{item.name}</span>
                          <span className="text-soft-gray text-xs">{item.desc}</span>
                        </div>
                      </div>
                      <span className="text-neon-cyan font-display font-bold">{item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost */}
              <div className="pt-4 border-t border-void-gray">
                <div className="flex items-center justify-between">
                  <span className="text-soft-gray text-sm">TOTAL</span>
                  <span className="font-display text-2xl font-bold text-neon-cyan">€226,454</span>
                </div>
              </div>
            </div>
          </div>

          {/* Room 2 */}
          <div className="room-config-card glass-panel p-6">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-display text-xl font-bold text-white">
                ROOM 2 — SECONDARY GALLERY
              </h4>
              <span className="status-led cyan" />
            </div>

            <div className="space-y-6">
              {/* Speakers */}
              <div>
                <h5 className="text-xs mono text-soft-gray mb-3">SPEAKER CONFIGURATION</h5>
                <div className="space-y-2">
                  {room2Config.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-void-gray">
                      <div className="flex items-center gap-3">
                        <Speaker className="w-4 h-4 text-neon-cyan" />
                        <span className="text-white text-sm">{speaker.type}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-neon-cyan font-display font-bold">{speaker.qty}</span>
                        <span className="text-soft-gray text-xs mono">{speaker.spl}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Electronics */}
              <div>
                <h5 className="text-xs mono text-soft-gray mb-3">ELECTRONICS & PROCESSING</h5>
                <div className="space-y-2">
                  {room2Config.electronics.map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-void-gray">
                      <div className="flex items-center gap-3">
                        <Radio className="w-4 h-4 text-neon-cyan" />
                        <div>
                          <span className="text-white text-sm block">{item.name}</span>
                          <span className="text-soft-gray text-xs">{item.desc}</span>
                        </div>
                      </div>
                      <span className="text-neon-cyan font-display font-bold">{item.qty}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cost */}
              <div className="pt-4 border-t border-void-gray">
                <div className="flex items-center justify-between">
                  <span className="text-soft-gray text-sm">TOTAL</span>
                  <span className="font-display text-2xl font-bold text-neon-cyan">€175,132</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Protocol Note */}
        <div className="mt-8 border border-neon-magenta/50 bg-neon-magenta/10 p-4">
          <div className="flex items-start gap-3">
            <Cable className="w-5 h-5 text-neon-magenta flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-neon-magenta font-medium text-sm mb-1">
                PROTOCOL NOTE — MILAN-AVB ONLY
              </div>
              <div className="text-soft-gray text-sm">
                L-ISA Processor II does NOT support Dante natively. System is AVB/Milan only. 
                Integration with Pixera requires hardware converter or sync-based separation.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
