'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { Sun, Moon, Eye, RotateCcw, Maximize2, Lock } from 'lucide-react';
import styles from './page.module.scss';

/* ── Default viewer settings ────── */
const DEFAULTS = {
  exposure: 0.8,
  shadowIntensity: 0.5,
  envImage: 'neutral' as string,
  buildingOpacity: 0.5,
  autoRotate: true,
};

const ENV_OPTIONS = [
  { value: 'neutral', label: 'Neutral' },
  { value: 'legacy', label: 'Studio' },
  { value: '', label: 'None' },
];

export default function VisualizationPage() {
  const pageRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLElement | null>(null);

  /* ── Lighting & opacity state ────── */
  const [exposure, setExposure] = useState(DEFAULTS.exposure);
  const [shadowIntensity, setShadowIntensity] = useState(DEFAULTS.shadowIntensity);
  const [envImage, setEnvImage] = useState(DEFAULTS.envImage);
  const [buildingOpacity, setBuildingOpacity] = useState(DEFAULTS.buildingOpacity);
  const [autoRotate, setAutoRotate] = useState(DEFAULTS.autoRotate);
  const [controlsOpen, setControlsOpen] = useState(false);

  /* ── MappingMatter viewer state ────── */
  const [activeRoom, setActiveRoom] = useState<1 | 2>(1);
  const [mmFullscreen, setMmFullscreen] = useState(false);

  useEffect(() => {
    import('@google/model-viewer').catch(() => {});
  }, []);

  useEffect(() => {
    if (!pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.spec-card', {
        y: 30, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'expo.out', delay: 0.15,
      });
    }, pageRef.current);
    return () => ctx.revert();
  }, []);

  /* ── Apply opacity to model materials ────── */
  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;
    const applyOpacity = async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mv = el as any;
      if (!mv.model) return;
      const materials = mv.model.materials;
      if (!materials) return;
      for (const mat of materials) {
        if (mat.pbrMetallicRoughness) {
          const base = mat.pbrMetallicRoughness.baseColorFactor;
          if (base) {
            base[3] = buildingOpacity;
            mat.pbrMetallicRoughness.setBaseColorFactor(base);
          }
        }
        mat.setAlphaMode(buildingOpacity < 1 ? 'BLEND' : 'OPAQUE');
      }
    };
    // Wait for model to load
    el.addEventListener('load', applyOpacity, { once: false });
    applyOpacity();
    return () => el.removeEventListener('load', applyOpacity);
  }, [buildingOpacity]);

  const resetSettings = useCallback(() => {
    setExposure(DEFAULTS.exposure);
    setShadowIntensity(DEFAULTS.shadowIntensity);
    setEnvImage(DEFAULTS.envImage);
    setBuildingOpacity(DEFAULTS.buildingOpacity);
    setAutoRotate(DEFAULTS.autoRotate);
  }, []);

  const ROOM_URLS = {
    1: 'https://editor.mappingmatter.com/viewer/699369c8b09455001aef7c8a/HeXPCRkW0iOTVWJNGcLKNW6WXrOK6uPQNczAfh3W',
    2: 'https://editor.mappingmatter.com/viewer/69a0b8f815149f001a5b64b8/jXiQSpeeZHu9qw6UomCvQul9rMfqnSU8yYE6eAcQ',
  };

  return (
    <div ref={pageRef} className={`page-enter ${styles.page}`}>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerMeta}>
            <span className="status-led cyan" />
            <span className="mono text-soft-gray">SECTION 14</span>
          </div>
          <h1 className={styles.title}>3D VISUALIZATION</h1>
          <p className={styles.description}>
            Interactive 3D models of the Lightheart venue at Usher&apos;s Island, Dublin.
            Explore the venue model, adjust lighting and transparency, and view the projector
            mapping simulations for both rooms.
          </p>
        </div>

        {/* ── Venue 3D Model Viewer ─────────────── */}
        <div className={`spec-card ${styles.viewerCard}`}>
          <div className={styles.viewerHeader}>
            <h3 className={styles.viewerTitle}>VENUE MODEL</h3>
            <button
              className={styles.controlsToggle}
              onClick={() => setControlsOpen(!controlsOpen)}
              title="Lighting & Display Controls"
            >
              <Sun size={14} />
              <span>{controlsOpen ? 'HIDE CONTROLS' : 'LIGHTING CONTROLS'}</span>
            </button>
          </div>

          {/* Controls panel — slides down */}
          {controlsOpen && (
            <div className={styles.controlsPanel}>
              <div className={styles.controlsGrid}>
                {/* Exposure */}
                <div className={styles.controlGroup}>
                  <label className={styles.controlLabel}>
                    <Sun size={12} />
                    <span>Exposure</span>
                    <span className={styles.controlValue}>{exposure.toFixed(1)}</span>
                  </label>
                  <input
                    type="range" min="0" max="3" step="0.1"
                    value={exposure} onChange={(e) => setExposure(Number(e.target.value))}
                    className={styles.slider}
                  />
                </div>

                {/* Shadow Intensity */}
                <div className={styles.controlGroup}>
                  <label className={styles.controlLabel}>
                    <Moon size={12} />
                    <span>Shadows</span>
                    <span className={styles.controlValue}>{shadowIntensity.toFixed(1)}</span>
                  </label>
                  <input
                    type="range" min="0" max="2" step="0.1"
                    value={shadowIntensity} onChange={(e) => setShadowIntensity(Number(e.target.value))}
                    className={styles.slider}
                  />
                </div>

                {/* Building Opacity */}
                <div className={styles.controlGroup}>
                  <label className={styles.controlLabel}>
                    <Eye size={12} />
                    <span>Building Opacity</span>
                    <span className={styles.controlValue}>{Math.round(buildingOpacity * 100)}%</span>
                  </label>
                  <input
                    type="range" min="0.05" max="1" step="0.05"
                    value={buildingOpacity} onChange={(e) => setBuildingOpacity(Number(e.target.value))}
                    className={styles.slider}
                  />
                </div>

                {/* Environment */}
                <div className={styles.controlGroup}>
                  <label className={styles.controlLabel}>
                    <span>Environment</span>
                  </label>
                  <div className={styles.envButtons}>
                    {ENV_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        className={`${styles.envBtn} ${envImage === opt.value ? styles.envBtnActive : ''}`}
                        onClick={() => setEnvImage(opt.value)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Auto-rotate + Reset */}
                <div className={styles.controlGroup}>
                  <div className={styles.controlActions}>
                    <button
                      className={`${styles.actionBtn} ${autoRotate ? styles.actionBtnActive : ''}`}
                      onClick={() => setAutoRotate(!autoRotate)}
                    >
                      <RotateCcw size={12} />
                      <span>Auto-rotate</span>
                    </button>
                    <button className={styles.actionBtn} onClick={resetSettings}>
                      <RotateCcw size={12} />
                      <span>Reset</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className={styles.viewerWrap}>
            {/* @ts-expect-error model-viewer is a web component */}
            <model-viewer
              ref={(el: HTMLElement | null) => { viewerRef.current = el; }}
              src="/models/venue.glb"
              alt="Lightheart Venue 3D Model"
              camera-controls
              shadow-intensity={String(shadowIntensity)}
              environment-image={envImage || undefined}
              exposure={String(exposure)}
              camera-orbit="45deg 55deg 35m"
              min-camera-orbit="auto auto 5m"
              max-camera-orbit="auto auto 100m"
              auto-rotate={autoRotate ? '' : undefined}
              style={{ width: '100%', height: '100%', backgroundColor: '#0a0a0a' }}
            />
          </div>
          <div className={styles.viewerControls}>
            <span className={styles.controlHint}>Drag to rotate | Scroll to zoom | Shift+drag to pan</span>
          </div>
        </div>

        {/* Venue info cards */}
        <div className={styles.infoGrid}>
          {[
            { value: '280', label: 'SQ. METERS', desc: 'Total exhibition floor area' },
            { value: '2', label: 'ROOMS', desc: 'Immersive + Holographic FX' },
            { value: '23m', label: 'LENGTH', desc: 'Main gallery depth' },
            { value: '9.2m', label: 'WIDTH', desc: 'Main gallery span' },
          ].map((card, i) => (
            <div key={i} className={`spec-card ${styles.infoCard}`}>
              <div className={styles.infoValue}>{card.value}</div>
              <div className={styles.infoLabel}>{card.label}</div>
              <div className={styles.infoDesc}>{card.desc}</div>
            </div>
          ))}
        </div>

        {/* ── MappingMatter Projector Viewers ──── */}
        <div className={`spec-card ${styles.mmSection}`}>
          <div className={styles.mmHeader}>
            <h3 className={styles.mmTitle}>PROJECTOR MAPPING SIMULATION</h3>
            <p className={styles.mmDesc}>
              Interactive 3D projector setup views from MappingMatter.
              Left-click to orbit, right-click to pan, scroll to zoom.
            </p>
          </div>

          <div className={styles.mmTabs}>
            <button
              className={`${styles.mmTab} ${activeRoom === 1 ? styles.mmTabActive : ''}`}
              onClick={() => setActiveRoom(1)}
            >
              <span className={styles.mmTabDot} />
              ROOM 1 — IMMERSIVE
            </button>
            <button
              className={`${styles.mmTab} ${activeRoom === 2 ? styles.mmTabActive : ''}`}
              onClick={() => setActiveRoom(2)}
            >
              <span className={styles.mmTabDot} />
              ROOM 2 — HOLOGRAPHIC
            </button>
            <button
              className={styles.mmFullscreenBtn}
              onClick={() => setMmFullscreen(!mmFullscreen)}
              title="Toggle fullscreen"
            >
              <Maximize2 size={14} />
            </button>
          </div>

          <div className={`${styles.mmViewerWrap} ${mmFullscreen ? styles.mmFullscreen : ''}`}>
            <iframe
              key={activeRoom}
              src={ROOM_URLS[activeRoom]}
              title={`MappingMatter Room ${activeRoom} Viewer`}
              className={styles.mmIframe}
              allow="fullscreen"
              loading="lazy"
            />
          </div>

          <div className={styles.mmFooter}>
            <div className={styles.mmFooterItem}>
              <Lock size={11} />
              <span>Password: lightheart</span>
            </div>
            <div className={styles.mmFooterItem}>
              {activeRoom === 1
                ? 'Without 3 central floor projectors — configured for seating / subs'
                : 'Lens calcs accurate — projector body (down-pointing) needs manual mesh'}
            </div>
          </div>
        </div>

        {/* ── Architecture Floor Plan ─────────── */}
        <div className={`spec-card ${styles.floorPlanCard}`}>
          <h3 className={styles.floorPlanTitle}>ARCHITECTURE FLOOR PLAN</h3>
          <p className={styles.floorPlanSubtitle}>As proposed — Ground floor plan by architect</p>
          <div className={styles.floorPlanWrap}>
            <iframe
              src="/images/sections/architecture-floorplan.pdf"
              title="Architecture Floor Plan - Ground Floor As Proposed"
              className={styles.floorPlanPdf}
            />
          </div>
        </div>

        {/* Original venue floor plan */}
        <div className={`spec-card ${styles.floorPlanCard}`}>
          <h3 className={styles.floorPlanTitle}>VENUE FLOOR PLAN</h3>
          <div className={styles.floorPlanImgWrap}>
            <img
              src="/images/sections/floor-plan.png"
              alt="Lightheart Venue Floor Plan - Usher's Island"
              className={styles.floorPlanImg}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
