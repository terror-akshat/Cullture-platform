# Cultural Platform Backend

Node.js + Express backend API for the Global Culture platform.

## Features

- RESTful API for managing cultural data
- MongoDB integration for data persistence
- Quiz management and scoring system
- Like/favorite cultures functionality
- Filter cultures by country, region, or category

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/cultural-platform
NODE_ENV=development
```

## Running the Server

### Development (with auto-reload)

```bash
npm run dev
```

### Production

```bash
npm start
```

Server runs on http://localhost:5000

## API Endpoints

### Cultures

- `GET /api/cultures` - Get all cultures
- `GET /api/cultures/:id` - Get a specific culture
- `GET /api/cultures/country/:country` - Get cultures by country
- `GET /api/cultures/region/:region` - Get cultures by region
- `GET /api/cultures/category/:category` - Get cultures by category
- `POST /api/cultures` - Create a new culture
- `PUT /api/cultures/:id` - Update a culture
- `DELETE /api/cultures/:id` - Delete a culture
- `PUT /api/cultures/:id/like` - Like a culture

### Quiz

- `GET /api/quiz/questions` - Get all quiz questions
- `GET /api/quiz/random/:count` - Get random quiz questions
- `POST /api/quiz/submit` - Submit quiz score
- `GET /api/quiz/leaderboard/:limit` - Get top scores

## Database Schema

### Culture

```javascript
{
  country: String,
  region: String (Asia, Europe, Africa, Americas, Oceania),
  category: String (Festival, Food, Tradition, Other),
  title: String,
  description: String,
  story: String,
  image: String (URL),
  likes: Number,
  createdBy: String,
  createdAt: Date
}
```

### Quiz

```javascript
{
  question: String,
  options: [String],
  correctAnswer: Number,
  category: String,
  createdAt: Date
}
```

### QuizScore

```javascript
{
  userId: String,
  score: Number,
  totalQuestions: Number,
  percentage: Number,
  createdAt: Date
}
```