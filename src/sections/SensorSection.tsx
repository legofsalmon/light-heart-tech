import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Thermometer, Wifi, AlertTriangle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const sensorSpecs = {
  model: 'Luxonis OAK-D Pro Wide (FF)',
  fov: '120° Horizontal',
  coverage: '3.4m @ 1m standoff',
  interface: 'PoE+ (IEEE 802.3at)',
  bandwidth: '2.5GbE Ethernet',
  weight: '0.3 kg per unit',
};

const room1Sensors = [
  { id: 'S-01', x: 15, y: 20, type: 'wall' },
  { id: 'S-02', x: 35, y: 20, type: 'wall' },
  { id: 'S-03', x: 55, y: 20, type: 'wall' },
  { id: 'S-04', x: 75, y: 20, type: 'wall' },
  { id: 'S-05', x: 85, y: 20, type: 'wall' },
  { id: 'S-06', x: 95, y: 20, type: 'wall' },
  { id: 'S-07', x: 15, y: 50, type: 'ceiling' },
  { id: 'S-08', x: 35, y: 50, type: 'ceiling' },
  { id: 'S-09', x: 55, y: 50, type: 'ceiling' },
  { id: 'S-10', x: 75, y: 50, type: 'ceiling' },
  { id: 'S-11', x: 85, y: 50, type: 'ceiling' },
  { id: 'S-12', x: 95, y: 50, type: 'ceiling' },
  { id: 'S-13', x: 15, y: 80, type: 'wall' },
  { id: 'S-14', x: 35, y: 80, type: 'wall' },
  { id: 'S-15', x: 55, y: 80, type: 'wall' },
  { id: 'S-16', x: 75, y: 80, type: 'wall' },
  { id: 'S-17', x: 85, y: 80, type: 'wall' },
  { id: 'S-18', x: 95, y: 80, type: 'wall' },
  { id: 'S-19', x: 50, y: 35, type: 'center' },
  { id: 'S-20', x: 50, y: 65, type: 'center' },
];

export default function SensorSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const floorPlanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const floorPlan = floorPlanRef.current;

    if (!section || !floorPlan) return;

    const ctx = gsap.context(() => {
      // Floor plan draw animation
      const sensors = floorPlan.querySelectorAll('.sensor-dot');
      
      gsap.from(sensors, {
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

      // Ping animation for sensors
      sensors.forEach((sensor) => {
        const ping = sensor.querySelector('.sensor-ping');
        if (ping) {
          gsap.to(ping, {
            scale: 2,
            opacity: 0,
            duration: 1.5,
            repeat: -1,
            ease: 'power1.out',
          });
        }
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="sensors"
      className="relative py-24 md:py-32 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="status-led cyan" />
            <span className="text-xs mono text-soft-gray tracking-wider">
              SECTION 06 — SENSORS
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-4">
            SENSOR ARRAY
          </h2>
          <p className="text-soft-gray max-w-2xl">
            Depth-sensing camera system for motion tracking and interactive experiences. 
            44 cameras generating high-bandwidth video with onboard AI processing.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Floor Plan Visualization */}
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-4">
              ROOM 1 — SENSOR PLACEMENT
            </h3>
            
            <div 
              ref={floorPlanRef}
              className="relative aspect-square bg-void-charcoal border border-void-gray p-8"
            >
              {/* Room outline */}
              <div className="absolute inset-4 border-2 border-void-gray">
                {/* Entrance */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-4 h-16 bg-neon-cyan/20 border border-neon-cyan" />
                
                {/* Sensors */}
                {room1Sensors.map((sensor) => (
                  <div
                    key={sensor.id}
                    className="sensor-dot absolute"
                    style={{
                      left: `${sensor.x}%`,
                      top: `${sensor.y}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    {/* Ping effect */}
                    <div className="sensor-ping absolute inset-0 rounded-full bg-neon-cyan/50" />
                    {/* Sensor dot */}
                    <div className="relative w-4 h-4 rounded-full bg-neon-cyan shadow-neon-cyan cursor-pointer hover:scale-150 transition-transform group">
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black border border-neon-cyan text-xs mono text-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                        {sensor.id} — {sensor.type.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Coverage area indicator */}
                <div className="absolute inset-8 border border-dashed border-neon-cyan/30 rounded-lg" />
              </div>

              {/* Legend */}
              <div className="absolute bottom-2 left-2 flex items-center gap-4 text-xs mono">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-neon-cyan" />
                  <span className="text-soft-gray">SENSOR</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-dashed border-neon-cyan/50" />
                  <span className="text-soft-gray">COVERAGE</span>
                </div>
              </div>
            </div>

            {/* Coverage Stats */}
            <div className="mt-4 flex items-center justify-between">
              <div>
                <div className="text-xs mono text-soft-gray">COVERAGE</div>
                <div className="font-display text-2xl font-bold text-neon-cyan">
                  94% <span className="text-sm text-soft-gray">TRACKABLE AREA</span>
                </div>
              </div>
              <div className="w-32">
                <div className="h-2 bg-void-gray overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-lime"
                    style={{ width: '94%' }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Hardware Specs */}
          <div>
            <h3 className="font-display text-lg font-bold text-white mb-4">
              HARDWARE SPECIFICATION
            </h3>

            <div className="glass-panel p-6 mb-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-16 h-16 bg-void-gray flex items-center justify-center flex-shrink-0">
                  <Camera className="w-8 h-8 text-neon-cyan" />
                </div>
                <div>
                  <div className="text-xs mono text-neon-cyan mb-1">LUXONIS — OAK-D PRO</div>
                  <h4 className="font-display text-xl font-bold text-white">
                    {sensorSpecs.model}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Field of View', value: sensorSpecs.fov },
                  { label: 'Coverage Width', value: sensorSpecs.coverage },
                  { label: 'Interface', value: sensorSpecs.interface },
                  { label: 'Network', value: sensorSpecs.bandwidth },
                  { label: 'Weight', value: sensorSpecs.weight },
                  { label: 'Quantity', value: '28 units (Room 1)' },
                ].map((spec, index) => (
                  <div key={index} className="border-l-2 border-void-gray pl-3">
                    <div className="text-xs mono text-soft-gray mb-1">{spec.label}</div>
                    <div className="text-white text-sm">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Network & Thermal */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass-panel p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Wifi className="w-5 h-5 text-neon-cyan" />
                  <span className="text-xs mono text-soft-gray">NETWORK</span>
                </div>
                <div className="font-display text-2xl font-bold text-neon-cyan mb-1">
                  70 Gbps
                </div>
                <div className="text-xs text-soft-gray">
                  Theoretical aggregate bandwidth
                </div>
              </div>

              <div className="glass-panel p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Thermometer className="w-5 h-5 text-neon-orange" />
                  <span className="text-xs mono text-soft-gray">THERMAL</span>
                </div>
                <div className="font-display text-2xl font-bold text-neon-orange mb-1">
                  2,388 BTU/h
                </div>
                <div className="text-xs text-soft-gray">
                  Total heat output (gallery level)
                </div>
              </div>
            </div>

            {/* HVAC Warning */}
            <div className="border border-neon-orange/50 bg-neon-orange/10 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-neon-orange flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-neon-orange font-medium text-sm mb-1">
                    HVAC NOTE
                  </div>
                  <div className="text-soft-gray text-sm">
                    90W total heat output. Ensure ceiling void airflow for proper 
                    thermal management.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
