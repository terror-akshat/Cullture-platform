import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../config';
import CultureCard from '../components/CultureCard';

export default function ExplorePage() {
  const [cultures, setCultures] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [filterValue, setFilterValue] = useState('');

  const regions = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania'];
  const categories = ['Festival', 'Food', 'Tradition', 'Other'];

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
      console.error('Error fetching cultures:', error);
      setLoading(false);
    }
  };

  const applyFilter = () => {
    let result = cultures;

    if (filterType === 'region' && filterValue) {
      result = cultures.filter(c => c.region === filterValue);
    } else if (filterType === 'category' && filterValue) {
      result = cultures.filter(c => c.category === filterValue);
    } else if (filterType === 'country' && filterValue) {
      result = cultures.filter(c => 
        c.country.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    setFiltered(result);
  };

  const handleLike = async (cultureId) => {
    try {
      await axios.put(api.likeCulture(cultureId));
      fetchAllCultures();
    } catch (error) {
      console.error('Error liking culture:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        <h1 className="text-4xl font-bold mb-8">🌍 Explore Cultures</h1>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-2">Filter By</label>
              <select
                value={filterType}
                onChange={(e) => {
                  setFilterType(e.target.value);
                  setFilterValue('');
                }}
                className="input-field"
              >
                <option value="all">All</option>
                <option value="region">Region</option>
                <option value="category">Category</option>
                <option value="country">Country</option>
              </select>
            </div>

            {filterType === 'region' && (
              <div>
                <label className="block text-sm font-semibold mb-2">Select Region</label>
                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Regions</option>
                  {regions.map(region => (
                    <option key={region} value={region}>{region}</option>
                  ))}
                </select>
              </div>
            )}

            {filterType === 'category' && (
              <div>
                <label className="block text-sm font-semibold mb-2">Select Category</label>
                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="input-field"
                >
                  <option value="">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            )}

            {filterType === 'country' && (
              <div>
                <label className="block text-sm font-semibold mb-2">Search Country</label>
                <input
                  type="text"
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  placeholder="Enter country name"
                  className="input-field"
                />
              </div>
            )}
          </div>
        </div>

        {/* Results */}
        {loading ? (
          <div className="text-center py-8">Loading cultures...</div>
        ) : filtered.length > 0 ? (
          <div>
            <p className="mb-6 text-gray-600">Found {filtered.length} culture(s)</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(culture => (
                <CultureCard 
                  key={culture._id} 
                  culture={culture} 
                  onLike={handleLike}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-600 text-xl">No cultures found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
