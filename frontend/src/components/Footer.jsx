import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container">
        <div className="grid grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-bold mb-4">🌍 GlobalCulture</h4>
            <p className="text-gray-400">Explore and celebrate world cultures together</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Quick Links</h4>
            <ul className="text-gray-400 space-y-2">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/explore" className="hover:text-white transition">Explore</a></li>
              <li><a href="/quiz" className="hover:text-white transition">Quiz</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Follow Us</h4>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-white transition">Facebook</a>
              <a href="#" className="hover:text-white transition">Twitter</a>
              <a href="#" className="hover:text-white transition">Instagram</a>
            </div>
          </div>
        </div>
        <hr className="border-gray-700 mb-4" />
        <p className="text-gray-400 text-center">© 2024 GlobalCulture. All rights reserved.</p>
      </div>
    </footer>
  );
}
