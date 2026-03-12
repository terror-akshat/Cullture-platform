import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-amber-500/25 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-16">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold flex items-center gap-2 text-amber-300 tracking-wide"
        >
          🌍 <span className="uppercase text-sm md:text-base tracking-[0.25em]">GlobalCulture</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex gap-8 items-center text-slate-100/80 font-medium">
          <Link
            to="/"
            className="border-b-2 border-transparent hover:border-amber-400 pb-1 hover:text-amber-300 transition"
          >
            Home
          </Link>

          <Link
            to="/explore"
            className="border-b-2 border-transparent hover:border-amber-400 pb-1 hover:text-amber-300 transition"
          >
            Explore
          </Link>

          <Link
            to="/add-culture"
            className="border-b-2 border-transparent hover:border-amber-400 pb-1 hover:text-amber-300 transition"
          >
            Add Culture
          </Link>

          <Link
            to="/quiz"
            className="border-b-2 border-transparent hover:border-amber-400 pb-1 hover:text-amber-300 transition"
          >
            Quiz
          </Link>
        </div>

        {/* Right Side Buttons */}

        <div className="flex items-center gap-4">
          {user ?
            <>
              <span className="text-sm text-slate-200/80 hidden md:block">
                Hello, {user.name}
              </span>

              <Link
                to="/profile"
                className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 transition shadow-md shadow-amber-500/30 hover:shadow-lg"
              >
                👤 Profile
              </Link>
            </>
          : <>
              <Link
                to="/login"
                className="text-slate-200/80 hover:text-amber-300 transition"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 transition shadow-md shadow-amber-500/30 hover:shadow-lg"
              >
                Sign Up
              </Link>
            </>
          }
        </div>
      </div>
    </nav>
  );
}