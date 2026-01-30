# Git Setup and Push Instructions

## ⚠️ Git Not Installed

Git is not currently installed on your system. You have two options:

---

## Option 1: Install Git (Recommended)

### Download & Install:
1. Download Git from: https://git-scm.com/download/win
2. Run the installer with default settings
3. Restart your terminal/PowerShell
4. Verify installation: `git --version`

### After Installing Git, Run These Commands:

```bash
# Navigate to project directory
cd c:\Users\ttung05\Desktop\WEB_DESIGN\foodai-prototype

# Initialize git repository
git init

# Add remote repository
git remote add origin https://github.com/quangnhat1504/WEB_DESIGN2026.git

# Create and switch to new branch
git checkout -b ttung05

# Add all files
git add .

# Commit with message
git commit -m "Add FoodAI prototype - 8 pages with interactive features"

# Push to GitHub
git push -u origin ttung05
```

---

## Option 2: Use GitHub Desktop (GUI)

### Download & Install:
1. Download from: https://desktop.github.com/
2. Install and sign in with your GitHub account
3. Click "Add" → "Add Existing Repository"
4. Browse to: `c:\Users\ttung05\Desktop\WEB_DESIGN\foodai-prototype`
5. Create new branch "ttung05" from the branch dropdown
6. Commit all changes with message
7. Click "Push origin"

---

## Option 3: Manual Upload via GitHub Web

1. Go to: https://github.com/quangnhat1504/WEB_DESIGN2026
2. Click "Add file" → "Upload files"
3. Select branch "ttung05" (create if needed)
4. Drag all files from `foodai-prototype` folder
5. Add commit message: "Add FoodAI prototype"
6. Click "Commit changes"

---

## Automated Script (After Git is Installed)

Once Git is installed, you can use this automated script:

**File:** `push-to-github.bat`

```batch
@echo off
echo ========================================
echo FoodAI - Push to GitHub
echo ========================================
echo.

REM Initialize git if not already done
if not exist .git (
    echo Initializing Git repository...
    git init
    git remote add origin https://github.com/quangnhat1504/WEB_DESIGN2026.git
)

REM Create and switch to ttung05 branch
echo Creating branch ttung05...
git checkout -b ttung05

REM Add all files
echo Adding all files...
git add .

REM Commit
echo Committing changes...
git commit -m "Add FoodAI prototype - Complete web application with 8 pages"

REM Push to remote
echo Pushing to GitHub...
git push -u origin ttung05

echo.
echo ========================================
echo Successfully pushed to GitHub!
echo Branch: ttung05
echo ========================================
pause
```

---

## Files to be Pushed

The following will be uploaded:

### HTML Pages (8 files)
- ✅ `index.html` - Landing page
- ✅ `home.html` - Personal feed (8 posts)
- ✅ `discovery.html` - Pinterest-style discovery
- ✅ `discovery-new.html` - New discovery layout
- ✅ `social-feed.html` - Instagram-style feed
- ✅ `map.html` - Interactive map
- ✅ `ai-nutritionist.html` - AI chat
- ✅ `orders.html` - Order management
- ✅ `saved.html` - Saved items

### Assets
- ✅ `assets/css/` - All CSS files (6 files)
- ✅ `assets/images/` - Image folder

### Configuration
- ✅ `package.json` - NPM config
- ✅ `start-server.bat` - Server script
- ✅ `.gitignore` - Git ignore rules
- ✅ `README.md` - Documentation (in docs/)
- ✅ `STRUCTURE.md` - Project structure

### Old Files (Will be ignored by .gitignore)
- ❌ `image/*.zip` - Zip files (ignored)
- ❌ `image/extracted*/` - Temp folders (ignored)

---

## Troubleshooting

### Authentication Error
If you get authentication errors:
```bash
# Use personal access token instead of password
# Generate token at: https://github.com/settings/tokens
```

### Branch Already Exists
If branch ttung05 already exists:
```bash
# Switch to existing branch
git checkout ttung05

# Pull latest changes
git pull origin ttung05

# Then add, commit, and push
git add .
git commit -m "Update FoodAI prototype"
git push origin ttung05
```

### Permission Denied
Make sure you have write access to the repository:
- Ask repo owner to add you as collaborator
- Or fork the repository first

---

## Next Steps After Pushing

1. ✅ Verify files on GitHub: https://github.com/quangnhat1504/WEB_DESIGN2026/tree/ttung05
2. ✅ Create Pull Request to merge into main branch (if needed)
3. ✅ Share the branch with your team
4. ✅ Deploy to hosting (Netlify, Vercel, GitHub Pages)

---

**Need Help?** Contact your team lead or check Git documentation: https://git-scm.com/doc
