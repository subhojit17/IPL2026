# 🏏 IPL 2026 Schedule App

Full IPL 2026 match schedule with one-tap "Add to Calendar" for every match.
Works as a Progressive Web App (PWA) — users can install it from their browser.

## Features
- All 74 IPL 2026 matches (70 league + 4 playoffs)
- Filter by team, search by venue
- Add individual match OR all matches to phone calendar (.ics)
- Installable as a PWA on iOS & Android
- Fully responsive, mobile-first design

---

## 🚀 Deploy to Vercel (Recommended — Free, 3 steps)

### Option A — Deploy via Vercel website (No coding)
1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click **"Add New Project"**
3. Click **"Upload"** and drag the entire `ipl2026` folder
4. Click **Deploy** — you'll get a live URL in ~60 seconds ✅

### Option B — Deploy via GitHub (Best for updates)
1. Push this folder to a GitHub repo
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → Import from GitHub
3. Vercel auto-detects Vite. Click **Deploy** ✅

### Option C — Deploy to Netlify
1. Go to [netlify.com](https://netlify.com) → **Add new site** → **Deploy manually**
2. Drag the `ipl2026` folder into the drop zone ✅

---

## 🛠 Run Locally (Optional)

Requires Node.js 18+

```bash
npm install
npm run dev
```

Then open http://localhost:5173

To build for production:
```bash
npm run build
```
Output goes to the `dist/` folder.

---

## 📱 How Calendar Adding Works
Clicking "Add to Calendar" downloads a `.ics` file.
- **iOS**: Opens in Apple Calendar — tap "Add All" or individual events
- **Android**: Opens in Google Calendar or your default calendar app
- **Desktop**: Opens in Outlook, Apple Calendar, or Google Calendar

---

## Schedule Source
Official BCCI / IPLT20.com schedule for TATA IPL 2026 (Season 19)
All times in IST. Schedule subject to change per BCCI.
