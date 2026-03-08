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
      opacity: 0,
      y: 30,
      scale: 0.96,
      duration: 0.8,
      ease: 'expo.out',
      delay: 0.3,
    });

    gsap.from(lock, {
      opacity: 0,
      scale: 0.5,
      rotation: -10,
      duration: 0.6,
      ease: 'back.out(2)',
      delay: 0.7,
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAuth(password);
    if (!success) {
      setError(true);
      const card = cardRef.current;
      if (card) {
        gsap.fromTo(card,
          { x: -12 },
          { x: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' }
        );
      }
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] text-[#e0e0e0] grid-bg relative overflow-hidden">
      {/* Background radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(0, 240, 255, 0.06) 0%, transparent 60%)',
        }}
      />

      <div
        ref={cardRef}
        className="hud-card hud-corners glow-pulse p-8 md:p-12 max-w-md w-full mx-4 relative z-10"
      >
        {/* Extra corners wrapper */}
        <div className="hud-corners-extra absolute inset-0 rounded-lg pointer-events-none" />

        {/* Top gradient line */}
        <div className="gradient-line absolute top-0 left-4 right-4" />

        <div className="text-center mb-8">
          <div
            ref={lockRef}
            className="w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded-lg"
            style={{
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.2)',
              boxShadow: '0 0 20px rgba(0, 240, 255, 0.1)',
            }}
          >
            <Lock className="w-7 h-7 text-[#00F0FF]" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">
            LIGHTHEART
          </h1>
          <p className="text-sm text-[#555] tracking-wide">
            Technical Specification Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.2em] mb-2 text-[#00F0FF]/60 font-mono">
              Enter Access Code
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-black/60 text-white rounded-lg transition-all duration-300 focus:outline-none font-mono"
                style={{
                  border: error
                    ? '1px solid rgba(255, 80, 80, 0.5)'
                    : password.length > 0
                    ? '1px solid rgba(0, 240, 255, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: password.length > 0 && !error
                    ? '0 0 12px rgba(0, 240, 255, 0.08)'
                    : 'none',
                }}
                placeholder="password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#555] hover:text-[#00F0FF] transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-xs text-center tracking-wide font-mono">
              Invalid access code
            </div>
          )}

          <button
            type="submit"
            className="btn-cyan w-full py-3.5 px-6 font-mono uppercase text-sm tracking-[0.2em] rounded-lg"
            style={{
              backgroundColor: '#00F0FF',
              color: '#050505',
              fontWeight: 600,
            }}
          >
            Access Documentation
          </button>
        </form>

        <div className="mt-8 pt-6 text-center relative">
          <div className="gradient-line absolute top-0 left-4 right-4" />
          <p className="text-[10px] tracking-[0.15em] text-[#444] font-mono">
            Technical Spec by <span className="text-[#00F0FF]">idirnet</span>
          </p>
        </div>
      </div>
    </div>
  );
}
