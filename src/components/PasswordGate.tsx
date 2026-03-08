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
      y: 20,
      scale: 0.98,
      duration: 0.7,
      ease: 'expo.out',
      delay: 0.2,
    });

    gsap.from(lock, {
      opacity: 0,
      y: -10,
      duration: 0.5,
      ease: 'expo.out',
      delay: 0.5,
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAuth(password);
    if (!success) {
      setError(true);
      const card = cardRef.current;
      if (card) {
        gsap.fromTo(card, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' });
      }
      setTimeout(() => setError(false), 2000);
    }
  };

  const bgColor = isDarkMode ? 'bg-[#060608]' : 'bg-[#f5f5f0]';
  const textColor = isDarkMode ? 'text-[#e0e0e0]' : 'text-[#1a1a1a]';
  const cardBg = isDarkMode ? 'bg-[#0c0c10]' : 'bg-white';
  const borderColor = isDarkMode ? 'border-[#1a1a22]' : 'border-[#ddd]';
  const accentColor = isDarkMode ? 'text-[#00d4ff]' : 'text-[#0066cc]';
  const inputBg = isDarkMode ? 'bg-[#08080c]' : 'bg-[#f5f5f0]';

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor} ${textColor} noise-overlay grid-pattern`}>
      <div
        ref={cardRef}
        className={`${cardBg} border ${borderColor} p-8 md:p-12 max-w-md w-full mx-4 relative glow-pulse`}
        style={{
          boxShadow: isDarkMode
            ? '0 0 80px rgba(0, 212, 255, 0.03), 0 25px 50px rgba(0, 0, 0, 0.5)'
            : '0 25px 50px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: isDarkMode
              ? 'linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.4), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(0, 102, 204, 0.4), transparent)',
          }}
        />

        <div className="text-center mb-8">
          <div
            ref={lockRef}
            className={`w-14 h-14 mx-auto mb-6 flex items-center justify-center border ${borderColor} relative`}
            style={{
              background: isDarkMode
                ? 'linear-gradient(135deg, rgba(0, 212, 255, 0.05), transparent)'
                : 'linear-gradient(135deg, rgba(0, 102, 204, 0.05), transparent)',
            }}
          >
            <Lock className={`w-6 h-6 ${accentColor}`} />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2">
            LIGHTHEART
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-[#555]' : 'text-[#999]'}`}>
            Technical Specification Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className={`block text-[10px] uppercase tracking-[0.15em] mb-2 ${isDarkMode ? 'text-[#555]' : 'text-[#999]'}`}>
              Enter Access Code
            </label>
            <div className="relative group">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 ${inputBg} border ${error ? 'border-red-500/50' : borderColor} ${textColor} focus:outline-none transition-all duration-300`}
                style={{
                  borderColor: error ? undefined : undefined,
                  boxShadow: password.length > 0 && !error
                    ? `0 0 0 1px ${isDarkMode ? 'rgba(0, 212, 255, 0.2)' : 'rgba(0, 102, 204, 0.2)'}`
                    : undefined,
                }}
                placeholder="password"
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={`absolute right-3 top-1/2 -translate-y-1/2 ${isDarkMode ? 'text-[#444] hover:text-[#888]' : 'text-[#bbb] hover:text-[#666]'} transition-colors`}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-xs text-center tracking-wide">
              Invalid access code
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-6 font-display uppercase text-sm tracking-[0.15em] transition-all duration-300 btn-press relative overflow-hidden"
            style={{
              backgroundColor: isDarkMode ? '#00d4ff' : '#0066cc',
              color: isDarkMode ? '#060608' : '#ffffff',
            }}
          >
            Access Documentation
          </button>
        </form>

        <div className={`mt-8 pt-6 border-t ${borderColor} text-center`}>
          <p className={`text-[10px] tracking-wider ${isDarkMode ? 'text-[#444]' : 'text-[#bbb]'}`}>
            Technical Spec by <span className={accentColor}>idirnet</span>
          </p>
        </div>
      </div>
    </div>
  );
}
