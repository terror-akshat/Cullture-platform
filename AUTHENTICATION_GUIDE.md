# 🆕 Authentication & User Profile System - What's New

## ✅ Features Added

### 1. **User Authentication System**
- ✅ User registration with email & password
- ✅ Secure login with JWT tokens
- ✅ Password hashing with bcryptjs
- ✅ Token-based authentication
- ✅ Persistent login (stored in localStorage)

### 2. **User Pages**
- ✅ **Login Page** - Sign in with email & password
- ✅ **Signup Page** - Create new account
- ✅ **User Profile Page** - View & manage your posts

### 3. **Profile Features**
- ✅ View all your cultural posts
- ✅ Edit your posts anytime
- ✅ Delete posts you created
- ✅ See post statistics (likes, category)
- ✅ Logout functionality
- ✅ User information display

### 4. **Post Management**
- ✅ Posts linked to user accounts (userId in database)
- ✅ Only post owner can edit/delete
- ✅ Anonymous posts still supported (for backward compatibility)
- ✅ Creator name automatically filled when logged in

### 5. **Navigation Updates**
- ✅ Sign In/Sign Up buttons in navbar (when not logged in)
- ✅ Profile button in navbar (when logged in)
- ✅ User welcome message in navbar
- ✅ Logout button in profile page

---

## 🔐 Technical Details

### Backend Changes
**New Files:**
- `models/User.js` - User schema with email, password, name, bio, avatar
- `routes/auth.js` - Authentication endpoints (register, login, getCurrentUser)
- `middleware/auth.js` - JWT token verification middleware

**Updated Files:**
- `routes/cultures.js` - Added userId tracking, edit/delete authorization
- `models/Culture.js` - Added userId field to link posts to users
- `server.js` - Added auth routes
- `package.json` - Added bcryptjs and jsonwebtoken

**New API Endpoints:**
```
POST   /api/auth/register           # Create new user account
POST   /api/auth/login              # Sign in user
GET    /api/auth/me                 # Get current user info
GET    /api/cultures/user/my-posts/:userId  # Get user's posts
PUT    /api/cultures/:id            # Update post (auth required)
DELETE /api/cultures/:id            # Delete post (auth required)
```

### Frontend Changes
**New Pages:**
- `pages/LoginPage.jsx` - Login form
- `pages/SignupPage.jsx` - Signup form
- `pages/ProfilePage.jsx` - User profile with post management

**Updated Components:**
- `components/Navbar.jsx` - Shows login/profile buttons based on auth state
- `pages/AddCulturePage.jsx` - Auto-fills creator name for logged-in users
- `App.jsx` - Added new routes

**New Routes:**
```
/login          # Login page
/signup         # Signup page
/profile        # User profile page
```

---

## 🚀 How to Use

### Register New Account
1. Click "Sign Up" in navbar
2. Enter name, email, password
3. Confirm password
4. Click "Create Account"
5. Automatically logged in & redirected to home page

### Login
1. Click "Sign In" in navbar
2. Enter email & password
3. Click "Sign In"
4. Automatically logged in

### Manage Your Posts
1. Click "Profile" in navbar (only visible when logged in)
2. See all your posted cultures
3. Click "Edit" to modify a post
4. Click "Delete" to remove a post
5. Click "Create Your First Post" if you have no posts

### Logout
1. Go to Profile page
2. Click "Logout" button
3. Logged out & redirected to home page

---

## 🔑 Key Points

### Security
- Passwords are hashed using bcryptjs (not stored as plaintext)
- JWT tokens with 7-day expiration
- Only post owners can edit/delete
- Token stored in browser localStorage

### Data Structure
**User Document:**
```javascript
{
  _id: ObjectId,
  name: String,
  email: String (unique),
  password: String (hashed),
  bio: String,
  avatar: String (URL),
  createdAt: Date
}
```

**Culture Document (Updated):**
```javascript
{
  _id: ObjectId,
  country: String,
  region: String,
  category: String,
  title: String,
  description: String,
  story: String,
  image: String,
  likes: Number,
  userId: ObjectId,          // NEW - Links to User
  createdBy: String,
  createdAt: Date
}
```

---

## 📝 Testing the Features

### Test Signup
1. Go to http://localhost:3000/signup
2. Fill in name: "Test User"
3. Email: "test@example.com"
4. Password: "password123"
5. Confirm: "password123"
6. Click Create Account
7. Should be logged in (see "Welcome, Test User" in navbar)

### Test Post Management
1. Go to /add-culture
2. Add a culture post (creator name auto-filled as "Test User")
3. Submit
4. Go to Profile
5. See your post
6. Click Edit to modify
7. Click Delete to remove

### Test Login/Logout
1. Click Logout in Profile
2. Click Sign In
3. Enter test@example.com and password123
4. Login successful
5. See your name in navbar again

---

## ⚠️ Important Notes

### PASSWORD SECURITY
The JWT secret key in auth.js is currently: `'your_jwt_secret_key_change_this'`

**BEFORE PRODUCTION:**
- Change this to a secure random string
- Store it in `.env` file
- Never commit the actual secret to version control

### Database
All user and post data stored in MongoDB. Make sure MongoDB is running when:
- Registering new users
- Logging in
- Managing posts

### Token Storage
Tokens stored in browser's localStorage:
- Automatically cleared on logout
- Persists across browser refresh
- Users stay logged in until logout

---

## 🐛 Troubleshooting

**"Email already registered"**
- Email is already in use
- Try with a different email

**"Invalid email or password"**
- Email or password is wrong
- Check spelling and try again

**"Not authorized to update/delete"**
- You're trying to edit/delete someone else's post
- Can only manage your own posts

**"No token, authorization denied"**
- You're not logged in
- Login first before adding/editing posts

---

## 🎉 You Now Have

✅ Complete user authentication system
✅ User profiles with post management
✅ Secure password storage
✅ JWT token-based security
✅ Edit/delete functionality
✅ User-based access control

Ready to use! 🚀