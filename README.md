# Helpora (CivicTrust Verified Network)

> **"Find help. Learn. Connect."**

A modern civic technology network designed to connect citizens with verified local trades, essential healthcare facilities, emergency hotlines, and an AI-powered study companion.

---

## 🌟 Core Features

### 1. 🛠️ Local Services & Verified Trades
- Discover certified solar & inverter electricians, plumbers, auto mechanics, phone & laptop technicians, cleaners, and academic tutors.
- Filter by trade category, verified CAC badges, rating, and district.
- Interactive OpenStreetMap/Leaflet integration for spatial proximity.
- Direct phone call, WhatsApp messaging, and verified customer reviews.

### 2. 📚 AI Study & Revision Hub
- **AI Study Tutor**: Socratic guidance for Nigerian secondary school students (WAEC, JAMB UTME, and NECO) powered by Gemini with pedagogical fallback.
- **Timed Practice Quizzes**: Multiple-choice exams with question navigation, score analysis, and curriculum explanations.
- **Revision Sheets**: Searchable formula cheat-sheets with interactive reader modal.
- **Revision Tracker**: Personal dashboard tracking quiz attempts and score progression.

### 3. 🏥 Healthcare & Help Directory
- Directory of verified federal medical centers, district general hospitals, 24/7 trauma emergency care centers, and licensed pharmacies.
- Filter by healthcare category and 24-hour service status.
- Direct desk dialing and navigation directions.

### 4. 📢 Community Action & Reporting
- **Citizen Report Portal**: Report neighborhood infrastructure hazards (roads, drainage, broken streetlights, water leakages, waste sanitation).
- **Volunteer Network**: Apply to participate in vetted community literacy outreaches, medical drives, and youth mentorship.

### 5. 🛡️ Civic Admin & Business Management
- **Unified Admin Center**: Super-admin portal to audit provider licenses, grant verified badges, review citizen reports, and manage emergency contacts.
- **Business Dashboard**: Provider portal for trade professionals to manage listings and track customer engagement.

---

## 🚀 Quick Start

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `yarn`

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your environment variables in `.env.local`:
```env
# Optional: Google Gemini API Key for live AI Study Tutor
GEMINI_API_KEY=your_gemini_api_key_here

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
PORT=3000
```

### 4. Run Locally
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔒 Security & Standards
- All secrets and API keys are strictly retained server-side.
- Zero fake analytics, fabricated reviews, or unverified endorsements.
- Demo provider listings are explicitly labeled with `is_demo: true`.

---

## 📄 License
This project is proprietary and confidential.
