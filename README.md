# Sarim Usmani — Full-Stack Developer Portfolio

A modern, high-performance developer portfolio application for **Sarim Usmani**, Final-Year Computer Science undergraduate student at Lords Universal College, Mumbai (2022–2026).

Built with **React 19**, **TypeScript**, **Tailwind CSS**, **Express**, and integrated with **Google Gemini 3.6 Flash AI**.

---

## 🌟 Highlights & Features

- 🚀 **Interactive Flagship Capstone Sandbox**: Live embedded interactive demonstration of **EcoTrack India** (Sustainability & Carbon Footprint Calculator).
- 🤖 **AI Assistant Chatbot**: Context-aware AI portfolio assistant powered by Google Gemini API to answer recruiter and visitor queries in real time.
- 💼 **Interactive Resume & Spec Modal**: Rich downloadable CV summary, technical breakdown, and AI recruiter query interface.
- 📅 **Meeting Scheduler & Direct Contact**: Interactive interview/call scheduler and direct email contact form with instant AI acknowledgements.
- 🎓 **Education & Skill Matrices**: Comprehensive breakdown of academic background, core programming languages, frontend/backend stack, and soft skills.
- 🎨 **Modern Dark Aesthetics**: Premium UI built with Tailwind CSS, custom glassmorphism, responsive grid layouts, and Lucide React iconography.

---

## 🛠️ Tech Stack

### **Frontend**
- **Framework**: React 19 / Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons & Effects**: Lucide React, Canvas Confetti

### **Backend & AI**
- **Server**: Node.js & Express
- **AI Engine**: `@google/genai` (Google Gemini 3.6 Flash)
- **API Architecture**: Express proxy endpoints for AI chat (`/api/ai/chat`) and contact handling (`/api/contact`)

---

## 📁 Directory Structure

```text
├── server.ts              # Express backend server & Gemini AI API routes
├── index.html             # HTML entry point with metadata & web fonts
├── src/
│   ├── main.tsx           # React mounting entry point
│   ├── App.tsx            # Root application layout
│   ├── index.css          # Tailwind CSS global styles & scrollbar setup
│   ├── types.ts           # TypeScript interfaces & types
│   ├── data/
│   │   └── portfolioData.ts # Portfolio bio, skills, education, and projects data
│   └── components/
│       ├── Header.tsx     # Navigation bar & status indicator
│       ├── Hero.tsx       # Hero section with CTA buttons
│       ├── About.tsx      # Biography & stats
│       ├── Skills.tsx     # Tech stack grid
│       ├── Projects.tsx   # Project cards & EcoTrack sandbox
│       ├── EcoTrackDemo.tsx # Embedded interactive capstone demo
│       ├── Education.tsx  # Academic timeline
│       ├── SoftSkills.tsx # Mindset & collaboration cards
│       ├── Contact.tsx    # Contact form & location info
│       ├── ResumeModal.tsx # CV viewer & AI resume Q&A
│       ├── MeetingModal.tsx# Call scheduling modal
│       ├── AIChatBot.tsx  # Floating AI chatbot drawer
│       └── Footer.tsx     # Footer component
└── package.json           # Dependencies & build scripts
```

---

## 🚀 Getting Started Locally

### **Prerequisites**
- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

### **Installation**

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/sarim-usmani-portfolio.git
   cd sarim-usmani-portfolio
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the project root:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Start Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```

---

## 👤 Author

**Sarim Usmani**
- **Role**: Final-Year Computer Science Student & Full-Stack Web Developer
- **Institution**: Lords Universal College, Mumbai (2022–2026)
- **Location**: Mumbai, Maharashtra, India
- **Email**: sam444official@gmail.com
- **LinkedIn**: [linkedin.com/in/sarim-usmani](https://linkedin.com/in/sarim-usmani)
- **GitHub**: [github.com/sam444official](https://github.com/sam444official)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
