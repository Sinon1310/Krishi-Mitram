# 🌾 KrishiMitram - AI-Based Farmer Query Support and Advisory System

[![Government of Kerala](https://img.shields.io/badge/Government-Kerala-green)](https://kerala.gov.in)
[![Department](https://img.shields.io/badge/Department-Agriculture-brightgreen)](https://kerala.gov.in/agriculture)
[![Theme](https://img.shields.io/badge/Theme-Agriculture%20%26%20FoodTech-orange)](https://github.com)
[![Category](https://img.shields.io/badge/Category-Software-blue)](https://github.com)

> **Digital Krishi Officer** - Always available, always learning, and always farmer-first

## 🏛️ Project Overview

**KrishiMitram** is an AI-powered multilingual advisory platform developed for the **Government of Kerala's Department of Agriculture**. The system enables farmers to ask agriculture-related questions in their native language (preferably Malayalam) and receive instant, accurate, and context-aware answers.

### 🔍 Problem Statement

Farmers often face critical questions related to pests, crop diseases, weather conditions, fertilizers, subsidies, and market trends, but timely expert advice is rarely accessible. Agricultural officers and helplines are overburdened, and current services don't scale effectively across different regions, languages, and literacy levels.

### 🎯 Objective

To develop KrishiMitram as a **Digital Krishi Officer** that:
- ✅ Provides instant agricultural advisory in Malayalam and English
- ✅ Handles voice, text, and image-based queries
- ✅ Delivers context-aware, region-specific guidance
- ✅ Scales expert knowledge to reach every farmer

## ⚙️ Core Features

### 🌿 1. Natural Language Query Handling
- Farmers can ask questions via voice or text in Malayalam or English
- Example: *"വാഴയില പുള്ളി രോഗം എന്തുകൊണ്ട് വരുന്നു?"* (Why does banana get leaf spot disease?)
- Uses NLP for intent detection and language understanding

### 📷 2. Multimodal Inputs
- Supports photo uploads (e.g., diseased crops) and voice notes
- Integrated AI Vision models identify crop diseases
- Voice input in Malayalam for better accessibility

### 🤖 3. AI-Powered Knowledge Engine
- Uses Large Language Models fine-tuned on agriculture datasets
- Draws from local crop calendars, pest advisories, weather data
- Government scheme databases integration

### 📍 4. Context-Aware Responses
- Considers location, crop type, season, and farmer history
- Personalized recommendations based on Kerala's agricultural practices

### 🧑‍💼 5. Expert Escalation System
- Complex queries forwarded to local agriculture officers
- AI-generated recommendations included for expert review

### 🔁 6. Learning & Feedback Loop
- Continuous improvement using farmer feedback
- Expert corrections for smarter, localized recommendations

## 🧠 Tech Stack

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Frontend** | React.js + Vite + TailwindCSS | Farmer-friendly multilingual interface |
| **Backend** | Node.js + Express.js | API and system logic |
| **Database** | JSON File Storage (MongoDB ready) | Store queries and responses |
| **AI/NLP** | OpenAI GPT / Custom Models | Query understanding and answer generation |
| **Image Processing** | TensorFlow / PyTorch | Crop disease recognition |
| **Speech Processing** | Whisper / Web Speech API | Malayalam voice input |
| **Translation** | IndicTrans / Google Translate | Multilingual support |
| **Hosting** | AWS / GCP | Cloud deployment |

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/krishimitram.git
   cd krishimitram
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Setup Frontend** (in new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Access the application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Environment Variables

Create `.env` files in both backend and frontend directories:

**Backend (.env):**
```env
PORT=3000
NODE_ENV=development
OPENAI_API_KEY=your_openai_key_here
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:3000
```

## 📱 Usage Examples

### Text Query (Malayalam)
```
Farmer: "വാഴയില പുള്ളি രോഗം എന്താണ് ചികിത്സ?"
KrishiMitram: "വാഴയിലെ പുള്ളി രോഗത്തിന് മാൻകോസെബ് 2 ഗ്രാം ഒരു ലിറ്റർ വെള്ളത്തിൽ കലർത്തി സ്പ്രേ ചെയ്യുക..."
```

### Text Query (English)
```
Farmer: "Best fertilizer for rice in monsoon season"
KrishiMitram: "For rice cultivation during Kerala monsoon: Use organic compost 2 tons/acre + NPK 20:10:10..."
```

### Quick Action Buttons
- വാഴയില പുള്ളി രോഗം (Banana leaf spot)
- Rice planting season
- Weather forecast
- Subsidy schemes
- Banana fertilizer

## 🛠️ Development

### Project Structure
```
krishimitram/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── routes/
│   │   │   └── aiRoutes.js
│   │   ├── utils/
│   │   │   └── storage.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── ChatInterface.jsx
│   │   ├── services/
│   │   │   └── aiService.js
│   │   └── App.jsx
│   └── package.json
└── README.md
```

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/ai/chat` | Send farmer query and get AI response |
| GET | `/api/ai/history` | Get query history for analytics |

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🌱 Expected Impact

- ✅ Makes expert farming advice instantly accessible to all farmers
- ✅ Reduces workload on Krishibhavans and Agriculture Officers
- ✅ Bridges communication gap between farmers and experts
- ✅ Enables data-driven, informed farming decisions
- ✅ Promotes digital inclusion and rural innovation

## 🧭 Vision

To build a **Digital Krishi Officer** that is:
- 🕐 **Always available** to guide farmers
- 📚 **Always learning** from feedback
- 👨‍🌾 **Always farmer-first** in every response

KrishiMitram aims to empower every farmer with AI-driven, region-specific, and timely agricultural support, ensuring that no farmer is left without guidance.

## 📄 License

This project is developed for the Government of Kerala, Department of Agriculture.

## 🤝 Support

For support and queries:
- 📧 Email: support@krishimitram.kerala.gov.in
- 🏛️ Department of Agriculture, Government of Kerala
- 📱 Krishi Bhavan Helpline: 1800-xxx-xxxx

---

**Made with ❤️ for Kerala's Farmers**

> "Krishi Neethikenda Nellukalkku, Technology Thanna Sahayam" 
> *"Technology's help for the paddy fields that need farming"*
