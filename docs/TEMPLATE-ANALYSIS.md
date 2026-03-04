# Template Analysis Report: sloaneadler.com

## Overall Template Score: **35/100**
*(0 = completely unique, 100 = obviously generic template)*

**Verdict:** This is a **bespoke, custom-designed website** with minimal template characteristics. While it uses standard UI component libraries, the overall design, content, and features are highly customized for a specific luxury/family office brand identity.

---

## Detailed Metrics Breakdown

### 1. shadcn/ui Components Usage: **60/100** (Moderately Template-Like)
- **Uses standard shadcn/ui components**: button, card, input, badge, alert-dialog, dropdown-menu, label, switch, textarea
- **Minimal customization**: Components are largely unmodified from default shadcn/ui templates
- **Standard CVA patterns**: Uses `class-variance-authority` with default variant structures
- **Example**: The `button.tsx` uses standard variants (default, destructive, outline, secondary, ghost, link) without visual customization

### 2. Color Palette: **10/100** (Highly Custom)
- **Custom brand colors** (NOT default Tailwind):
  - Navy: `#1a2332` (primary brand color)
  - Muted Gold: `#b8a07e` (accent color)
  - OKLCH-based CSS variables in globals.css
- **Dark mode support**: Custom dark theme variables
- **Zero use of default Tailwind colors** like `slate-500`, `blue-600` as primary palette

### 3. Typography: **25/100** (Custom Selection)
- **Font pairing**: Inter (sans-serif body) + Crimson Pro (serif headings)
- **Strategic choice**: Crimson Pro adds editorial/luxury feel appropriate for family office positioning
- **CSS variables**: `--font-sans` and `--font-serif` properly configured
- While Google Fonts are common, this pairing is intentional and branded

### 4. Layout Patterns: **40/100** (Some Standard Patterns)
| Pattern | Assessment |
|---------|------------|
| Container widths | `max-w-7xl`, `max-w-4xl` - standard Tailwind |
| Section spacing | `py-24`, `px-8` - standard Tailwind scale |
| Grid layouts | `grid-cols-1 lg:grid-cols-2` - common pattern |
| Overall structure | Multiple narrative sections - custom content flow |

### 5. Content Structure: **5/100** (Highly Bespoke)
- **Unique value proposition**: Family office advisory with "referral-only" positioning
- **Custom section names**: "The Fracturing", "The Quiet Operator", "Velvet Rope", "The Long View"
- **Bespoke copy**: No generic lorem ipsum or template filler text
- **Art integration**: Features actual artwork (Luc Tuymans, Gerhard Richter) with proper attribution

### 6. Unique/Custom Features: **0/100** (Completely Custom)
These are **not template characteristics**:

1. **Global Posture Bar**: Live 5-city timezone display (SF, NY, Paris, Abu Dhabi, Singapore)
2. **Parallax scroll effect**: Hero fades and translates on scroll
3. **i18n implementation**: Multi-language support (English, Spanish, French)
4. **Password protection**: Middleware-based auth gate
5. **n8n automation**: Complex workflow integrations (HubSpot, Slack, PostgreSQL)
6. **Strapi CMS**: Headless content management
7. **Lead scoring**: AUM tracking and family office classification
8. **Custom SVG favicon**: Generated inline SVG with brand color

### 7. Stock Elements: **50/100** (Mixed)
- **Lucide icons**: Menu, X (common but appropriate)
- **Standard Tailwind spacing**: `gap-4`, `p-6`, `my-8` (universal)
- **Standard accessibility**: `prefers-reduced-motion` media query
- **Border radius**: `--radius: 0rem` (square corners - intentional design choice)

---

## Specific Examples

### Template-Like Elements:
```tsx
// Standard shadcn/ui button (unmodified)
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2...",
  { variants: { variant: { default: "bg-primary...", ... } } }
)

// Standard Tailwind container pattern
<div className="max-w-7xl mx-auto px-8">
```

### Unique/Bespoke Elements:
```tsx
// Custom Global Posture Bar - highly unique
<div className="bg-[#1a2332] text-[10px] tracking-widest text-slate-400 uppercase...">
  {timeZones.map((tz) => `${tz.city} ${formatTime(currentTime, tz.zone)}`)}
</div>

// Custom brand colors used throughout
<h1 className="...text-[#1a2332]">  // Navy
<div className="h-px w-8 bg-[#b8a07e]">  // Muted gold accent

// Artwork integration with attribution
<Image src="/images/d7hftxdivxxvm.webp" alt="..." />
<div className="...text-[10px] uppercase...">Luc Tuymans, The Conversation, 1995</div>
```

---

## Summary

| Category | Score | Notes |
|----------|-------|-------|
| **shadcn/ui Components** | 60/100 | Stock components, unmodified |
| **Color Palette** | 10/100 | Fully custom brand colors |
| **Typography** | 25/100 | Intentional font pairing |
| **Layout Patterns** | 40/100 | Some standard grids/containers |
| **Content** | 5/100 | Completely bespoke copy |
| **Unique Features** | 0/100 | Custom timezone bar, auth, integrations |
| **Overall Template Score** | **35/100** | **Custom Design** |

**Conclusion**: The sloaneadler-website is a **professionally crafted, bespoke website** designed for a high-net-worth family office advisory firm. While it leverages shadcn/ui for basic UI primitives (which is a development best practice), the design system, content architecture, and feature set are entirely custom. The "template-like" characteristics are limited to standard UI component foundations that any professional site would use.

---

## Comparative Context

When compared to typical template-based websites (which score 70-90/100), Sloane Adler at 35/100 demonstrates:

- **Intentional brand identity** through custom colors and typography
- **Bespoke content strategy** with unique narrative sections
- **Custom functionality** beyond standard website features
- **Industry-specific positioning** for family office clientele

This score places it firmly in the "custom professional design" category rather than "template-based."

---

*Generated: March 2026*
