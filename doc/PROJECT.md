# MK Sales - Headless WordPress Website

## Project Overview

This is a **headless WordPress website** for a B2B construction materials company (MK Sales). 

- **Backend**: WordPress with WooCommerce - all products, categories, and content managed there
- **Frontend**: Next.js custom frontend - we build the UI/UX ourselves (like creating a custom theme)
- **Connection**: WPGraphQL API fetches data from WordPress to Next.js

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | JavaScript/React |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Data Fetching | WPGraphQL (WooCommerce) |
| Hosting (Frontend) | Vercel |
| Hosting (Backend) | Hostinger (mksales.co.in) |

## Project Structure

```
mksales-frontend/
├── public/                    # Static assets
│   ├── hero-video.mp4         # Homepage video background
│   └── categories/            # Category images
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── layout.js         # Root layout (Navbar + Footer)
│   │   ├── page.js         # Homepage
│   │   ├── globals.css    # Global styles
│   │   └── product/[slug]/  # Product detail page
│   └── components/         # Reusable components
│       ├── Navbar.js        # Glassmorphism navigation
│       ├── Hero.js         # Video hero section
│       ├── CategoriesSection.js  # Auto-scrolling categories
│       ├── ProductGrid.js  # Products grid
│       ├── WhyChooseUs.js # Features section
│       ├── Footer.js      # Site footer
│       ├── Container.js  # Max-width wrapper
│       └── Section.js   # Section wrapper
├── tailwind.config.js   # Tailwind configuration
└── package.json       # Dependencies
```

## Design System

### Colors
- **Brand Blue**: #007CBC
- **Background**: White / Slate-50
- **Text**: Slate-900 / Slate-600

### Typography
- Headings: Bold, large (4xl-6xl)
- Body: Clean sans-serif (Inter)
- Spacing: Large, generous

### Components Pattern
- Sharp edges (no rounded corners)
- Slate color palette
- Blue accent for CTAs
- Smooth hover transitions

## Key Features

1. **Navbar**: Glassmorphism effect on scroll, white background when scrolled
2. **Hero**: Full-screen video with dark overlay, animated text
3. **Categories**: Horizontal auto-scrolling cards with play/pause controls
4. **Products**: Grid layout with staggered reveal animation
5. **Why Choose Us**: Numbered list with subtle animations
6. **Product Detail**: Image + details + specifications layout

## Backend Integration

WordPress is the source of truth:
- Products are added in WordPress admin
- Images uploaded to WordPress media library
- Categories managed in WooCommerce
- WPGraphQL exposes all data to frontend

Frontend fetches data via GraphQL queries to `http://mksales.co.local/graphql`

## Development Workflow

```bash
# Run locally
cd mksales-frontend
npm run dev
# Visit http://localhost:3000
```

## Notes

- This is NOT a starter template - custom built from scratch
- All UI components built to match premium industrial B2B aesthetic
- Designed for Pan-India construction materials supplier