import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-950/95 text-slate-200 py-8 mt-12 border-t border-amber-500/25">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-bold mb-4 text-amber-300">
              🌍 GlobalCulture
            </h4>
            <p className="text-slate-400">
              Explore and celebrate world cultures together
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="text-slate-400 space-y-2">
              <li>
                <a href="/" className="hover:text-amber-300 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/explore" className="hover:text-amber-300 transition">
                  Explore
                </a>
              </li>
              <li>
                <a href="/quiz" className="hover:text-amber-300 transition">
                  Quiz
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-slate-400">
              <a href="#" className="hover:text-amber-300 transition">
                Facebook
              </a>
              <a href="#" className="hover:text-amber-300 transition">
                Twitter
              </a>
              <a href="#" className="hover:text-amber-300 transition">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <hr className="border-slate-800 mb-4" />
        <p className="text-slate-500 text-center text-sm">
          © 2024 GlobalCulture. All rights reserved.
        </p>
      </div>
    </footer>
  );
}