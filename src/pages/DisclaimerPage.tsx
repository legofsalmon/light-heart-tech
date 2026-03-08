import CopyEmail from '../components/CopyEmail';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertTriangle, FileText, Shield, Scale } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DisclaimerPageProps {
  isDarkMode: boolean;
}

export default function DisclaimerPage({ isDarkMode }: DisclaimerPageProps) {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const ctx = gsap.context(() => {
      gsap.from('.disclaimer-section', {
        y: 30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: page,
          start: 'top 70%',
          toggleActions: 'play none none none',
        },
      });
    }, page);

    return () => ctx.revert();
  }, []);

  const accentColor = isDarkMode ? '#00F0FF' : '#0066CC';
  const borderColor = isDarkMode ? '#1F1F1F' : '#E5E5E5';
  const subTextColor = isDarkMode ? '#A0A0A0' : '#666666';
  const bgClass = isDarkMode ? 'bg-[#0A0A0A]' : 'bg-gray-50';

  return (
    <div ref={pageRef} className="page-enter min-h-screen py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="disclaimer-section mb-8 sm:mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: '#FF4D00' }}
            />
            <span className={`text-xs mono tracking-wider ${subTextColor}`}>
              SECTION 15
            </span>
          </div>
          <h1 
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-3"
            style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
          >
            DISCLAIMER
          </h1>
          <p 
            className="max-w-xl text-sm sm:text-base"
            style={{ color: subTextColor }}
          >
            Important legal and technical notices regarding this specification document.
          </p>
        </div>

        {/* Document Status */}
        <div 
          className={`disclaimer-section border p-5 sm:p-6 mb-6 ${bgClass}`}
          style={{ borderColor }}
        >
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: isDarkMode ? '#1F1F1F' : '#F5F5F5' }}
            >
              <FileText className="w-6 h-6" style={{ color: accentColor }} />
            </div>
            <div>
              <h2 
                className="font-display text-lg font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                DOCUMENT STATUS
              </h2>
              <p 
                className="text-sm mb-3"
                style={{ color: subTextColor }}
              >
                This technical specification is a living document. All figures, costs, and 
                equipment specifications are subject to change as vendor quotes are finalized 
                and project requirements evolve.
              </p>
              <div className="flex flex-wrap gap-2">
                <span 
                  className="px-2 py-1 text-[10px] mono"
                  style={{ 
                    backgroundColor: isDarkMode ? '#1F1F1F' : '#F5F5F5',
                    color: subTextColor 
                  }}
                >
                  VERSION: 1.0
                </span>
                <span 
                  className="px-2 py-1 text-[10px] mono"
                  style={{ 
                    backgroundColor: isDarkMode ? '#1F1F1F' : '#F5F5F5',
                    color: subTextColor 
                  }}
                >
                  LAST UPDATED: 4 MARCH 2026
                </span>
                <span 
                  className="px-2 py-1 text-[10px] mono"
                  style={{ 
                    backgroundColor: isDarkMode ? '#1F1F1F' : '#F5F5F5',
                    color: accentColor 
                  }}
                >
                  STATUS: DRAFT
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Disclaimer */}
        <div 
          className={`disclaimer-section border p-5 sm:p-6 mb-6 ${bgClass}`}
          style={{ borderColor }}
        >
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: isDarkMode ? '#1F1F1F' : '#F5F5F5' }}
            >
              <Scale className="w-6 h-6" style={{ color: '#FF4D00' }} />
            </div>
            <div>
              <h2 
                className="font-display text-lg font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                PRICING DISCLAIMER
              </h2>
              <p 
                className="text-sm mb-3"
                style={{ color: subTextColor }}
              >
                All costs listed in this document are estimates based on current market rates 
                and preliminary vendor discussions. Final pricing will be determined through 
                formal quotation processes. This document does not constitute a binding offer 
                or contract.
              </p>
              <ul className="space-y-1 text-sm" style={{ color: subTextColor }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: '#FF4D00' }}>•</span>
                  <span>Confirmed pricing is marked as "CONFIRMED"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: '#FF4D00' }}>•</span>
                  <span>Quoted pricing is subject to quote expiry dates</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: '#FF4D00' }}>•</span>
                  <span>TBD items require formal vendor engagement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Technical Accuracy */}
        <div 
          className={`disclaimer-section border p-5 sm:p-6 mb-6 ${bgClass}`}
          style={{ borderColor }}
        >
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: isDarkMode ? '#1F1F1F' : '#F5F5F5' }}
            >
              <AlertTriangle className="w-6 h-6" style={{ color: '#FF006E' }} />
            </div>
            <div>
              <h2 
                className="font-display text-lg font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                TECHNICAL ACCURACY
              </h2>
              <p 
                className="text-sm mb-3"
                style={{ color: subTextColor }}
              >
                While every effort has been made to ensure accuracy, technical specifications 
                are based on manufacturer documentation and may be subject to change. Always 
                verify critical specifications directly with manufacturers before procurement.
              </p>
              <div 
                className="p-3 text-sm"
                style={{ 
                  backgroundColor: isDarkMode ? 'rgba(255, 0, 110, 0.1)' : 'rgba(255, 0, 110, 0.05)',
                  border: `1px solid ${isDarkMode ? 'rgba(255, 0, 110, 0.3)' : 'rgba(255, 0, 110, 0.2)'}`
                }}
              >
                <span style={{ color: '#FF006E' }}>Important:</span>{' '}
                <span style={{ color: subTextColor }}>
                  HVAC calculations are preliminary and pending final equipment specifications 
                  from all vendors. Contractor verification required before installation.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Intellectual Property */}
        <div 
          className={`disclaimer-section border p-5 sm:p-6 mb-6 ${bgClass}`}
          style={{ borderColor }}
        >
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: isDarkMode ? '#1F1F1F' : '#F5F5F5' }}
            >
              <Shield className="w-6 h-6" style={{ color: accentColor }} />
            </div>
            <div>
              <h2 
                className="font-display text-lg font-bold mb-2"
                style={{ color: isDarkMode ? '#FFFFFF' : '#000000' }}
              >
                INTELLECTUAL PROPERTY
              </h2>
              <p 
                className="text-sm mb-3"
                style={{ color: subTextColor }}
              >
                This document and its contents are the intellectual property of idirnet. 
                Unauthorized distribution, reproduction, or modification is prohibited without 
                express written consent.
              </p>
              <div className="flex items-center gap-2 text-sm" style={{ color: subTextColor }}>
                <span>Technical Spec by</span>
                <span style={{ color: accentColor }}>idirnet</span>
                <span>|</span>
                <CopyEmail email="kris@idirnet.com" isDarkMode={isDarkMode} />
              </div>
            </div>
          </div>
        </div>

        {/* Access Control Notice */}
        <div 
          className="disclaimer-section p-4 sm:p-5"
          style={{ 
            border: `2px solid ${accentColor}`,
            backgroundColor: isDarkMode ? 'rgba(0, 240, 255, 0.05)' : 'rgba(0, 102, 204, 0.05)'
          }}
        >
          <div className="text-center">
            <div 
              className="text-xs mono mb-2"
              style={{ color: accentColor }}
            >
              ACCESS CONTROL
            </div>
            <p 
              className="text-sm"
              style={{ color: subTextColor }}
            >
              This document is password protected. Access is restricted to authorized 
              personnel only. If you have accessed this document without authorization, 
              please contact <CopyEmail email="kris@idirnet.com" isDarkMode={isDarkMode} /> immediately.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
