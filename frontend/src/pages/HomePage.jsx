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
    <div className="min-h-screen bg-transparent">
      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center animate-fade-up">
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight text-amber-100 drop-shadow-md">
            Discover Cultures <br /> Around The World 🌍
          </h1>

          <p className="text-lg text-slate-300 max-w-xl">
            Explore traditions, festivals, and cuisines shared by people across
            the globe. Learn something new and share your own culture.
          </p>

          <div className="flex gap-4 flex-wrap">
            <a
              href="/explore"
              className="btn-primary"
            >
              Explore Cultures
            </a>

            <a
              href="/add-culture"
              className="btn-secondary"
            >
              Share Culture
            </a>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff"
            className="rounded-3xl border-4 border-amber-300/70 shadow-2xl object-cover h-[420px] w-full max-w-md animate-float-soft"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 card animate-fade-up">
          <h2 className="section-title">
            Explore Global Traditions
          </h2>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="flex gap-5 items-start group">
              <div className="feature-icon">🌏</div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-amber-100">
                  Explore Cultures
                </h3>
                <p className="text-slate-300">
                  Browse traditions and customs from different countries.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start group">
              <div className="feature-icon">🎉</div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-amber-100">
                  Learn Festivals
                </h3>
                <p className="text-slate-300">
                  Discover vibrant festivals celebrated worldwide.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start group">
              <div className="feature-icon">🍜</div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-amber-100">
                  Traditional Cuisine
                </h3>
                <p className="text-slate-300">
                  Explore food and recipes from every culture.
                </p>
              </div>
            </div>

            <div className="flex gap-5 items-start group">
              <div className="feature-icon">✍️</div>
              <div>
                <h3 className="font-semibold text-lg mb-2 text-amber-100">
                  Share Stories
                </h3>
                <p className="text-slate-300">
                  Upload and share your personal cultural experiences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED CULTURES */}

      <section className="py-20 max-w-7xl mx-auto px-6 animate-fade-up">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold text-amber-100">
            Featured Cultures
          </h2>

          <a
            href="/explore"
            className="text-sm font-semibold text-amber-300 hover:underline"
          >
            View All
          </a>
        </div>

        {loading ?
          <div className="text-center py-10 text-slate-300">
            Loading cultures...
          </div>
        : featured.length > 0 ?
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featured.map((culture) => (
              <div
                key={culture._id}
                onClick={() => setSelectedCulture(culture)}
                className="cursor-pointer transition hover:-translate-y-2 hover:shadow-2xl animate-fade-up"
              >
                <CultureCard culture={culture} onLike={handleLike} />
              </div>
            ))}
          </div>
        : <p className="text-slate-400 text-center">
            No cultures yet. Be the first to add one!
          </p>
        }
      </section>

      {/* MODAL */}

      <CultureModal
        culture={selectedCulture}
        onClose={() => setSelectedCulture(null)}
      />
    </div>
  );
}