# FoodAI Prototype

AI-powered food discovery platform with social features, nutrition tracking, and interactive maps.

## 🚀 Quick Start

### Method 1: Python Server (Recommended - No Installation Required)

Simply double-click `start-server.bat` or run:

```bash
python -m http.server 8000
```

Then open your browser to: **http://localhost:8000**

### Method 2: Open Directly in Browser

You can also open `index.html` directly in your browser, but some features (like map) may not work properly due to CORS restrictions.

## 📁 Project Structure

```
foodai-prototype/
├── index.html              # Landing page
├── home.html               # Personal feed with stories
├── discovery.html          # Pinterest-style discovery feed
├── social-feed.html        # Instagram-style social feed
├── map.html                # Interactive map with restaurants
├── ai-nutritionist.html    # AI chat for nutrition advice
├── orders.html             # Order history and tracking
├── saved.html              # Saved/favorited dishes
├── css/
│   ├── design-system.css   # Color palette, typography, variables
│   ├── components.css      # Reusable UI components
│   └── new-components.css  # Extended components
├── image/                  # Static images
├── start-server.bat        # Quick start script for Windows
├── package.json            # NPM configuration
└── README.md               # This file
```

## 🎨 Features

### 🏠 Landing Page
- Feature cards for all sections
- Modern hero section
- Responsive design

### 📱 Home Feed
- Stories (Instagram-style)
- Social posts with AI nutrition badges
- Weather integration
- Trending reels sidebar

### 🔍 Discovery Feed
- Pinterest-style masonry layout
- AI-curated dishes
- Nutrition tracking
- Filter by categories

### 🗺️ Map Discovery
- Interactive Leaflet.js map
- Restaurant markers
- Heatmap visualization
- Search and filters
- Location-based discovery

### 🤖 AI Nutritionist
- Chat interface with AI
- Meal recommendations
- Nutrition analysis (Calories, Protein, Carbs, Fat)
- Daily stats tracking

### 📦 My Orders
- Order history
- Real-time tracking
- Status badges (Delivering, Preparing, Completed)
- Reorder functionality

### ❤️ Saved Items
- Grid view of favorites
- Filter by categories
- Stats dashboard
- Quick actions

## 🎨 Design System

### Colors
- **Primary**: `#ff6933` (Orange)
- **Secondary**: `#22c55e` (Green)
- **Background**: Dark theme with warm tones
- **Text**: Multi-level hierarchy

### Typography
- **Font**: Inter (Google Fonts)
- **Icons**: Material Symbols Outlined

### Components
- Cards with glassmorphism
- Gradient buttons
- Animated hover effects
- Responsive layouts

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Maps**: Leaflet.js + Leaflet.heat
- **Icons**: Material Symbols
- **Fonts**: Google Fonts (Inter)
- **Server**: Python HTTP Server (for development)

## 📦 NPM Scripts (if Node.js is installed)

If you have Node.js installed, you can use:

```bash
# Install dependencies
npm install

# Start development server
npm start

# Alternative server
npm run serve
```

## 🌐 Browser Support

- Chrome/Edge (Chromium) ✅
- Firefox ✅
- Safari ✅
- Mobile browsers ✅

**Requirements:**
- Modern browser with support for CSS Grid, Flexbox, CSS Variables
- JavaScript enabled
- Geolocation API (for Map feature)

## 📸 Screenshots

### Landing Page
Clean and modern interface showcasing all features

### Home Feed
Social feed with stories, posts, and AI nutrition insights

### Map Discovery
Interactive map with restaurant markers and heatmap

### AI Nutritionist
Chat-based nutrition consultation with meal recommendations

### Orders
Order tracking and history management

### Saved Items
Collection of favorite dishes with filtering

## 🔗 Navigation

All pages are interconnected via:
- Consistent left sidebar navigation
- Landing page feature cards
- Cross-page links

### Navigation Structure:
```
index.html (Landing)
├── home.html (Home)
├── discovery.html (Explore)
├── social-feed.html (Social)
├── map.html (Map)
├── ai-nutritionist.html (AI Nutritionist)
├── orders.html (Orders)
└── saved.html (Saved)
```

## 🚧 Future Enhancements

- [ ] Backend API integration
- [ ] User authentication
- [ ] Real-time order tracking
- [ ] Payment gateway
- [ ] Push notifications
- [ ] Progressive Web App (PWA)
- [ ] Social sharing
- [ ] Restaurant reviews
- [ ] Loyalty program

## 📄 License

MIT License

## 👥 Credits

Developed by FoodAI Team

---

**Enjoy exploring FoodAI! 🍜✨**
