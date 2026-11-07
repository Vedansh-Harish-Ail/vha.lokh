# vha.lokh ®
### Independent Digital Creative & Technology Studio

> A bespoke brand website engineered at the intersection of **Experimental Brutalism** and **Editorial Luxury**. Built to communicate a high-craft creative identity, modern digital craftsmanship, and technical excellence.

---

## Brand Architecture & Positioning
- **Studio Name**: `vha.lokh`
- **Category**: Independent Digital Creative / Technology Studio
- **Design Doctrine**: Restraint over novelty, code as physical material, enduring spatial architecture.
- **Palette**: Obsidian (`#080808`), Warm Bone (`#f4f2ec`), Acid Lime (`#d4ff3f`), Hairline Borders (`rgba(244, 242, 236, 0.08)`).
- **Typography**: 
  - Display: `Syne`
  - Editorial: `Instrument Serif`
  - Body: `Plus Jakarta Sans`
  - Monospace: `JetBrains Mono`

---

## Core Sections & Features
1. **Dynamic Custom Cursor** (`CustomCursor.tsx`) — Spring-interpolated cursor with adaptive contextual modes (`VIEW`, `CLICK`). Auto-disabled on touch devices.
2. **Analog Film Grain Simulation** (`NoiseOverlay.tsx`) — Zero-cost SVG fractal noise texture for editorial tactility.
3. **Studio Live Telemetry** (`LiveTelemetry.tsx`) — Real-time clock (Delhi IST / UTC+05:30), live millisecond ticks, active commission status badge.
4. **Interactive Hero Experience** (`HeroSection.tsx`) — Kinetic interactive letters `vha.lokh` with spring physics on hover, studio thesis, magnetic CTA buttons.
5. **Continuous Kinetic Marquees** (`Marquee.tsx`) — Infinite velocity ticker with hover pause.
6. **The Studio Manifesto** (`ManifestoSection.tsx`) — Asymmetric editorial storytelling and primary directives.
7. **Disciplines & Practices** (`DisciplinesSection.tsx`) — Interactive accordion showcase of studio practices, scope rationale, deliverables, and tech tools.
8. **Selected Works** (`SelectedWorksSection.tsx`) — Asymmetric project cards with filter pills, hover zoom, and deep-dive drawer.
9. **Architectural Spec Drawer** (`ProjectModal.tsx`) — Comprehensive case study breakdown with challenge, solution, metrics, tech stack, and live links.
10. **The Doctrine of Restraint** (`PhilosophySection.tsx`) — 4-quadrant brutalist manifesto grid.
11. **The Production Protocol** (`ProcessSection.tsx`) — 5-phase interactive execution lifecycle.
12. **Studio Interactive Lab** (`LabSection.tsx`, `InteractiveLab.tsx`) — 60fps hardware-accelerated Canvas 2D deflection matrix with wave, gravity, and matrix modes.
13. **Audio Haptic System** (`AudioHaptic.tsx`) — Native Web Audio API procedural sound engine with click, hover, and frequency pulses (muted by default with header toggle).
14. **Commissioning Portal** (`ContactSection.tsx`) — Interactive brief transmitter with scope selector and one-click email clipboard.
15. **Closing Brand Stamp** (`BrandFooter.tsx`) — Monumental typographic stamp `VHA.LOKH ©`, timezone monitor, and channel index.

---

## Technical Stack
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Lucide React + Bespoke SVGs
- **Typography**: Google Fonts (`Syne`, `Instrument Serif`, `Plus Jakarta Sans`, `JetBrains Mono`)
- **Audio**: Web Audio API Procedural Synthesizer

---

## Local Development
```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript check & build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Brand Configuration
All studio content, project data, capabilities, and availability parameters are centrally maintained and editable in:
`src/config/brand.ts`
