# FoodAI Project Structure

```
foodai-prototype/
│
├── index.html                  # Landing page
├── home.html                   # Personal feed with stories
├── discovery.html              # Pinterest-style discovery
├── social-feed.html            # Instagram-style social feed
├── map.html                    # Interactive map with heatmap
├── ai-nutritionist.html        # AI nutrition consultant
├── orders.html                 # Order management
├── saved.html                  # Saved dishes collection
│
├── assets/                     # All static assets
│   ├── css/                    # Stylesheets
│   │   ├── design-system.css   # Colors, typography, variables
│   │   ├── components.css      # Reusable UI components
│   │   ├── new-components.css  # Extended components
│   │   ├── screens.css         # Screen-specific styles
│   │   ├── screens2.css        # Additional screens
│   │   └── screens3.css        # More screens
│   │
│   └── images/                 # Images (currently empty)
│
├── image/                      # Original design assets (can be archived)
│   ├── extracted1-7/           # Extracted design files
│   └── *.zip                   # Zip archives
│
├── docs/                       # Documentation
│   └── README.md               # Project documentation
│
├── .gitignore                  # Git ignore rules
├── package.json                # NPM configuration
└── start-server.bat            # Quick start script
```

## Key Features

### Clean Organization
- ✅ All HTML pages at root level (easy access)
- ✅ CSS files in `assets/css/` (organized)
- ✅ Images folder ready in `assets/images/`
- ✅ Documentation in `docs/`

### Updated Paths
All HTML files now reference:
- `assets/css/design-system.css`
- `assets/css/components.css`
- `assets/css/new-components.css`

### Development Files
- `.gitignore` - Excludes node_modules, zip files, temp folders
- `package.json` - NPM configuration
- `start-server.bat` - One-click server start

## Next Steps

1. **Clean up** `image/` folder:
   - Move useful images to `assets/images/`
   - Archive or delete zip files and extracted folders

2. **Optimize**:
   - Minify CSS files for production
   - Compress images
   - Add favicon

3. **Enhance**:
   - Add JavaScript files to `assets/js/`
   - Create `assets/fonts/` for custom fonts
   - Add more documentation in `docs/`
