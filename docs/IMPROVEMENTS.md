# FoodAI Prototype - Improvement Roadmap

**Last Updated:** January 30, 2026  
**Project:** FoodAI Web Application Prototype

---

## 📊 Current Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Maps:** Leaflet.js v1.9.4 + Leaflet Heat
- **Icons:** Google Material Symbols
- **Fonts:** Google Fonts (Inter)
- **Server:** Python http.server (development)

---

## 🎯 Priority Roadmap

### Phase 1: Quick Wins (Week 1-2) ⚡

#### 1.1 Performance Optimization
- [ ] **Add lazy loading to images**
  - Add `loading="lazy"` to all `<img>` tags
  - Files: `home.html`, `discovery.html`, `saved.html`, `social-feed.html`, `orders.html`
  
- [ ] **Optimize image loading**
  - Replace Unsplash URLs with local WebP images
  - Implement responsive srcset: `srcset="/img/dish-400.webp 400w, /img/dish-800.webp 800w"`
  - Create `/assets/images/` directory structure
  
- [ ] **Critical CSS extraction**
  - Inline above-the-fold CSS in `<head>`
  - Defer loading of full stylesheets
  - Target files: All HTML pages

#### 1.2 Accessibility Improvements
- [ ] **Add ARIA labels to all interactive elements**
  ```html
  <!-- Before -->
  <button class="btn-icon">
      <span class="material-symbols-outlined">more_horiz</span>
  </button>
  
  <!-- After -->
  <button class="btn-icon" aria-label="More options">
      <span class="material-symbols-outlined" aria-hidden="true">more_horiz</span>
  </button>
  ```
  - Target: All pages with icon buttons
  
- [ ] **Improve image alt text**
  - Change generic "Pho" to "Bowl of Vietnamese Pho Bo with sliced beef and fresh herbs"
  - Files: All HTML files with food images

- [ ] **Fix color contrast issues**
  - Update `--color-text-tertiary: #B8826D` in `design-system.css`
  - Test WCAG AA compliance for all text colors

#### 1.3 Code Cleanup
- [ ] **Fix navigation consistency**
  - Decide: Merge `home.html` and `social-feed.html` OR differentiate clearly
  - Standardize all nav links across pages
  - Fix conflicting links to `index.html` vs `social-feed.html`

- [ ] **Remove duplicate user profile widgets**
  - Extract to shared component (see Phase 2)
  - Currently duplicated in all 7 HTML files

---

### Phase 2: Architecture Refactoring (Month 1) 🏗️

#### 2.1 Component Extraction
- [ ] **Create shared navigation component**
  - Extract sidebar navigation from all pages
  - Options:
    - A) JavaScript template: `components/navigation.js`
    - B) Server-side includes (if using Node.js)
    - C) Build tool with HTML partials (Vite/Webpack)
  
- [ ] **Create reusable card components**
  - Extract feed-post-card
  - Extract masonry-card
  - Extract saved-card

#### 2.2 Data Centralization
- [ ] **Move restaurant data to JSON**
  - Create `data/restaurants.json`
  - Remove 1100+ lines of hardcoded data from `map.html`
  - Load via fetch API
  
- [ ] **Create mock API responses**
  - `data/posts.json` - Feed posts
  - `data/dishes.json` - All dishes
  - `data/orders.json` - Order history
  - `data/favorites.json` - Saved items

#### 2.3 CSS Organization
- [ ] **Split components.css (1446 lines)**
  - `assets/css/forms.css`
  - `assets/css/cards.css`
  - `assets/css/navigation.css`
  - `assets/css/feed.css`
  
- [ ] **Consolidate new-components.css into main files**
  - Unclear purpose - merge into appropriate files

#### 2.4 JavaScript Modules
- [ ] **Extract map logic**
  - Create `assets/js/map.js`
  - Remove inline script from `map.html`
  
- [ ] **Extract carousel logic**
  - Create `assets/js/carousel.js`
  - Reuse across pages
  
- [ ] **Create utility functions**
  - `assets/js/utils.js` - Helper functions
  - `assets/js/api.js` - Fetch wrappers

---

### Phase 3: Feature Implementation (Month 2) ⚙️

#### 3.1 Client-Side Features (No Backend Required)

- [ ] **localStorage for Favorites**
  ```javascript
  // assets/js/favorites.js
  class FavoritesManager {
      constructor() {
          this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
      }
      
      toggle(dishId) {
          const index = this.favorites.indexOf(dishId);
          index > -1 ? this.favorites.splice(index, 1) : this.favorites.push(dishId);
          this.save();
          return index === -1; // Returns true if added
      }
      
      save() {
          localStorage.setItem('favorites', JSON.stringify(this.favorites));
      }
      
      has(dishId) {
          return this.favorites.includes(dishId);
      }
  }
  ```

- [ ] **Shopping Cart with localStorage**
  ```javascript
  // assets/js/cart.js
  class ShoppingCart {
      constructor() {
          this.items = JSON.parse(localStorage.getItem('cart') || '[]');
      }
      
      addItem(item) {
          this.items.push(item);
          this.save();
          this.updateBadge();
      }
      
      removeItem(itemId) {
          this.items = this.items.filter(item => item.id !== itemId);
          this.save();
          this.updateBadge();
      }
      
      getTotal() {
          return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      }
      
      save() {
          localStorage.setItem('cart', JSON.stringify(this.items));
      }
      
      updateBadge() {
          const badge = document.querySelector('.cart-badge');
          if (badge) badge.textContent = this.items.length;
      }
  }
  ```

- [ ] **Client-Side Search & Filter**
  - Implement for `discovery.html` masonry grid
  - Implement for `saved.html` saved items
  - Implement for `map.html` restaurant list
  ```javascript
  // assets/js/search.js
  function filterDishes(query, filters = {}) {
      const dishes = document.querySelectorAll('.masonry-card');
      
      dishes.forEach(dish => {
          const name = dish.querySelector('.masonry-card-title').textContent.toLowerCase();
          const category = dish.dataset.category;
          
          const matchesSearch = name.includes(query.toLowerCase());
          const matchesCategory = !filters.category || category === filters.category;
          
          dish.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
      });
  }
  ```

- [ ] **Toast Notifications**
  - Use existing CSS from `components.css` (line 1200+)
  ```javascript
  // assets/js/toast.js
  function showToast(message, type = 'success', duration = 3000) {
      const toast = document.createElement('div');
      toast.className = `toast toast-${type}`;
      toast.innerHTML = `
          <span class="material-symbols-outlined">${type === 'success' ? 'check_circle' : 'error'}</span>
          <span>${message}</span>
      `;
      document.body.appendChild(toast);
      
      setTimeout(() => toast.classList.add('toast-show'), 100);
      setTimeout(() => {
          toast.classList.remove('toast-show');
          setTimeout(() => toast.remove(), 300);
      }, duration);
  }
  ```

#### 3.2 UI Enhancements

- [ ] **Skeleton Loading States**
  - Create CSS classes
  - Add to `discovery.html`, `saved.html`, `map.html`
  ```css
  /* Add to components.css */
  .skeleton-loading {
      animation: skeleton-pulse 1.5s ease-in-out infinite;
  }
  
  @keyframes skeleton-pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
  }
  
  .skeleton-image {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: skeleton-shimmer 1.5s infinite;
  }
  
  @keyframes skeleton-shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
  }
  ```

- [ ] **Loading Button States**
  ```css
  .btn-loading {
      position: relative;
      pointer-events: none;
      opacity: 0.7;
  }
  
  .btn-loading::after {
      content: '';
      position: absolute;
      width: 16px;
      height: 16px;
      border: 2px solid white;
      border-radius: 50%;
      border-top-color: transparent;
      animation: spin 0.6s linear infinite;
  }
  ```

- [ ] **Dark Theme Toggle**
  - CSS already exists in `design-system.css`
  - Add toggle button to user profile
  ```javascript
  // assets/js/theme.js
  function toggleTheme() {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
  }
  
  // Load saved theme on page load
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  ```

#### 3.3 Mobile Enhancements

- [ ] **Bottom Navigation Bar**
  ```html
  <!-- Add to all pages -->
  <nav class="bottom-nav">
      <a href="home.html" class="bottom-nav-item active">
          <span class="material-symbols-outlined">home</span>
          <span>Home</span>
      </a>
      <a href="discovery.html" class="bottom-nav-item">
          <span class="material-symbols-outlined">explore</span>
          <span>Discover</span>
      </a>
      <a href="map.html" class="bottom-nav-item">
          <span class="material-symbols-outlined">map</span>
          <span>Map</span>
      </a>
      <a href="orders.html" class="bottom-nav-item">
          <span class="material-symbols-outlined">receipt_long</span>
          <span>Orders</span>
      </a>
      <a href="saved.html" class="bottom-nav-item">
          <span class="material-symbols-outlined">bookmark</span>
          <span>Saved</span>
      </a>
  </nav>
  ```
  
  ```css
  /* Add to components.css */
  .bottom-nav {
      display: none;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--color-background);
      border-top: 1px solid var(--color-border);
      padding: 8px 0;
      z-index: 1000;
  }
  
  @media (max-width: 1024px) {
      .bottom-nav {
          display: flex;
          justify-content: space-around;
      }
      
      .sidebar-left,
      .sidebar-right {
          display: none;
      }
  }
  ```

- [ ] **Swipe Gestures for Stories**
  - Add touch event handlers
  - Implement smooth transitions

- [ ] **Pull-to-Refresh**
  - Add to feed pages
  - Show loading indicator

#### 3.4 Keyboard Navigation

- [ ] **Keyboard Shortcuts**
  ```javascript
  // assets/js/keyboard.js
  document.addEventListener('keydown', (e) => {
      // Focus search on "/"
      if (e.key === '/' && !e.target.matches('input, textarea')) {
          e.preventDefault();
          document.querySelector('.search-bar-input')?.focus();
      }
      
      // Navigate pages with number keys
      if (e.altKey) {
          switch(e.key) {
              case '1': window.location.href = 'home.html'; break;
              case '2': window.location.href = 'discovery.html'; break;
              case '3': window.location.href = 'map.html'; break;
              case '4': window.location.href = 'ai-nutritionist.html'; break;
              case '5': window.location.href = 'orders.html'; break;
          }
      }
  });
  ```

- [ ] **Focus Trap in Modals**
  - Implement for cart modal
  - Implement for any future popups

---

### Phase 4: Backend Integration (Month 3-4) 🔌

#### 4.1 Backend Setup

- [ ] **Choose Backend Stack**
  - **Option A:** Node.js + Express + PostgreSQL (Traditional)
  - **Option B:** Firebase (Quick BaaS)
  - **Option C:** Supabase (Open-source BaaS)
  - **Recommended:** Node.js + Express + Supabase (Best of both)

- [ ] **Database Schema Design**
  ```sql
  -- users table
  CREATE TABLE users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      avatar_url TEXT,
      created_at TIMESTAMP DEFAULT NOW()
  );
  
  -- restaurants table
  CREATE TABLE restaurants (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100),
      latitude DECIMAL(10, 8),
      longitude DECIMAL(11, 8),
      rating DECIMAL(2, 1),
      image_url TEXT,
      created_at TIMESTAMP DEFAULT NOW()
  );
  
  -- dishes table
  CREATE TABLE dishes (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2),
      image_url TEXT,
      restaurant_id UUID REFERENCES restaurants(id),
      calories INTEGER,
      protein INTEGER,
      carbs INTEGER,
      fat INTEGER,
      created_at TIMESTAMP DEFAULT NOW()
  );
  
  -- orders table
  CREATE TABLE orders (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id),
      restaurant_id UUID REFERENCES restaurants(id),
      status VARCHAR(50) DEFAULT 'pending',
      total DECIMAL(10, 2),
      created_at TIMESTAMP DEFAULT NOW()
  );
  
  -- order_items table
  CREATE TABLE order_items (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      order_id UUID REFERENCES orders(id),
      dish_id UUID REFERENCES dishes(id),
      quantity INTEGER,
      price DECIMAL(10, 2)
  );
  
  -- favorites table
  CREATE TABLE favorites (
      user_id UUID REFERENCES users(id),
      dish_id UUID REFERENCES dishes(id),
      created_at TIMESTAMP DEFAULT NOW(),
      PRIMARY KEY (user_id, dish_id)
  );
  
  -- posts (social feed) table
  CREATE TABLE posts (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      user_id UUID REFERENCES users(id),
      dish_id UUID REFERENCES dishes(id),
      caption TEXT,
      image_url TEXT,
      likes_count INTEGER DEFAULT 0,
      comments_count INTEGER DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW()
  );
  ```

#### 4.2 API Endpoints

- [ ] **Authentication API**
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`

- [ ] **Feed API**
  - `GET /api/posts?page=1&limit=10`
  - `POST /api/posts` (Create post)
  - `POST /api/posts/:id/like`
  - `POST /api/posts/:id/comment`
  - `GET /api/posts/:id/comments`

- [ ] **Discovery API**
  - `GET /api/dishes/trending`
  - `GET /api/dishes/search?q=pho`
  - `GET /api/dishes?category=vietnamese&sort=popular`
  - `GET /api/dishes/:id`

- [ ] **Restaurant API**
  - `GET /api/restaurants?lat=16.047&lng=108.206&radius=5`
  - `GET /api/restaurants/:id`
  - `GET /api/restaurants/:id/menu`

- [ ] **Order API**
  - `POST /api/orders` (Create order)
  - `GET /api/orders` (User's orders)
  - `GET /api/orders/:id`
  - `GET /api/orders/:id/track`
  - `PUT /api/orders/:id/cancel`

- [ ] **Favorites API**
  - `GET /api/favorites`
  - `POST /api/favorites/:dishId`
  - `DELETE /api/favorites/:dishId`

- [ ] **AI Chat API**
  - `POST /api/chat` (Send message, get AI response)
  - `POST /api/analyze-meal` (Upload image)
  - `GET /api/nutrition/daily-stats`

#### 4.3 Real-time Features

- [ ] **WebSocket for Order Tracking**
  - Real-time order status updates
  - Delivery driver location tracking
  
- [ ] **Push Notifications**
  - Order status changes
  - New messages from AI nutritionist
  - Friend activity

#### 4.4 AI Integration

- [ ] **OpenAI GPT API for Chat**
  - Configure AI nutritionist personality
  - Implement context memory
  - Add safety filters
  
- [ ] **Image Recognition**
  - Food identification from photos
  - Calorie estimation
  - Ingredient detection

---

### Phase 5: Production Deployment (Month 5) 🚀

#### 5.1 Build & Optimization

- [ ] **Setup Build Tool**
  - **Recommended:** Vite (fast, modern)
  - Alternative: Webpack, Parcel
  
- [ ] **Code Optimization**
  - Minify JavaScript
  - Minify CSS (combine to single file)
  - Remove unused CSS (PurgeCSS)
  - Tree-shake JavaScript
  
- [ ] **Image Optimization Pipeline**
  - Convert all images to WebP
  - Generate responsive image sizes
  - Implement automatic optimization on upload

#### 5.2 Testing

- [ ] **Unit Tests**
  - Test utility functions
  - Test data transformation logic
  
- [ ] **Integration Tests**
  - Test API endpoints
  - Test database operations
  
- [ ] **E2E Tests**
  - Test user flows (Playwright/Cypress)
  - Test critical paths

#### 5.3 Deployment

- [ ] **Frontend Hosting**
  - **Recommended:** Vercel or Netlify (Free tier, automatic CI/CD)
  - Alternative: AWS S3 + CloudFront
  
- [ ] **Backend Hosting**
  - **Recommended:** Railway or Render (Easy PostgreSQL)
  - Alternative: AWS EC2 + RDS
  
- [ ] **Database**
  - Supabase (Managed PostgreSQL)
  - Or Railway PostgreSQL

#### 5.4 Monitoring & Analytics

- [ ] **Error Tracking**
  - Sentry integration
  
- [ ] **Analytics**
  - Google Analytics 4
  - Custom event tracking
  
- [ ] **Performance Monitoring**
  - Lighthouse CI
  - Web Vitals tracking

---

## 🐛 Known Issues to Fix

### Critical
- [ ] **Navigation inconsistency** - `home.html` vs `social-feed.html` conflict
- [ ] **Missing error handling** - No try/catch on fetch calls
- [ ] **No loading states** - Users see blank screens during data load
- [ ] **Accessibility violations** - Missing ARIA labels on 50+ buttons

### Important
- [ ] **No mobile navigation** - Sidebars hidden on mobile, no replacement
- [ ] **Large bundle size** - 2500+ lines of CSS loaded on every page
- [ ] **Unoptimized images** - External Unsplash URLs (slow, unreliable)
- [ ] **Duplicate code** - Navigation repeated in 7 files

### Minor
- [ ] **Unused CSS** - `new-components.css` has unclear purpose
- [ ] **Inline styles** - Mixed with CSS classes (maintainability issue)
- [ ] **No TypeScript** - No type safety
- [ ] **No linting** - Code style inconsistencies

---

## 💡 Future Feature Ideas

### Short-term
- [ ] User profile editing
- [ ] Restaurant reviews & ratings
- [ ] Dietary preference filters (vegan, gluten-free, etc.)
- [ ] Meal planning calendar
- [ ] Recipe sharing

### Long-term
- [ ] Native mobile apps (React Native/Flutter)
- [ ] Restaurant owner dashboard
- [ ] Delivery driver app
- [ ] Loyalty points program
- [ ] Social features (follow friends, share meals)
- [ ] AR menu visualization
- [ ] Voice ordering with AI assistant

---

## 📝 Development Guidelines

### Code Style
- Use Prettier for formatting
- Use ESLint for linting
- Follow BEM naming for CSS
- Use semantic HTML5 tags

### Git Workflow
- Feature branches: `feature/add-shopping-cart`
- Bug fixes: `fix/navigation-links`
- Commit messages: Conventional Commits format

### Performance Budgets
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total Bundle Size: < 200KB (gzipped)
- Images: < 100KB per image

---

## 📚 Resources & Documentation

### Current Documentation
- `README.md` - Project overview
- `SETUP.md` - Development setup
- `STRUCTURE.md` - File structure

### External Resources
- [Leaflet.js Documentation](https://leafletjs.com/reference.html)
- [Material Symbols Guide](https://fonts.google.com/icons)
- [Web.dev Performance Guide](https://web.dev/learn-web-vitals/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Note:** This is a living document. Update priorities and add new items as the project evolves.