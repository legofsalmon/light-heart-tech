import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordGateProps {
  onAuth: (password: string) => boolean;
  isDarkMode: boolean;
}

export default function PasswordGate({ onAuth, isDarkMode }: PasswordGateProps) {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onAuth(password);
    if (!success) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  const bgColor = isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f0]';
  const textColor = isDarkMode ? 'text-[#e0e0e0]' : 'text-[#1a1a1a]';
  const cardBg = isDarkMode ? 'bg-[#141414]' : 'bg-white';
  const borderColor = isDarkMode ? 'border-[#333]' : 'border-[#ddd]';
  const accentColor = isDarkMode ? 'text-[#00d4ff]' : 'text-[#0066cc]';
  const inputBg = isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f5f5f0]';

  return (
    <div className={`min-h-screen flex items-center justify-center ${bgColor} ${textColor}`}>
      <div className={`${cardBg} border ${borderColor} p-8 md:p-12 max-w-md w-full mx-4`}>
        <div className="text-center mb-8">
          <div className={`w-16 h-16 mx-auto mb-6 flex items-center justify-center border ${borderColor}`}>
            <Lock className={`w-8 h-8 ${accentColor}`} />
          </div>
          <h1 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-2">
            LIGHTHEART
          </h1>
          <p className={`text-sm ${isDarkMode ? 'text-[#888]' : 'text-[#666]'}`}>
            Technical Specification Portal
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-xs uppercase tracking-wider mb-2 ${isDarkMode ? 'text-[#888]' : 'text-[#666]'}`}>
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
            <div className="text-red-500 text-sm text-center">
              Invalid access code. Please try again.
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-3 px-6 border ${borderColor} ${isDarkMode ? 'hover:bg-[#00d4ff] hover:text-[#0a0a0a]' : 'hover:bg-[#0066cc] hover:text-white'} transition-all duration-300 uppercase text-sm tracking-wider`}
          >
            Access Documentation
          </button>
        </form>

        <div className={`mt-8 pt-6 border-t ${borderColor} text-center`}>
          <p className={`text-xs ${isDarkMode ? 'text-[#666]' : 'text-[#999]'}`}>
            Technical Spec by <span className={accentColor}>idirnet</span>
          </p>
        </div>
      </div>
    </div>
  );
}
