import { useState, useEffect, useRef } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import gsap from 'gsap';

interface PasswordGateProps {
  onAuth: (password: string) => boolean;
  isDarkMode: boolean;
}

export default function PasswordGate({ onAuth, isDarkMode }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const lock = lockRef.current;
    if (!card || !lock) return;

    gsap.from(card, {
      opacity: 0, y: 30, scale: 0.96,
      duration: 0.8, ease: 'expo.out', delay: 0.3,
    });
    gsap.from(lock, {
      opacity: 0, scale: 0.5, rotation: -10,
      duration: 0.6, ease: 'back.out(2)', delay: 0.7,
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAuth(password);
    if (!success) {
      setError(true);
      const card = cardRef.current;
      if (card) {
        gsap.fromTo(card, { x: -12 }, { x: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
      }
      setTimeout(() => setError(false), 2000);
    }
  };

  const bgColor = isDarkMode ? 'bg-[#050505]' : 'bg-[#f5f5f0]';
  const textColor = isDarkMode ? 'text-[#e0e0e0]' : 'text-[#1a1a1a]';
  const cardBg = isDarkMode ? 'bg-[#0c0c10]' : 'bg-white';
  const borderColor = isDarkMode ? 'border-[#1a1a22]' : 'border-[#ddd]';
  const accentColor = isDarkMode ? 'text-[#00d4ff]' : 'text-[#0066cc]';
  const inputBg = isDarkMode ? 'bg-[#08080c]' : 'bg-[#f5f5f0]';
  const mutedColor = isDarkMode ? 'text-[#888]' : 'text-[#666]';

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor} ${textColor} ${isDarkMode ? 'grid-bg' : ''}`}>
      {isDarkMode && (
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 40%, rgba(0, 240, 255, 0.06) 0%, transparent 60%)' }}
        />
      )}

      <div
        ref={cardRef}
        className={`${cardBg} border ${borderColor} p-8 md:p-12 max-w-md w-full mx-4 relative ${isDarkMode ? 'hud-card hud-corners glow-pulse' : ''}`}
      >
        {isDarkMode && <div className="hud-corners-extra absolute inset-0 rounded-lg pointer-events-none" />}
        {isDarkMode && <div className="gradient-line absolute top-0 left-4 right-4" />}

        <div className="text-center mb-8">
          <div
            ref={lockRef}
            className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center border ${borderColor}`}
            style={isDarkMode ? {
              background: 'rgba(0, 240, 255, 0.08)',
              borderColor: 'rgba(0, 240, 255, 0.2)',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)',
              borderRadius: '8px',
            } : {}}
          >
            <Lock className={`w-8 h-8 ${accentColor}`} />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2">
            LIGHTHEART
          </h1>
          <p className={`text-sm ${mutedColor}`}>Technical Specification Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-xs uppercase tracking-wider mb-2 ${mutedColor}`}>
              Enter Access Code
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 ${inputBg} border ${borderColor} ${textColor} focus:outline-none focus:border-[#00d4ff] transition-colors`}
                placeholder="password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-[#666]' : 'text-[#999]'}`}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-500 text-sm text-center">Invalid access code. Please try again.</div>
          )}

          <button
            type="submit"
            className={`w-full py-3 px-6 border ${borderColor} ${isDarkMode ? 'hover:bg-[#00d4ff] hover:text-[#0a0a0a]' : 'hover:bg-[#0066cc] hover:text-white'} transition-all duration-300 uppercase text-sm tracking-wider ${isDarkMode ? 'btn-cyan' : ''}`}
            style={isDarkMode ? { backgroundColor: '#00d4ff', color: '#050505' } : {}}
          >
            Access Documentation
          </button>
        </form>

        <div className={`mt-8 pt-6 border-t ${borderColor} text-center`}>
          {isDarkMode && <div className="gradient-line absolute left-12 right-12" style={{ marginTop: '-1px' }} />}
          <p className={`text-xs ${isDarkMode ? 'text-[#666]' : 'text-[#999]'}`}>
            Technical Spec by <span className={accentColor}>idirnet</span>
          </p>
        </div>
      </div>
    </div>
  );
}
