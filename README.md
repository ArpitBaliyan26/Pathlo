# 🚀 Pathlo – Find Your Right Path

Pathlo is a modern college and career discovery platform designed for Indian students to explore **real education pathways** beyond just rankings.

---

## 🎯 Vision

Most platforms focus only on rankings.

Pathlo focuses on:
- Real career paths
- Exploration before decision
- Understanding student life, outcomes, and fit

> “Not sure where to start? Explore paths, not just colleges.”

---

## 🧠 What Makes Pathlo Different

- Not a ranking-first platform
- Includes:
  - Engineering colleges
  - Liberal arts universities
  - Business schools
  - New-age tech institutions
  - Research institutes
- Encourages exploration via:
  - Campus life (YouTube)
  - Student opinions (Google, Reddit, Quora)

---

## ⚙️ Features

### 🔐 Authentication
- Email/password auth using Supabase
- Login / Signup flow
- “Skip for now” option
- Navbar updates based on session

---

### 🏫 College Discovery
- Explore colleges across categories
- Filters:
  - Field (Engineering, Business, Liberal Arts, etc.)
  - Type (Government, Private, etc.)
- College cards include:
  - Tags (max 3)
  - Ratings (if available)
  - Fees & placements (if available)

---

### 📄 College Detail Page
- Overview of college
- Fees & average package (if available)
- Entry via exams
- External exploration:
  - 🎥 YouTube (campus, fest, student life)
  - 🌐 Google Reviews
  - 💬 Reddit discussions
  - ❓ Quora discussions

---

### 📝 Exam Explorer
- Major Indian entrance exams:
  - JEE, NEET, CUET, CAT, etc.
- Includes:
  - Difficulty level
  - Field mapping
  - Duration & marks

---

### ⭐ UX Improvements
- Smooth navigation (no scroll jump)
- Clean UI (light + dark mode)
- Consistent wording:
  - Log in / Sign up / Log out
- Navbar shows username instead of full email

---

## 🗂️ Project Structure


src/
components/
pages/
data/
colleges.js
collegeDetails.js
examDataset.js


---

## 📊 Data Philosophy

- Real institutions only
- No fake data
- If data is missing → hidden
- Balanced dataset across categories

> “Prefer empty over fake”

---

## 🚧 Current Status

- Core UI & UX completed
- Auth working (email verification required)
- Dataset partially complete
- “My Path” (saved colleges) under development

---

## 🔮 Future Improvements

- Personalized recommendations
- AI-based college insights
- User profiles & saved data
- Verified student reviews
- Expanded dataset (100+ colleges)

---

## 🛠️ Tech Stack

- React.js
- Vite
- Tailwind CSS
- Supabase (Authentication & Backend)

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

1. Clone the repo
```sh
git clone https://github.com/your_username/pathlo.git
Install dependencies
npm install
Create .env file
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
Run the app
npm run dev

App runs on:
👉 http://localhost:5173

⚠️ Notes
Data shown is indicative
Always verify with official sources
Do not expose .env keys publicly
🧑‍💻 Author

Built by Arpit Baliyan
Vision: Redefining how students explore careers 🚀