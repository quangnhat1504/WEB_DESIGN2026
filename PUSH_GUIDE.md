# Quick Start Guide - Push to GitHub

## 🚀 Fastest Way (All-in-One)

**Double-click:** `setup-and-push.bat`

This script will:
1. ✅ Check if Git is installed
2. ✅ Install Git if needed
3. ✅ Configure Git (ask for name & email)
4. ✅ Create branch `ttung05`
5. ✅ Push all code to GitHub

---

## 📝 What Will Be Pushed

- **8 HTML pages** (index, home, discovery, map, ai-nutritionist, orders, saved, social-feed)
- **CSS files** (design-system, components, new-components)
- **Config files** (package.json, .gitignore, README, etc.)
- **Documentation** (GIT_SETUP.md, STRUCTURE.md)

**Total:** ~17 files + assets folder

---

## ⚙️ Manual Commands (If You Prefer)

```bash
# 1. Install Git first (if not installed)
# Download from: https://git-scm.com/download/win

# 2. Open new terminal and run:
cd c:\Users\ttung05\Desktop\WEB_DESIGN\foodai-prototype

git init
git remote add origin https://github.com/quangnhat1504/WEB_DESIGN2026.git
git checkout -b ttung05
git add .
git commit -m "Add FoodAI prototype"
git push -u origin ttung05
```

---

## 🔐 GitHub Authentication

When pushing, you'll be asked for credentials:

**Username:** Your GitHub username  
**Password:** Use **Personal Access Token** (NOT your password)

### Generate Token:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Select scopes: `repo` (full control)
4. Click "Generate token"
5. **Copy the token** and use it as password

---

## ✅ After Successful Push

View your code at:
```
https://github.com/quangnhat1504/WEB_DESIGN2026/tree/ttung05
```

**Next Steps:**
1. Verify all files are uploaded
2. Create Pull Request (if merging to main)
3. Share branch link with team
4. Deploy to hosting (optional)

---

## ❌ Troubleshooting

**"Git not recognized"**
→ Install Git using `install-git.bat`

**"Authentication failed"**
→ Use Personal Access Token instead of password

**"Branch already exists"**
→ Run: `git pull origin ttung05` first

**"Permission denied"**
→ Ask repo owner to add you as collaborator

---

**Need help?** Check `GIT_SETUP.md` for detailed guide
