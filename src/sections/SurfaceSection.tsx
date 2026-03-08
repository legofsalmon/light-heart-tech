import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const vendors = [
  {
    name: 'SMARTER SURFACES',
    status: 'configured',
    products: [
      { name: 'Smart Ultra High Contrast', coverage: '425m²', cost: '€16,473' },
      { name: 'Smart Floor Projector Screen', coverage: '300m²', cost: '€10,668' },
    ],
    total: '€29,353',
    features: ['SKU-based procurement', 'EUR pricing', '2-coat system'],
  },
  {
    name: 'GOO SYSTEMS',
    status: 'pending',
    products: [
      { name: 'Goo V2 Max Contrast', coverage: '424m²', cost: '~€10,170' },
      { name: 'Goo Floor + Protection', coverage: '279m²', cost: '~€13,070' },
    ],
    total: '~€23,240',
    features: ['Gain 0.7 optimized', 'PVA-free primer', 'Walkable topcoat'],
    savings: '~€6,100',
    expiry: 'Quote expires 3 Apr 2026',
  },
];

export default function SurfaceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const comparisonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from('.surface-card', {
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

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSliderPosition(Number(e.target.value));
  };

  return (
    <section
      ref={sectionRef}
      id="surface"
      className="relative py-24 md:py-32 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="status-led cyan" />
            <span className="text-xs mono text-soft-gray tracking-wider">
              SECTION 05 — SURFACE TREATMENT
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            SURFACE TREATMENT
          </h2>
          <p className="text-soft-gray max-w-2xl">
            Special paint systems for walls and floors. Low-gain grey formulations 
            optimized for multi-projector blending to prevent hot-spotting.
          </p>
        </div>

        {/* Before/After Comparison */}
        <div className="mb-16">
          <h3 className="font-display text-xl font-bold text-white mb-6">
            VISUAL COMPARISON
          </h3>
          
          <div 
            ref={comparisonRef}
            className="relative h-64 md:h-96 rounded-none overflow-hidden border border-void-gray"
          >
            {/* Before Image (Untreated) */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url('/images/surface-treatment.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'left center',
                filter: 'grayscale(30%) brightness(0.7)',
              }}
            >
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 text-white text-xs mono">
                UNTREATED — HOT SPOTS
              </div>
            </div>

            {/* After Image (Treated) */}
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `url('/images/surface-treatment.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'right center',
                clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
              }}
            >
              <div className="absolute top-4 right-4 px-3 py-1 bg-neon-cyan/90 text-black text-xs mono font-bold">
                TREATED — UNIFORM
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-neon-cyan cursor-ew-resize shadow-neon-cyan"
              style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-neon-cyan rounded-full flex items-center justify-center shadow-neon-cyan">
                <ArrowRight className="w-4 h-4 text-black" />
              </div>
            </div>

            {/* Range Input (invisible but functional) */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPosition}
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
            />
          </div>
        </div>

        {/* Vendor Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {vendors.map((vendor, index) => (
            <div
              key={index}
              className="surface-card glass-panel p-6 hover:border-neon-cyan transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h4 className="font-display text-xl font-bold text-white mb-1">
                    {vendor.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className={`status-led ${vendor.status}`} />
                    <span className={`text-xs mono text-neon-${vendor.status}`}>
                      {vendor.status === 'configured' ? 'SPECIFIED' : 'QUOTED'}
                    </span>
                  </div>
                </div>
                {vendor.savings && (
                  <div className="text-right">
                    <div className="text-neon-lime text-sm font-bold">
                      {vendor.savings} SAVINGS
                    </div>
                    <div className="text-xs text-soft-gray">{vendor.expiry}</div>
                  </div>
                )}
              </div>

              {/* Products */}
              <div className="space-y-4 mb-6">
                {vendor.products.map((product, pIndex) => (
                  <div 
                    key={pIndex}
                    className="flex items-center justify-between py-3 border-b border-void-gray"
                  >
                    <div>
                      <div className="text-white text-sm">{product.name}</div>
                      <div className="text-soft-gray text-xs mono">{product.coverage}</div>
                    </div>
                    <div className="text-neon-cyan font-display font-bold">
                      {product.cost}
                    </div>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {vendor.features.map((feature, fIndex) => (
                  <span 
                    key={fIndex}
                    className="px-2 py-1 bg-void-gray text-soft-gray text-xs mono"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Total */}
              <div className="flex items-center justify-between pt-4 border-t border-void-gray">
                <span className="text-soft-gray text-sm">TOTAL</span>
                <span className="font-display text-2xl font-bold text-neon-cyan">
                  {vendor.total}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Application Methods */}
        <div className="mt-12 glass-panel p-6">
          <h4 className="font-display text-lg font-bold text-white mb-4">
            APPLICATION METHODOLOGY
          </h4>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { method: 'HVLP Spray', spec: 'Graco TurboForce 9.5', bestFor: 'Seamless finish' },
              { method: 'Roller', spec: 'Mohair/short-pile', bestFor: 'Ceilings, secondary surfaces' },
              { method: 'Air-Assisted Airless', spec: 'Competent sprayer required', bestFor: 'Large surface areas' },
            ].map((item, index) => (
              <div key={index} className="border-l-2 border-neon-cyan pl-4">
                <div className="text-white font-medium mb-1">{item.method}</div>
                <div className="text-neon-cyan text-sm mono mb-1">{item.spec}</div>
                <div className="text-soft-gray text-xs">{item.bestFor}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
