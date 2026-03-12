import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
      <div className="container flex justify-between items-center py-4">
        <Link to="/" className="text-2xl font-bold">
          🌍 GlobalCulture
        </Link>
        <div className="flex gap-6 items-center">
          <Link to="/" className="hover:text-gray-200 transition">Home</Link>
          <Link to="/explore" className="hover:text-gray-200 transition">Explore</Link>
          <Link to="/add-culture" className="hover:text-gray-200 transition">Add Culture</Link>
          <Link to="/quiz" className="hover:text-gray-200 transition">Quiz</Link>
          
          {user ? (
            <>
              <span className="text-sm">Welcome, {user.name}</span>
              <Link 
                to="/profile" 
                className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                👤 Profile
              </Link>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-4 py-2 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Sign In
              </Link>
              <Link 
                to="/signup" 
                className="px-4 py-2 bg-purple-500 rounded-lg font-semibold hover:bg-purple-600 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
