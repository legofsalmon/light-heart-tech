'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Eye, EyeOff, Shield, User } from 'lucide-react';
import gsap from 'gsap';
import { useAuth } from '@/components/AuthProvider';
import { useTheme } from '@/components/ThemeProvider';
import { PASSWORD_MAP, ROLE_LANDING } from '@/data/accessConfig';
import styles from './PasswordGate.module.scss';

interface PasswordGateProps {
  /** When true, user is authenticated but lacks access to this zone */
  restricted?: boolean;
  /** Zone label to display when restricted */
  zoneLabel?: string;
}

export default function PasswordGate({ restricted, zoneLabel }: PasswordGateProps) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const { authenticate, roleLabel, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const router = useRouter();
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
    const success = authenticate(password, name);
    if (success) {
      const matchedRole = PASSWORD_MAP[password.trim().toLowerCase()];
      if (matchedRole) {
        router.push(ROLE_LANDING[matchedRole]);
      }
    } else {
      setError(true);
      const card = cardRef.current;
      if (card) {
        gsap.fromTo(card, { x: -12 }, { x: 0, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
      }
      setTimeout(() => setError(false), 2000);
    }
  };

  const accent = isDarkMode ? '#00d4ff' : '#004d80';
  const muted = isDarkMode ? '#888' : '#666';
  const border = isDarkMode ? '#1a1a22' : '#ddd';
  const text = isDarkMode ? '#e0e0e0' : '#1a1a1a';

  const subtitle = restricted
    ? `${zoneLabel || 'This area'} requires elevated access`
    : 'Immersive Experience Portal';

  const buttonLabel = restricted ? 'Authenticate' : 'Access Portal';

  return (
    <div
      className={`${styles.wrapper} ${isDarkMode ? 'grid-bg' : ''}`}
      style={{
        backgroundColor: isDarkMode ? '#050505' : '#f5f5f0',
        color: text,
      }}
    >
      {isDarkMode && (
        <div
          className={styles.glow}
          style={{
            background: restricted
              ? 'radial-gradient(ellipse at 50% 40%, rgba(255, 160, 50, 0.06) 0%, transparent 60%)'
              : 'radial-gradient(ellipse at 50% 40%, rgba(0, 240, 255, 0.06) 0%, transparent 60%)',
          }}
        />
      )}

      <div
        ref={cardRef}
        className={`${styles.card} ${isDarkMode ? 'hud-card hud-corners glow-pulse' : ''}`}
        style={{
          backgroundColor: isDarkMode ? '#0c0c10' : '#fff',
          borderColor: border,
        }}
      >
        {isDarkMode && <div className="hud-corners-extra" style={{ position: 'absolute', inset: 0, borderRadius: '8px', pointerEvents: 'none' }} />}
        {isDarkMode && <div className="gradient-line" style={{ position: 'absolute', top: 0, left: '1rem', right: '1rem' }} />}

        <div className={styles.lockArea}>
          <div
            ref={lockRef}
            className={styles.lockIcon}
            style={isDarkMode ? {
              background: restricted ? 'rgba(255, 160, 50, 0.08)' : 'rgba(0, 240, 255, 0.08)',
              borderColor: restricted ? 'rgba(255, 160, 50, 0.2)' : 'rgba(0, 240, 255, 0.2)',
              boxShadow: restricted ? '0 0 20px rgba(255, 160, 50, 0.1)' : '0 0 20px rgba(0, 240, 255, 0.1)',
              borderRadius: '8px',
            } : { borderColor: border }}
          >
            {restricted
              ? <Shield style={{ width: 32, height: 32, color: isDarkMode ? '#ffa032' : accent }} />
              : <Lock style={{ width: 32, height: 32, color: accent }} />
            }
          </div>
          <h1 className={styles.title}>LIGHTHEART</h1>
          <p className={styles.subtitle} style={{ color: muted }}>
            {subtitle}
          </p>
        </div>

        {restricted && roleLabel && (
          <div className={styles.roleTag} style={{ color: muted, borderColor: border }}>
            Signed in as <span style={{ color: accent }}>{roleLabel}</span>
            <button
              type="button"
              onClick={logout}
              className={styles.logoutBtn}
              style={{ color: isDarkMode ? '#666' : '#999' }}
            >
              Switch account
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          {!restricted && (
            <div>
              <label className={styles.label} style={{ color: muted }}>
                Your Name
              </label>
              <div className={styles.inputWrap}>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                  style={{
                    backgroundColor: isDarkMode ? '#08080c' : '#f5f5f0',
                    borderColor: border,
                    color: text,
                  }}
                  placeholder="e.g. Brendan"
                  autoFocus
                />
                <span className={styles.eyeBtn} style={{ color: isDarkMode ? '#666' : '#999', pointerEvents: 'none' }}>
                  <User size={18} />
                </span>
              </div>
            </div>
          )}

          <div>
            <label className={styles.label} style={{ color: muted }}>
              {restricted ? 'Enter Access Code for This Area' : 'Access Code'}
            </label>
            <div className={styles.inputWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                style={{
                  backgroundColor: isDarkMode ? '#08080c' : '#f5f5f0',
                  borderColor: border,
                  color: text,
                }}
                placeholder="password"
                autoFocus={!!restricted}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.eyeBtn}
                style={{ color: isDarkMode ? '#666' : '#999' }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className={styles.error}>
              Invalid access code. Please try again.
            </div>
          )}

          <button
            type="submit"
            className={`${styles.submitBtn} ${isDarkMode ? 'btn-cyan' : ''}`}
            style={isDarkMode
              ? { backgroundColor: '#00d4ff', color: '#050505', borderColor: '#00d4ff' }
              : { borderColor: border, color: text }
            }
          >
            {buttonLabel}
          </button>
        </form>

        <div className={styles.footer} style={{ borderTopColor: border }}>
          {isDarkMode && (
            <div className="gradient-line" style={{ position: 'absolute', left: '3rem', right: '3rem', marginTop: '-1px' }} />
          )}
          <p style={{ color: isDarkMode ? '#666' : '#999' }}>
            By <span style={{ color: accent }}>idirnet</span>
          </p>
        </div>
      </div>
    </div>
  );
}
