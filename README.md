# James Ensley's Portfolio

A modern, interactive portfolio website showcasing mechanical engineering projects, professional experience, and technical expertise.

## 🚀 Features

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Projects**: Detailed project pages with image galleries and 3D CAD viewer
- **Smooth Animations**: Fade-in effects and wave animations
- **Professional Experience Timeline**: Showcasing work at Tesla, Christie Digital, and Enedym
- **Extracurricular Activities**: MAC Formula Electric and McMaster Rocketry Team involvement

## 🛠️ Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Three.js** - 3D CAD model rendering
- **Lucide React** - Icon library

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR-USERNAME/portfolio.git
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 🏗️ Build for Production

```bash
npm run build
```

The built files will be in the `dist` folder, ready for deployment.

## 📸 Adding Your Images

Place all your project images in the `public` folder:

### Required Images:
- `MACFE - Official Logo.png`
- `rocketry logo.png`
- `enedym-logo.png`
- `tesla-logo.png`
- `christie-logo.png`
- `battery pack render.png`
- `all harnesses.jpg`
- `coldplate render.png`
- `motor efficiency map.png`
- `robot render.png`
- Project images: `pic 1.jpg` through `pic 16.jpg`
- Harness images: `harness X.png`, `harness Z.png`
- Inverter images: `ansys sim.png`, `packaging.png`, `o-ring groove prototypes.png`, `TPI index.png`, `test setup.png`
- Powertrain images: `motor speed curve.png`, `braking FBD.png`, `dyno.jpg`
- About Me images: `pic 1.jpg` through `pic 8.jpg`

## 🌐 Deployment to GitHub Pages

1. Update `vite.config.js` with your repository name:
```javascript
base: '/YOUR-REPO-NAME/',
```

2. Install `gh-pages`:
```bash
npm install --save-dev gh-pages
```

3. Add deployment scripts to `package.json`:
```json
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages in repository settings:
   - Go to Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` → `/ (root)`
   - Save

Your site will be live at: `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

## 📝 License

© 2025 James Ensley. All rights reserved.
