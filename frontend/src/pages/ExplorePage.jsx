import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../config";
import CultureCard from "../components/CultureCard";

export default function ExplorePage() {
  const [cultures, setCultures] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState("all");
  const [filterValue, setFilterValue] = useState("");

  const regions = ["Asia", "Europe", "Africa", "Americas", "Oceania"];
  const categories = ["Festival", "Food", "Tradition", "Other"];

  useEffect(() => {
    fetchAllCultures();
  }, []);

  useEffect(() => {
    applyFilter();
  }, [filterType, filterValue, cultures]);

  const fetchAllCultures = async () => {
    try {
      const response = await axios.get(api.getAllCultures());
      setCultures(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cultures:", error);
      setLoading(false);
    }
  };

  const applyFilter = () => {
    let result = cultures;

    if (filterType === "region" && filterValue) {
      result = cultures.filter((c) => c.region === filterValue);
    } else if (filterType === "category" && filterValue) {
      result = cultures.filter((c) => c.category === filterValue);
    } else if (filterType === "country" && filterValue) {
      result = cultures.filter((c) =>
        c.country.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    setFiltered(result);
  };

  const handleLike = async (cultureId) => {
    try {
      await axios.put(api.likeCulture(cultureId));
      fetchAllCultures();
    } catch (error) {
      console.error("Error liking culture:", error);
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Page Header */}

        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 animate-fade-up">
          <div>
            <h1 className="text-4xl font-bold text-amber-100 mb-2">
              🌍 Explore Cultures
            </h1>

            <p className="text-slate-300">
              Discover traditions, food and festivals from around the world
            </p>
          </div>
        </div>

        {/* FILTER PANEL */}

        <div className="bg-slate-900/70 shadow-lg rounded-xl p-6 mb-10 border border-amber-500/25 backdrop-blur-md animate-fade-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Filter Type */}

            <div>
              <label className="block text-sm font-semibold mb-2">
                Filter Type
              </label>

              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setFilterValue("");
                }}
                className="w-full border border-slate-600 rounded-lg px-4 py-2 bg-slate-900/80 text-slate-100 focus:ring-2 focus:ring-amber-400 outline-none"
              >
                <option value="all">All</option>
                <option value="region">Region</option>
                <option value="category">Category</option>
                <option value="country">Country</option>
              </select>
            </div>

            {/* REGION */}

            {filterType === "region" && (
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Select Region
                </label>

                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="w-full border border-slate-600 rounded-lg px-4 py-2 bg-slate-900/80 text-slate-100 focus:ring-2 focus:ring-amber-400 outline-none"
                >
                  <option value="">All Regions</option>

                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* CATEGORY */}

            {filterType === "category" && (
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Select Category
                </label>

                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="w-full border border-slate-600 rounded-lg px-4 py-2 bg-slate-900/80 text-slate-100 focus:ring-2 focus:ring-amber-400 outline-none"
                >
                  <option value="">All Categories</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* COUNTRY SEARCH */}

            {filterType === "country" && (
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Search Country
                </label>

                <input
                  type="text"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  placeholder="Type country name..."
                  className="w-full border border-slate-600 rounded-lg px-4 py-2 bg-slate-900/80 text-slate-100 placeholder:text-slate-500 focus:ring-2 focus:ring-amber-400 outline-none"
                />
              </div>
            )}
          </div>
        </div>

        {/* RESULTS */}

        {loading ?
          <div className="text-center py-20 text-slate-400">
            Loading cultures...
          </div>
        : filtered.length > 0 ?
          <div className="animate-fade-up">
            {/* RESULT COUNT */}

            <div className="flex justify-between items-center mb-8">
              <p className="text-slate-300">
                Showing <span className="font-semibold text-amber-200">{filtered.length}</span>{" "}
                cultures
              </p>
            </div>

            {/* CULTURE GRID */}

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((culture) => (
                <div
                  key={culture._id}
                  className="transition hover:-translate-y-2 hover:shadow-2xl"
                >
                  <CultureCard culture={culture} onLike={handleLike} />
                </div>
              ))}
            </div>
          </div>
        : <div className="text-center py-24">
            <h2 className="text-2xl font-semibold text-amber-100 mb-3">
              No cultures found
            </h2>

            <p className="text-slate-400">
              Try adjusting your filters or search another country
            </p>
          </div>
        }
      </div>
    </div>
  );
}