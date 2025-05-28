# 🏡 Real Estate Application

![React Native](https://img.shields.io/badge/React_Native-0.72-blue?logo=react)
![Expo](https://img.shields.io/badge/Expo-48-000020?logo=expo)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=nodedotjs)
![Mongoose](https://img.shields.io/badge/Mongoose-7.0-880000?logo=mongodb)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A cross-platform real estate application with React Native (Expo) frontend and Node.js backend with MongoDB.

![Real Estate App Preview](https://via.placeholder.com/800x400/2D3748/FFFFFF?text=Real+Estate+App+Preview)  
*(Replace with actual screenshot)*

## ✨ Features

### 🏠 Property Management
- Property listings with filters (price, location, type)
- High-quality image galleries
- Virtual tours integration
- Favorite/save properties

### 👤 User System
- Secure authentication (JWT)
- User profiles with preferences
- Role-based access (Buyers, Agents, Admins)
- Notification system

### 🔍 Search & Discovery
- Advanced search with maps integration
- AI-powered recommendations
- Neighborhood insights
- Price history tracking

### 💬 Communication
- In-app messaging
- Appointment scheduling
- Agent contact system
- Document sharing

### ⚡ Tech Stack
- **Frontend**: React Native with Expo + Native Paper UI
- **Backend**: Node.js + Express + Mongoose (MongoDB)
- **Real-time**: Socket.io for instant updates
- **Type-safe**: TypeScript on both frontend and backend

## 🛠️ Setup

### Prerequisites
- Node.js `v18+`
- npm `v9+`
- Expo CLI (`npm install -g expo-cli`)
- MongoDB Atlas account or local MongoDB
- Git

### Frontend Installation
```bash
# Clone repository
git clone https://github.com/dansan-dsn/real-estate-app.git
cd real-estate-app/client

# Install dependencies
npm install

# Start Expo development server
npx expo start
```

### Frontend Installation
```bash
cd ../server

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Start development server
npm run dev
