# 🚀 Pathlo – Find Your Right Path

Pathlo is a modern college and career discovery platform designed for Indian students to explore **real education pathways** beyond just rankings.

> **UI patch (v0.3):** Fixed empty-state visuals, improved dark mode contrast, added exam bookmarking, improved routing (no 404 on refresh), cleaned misleading data usage.

---

## 🎯 Vision

Most platforms focus only on rankings.

Pathlo focuses on:

* Real career paths
* Exploration before decision
* Understanding student life, outcomes, and fit

> “Not sure where to start? Explore paths, not just colleges.”

---

## 🧠 What Makes Pathlo Different

* Not a ranking-first platform
* Encourages **real-world exploration**:

  * 🎥 YouTube (campus life)
  * 🌐 Google Reviews
  * 💬 Reddit
  * ❓ Quora
* Covers diverse paths:

  * Engineering
  * Liberal Arts
  * Business
  * Research
  * New-age tech

---

## ⚙️ Features

### 🔐 Authentication

* Supabase email/password auth
* Session-based UI
* Optional “Skip for now”

---

### 🏫 College Discovery

* Browse colleges across categories
* Filters:

  * Field (Engineering, Business, etc.)

> ⚠️ Type filter intentionally minimized to avoid bias

* College cards:

  * Tags (max 3)
  * Fees & placements (if available)
  * Clean UI (no fake data)

---

### 📄 College Detail Page

* Overview
* Entry exams
* External exploration:

  * YouTube
  * Google
  * Reddit
  * Quora

---

### 📝 Exam Explorer

* Major exams:

  * JEE, NEET, CUET, CAT, etc.
* Includes:

  * Difficulty
  * Field mapping
  * Duration, marks
* ✅ Bookmark exams (local storage)

---

### ⭐ UX Improvements

* Smooth navigation
* No scroll jump
* No 404 on refresh (Vercel fix)
* Dark + Light mode
* Username display in navbar

---

## 🗂️ Project Structure

```
src/
  components/
    layout/
    ui/
  pages/
  data/
    colleges.js
    collegeDetails.js
    examDataset.js
  hooks/
    useSavedColleges.js
    useSavedExams.js
  services/
  App.jsx
  main.jsx
```

---

## 📊 Data Philosophy (STRICT)

* Real institutions only
* ❌ No fabricated data
* ⚠️ Some values are **indicative**, not exact
* Missing data → hidden in UI

> “Prefer empty over fake”

---

## ⚠️ DATA DISCLAIMER

* Fees & placements may be indicative ranges
* Always verify from official sources
* This is Version 1 — dataset is being improved continuously

---

## 🚧 Current Status

* Core UI & UX completed
* Auth working
* Dataset partially verified
* Bookmark system (colleges + exams) implemented
* Routing stable (no refresh errors)

---

## 🔮 Future Improvements

* AI-based recommendations
* Verified student reviews
* Expanded dataset (100+ colleges)
* Backend persistence (Supabase)

---

## 🛠️ Tech Stack

* React.js
* Vite
* Tailwind CSS
* Supabase

---

## ⚙️ Getting Started

### Prerequisites

* Node.js (v18+)
* npm

### Setup

```bash
git clone https://github.com/your_username/pathlo.git
cd pathlo
npm install
```

Create `.env`:

```
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

Run:

```bash
npm run dev
```

App:
👉 http://localhost:5173

---

## 🚫 Guardrails (IMPORTANT FOR CONTRIBUTORS & AI)

* Do NOT add fake ratings
* Do NOT fabricate fees or placement data
* Do NOT redesign UI without instruction
* Do NOT modify authentication logic
* Prefer hiding data over guessing

---

## 🧑‍💻 Author

Built by Arpit Baliyan
Vision: Redefining how students explore careers 🚀