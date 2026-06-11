# Neonetz Portfolio - Design Specification

## Concept & Vision

A cinematic, immersive portfolio website inspired by Endfield's premium gaming aesthetic. The design evokes a sense of mystery and professionalism with deep dark backgrounds, subtle particle effects, and smooth scroll-driven animations. The experience feels like navigating through a high-end game website - polished, atmospheric, and memorable.

## Design Language

### Aesthetic Direction
- **Reference**: Endfield (Arknights spin-off) - cinematic gaming website
- **Mood**: Mysterious, premium, futuristic with a hint of sci-fi
- **Character**: Dark, atmospheric, with glowing accents and subtle animations

### Color Palette
```css
--color-bg-primary: #0a0a0f;      /* Deep space black */
--color-bg-secondary: #12121a;    /* Elevated dark */
--color-bg-tertiary: #1a1a24;     /* Card backgrounds */
--color-accent-primary: #6366f1;  /* Indigo glow */
--color-accent-secondary: #8b5cf6; /* Purple highlight */
--color-accent-warm: #f97316;     /* Orange accent */
--color-text-primary: #f1f5f9;    /* Bright white text */
--color-text-secondary: #94a3b8;  /* Muted text */
--color-text-accent: #38bdf8;     /* Cyan highlight */
--color-border: rgba(99, 102, 241, 0.2);
--color-glow: rgba(99, 102, 241, 0.4);
```

### Typography
- **Primary Font**: 'Orbitron' (headings) - futuristic, gaming feel
- **Secondary Font**: 'Inter' (body) - clean, readable
- **Fallback**: system-ui, sans-serif
- **Scale**: 16px base, modular scale 1.25

### Spatial System
- Base unit: 8px
- Section padding: 80px vertical, responsive
- Card padding: 24px
- Gap rhythm: 16px, 24px, 32px, 48px

### Motion Philosophy
- **Scroll-triggered**: Elements animate on scroll intersection
- **Entrance**: Fade + translate, 600ms ease-out
- **Stagger**: 100ms between sibling elements
- **Hover**: Scale 1.02, glow intensification
- **Particles**: Subtle floating particles in hero background

## Layout & Structure

### Page Architecture
```
├── Header (fixed, glassmorphism navbar)
│   ├── Logo
│   ├── Navigation Links
│   └── Music Toggle
├── Main
│   ├── Hero Section (full viewport, particle background)
│   ├── About Section (profile + info cards)
│   ├── Skills Section (animated skill badges)
│   ├── Campus Section (institution info)
│   ├── Projects Section (card grid with hover effects)
│   └── Gallery Section (lightbox slider)
├── Footer (contact form, social links)
└── Particle Canvas (background layer)
```

### Responsive Strategy
- Desktop: Full layout with all effects
- Tablet (≤1024px): Adjusted grid, reduced animations
- Mobile (≤768px): Stacked layout, simplified particles

## Features & Interactions

### Navigation
- Fixed header with blur backdrop
- Smooth scroll to sections
- Active section highlighting
- Mobile hamburger menu with slide-in

### Hero Section
- Full viewport height
- Animated particle background (canvas)
- Typing effect for tagline
- Scroll indicator animation

### Project Cards
- Hover: Scale up, glow border, image zoom
- Click: Opens project link
- Lazy-loaded images with skeleton

### Gallery
- Touch-enabled carousel
- Lightbox on click
- Keyboard navigation support

### Music Player
- Toggle button with animated bars
- Persistent across pages (if SPA)
- Remembers last state

## Component Inventory

### Button
- **Default**: Gradient border, transparent bg
- **Hover**: Fill gradient, glow shadow
- **Active**: Scale 0.98
- **Disabled**: 50% opacity, no pointer

### Card (Project)
- Dark bg with subtle border
- Image with zoom on hover
- Title, description, tech stack tags
- Action button

### Section Title
- Large Orbitron font
- Gradient text option
- Decorative line animation

### Skill Badge
- Icon + label
- Hover glow effect
- Staggered entrance animation

### Form Input
- Dark bg, glowing border on focus
- Floating label animation
- Validation states

## Technical Approach

### Architecture: High Cohesion, Low Coupling

```
src/
├── index.html              # Main entry point
├── assets/
│   ├── css/
│   │   ├── main.css        # Main stylesheet
│   │   ├── variables.css   # Design tokens
│   │   ├── base.css        # Reset & typography
│   │   ├── components.css  # Reusable components
│   │   └── sections.css    # Section-specific styles
│   ├── js/
│   │   ├── main.js         # Entry point
│   │   ├── modules/
│   │   │   ├── animations.js   # Scroll animations
│   │   │   ├── particles.js    # Canvas particle system
│   │   │   ├── navigation.js   # Nav behavior
│   │   │   ├── music.js        # Audio controller
│   │   │   └── gallery.js      # Lightbox & slider
│   └── img/                # Images (existing)
└── data/
    └── portfolio.json      # Content data (extensible)
```

### Design Principles
1. **Single Responsibility**: Each module does one thing well
2. **Dependency Injection**: Modules receive dependencies via params
3. **Event-Driven**: Components communicate via custom events
4. **Data Separation**: Content in JSON, structure in HTML
5. **CSS Custom Properties**: All tokens in variables.css

### Adding New Features
1. Add component HTML in appropriate section
2. Add styles in components.css or sections.css
3. Add behavior in new module under js/modules/
4. Import module in main.js
5. Update portfolio.json if needed

### Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid, Flexbox
- ES6+ JavaScript
- Intersection Observer API