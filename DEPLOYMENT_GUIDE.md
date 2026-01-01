# 🚀 GitHub Deployment Guide for James Ensley's Portfolio

## Step-by-Step Instructions

### 📋 Prerequisites
- GitHub account
- Git installed on your computer
- Node.js installed (v16 or higher)

---

## Part 1: Setting Up Your GitHub Repository

### 1. Create a New Repository on GitHub

1. Go to [GitHub](https://github.com) and log in
2. Click the **"+"** button in the top right → **"New repository"**
3. Repository settings:
   - **Repository name**: `portfolio` (or any name you prefer)
   - **Description**: "Personal mechanical engineering portfolio"
   - **Visibility**: Public
   - ✅ **DO NOT** check "Add a README file"
   - ✅ **DO NOT** add .gitignore or license (we already have them)
4. Click **"Create repository"**

---

## Part 2: Preparing Your Local Files

### 2. Organize Your Project Files

Your project structure should look like this:

```
portfolio/
├── public/
│   ├── wrench-icon.svg
│   ├── MACFE - Official Logo.png
│   ├── rocketry logo.png
│   ├── enedym-logo.png
│   ├── tesla-logo.png
│   ├── christie-logo.png
│   ├── battery pack render.png
│   ├── coldplate render.png
│   ├── all harnesses.jpg
│   ├── motor efficiency map.png
│   ├── robot render.png
│   ├── pic 1.jpg through pic 16.jpg
│   ├── harness X.png, harness Z.png
│   ├── ansys sim.png
│   ├── packaging.png
│   ├── o-ring groove prototypes.png
│   ├── TPI index.png
│   ├── test setup.png
│   ├── motor speed curve.png
│   ├── braking FBD.png
│   └── dyno.jpg
├── src/
│   ├── Portfolio.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .gitignore
└── README.md
```

**IMPORTANT**: Make sure ALL your images are in the `public/` folder!

---

## Part 3: Initializing Git and Pushing to GitHub

### 3. Open Terminal/Command Prompt

Navigate to your portfolio folder:
```bash
cd path/to/your/portfolio
```

### 4. Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: Portfolio website"
```

### 5. Connect to GitHub

Replace `YOUR-USERNAME` and `YOUR-REPO-NAME` with your actual GitHub username and repository name:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

**Example:**
```bash
git remote add origin https://github.com/jamesensley/portfolio.git
git branch -M main
git push -u origin main
```

You may be prompted to enter your GitHub credentials.

---

## Part 4: Setting Up GitHub Pages Deployment

### 6. Update vite.config.js

Open `vite.config.js` and update the `base` property:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/YOUR-REPO-NAME/',  // ← Change this to your repo name
})
```

**Example:** If your repo is named `portfolio`:
```javascript
base: '/portfolio/',
```

**Save the file.**

### 7. Install gh-pages Package

In your terminal:
```bash
npm install --save-dev gh-pages
```

### 8. Add Deployment Scripts to package.json

Open `package.json` and add these lines to the `"scripts"` section:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

**Save the file.**

### 9. Commit and Push Changes

```bash
git add .
git commit -m "Configure for GitHub Pages deployment"
git push
```

### 10. Deploy to GitHub Pages

```bash
npm run deploy
```

This command will:
1. Build your production site
2. Create a `gh-pages` branch
3. Push the built files to GitHub

---

## Part 5: Enable GitHub Pages

### 11. Configure GitHub Pages Settings

1. Go to your repository on GitHub
2. Click **"Settings"** (top menu)
3. In the left sidebar, click **"Pages"**
4. Under **"Source"**:
   - Select: **"Deploy from a branch"**
   - Branch: **`gh-pages`**
   - Folder: **`/ (root)`**
5. Click **"Save"**

### 12. Wait for Deployment

- GitHub will build and deploy your site (takes 1-2 minutes)
- Refresh the Pages settings page
- You'll see: **"Your site is live at https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/"**

---

## 🎉 Your Portfolio is Now Live!

Visit: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

**Example:** `https://jamesensley.github.io/portfolio/`

---

## 📝 Making Updates

Whenever you want to update your portfolio:

### 1. Make Your Changes
Edit files locally (Portfolio.jsx, images, etc.)

### 2. Test Locally
```bash
npm run dev
```
View at http://localhost:5173

### 3. Deploy Updates
```bash
git add .
git commit -m "Update portfolio content"
git push
npm run deploy
```

Your changes will be live in 1-2 minutes!

---

## 🛠️ Troubleshooting

### Problem: Images Not Loading
- ✅ Check that all images are in the `public/` folder
- ✅ Verify image filenames match exactly (case-sensitive!)
- ✅ Clear browser cache and refresh

### Problem: Site Shows 404 Error
- ✅ Check `vite.config.js` has correct `base: '/YOUR-REPO-NAME/'`
- ✅ Verify `gh-pages` branch exists in GitHub
- ✅ Check GitHub Pages settings are correct

### Problem: Build Fails
- ✅ Run `npm install` to ensure all dependencies are installed
- ✅ Check for errors in terminal
- ✅ Make sure Node.js version is 16 or higher: `node --version`

### Problem: "Permission denied" when pushing
- ✅ Set up GitHub authentication:
  - Use GitHub CLI: `gh auth login`
  - Or use Personal Access Token instead of password

---

## 📞 Need Help?

- Check the console for errors (F12 in browser)
- Review GitHub Actions tab for deployment logs
- Ensure all file paths are correct

---

## 🎯 Quick Reference Commands

```bash
# Local development
npm install          # Install dependencies
npm run dev          # Start dev server

# Deployment
npm run build        # Build production version
npm run deploy       # Deploy to GitHub Pages

# Git workflow
git add .            # Stage changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub
```

---

**Good luck with your portfolio! 🚀**
