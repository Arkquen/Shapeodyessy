# ShapeOdyssey Theme

## Brand mood
Futuristic, high-contrast, neon-on-black with glass panels, soft glows, and subtle noise and grid texture. The UI should feel premium and technical, with restrained accents that highlight actions and featured content.

## Color system
Dark-first palette. Use the tokens from Tailwind as the source of truth.

- `background`: #050505
- `surface`: #0a0a0a
- `surface-raised`: #121212
- `primary`: #00F5FF (neon cyan)
- `primary-dim`: rgba(0, 245, 255, 0.15)
- `secondary`: #8A2BE2 (violet)
- `text-main`: #FAFAFA
- `text-muted`: #A1A1AA
- `text-dim`: #52525B

Supporting highlight colors used in gradients and effects:
- #FFFFFF, #A1A1AA for luminous text ramps
- #8B5CF6 as a mid-violet accent in animated gradients
- rgba(255, 165, 0, 0.2-0.45) for warm depth in stacked layers

## Typography
- Headline: `Space Grotesk` (weights 300-900). Use for hero titles and section headers.
- Body: `Inter` (weights 300-600). Use for paragraphs, labels, and UI copy.
- Mono: `JetBrains Mono` for code-like chips, stats, and technical labels.
- Icons: Material Symbols Outlined.

## Backgrounds and texture
- Base background is near-black with subtle noise overlay (`.noise-bg`).
- Grid overlays (`.bg-grid`, `.bg-grid-fade-bottom`) add depth in hero and section headers.
- Ambient orbs (`.ambient-orb`) provide soft, blurred color pools.

## Surfaces and elevation
- Glass panels use low-opacity gradients, blur, and thin borders (`.glass-panel`).
- Accent glass panels add cyan edge highlights (`.glass-panel-accent`).
- Cards use glow-on-hover borders and radial light from cursor (`.glow-card`).
- Hover elevation uses a small lift and a soft glow (`.hover-lift`).

## Gradients and highlights
- Gradient text should feel kinetic and luminous:
  - `linear-gradient(135deg, #FFFFFF 0%, #A1A1AA 50%, #00F5FF 100%)`
  - `linear-gradient(90deg, #FFFFFF 0%, #00F5FF 40%, #8B5CF6 60%, #FFFFFF 100%)`
- Dividers use a cyan-to-violet glow line with a cyan core dot (`.section-divider`).

## Motion
- Text shimmer animation (`.animate-gradient-text`) runs at 6s linear.
- Cards and buttons use gentle magnetic or lift interactions.
- Keep motion soft and purposeful, not bouncy or playful.

## Radii and spacing
- Favor large, modern radii on cards and panels (16-24px).
- Use generous vertical spacing between sections (48-96px) and tighter spacing inside cards (16-24px).

## Usage principles
- Default to dark surfaces and reserve `primary` and `secondary` for emphasis.
- Keep primary accents minimal to avoid visual noise.
- Combine glow and glass sparingly so content stays crisp.
- Prioritize readability: high contrast body text, muted for secondary copy.
