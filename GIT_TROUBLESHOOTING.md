# 🔧 Git Troubleshooting Guide

## Error: "src refspec main does not match any"

This means you haven't made your first commit yet!

### Fix:

Run these commands in order:

```bash
# 1. Check git status
git status

# 2. Add all files
git add .

# 3. Make your first commit
git commit -m "Initial commit: Portfolio website"

# 4. Now you can push
git push -u origin main
```

---

## Complete Fresh Start (if needed):

If you need to start over completely:

```bash
# 1. Initialize git
git init

# 2. Add all files
git add .

# 3. Check what will be committed
git status

# 4. Make first commit
git commit -m "Initial commit: Portfolio website"

# 5. Add remote (replace YOUR-USERNAME)
git remote add origin https://github.com/JamesEnsley/Portfolio-2026.git

# 6. Rename branch to main
git branch -M main

# 7. Push to GitHub
git push -u origin main
```

---

## Other Common Issues:

### "fatal: not a git repository"
```bash
git init
```

### "remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/JamesEnsley/Portfolio-2026.git
```

### "nothing to commit"
Make sure you have files in the folder! Check:
```bash
dir  # Windows
ls   # Mac/Linux
```

---

## Verify Everything is Ready:

Before committing, make sure you have:
- ✅ All source files (src/, public/, etc.)
- ✅ Configuration files (package.json, vite.config.js, etc.)
- ✅ Your images in public/ folder
- ✅ .gitignore file

---

## After Successful Push:

Once `git push -u origin main` works, you can deploy:

```bash
npm install
npm install --save-dev gh-pages
npm run deploy
```

---

## Need to Check Git Status?

```bash
git status          # See what files are tracked
git log            # See commit history
git remote -v      # See remote repository URL
```
