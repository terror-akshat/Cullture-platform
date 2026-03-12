# 📋 Quick Command Reference

## 🚀 Starting the Project

### Terminal 1: Start MongoDB
```bash
mongod
```
Expected: `waiting for connections on port 27017`

### Terminal 2: Start Backend
```bash
cd backend
npm install          # Only first time
npm run dev
```
Expected: `Server running on port 5000` & `MongoDB Connected`

### Terminal 3: Start Frontend
```bash
cd frontend
npm install          # Only first time
npm run dev
```
Expected: `Local: http://localhost:3000/`

---

## 📦 Installation Commands

### Install All Dependencies
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### Install Specific Package
```bash
# Backend
cd backend && npm install <package-name>

# Frontend
cd frontend && npm install <package-name>
```

---

## 🗄️ Database Commands

### Load Sample Quiz Data
```bash
cd backend
node loadData.js
```

### Clear Quiz Data
```bash
# Open MongoDB shell
mongosh

# In MongoDB
use cultural-platform
db.quizzes.deleteMany({})
```

---

## 🏗️ Build Commands

### Frontend Production Build
```bash
cd frontend
npm run build
```

### Preview Production Frontend
```bash
cd frontend
npm run preview
```

---

## 🧪 Testing APIs

### Using curl (from terminal)
```bash
# Get all cultures
curl http://localhost:5000/api/cultures

# Get random quiz (5 questions)
curl http://localhost:5000/api/quiz/random/5

# Get leaderboard
curl http://localhost:5000/api/quiz/leaderboard/10
```

### Using Postman
1. Open Postman
2. Create new request
3. URL: http://localhost:5000/api/cultures (or other endpoint)
4. Set method to GET/POST/PUT/DELETE
5. For POST/PUT, add body in JSON format

---

## 🔍 Debugging Commands

### Check if Port is Used
```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000
```

### Kill Process on Port
```bash
# Windows
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

### Check Node Version
```bash
node --version
```

### Check npm Version
```bash
npm --version
```

### Check MongoDB Status
```bash
# Mac/Linux
brew services list | grep mongodb

# Windows - In MongoDB installation folder
mongod --version
```

---

## 📁 Navigation Commands

### Windows
```bash
# Navigate to project
cd "path/to/Cultural"

# List files
dir

# Go back
cd ..

# Create folder
mkdir foldername

# Remove folder
rmdir /s foldername
```

### Mac/Linux
```bash
# Navigate to project
cd path/to/Cultural

# List files
ls -la

# Go back
cd ..

# Create folder
mkdir foldername

# Remove folder
rm -rf foldername
```

---

## 🛠️ Development Commands

### Restart Backend Server
- Stop: Press Ctrl+C in backend terminal
- Start: Run `npm run dev`

### Restart Frontend
- Stop: Press Ctrl+C in frontend terminal  
- Start: Run `npm run dev`

### Clear npm Cache
```bash
npm cache clean --force
```

### Update npm Packages
```bash
npm update
```

### Check Outdated Packages
```bash
npm outdated
```

---

## 🚨 Common Error Fixes

### Clear node_modules and reinstall
```bash
rm -rf node_modules package-lock.json  # Mac/Linux
rmdir /s node_modules                   # Windows
npm install
```

### Reset frontend build
```bash
cd frontend
rm -rf dist                # Mac/Linux
rmdir /s dist             # Windows
npm run build
```

### Reset MongoDB data
```bash
# Delete database
mongosh
use cultural-platform
db.dropDatabase()
exit
```

---

## 📊 Useful MongoDB Commands

### Open MongoDB Shell
```bash
mongosh
```

### Check Databases
```bash
show dbs
```

### Select Database
```bash
use cultural-platform
```

### Check Collections
```bash
show collections
```

### View All Documents
```bash
db.cultures.find()
db.quizzes.find()
db.quizscores.find()
```

### View Pretty Formatted
```bash
db.cultures.find().pretty()
```

### Count Documents
```bash
db.cultures.countDocuments()
```

### Delete All of Collection
```bash
db.cultures.deleteMany({})
```

---

## 📝 Environment Variables

### Backend .env file location
```
backend/.env
```

### Default values
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cultural-platform
NODE_ENV=development
```

### To change MongoDB connection
Edit `MONGODB_URI` in `.env` file

---

## 🎯 Quick Tests

### Test Home Page
```
http://localhost:3000/
Should show features and featured cultures
```

### Test Explore Page
```
http://localhost:3000/explore
Should show all cultures with filters
```

### Test Add Culture
```
http://localhost:3000/add-culture
Should show form to add new culture
```

### Test Quiz Page
```
http://localhost:3000/quiz
Should show 10 random quiz questions
```

### Test Backend API
```bash
curl http://localhost:5000/api/cultures
Should return JSON array of cultures
```

---

## 📞 Quick Help

**Something not working?**
1. Check all 3 services are running (mongod, backend, frontend)
2. Check ports: MongoDB (27017), Backend (5000), Frontend (3000)
3. Check browser console for errors (F12)
4. Check terminal for error messages
5. See SETUP_GUIDE.md for detailed troubleshooting

---

**Keep this handy while developing! 📌**
