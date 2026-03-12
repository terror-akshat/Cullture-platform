import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../config";
import CultureCard from "../components/CultureCard";
import CultureModal from "../components/CulturalModel";

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [selectedCulture, setSelectedCulture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedCultures();
  }, []);

  const fetchFeaturedCultures = async () => {
    try {
      const response = await axios.get(api.getAllCultures());
      setFeatured(response.data.slice(0, 6));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cultures:", error);
      setLoading(false);
    }
  };

  const handleLike = async (cultureId) => {
    try {
      await axios.put(api.likeCulture(cultureId));
      fetchFeaturedCultures();
    } catch (error) {
      console.error("Error liking culture:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container text-center">
          <h1 className="text-5xl font-bold mb-4">🌏 Explore World Cultures</h1>
          <p className="text-xl mb-8">
            Discover traditions, festivals, and cuisines from around the globe
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="/explore"
              className="btn-primary bg-white text-blue-600 hover:bg-gray-100"
            >
              Explore Now
            </a>
            <a href="/add-culture" className="btn-primary">
              Share Culture
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 container">
        <h2 className="text-4xl font-bold text-center mb-12">
          What You Can Do
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">🌏</div>
            <h3 className="text-xl font-bold mb-2">Explore Cultures</h3>
            <p className="text-gray-600">
              Browse cultures from different countries and regions
            </p>
          </div>
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">🎉</div>
            <h3 className="text-xl font-bold mb-2">Learn Festivals</h3>
            <p className="text-gray-600">
              Discover amazing festivals celebrated worldwide
            </p>
          </div>
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">🍜</div>
            <h3 className="text-xl font-bold mb-2">Traditional Food</h3>
            <p className="text-gray-600">
              Explore delicious cuisines from every corner
            </p>
          </div>
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">✍️</div>
            <h3 className="text-xl font-bold mb-2">Share Stories</h3>
            <p className="text-gray-600">
              Share your own cultural experiences and stories
            </p>
          </div>
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">🧠</div>
            <h3 className="text-xl font-bold mb-2">Take Quizzes</h3>
            <p className="text-gray-600">
              Test your knowledge about world cultures
            </p>
          </div>
          <div className="card p-6 text-center">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-xl font-bold mb-2">Community</h3>
            <p className="text-gray-600">
              Connect with people passionate about cultures
            </p>
          </div>
        </div>
      </section>

      {/* Featured Cultures */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-4xl font-bold mb-12">Featured Cultures</h2>
          {loading ?
            <div className="text-center py-8">Loading...</div>
          : featured.length > 0 ?
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featured.map((culture) => (
                <div
                  key={culture._id}
                  onClick={() => setSelectedCulture(culture)}
                  className="cursor-pointer"
                >
                  <CultureCard culture={culture} onLike={handleLike} />
                </div>
              ))}
            </div>
          : <p className="text-center text-gray-600">
              No cultures yet. Be the first to add one!
            </p>
          }
        </div>
      </section>
      <CultureModal
        culture={selectedCulture}
        onClose={() => setSelectedCulture(null)}
      />
    </div>
  );
}
