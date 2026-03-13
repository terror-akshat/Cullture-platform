# 🌍 GlobalCulture Platform

A full-stack web application that allows users to explore, learn, and share world cultures, traditions, festivals, and cuisines.

## 📁 Project Structure

```
Cultural/
├── backend/
│   ├── models/              # MongoDB schemas
│   │   ├── Culture.js       # Culture schema
│   │   ├── auth.js       # auth schema
│   │   ├── Quiz.js          # Quiz questions schema
│   │   └── QuizScore.js     # Quiz scores schema
│   ├── routes/              # API routes
│   │   ├── cultures.js      # Culture CRUD endpoints
│   │   ├── auth.js          # auth endpoints
│   │   └── quiz.js          # Quiz endpoints
│   ├── package.json
│   ├── server.js            # Main server file
│   ├── .env                 # Environment variables
│   ├── sampleData.js        # Sample quiz questions
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── CultureCard.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── AddCulturePage.jsx
│   │   │   ├── ExplorePage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   └── QuizPage.jsx
│   │   ├
│   │    ── globals.css
│   │   ├── App.jsx          # Main app component
│   │   ├── main.jsx         # Entry point
│   │   ├── index.css        # Import styles
│   │   └── config.js        # API configuration
│   ├── index.html           # HTML template
│   ├── vite.config.js       # Vite configuration
│   ├── tailwind.config.js   # Tailwind CSS config
│   ├── postcss.config.js    # PostCSS config
│   ├── package.json
│   ├── .gitignore
│   └── README.md
│
└── README.md (this file)
```

## 🚀 Features

### Main Features
- **🌏 Explore Cultures** - Browse cultures from different countries and regions
- **🎉 Learn Festivals** - Discover festivals celebrated worldwide
- **🍜 Traditional Food** - Explore cuisines from every corner of the world
- **✍️ Share Stories** - Submit your own cultural experiences
- **🧠 Cultural Quiz** - Test your knowledge about world cultures
- **👥 Community** - Connect with culture enthusiasts globally

### Authentication Requirements
- **Login required** to create a culture entry.
- **Login required** to access quiz questions and submit scores.
- Culture creation supports **short video upload (max 10MB)**; videos are now stored on Cloudinary and shared in the community.
- Profile avatar uploads now also use Cloudinary; `avatarPublicId` is stored in MongoDB along with URL.

### Frontend Features
- Responsive design optimized for mobile, tablet, and desktop
- Real-time filtering by country, region, or category
- Beautiful card-based UI with hover effects
- Interactive quiz with scoring and leaderboard
- Form validation for culture submissions
- Toast notifications for user feedback

### Backend Features
- RESTful API with comprehensive CRUD operations
- MongoDB integration for persistent data storage
- CORS enabled for frontend communication
- Error handling and validation
- Quiz management with random question selection
- Like/favorite system for cultures

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next-generation build tool
- **Axios** - HTTP client

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (already provided):
```
PORT=5000
MONGODB_URI=<database url>
NODE_ENV=development
```

4. Configure Cloudinary credentials in `.env`:
```
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_API_KEY=<your-api-key>
CLOUDINARY_API_SECRET=<your-api-secret>
```

5. Start MongoDB:
```bash
mongod
```

6. (Optional) Load sample data into MongoDB using `sampleData.js`

6. Start the backend server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 🔌 API Endpoints

### Culture Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/cultures` | Get all cultures |
| GET | `/api/cultures/:id` | Get a specific culture |
| GET | `/api/cultures/country/:country` | Get cultures by country |
| GET | `/api/cultures/region/:region` | Get cultures by region |
| GET | `/api/cultures/category/:category` | Get cultures by category |
| POST | `/api/cultures` | Create a new culture |
| PUT | `/api/cultures/:id` | Update a culture |
| DELETE | `/api/cultures/:id` | Delete a culture |
| PUT | `/api/cultures/:id/like` | Like a culture |

### Quiz Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quiz/questions` | Get all quiz questions |
| GET | `/api/quiz/random/:count` | Get random quiz questions |
| POST | `/api/quiz/submit` | Submit quiz score |
| GET | `/api/quiz/leaderboard/:limit` | Get top scores |

## 📊 Database Schemas

### Culture Collection
```javascript
{
  _id: ObjectId,
  country: String,
  region: String,           // Asia, Europe, Africa, Americas, Oceania
  category: String,         // Festival, Food, Tradition, Other
  title: String,
  description: String,
  story: String,
  image: String,            // Image URL
  likes: Number,
  createdBy: String,
  createdAt: Date
}
```

### Quiz Collection
```javascript
{
  _id: ObjectId,
  question: String,
  options: [String, String, String, String],
  correctAnswer: Number,    // Index of correct option (0-3)
  category: String,
  createdAt: Date
}
```

### QuizScore Collection
```javascript
{
  _id: ObjectId,
  userId: String,
  score: Number,            // Points earned
  totalQuestions: Number,   // Total questions answered
  percentage: Number,       // Score percentage
  createdAt: Date
}
```

## 🎨 Pages Overview

### Home Page
- Welcome section with hero image
- Feature highlights (6 main features)
- Featured cultures carousel
- Quick navigation to other pages

### Explore Page
- Advanced filtering (by region, category, country)
- Grid display of all cultures
- Culture cards with images and descriptions
- Like/favorite functionality
- Result count display

### Add Culture Page
- Form to submit new cultural experience
- Fields: Country, Region, Category, Title, Description, Story, Image URL
- User name/attribution
- Form validation
- Success notification

### Quiz Page
- 10-question quiz with random selection
- Multiple choice questions (A, B, C, D)
- Progress bar showing quiz completion
- Real-time scoring
- Final score with percentage
- Leaderboard showing top 5 scores
- Option to restart and retake quiz

## 🚀 Getting Started

1. **Clone or extract the project**

2. **Start MongoDB:**
```bash
mongod
```

3. **Terminal 1 - Backend:**
```bash
cd backend
npm install
npm run dev
```

4. **Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

5. **Access the application:**
Open http://localhost:3000 in your browser

## 🎯 Example Usage

### Adding a Culture
1. Go to "Add Culture" page
2. Fill in the form:
   - Country: India
   - Region: Asia
   - Category: Festival
   - Title: Diwali
   - Description: Festival of lights celebrated across India
   - Story: We celebrate with lamps and sweets
   - Image: (optional, uses placeholder)
3. Click "Add Culture"
4. See your culture appear in the Explore page!

### Taking the Quiz
1. Go to "Quiz" page
2. Read the question carefully
3. Select one of four options
4. Click "Next" to continue
5. See your final score and compare with the leaderboard

## 🔄 Workflow

```
User Action → Frontend (React) → API Request (Axios) 
→ Backend (Express) → Database (MongoDB) → Response 
→ Frontend (Update State) → UI Refresh
```

## 📝 Notes

- The app uses a sample MongoDB URI for local development
- Images can be uploaded via URLs
- Quiz questions can be bulk uploaded using `sampleData.js`
- The like system increments a counter (no user tracking)
- All timestamps are stored in UTC

## 🤝 Contributing

Feel free to extend the project with:
- User authentication system
- Comments on cultures
- Save favorite cultures
- Dark mode theme
- Multiple language support
- Image upload functionality
- Social sharing features

## 📄 License

This project is open source and available under the MIT License.

---

Enjoy exploring world cultures! 🌍✨
