# Lightheart Portal — Access Credentials

> **CONFIDENTIAL** — Do not share this file publicly.
> Last updated: 11 March 2026

---

## Password Reference

| Password | Role | Who | Access |
|----------|------|-----|--------|
| `pharmakon` | **Admin** | Kev (IDIRNET) | Everything — all zones, all pages |
| `techspec2026` | Tech Spec | Technical team, Kris | Tech spec sections only (Brief → Dev Notes) |
| `coreteam2026` | Core Team | IDIRNET operations staff | Ops Hub + Tech Spec |
| `brendan2026` | Executive | Brendan (MD, Lightheart) | Executive Dashboard only |
| `lightheart2026` | Marketing | RAD, marketing partners | Marketing Hub + Brand Assets |

---

## What Each Role Sees

### Admin (`pharmakon`)
- **Header:** LIGHTHEART | TECH SPEC · OPS HUB · EXECUTIVE · MARKETING
- **Pages:** All tech spec sections, /ops, /executive, /marketing, /brand
- **Features:** Full navigation, zone switching, logout

### Tech Spec (`techspec2026`)
- **Header:** LIGHTHEART | Technical Specification
- **Pages:** /, /brief, /technical-direction, /projection, /signal, /surface, /sensors, /network, /audio-bridging, /audio, /latency, /server, /hvac, /vendors, /visualization, /disclaimer, /dev-notes

### Core Team (`coreteam2026`)
- **Header:** LIGHTHEART | TECH SPEC · OPS HUB
- **Pages:** All tech spec pages + /ops (Core Team Operations Hub)

### Executive (`brendan2026`)
- **Header:** LIGHTHEART | EXECUTIVE
- **Pages:** /executive only (Managing Director Dashboard)
- **Note:** Cannot see internal margins, contractor rates, or profit/loss data

### Marketing (`lightheart2026`)
- **Header:** LIGHTHEART | MARKETING
- **Pages:** /marketing (Marketing Hub) + /brand (Brand Assets)

---

## How It Works

1. User visits any page → sees the **Password Gate** with Name + Access Code fields
2. They enter their name and password → system determines their **role**
3. After login, they're **automatically redirected** to their landing page:
   - Admin → `/` (Tech Spec home)
   - Tech Spec → `/brief`
   - Core Team → `/ops` (Operations Hub)
   - Executive → `/executive` (MD Dashboard)
   - Marketing → `/marketing` (Marketing Hub)
4. Role maps to **zones** (techspec, ops, executive, marketing, brand)
5. Header shows their name and only the zones they can access
6. If they navigate to a restricted page → orange **"Restricted Access"** gate with option to switch account
7. **Logout button** (arrow icon) in top-right of header

---

## Changing Passwords

Passwords are defined in `data/accessConfig.ts` in the `PASSWORD_MAP` object:

```typescript
export const PASSWORD_MAP: Record<string, Role> = {
  pharmakon: 'admin',
  techspec2026: 'techspec',
  coreteam2026: 'coreteam',
  brendan2026: 'executive',
  lightheart2026: 'marketing',
};
```

To change a password: update the key in `PASSWORD_MAP`. To add a new role: add it to the `Role` type, define its zones in `ROLE_ZONES`, and add a password entry.

---

## Security Notes

- Auth is **client-side** (sessionStorage) — suitable for internal/staging use
- Passwords are stored in source code — do NOT use for production-sensitive data
- Session expires when browser tab closes
- No rate limiting on login attempts
- For production: migrate to server-side auth (NextAuth, Clerk, or Vercel password protection)

---

## URLs

| Environment | URL | Status |
|-------------|-----|--------|
| Local dev | `http://localhost:3456` | Running |
| Staging | `staging.idirnet.com` | Pending (needs Vercel deployment protection disabled + PR merge) |
| Live app | `light-heart-tech-nu.vercel.app` | Active (old single-password) |
