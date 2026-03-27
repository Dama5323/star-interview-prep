# 🎯 Star Interview Prep

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

An AI-powered interview preparation tool that analyzes your resume against job descriptions to generate personalized interview questions with STAR-method answers and real-time coaching feedback.

## ✨ Features

- 📄 **Resume Analysis** - Paste text or upload PDF/DOCX files
- 🎯 **Job Description Matching** - Get personalized questions based on the role
- 💡 **STAR Method Answers** - Crafted from YOUR actual experience
- 🎙️ **Practice Mode** - Type or record your answers with voice recognition
- 🤖 **AI Coaching** - Get warm, personalized feedback to improve
- 💾 **Auto-Save** - Your analysis persists even after page refresh
- 🎨 **Beautiful Design** - Modern, responsive UI with smooth animations

## 🚀 Live Demo

Coming soon...

## 🛠️ Tech Stack

- **Frontend:** React 18, TailwindCSS, Vite
- **AI:** DeepSeek API
- **Icons:** Lucide React
- **File Parsing:** pdf-parse, mammoth
- **Voice Recognition:** Web Speech API

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Dama5323/star-interview-prep.git

# Navigate to project
cd star-interview-prep

# Install dependencies
npm install

# Create .env file
echo "VITE_AI_API_KEY=your_api_key_here" > .env

# Start development server
npm run dev
```

## Environment Variables
VITE_AI_API_KEY - Your DeepSeek API key (get at platform.deepseek.com)

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── InputPanel.jsx   # Resume + JD input with file upload
│   ├── QuestionCard.jsx # Expandable question card
│   ├── QuestionList.jsx # List of generated questions
│   ├── PracticeMode.jsx # Practice with voice recording
│   ├── ScoreBadge.jsx   # Match score and keywords
│   ├── LoadingDots.jsx  # Animated loading state
│   └── EmptyState.jsx   # Empty state illustration
├── services/
│   └── aiService.js     # AI API integration
├── hooks/
│   └── useLocalStorage.js # Persistent storage
├── utils/
│   └── fileParser.js    # PDF/DOCX parsing
└── App.jsx              # Main application
```


