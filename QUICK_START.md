# 🎯 Quick Start Guide

## ⚡ 30-Second Setup

### 1. Prerequisites
- Node.js installed
- MongoDB running (`mongod` in a terminal)

### 2. Install & Run (3 terminals)

**Terminal 1 - MongoDB:**
```bash
mongod
```

**Terminal 2 - Backend:**
```bash
cd backend
npm install
npm run dev
```

**Terminal 3 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

### 3. Open in Browser
Visit: **http://localhost:3000**

---

## 🎮 What to Do First

1. **Add a Culture** - Click "Add Culture" and submit one
2. **Explore** - Filter and browse cultures
3. **Take Quiz** - Answer 10 questions about world cultures
4. **Check Leaderboard** - Compare your score with others

---

## 📋 Project Contents

### Frontend Components
- ✅ Home Page with hero section and features
- ✅ Explore Page with advanced filtering
- ✅ Add Culture form for user submissions
- ✅ Quiz page with scoring and leaderboard
- ✅ Navigation bar and footer
- ✅ Responsive design with TailwindCSS

### Backend APIs
- ✅ Culture CRUD operations (Create, Read, Update, Delete)
- ✅ Filter cultures by country, region, category
- ✅ Quiz questions management
- ✅ Quiz score tracking and leaderboard
- ✅ Like/favorite system

### Database Models
- ✅ Culture schema with all fields
- ✅ Quiz questions schema
- ✅ Quiz scores schema

---

## 🔗 Important URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| MongoDB | localhost:27017 |

---

## 📂 File Locations

| What | Where |
|------|-------|
| Frontend Pages | `frontend/src/pages/` |
| API Config | `frontend/src/config.js` |
| Backend Server | `backend/server.js` |
| Database Models | `backend/models/` |
| API Routes | `backend/routes/` |
| Sample Data | `backend/loadData.js` |

---

## ❓ Need Help?

See **SETUP_GUIDE.md** for detailed troubleshooting and configuration options.

---

**Enjoy building! 🚀**
