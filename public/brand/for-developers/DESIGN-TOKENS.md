# Lightheart — Design Tokens & CSS Reference

> **Purpose:** Design system tokens for website and application development
> **Source:** `marketing/assets/css/main.css`
> **Last updated:** March 11, 2026
> **Note:** These are interim tokens. Final brand tokens will update after RAD delivers brand identity (Apr 4).

---

## Colour Palette

### Primary Palette
```css
--color-bg: #0a0a0a;              /* Page background (near-black) */
--color-bg-elevated: #141414;      /* Card/panel backgrounds */
--color-surface: #1c1c1c;          /* Surface elements, inputs */
--color-text: #f5f5f0;             /* Primary text (warm white) */
--color-text-muted: #888888;       /* Secondary text */
--color-text-subtle: #666666;      /* Tertiary/disabled text */
```

### Accent — Gold
```css
--color-gold: #c4a265;             /* Primary accent */
--color-gold-light: #d4b275;       /* Hover state */
--color-gold-dim: rgba(196, 162, 101, 0.15);    /* Subtle backgrounds */
--color-gold-border: rgba(196, 162, 101, 0.3);  /* Borders */
```

### Secondary — Blue
```css
--color-blue: #2a4a6b;             /* Secondary accent */
--color-blue-dim: rgba(42, 74, 107, 0.15);      /* Subtle blue bg */
```

### Status Colours
```css
--color-success: #27ae60;          /* Green — success states */
--color-warning: #f39c12;          /* Orange — warnings */
--color-error: #c0392b;            /* Red — errors */
```

---

## Typography

### Font Stacks
```css
--font-display: 'Playfair Display', Georgia, serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
```

### Scale
| Element | Size | Weight | Line Height | Letter Spacing |
|---------|------|--------|-------------|----------------|
| `h1` | `clamp(2.5rem, 6vw, 4.5rem)` | 600 | 1.1 | -0.02em |
| `h2` | `clamp(1.75rem, 4vw, 2.75rem)` | 600 | 1.2 | -0.02em |
| `h3` | `clamp(1.25rem, 2.5vw, 1.5rem)` | 600 | 1.2 | -0.02em |
| `h4` | `1.125rem` | 500 | 1.2 | -0.02em |
| Body | `16px` (1rem) | 400 | 1.7 | normal |
| Nav links | `0.9rem` | 500 | — | — |
| Logo | `1.5rem` | 600 | — | -0.03em |

### Font Loading
Include in `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
```

---

## Spacing Scale

```css
--space-xs:  0.25rem;   /*  4px */
--space-sm:  0.5rem;    /*  8px */
--space-md:  1rem;      /* 16px */
--space-lg:  1.5rem;    /* 24px */
--space-xl:  2rem;      /* 32px */
--space-2xl: 3rem;      /* 48px */
--space-3xl: 4rem;      /* 64px */
--space-4xl: 6rem;      /* 96px */
--space-5xl: 8rem;      /* 128px */
```

---

## Layout

```css
--max-width: 1200px;           /* Standard content width */
--max-width-narrow: 720px;     /* Narrow content (articles, forms) */
--header-height: 72px;          /* Fixed header height */
```

### Container Classes
```css
.container         /* max-width: 1200px, centered, px: 24px */
.container-narrow  /* max-width: 720px */
```

### Section Padding
```css
.section           /* padding: 96px 0 (space-4xl) */
.section-sm        /* padding: 48px 0 (space-2xl) */
.section-lg        /* padding: 128px 0 (space-5xl) */
```

---

## Transitions

```css
--transition-fast: 150ms ease;    /* Micro interactions (hover, focus) */
--transition-base: 250ms ease;    /* Standard transitions */
--transition-slow: 400ms ease;    /* Page-level animations */
```

---

## Border Radius

```css
--radius-sm: 4px;      /* Buttons, small elements */
--radius-md: 8px;      /* Cards, panels */
--radius-lg: 12px;     /* Large containers, modals */
```

---

## Key Component Patterns

### Header
- Fixed position, full width
- Background: `rgba(10, 10, 10, 0.95)` with `backdrop-filter: blur(20px)`
- Scrolled state: `rgba(10, 10, 10, 0.98)` with box shadow
- Height: 72px
- Logo: Playfair Display, gold accent on brand word

### Hero
- Full viewport height (`min-height: 100vh`)
- Centered content
- Subtle radial gradient overlays (gold + blue)
- Padding accounts for fixed header

### Navigation Links
- Muted text colour, gold on hover/active
- Animated underline (gold, expands on hover)
- 0.9rem, weight 500

### Cards/Surfaces
- Background: `--color-bg-elevated` (#141414) or `--color-surface` (#1c1c1c)
- Border: `1px solid rgba(255, 255, 255, 0.05)`
- Hover: subtle gold border glow

---

## Responsive Breakpoints

```css
/* Mobile-first approach */
@media (max-width: 768px)  { /* Tablet and below */ }
@media (max-width: 480px)  { /* Mobile only */ }
@media (min-width: 1024px) { /* Desktop and above */ }
```

---

## Dark Theme Note

The current design is dark-first (near-black backgrounds, warm white text, gold accents). This aligns with the immersive gallery positioning. A light variant is not currently planned but the CSS variable system supports it if needed.

---

*Tokens will be updated after RAD brand delivery (Apr 4). Current values represent the interim design system.*
