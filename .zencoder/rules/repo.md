---
description: Repository Information Overview
alwaysApply: true
---

# Pixel Perfect Frontend Information

## Summary
This project is a high-fidelity, pixel-perfect frontend implementation of the "GTG Perfumes" brand. It encompasses a responsive landing page featuring a hero section and a detailed product selection section. The design prioritizes visual accuracy, utilizing custom CSS gradients and modern layouts (Flexbox/Grid) to replicate Figma designs precisely.

## Structure
- **`/assets`**: Stores core visual elements including `heroimage.png` and `perfumebottle.png`.
- **`/css`**: Contains `styles.css`, defining the design system through CSS variables and BEM-inspired class structures.
- **`/js`**: Contains `script.js`, handling interactive components such as the mobile menu, product carousel, and dynamic selection logic.
- **`index.html`**: The main entry point, utilizing semantic HTML5 and external font integrations.

## Language & Runtime
**Language**: HTML5, CSS3, JavaScript (ES6+)  
**Runtime**: Modern Web Browsers  
**Design System**: Custom Vanilla CSS with a specific color palette:
- **Primary Gradient**: `#016630` (Start) to `#032E15` (End)
- **Secondary Green**: `#064E3B`
- **Text (Headings)**: `#032E15`
- **Text (Body)**: `#454545`

## Key Components

### Hero Section
- Full-screen background layout using `heroimage.png`.
- Features custom typography with 'Inter' and a gradient-text logo.
- Interactive "Shop Now" CTAs.

### Product Detail Section
- **Image Gallery**: Features a functional carousel with bidirectional navigation (arrows), indicator dots, and a responsive thumbnail grid.
- **Selection Logic**: 
    - **Subscription Tiers**: Interactive cards (Single, Double, One-Time) that expand/collapse to reveal specific details and update pricing.
    - **Fragrance Selection**: Radio-style selection with active state highlighting and "Best-Seller" tagging.
- **Dynamic Pricing**: Updates based on selected subscription model.
- **Add to Cart**: Generates dynamic URLs based on user selections (Subscription type + Fragrance).

## Build & Installation
Since this is a vanilla frontend project, no build step is required.
1. Clone the repository.
2. Ensure assets are present in the `/assets` directory.
3. Open `index.html` in any modern web browser.

## Usage & Operations
- **Interactive Carousel**: Use arrows or click dots/thumbnails to change the main product view.
- **Subscription Selection**: Clicking a subscription card expands its options and updates the primary action URL.
- **Fragrance Choice**: Select from "Original", "Lily", or "Rose" to customize the order.

## Testing & Validation
- **Responsive Testing**: Verified across Desktop (two-column), Tablet (vertical stack), and Mobile (centered layout) breakpoints.
- **Functional Validation**: Carousel navigation, radio selection toggles, and dynamic URL generation are tested via `script.js` event listeners.
