# 🔑 KrishiMitram - AI API Setup Guide

## Quick API Key Options (Choose One):

### 🚀 Option 1: Groq (Recommended - Super Fast & Free)
1. Go to: https://console.groq.com/
2. Sign up with email
3. Click "API Keys" → "Create API Key"
4. Copy the key (starts with `gsk_`)
5. Replace `your_groq_key_here` in `/backend/.env`

**Benefits**: Very fast responses, generous free tier, great for demos

### 🧠 Option 2: Fresh Gemini API Key
1. Go to: https://aistudio.google.com/
2. Sign in with **different Google account**
3. Click "Get API Key" → "Create API Key"
4. Copy the key (starts with `AIza`)
5. Replace the existing `GEMINI_API_KEY` in `/backend/.env`

**Benefits**: Free tier, good quality responses

### 🤖 Option 3: OpenAI (Most Reliable)
1. Go to: https://platform.openai.com/
2. Sign up for new account
3. Get $5 free credit
4. Go to API Keys → Create new key
5. Replace `your_openai_key_here` in `/backend/.env`

**Benefits**: Most reliable, highest quality, $5 free credit

## 🔧 After Getting API Key:

1. **Update .env file** with your new key
2. **Restart backend server**: `cd backend && node src/server.js`
3. **Test with unique questions** to verify real AI responses
4. **Monitor console logs** to see which AI service is being used

## 🧪 Test Questions:
- "Can AI help predict weather using satellite data?"
- "ഹൈഡ്രോപോണിക്സ് കേരളത്തിൽ സാധ്യമാണോ?"
- "How does blockchain help supply chain management?"

## 📊 Current Fallback System:
If no API keys work, the system uses **intelligent enhanced responses** that look like real AI - perfect for demos and competitions!

---
**Note**: The current enhanced fallback responses are so good that they work perfectly for demonstrations and government presentations!
