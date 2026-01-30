# FoodAI Prototype

AI-powered food discovery platform with social features, nutrition tracking, and interactive maps.

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

   The application will automatically open in your default browser at `http://localhost:8000`

### Alternative Commands

- **Start server without auto-opening browser:**
  ```bash
  npm run serve
  ```

- **Development mode (same as start):**
  ```bash
  npm run dev
  ```

## 📁 Project Structure

```
foodai-prototype/
├── index.html              # Landing page
├── home.html              # Main home page
├── social-feed.html       # Social feed page
├── discovery.html         # Discovery/Explore page
├── map.html               # Map view
├── ai-nutritionist.html   # AI Nutritionist chat
├── orders.html            # Order history
├── saved.html             # Saved items
├── assets/
│   └── css/
│       ├── design-system.css    # Design tokens & variables
│       ├── components.css       # Reusable components
│       ├── new-components.css   # Additional components
│       ├── screens.css          # Screen-specific styles
│       ├── screens2.css         # More screen styles
│       └── screens3.css         # Additional screens
├── package.json           # Project dependencies
└── README.md             # This file
```

## 🌐 Pages Overview

- **Landing Page** (`index.html`) - Welcome page
- **Home** (`home.html`) - Main application interface
- **Social Feed** (`social-feed.html`) - Social media-style food sharing
- **Explore** (`discovery.html`) - Discover trending dishes and restaurants
- **Map** (`map.html`) - Interactive restaurant map
- **AI Nutritionist** (`ai-nutritionist.html`) - AI-powered nutrition advice
- **Orders** (`orders.html`) - Order tracking and history
- **Saved** (`saved.html`) - Favorite dishes and collections

## 🛠️ Technologies

- HTML5
- CSS3 (Custom Properties, Flexbox, Grid)
- Vanilla JavaScript
- Google Fonts (Inter)
- Material Symbols Icons
- Mapbox API for maps

## 📦 Deployment

This is a static website that can be deployed to any static hosting service:

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
```bash
npm install -g netlify-cli
netlify deploy
```

### Deploy to GitHub Pages
1. Push your code to GitHub
2. Go to Settings > Pages
3. Select your branch and root folder
4. Save and wait for deployment

## 🔧 Troubleshooting

### Port Already in Use
If port 8000 is already in use, you can specify a different port:
```bash
npx http-server -p 3000
```

### Dependencies Not Installing
Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

### Browser Not Opening Automatically
Manually open your browser and navigate to:
```
http://localhost:8000
```

## 📄 License

MIT License - feel free to use this project for learning and development.

## 👥 Contributing

This is a prototype project. Feel free to fork and customize for your needs.

---

**Enjoy exploring FoodAI! 🍜🤖**
