# Lightheart — Shared Asset Protocol

> **Purpose:** File naming, versioning, and handoff rules for RAD and IDIRNET
> **Last updated:** March 11, 2026

---

## File Naming Convention

```
[project]-[asset-type]-[descriptor]-[version].[ext]

Examples:
lightheart-logo-primary-v1.svg
lightheart-logo-primary-v1.png
lightheart-type-display-specimen-v1.pdf
lightheart-colour-palette-v1.ase
lightheart-template-social-ig-story-v1.psd
lightheart-template-endcard-16x9-v1.ai
lightheart-photo-venue-exterior-001.jpg
```

### Rules
- All lowercase
- Hyphens only (no spaces, no underscores)
- Version numbers increment: v1, v2, v3
- Sequential numbers for series: 001, 002, 003
- No special characters

---

## Asset Categories

| Category Prefix | Contents |
|----------------|----------|
| `lightheart-logo-` | Logo files (SVG, PNG, EPS) |
| `lightheart-type-` | Typography specimens, font files |
| `lightheart-colour-` | Colour palettes (ASE, ACO, PDF) |
| `lightheart-template-` | Templates (social, print, video) |
| `lightheart-photo-` | Photography |
| `lightheart-video-` | Video assets |
| `lightheart-icon-` | Icons and graphic elements |
| `lightheart-doc-` | Documents (press kit, brand guide) |

---

## Handoff Protocol

### RAD to IDIRNET
1. RAD uploads assets to the shared directory (or sends via agreed channel)
2. Include a `HANDOFF.md` file listing what's new/changed
3. Kev reviews and integrates into the project repository

### IDIRNET to RAD
1. Strategy documents and content briefs placed in `for-rad/`
2. Updated via GitHub — RAD can pull or Kev will send

### HANDOFF.md Template
```markdown
# HANDOFF: [Description]

**From:** [RAD / IDIRNET]
**Date:** YYYY-MM-DD
**Version:** v[N]

## Files Included
| File | Type | Description |
|------|------|-------------|
| filename.ext | SVG | Primary logo |

## Notes
[Any context, decisions, or flags]

## Needs Review
- [ ] Item needing approval
```

---

## Directory Structure (After Brand Delivery)

```
shared/
├── logos/
│   ├── lightheart-logo-primary-v1.svg
│   ├── lightheart-logo-primary-v1.png
│   ├── lightheart-logo-reversed-v1.svg
│   └── lightheart-logo-cafe-v1.svg
├── typography/
│   ├── lightheart-type-display-specimen-v1.pdf
│   └── fonts/ (if licensed for digital)
├── colours/
│   ├── lightheart-colour-palette-v1.ase
│   └── lightheart-colour-palette-v1.pdf
├── templates/
│   ├── lightheart-template-social-ig-story-v1.psd
│   ├── lightheart-template-endcard-16x9-v1.ai
│   └── lightheart-template-lowerthird-v1.ai
└── photography/
    └── (venue photography when available)
```

---

*Protocol active. First expected delivery: Apr 4 (brand identity v1).*
