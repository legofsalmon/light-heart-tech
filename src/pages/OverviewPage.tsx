import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Video, 
  Volume2, 
  Network, 
  Server, 
  Thermometer, 
  Cable,
  User,
  Building2,
  Briefcase,
  MapPin,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const techCards = [
  { 
    icon: Video, 
    title: 'PROJECTION', 
    subtitle: '37 PROJECTORS',
    detail: 'Barco I600-4K10/4K8, G50-W8',
    status: 'cyan',
    link: '/projection'
  },
  { 
    icon: Volume2, 
    title: 'AUDIO', 
    subtitle: '71 SPEAKERS',
    detail: 'L-Acoustics L-ISA Spatial',
    status: 'cyan',
    link: '/audio'
  },
  { 
    icon: Network, 
    title: 'NETWORK', 
    subtitle: '100G SPINE',
    detail: 'Netgear M4500-32C',
    status: 'cyan',
    link: '/network'
  },
  { 
    icon: Server, 
    title: 'SERVERS', 
    subtitle: 'PIXERA PX2',
    detail: '5 Octo Units + GUI',
    status: 'cyan',
    link: '/server'
  },
  { 
    icon: Thermometer, 
    title: 'HVAC', 
    subtitle: '118,491 BTU/h',
    detail: 'Climate Control Required',
    status: 'orange',
    link: '/hvac'
  },
  { 
    icon: Cable, 
    title: 'SIGNAL', 
    subtitle: 'FIBER OPTIC',
    detail: 'DVIGear DVI-7380',
    status: 'cyan',
    link: '/signal'
  },
];

export default function OverviewPage() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from('.overview-card', {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
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

  return (
    <div ref={pageRef} className="min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-10 sm:mb-12">
          <div className="flex items-center gap-3 mb-3">
            <span className="status-led cyan" />
            <span className="text-xs mono text-soft-gray tracking-wider">
              SECTION 02
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
            TECHNICAL OVERVIEW
          </h1>
          <p className="text-soft-gray max-w-2xl text-sm sm:text-base">
            Complete system architecture at a glance. 37 projectors, 71 speakers, 
            5 media servers, and the network infrastructure that ties everything together.
          </p>
        </div>

        {/* Project Metadata */}
        <div className="glass-panel p-5 sm:p-6 mb-8 sm:mb-10">
          <h2 className="font-display text-lg font-bold text-white mb-4 pb-3 border-b border-void-gray">
            PROJECT METADATA
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-neon-cyan mt-0.5" />
              <div>
                <div className="text-xs mono text-soft-gray mb-1">PROJECT LEAD</div>
                <div className="text-white text-sm">Krisjanis Berzins</div>
                <div className="text-neon-cyan text-xs">kris@idirnet.com</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-neon-cyan mt-0.5" />
              <div>
                <div className="text-xs mono text-soft-gray mb-1">CLIENT</div>
                <div className="text-white text-sm">Lightheart Ltd</div>
                <div className="text-soft-gray text-xs">CRM: Kev</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-neon-cyan mt-0.5" />
              <div>
                <div className="text-xs mono text-soft-gray mb-1">LOCATION</div>
                <div className="text-white text-sm">Dublin, Ireland</div>
                <div className="text-soft-gray text-xs">~280 sq. m.</div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-neon-cyan mt-0.5" />
              <div>
                <div className="text-xs mono text-soft-gray mb-1">ENGAGEMENT</div>
                <div className="text-white text-sm">Fixed-term Consultancy</div>
                <div className="text-soft-gray text-xs">21 Day Programme</div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-5 pt-4 border-t border-void-gray">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-4 h-4 text-neon-cyan" />
              <span className="text-xs mono text-soft-gray">TIMELINE</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-xs text-soft-gray mb-1">COMMENCEMENT</div>
                <div className="text-white text-sm">11 Feb 2026</div>
              </div>
              <div>
                <div className="text-xs text-soft-gray mb-1">COMPLETION</div>
                <div className="text-white text-sm">4 Mar 2026</div>
              </div>
              <div>
                <div className="text-xs text-soft-gray mb-1">TARGET OPENING</div>
                <div className="text-white text-sm">Sept 2026</div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-soft-gray mb-1">
                  <span>PROGRESS</span>
                  <span className="text-neon-cyan">67%</span>
                </div>
                <div className="h-1.5 bg-void-gray overflow-hidden">
                  <div className="h-full bg-neon-cyan" style={{ width: '67%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tech Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {techCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link
                key={index}
                to={card.link}
                className="overview-card group glass-panel p-5 hover:border-neon-cyan transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-void-gray flex items-center justify-center group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan transition-all border border-transparent">
                    <Icon className="w-5 h-5 text-neon-cyan" />
                  </div>
                  <span className={`status-led ${card.status}`} />
                </div>

                <div>
                  <h3 className="font-display text-base font-bold text-white group-hover:text-neon-cyan transition-colors mb-1">
                    {card.title}
                  </h3>
                  <div className="text-neon-cyan text-sm mono tracking-wider mb-1">
                    {card.subtitle}
                  </div>
                  <div className="text-soft-gray text-xs">
                    {card.detail}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Budget Summary */}
        <div className="glass-panel p-5 sm:p-6">
          <h2 className="font-display text-lg font-bold text-white mb-4">
            BUDGET SUMMARY
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Media Servers', value: '€275,000', status: 'Confirmed' },
              { label: 'Audio System', value: '€401,586', status: 'Quoted' },
              { label: 'Server Room', value: '€443,103', status: 'Confirmed' },
              { label: 'Network', value: '€93,080', status: 'Confirmed' },
            ].map((item, index) => (
              <div key={index} className="text-center p-3 border border-void-gray">
                <div className="text-xs mono text-soft-gray mb-1">{item.label}</div>
                <div className="font-display text-lg sm:text-xl font-bold text-neon-cyan mb-1">
                  {item.value}
                </div>
                <div className="text-[10px] mono text-neon-lime">{item.status}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
