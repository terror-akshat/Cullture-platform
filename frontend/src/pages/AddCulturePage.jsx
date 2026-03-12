import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from '../config';

export default function AddCulturePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    country: '',
    region: '',
    category: '',
    title: '',
    description: '',
    story: '',
    image: 'https://via.placeholder.com/300',
    createdBy: 'Anonymous'
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videoLabel, setVideoLabel] = useState('');

  const regions = ['Asia', 'Europe', 'Africa', 'Americas', 'Oceania'];
  const categories = ['Festival', 'Food', 'Tradition', 'Other'];

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }

    const userData = JSON.parse(storedUser);
    setUser(userData);
    setFormData(prev => ({
      ...prev,
      createdBy: userData.name
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setVideoFile(null);
      setVideoLabel('');
      return;
    }

    // Limit short video size to ~10MB
    const maxSizeBytes = 10 * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      setError('Video must be less than 10MB.');
      setVideoFile(null);
      setVideoLabel('');
      e.target.value = '';
      return;
    }

    setError('');
    setVideoFile(file);
    setVideoLabel(`${file.name} (${Math.ceil(file.size / 1024 / 1024)} MB)`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const data = new FormData(e.currentTarget);
      Object.entries(formData).forEach(([key, value]) => {
        data.set(key, value);
      });
      if (videoFile) {
        data.set('video', videoFile, videoFile.name);
      }

      await axios.post(api.createCulture(), data, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        }
      });
      setSubmitted(true);
      setFormData({
        country: '',
        region: '',
        category: '',
        title: '',
        description: '',
        story: '',
        image: 'https://via.placeholder.com/300',
        createdBy: user?.name || 'Anonymous'
      });
      setVideoFile(null);
      setVideoLabel('');
      setTimeout(() => {
        setSubmitted(false);
        navigate('/explore');
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error adding culture. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-transparent py-8">
      <div className="container max-w-lg animate-fade-up">
        <h1 className="text-4xl font-bold mb-8 text-amber-100">
          ✍️ Add Your Culture
        </h1>

        {submitted && (
          <div className="card border border-emerald-400/50 text-emerald-200 px-4 py-3 rounded mb-6">
            ✓ Culture added successfully!
          </div>
        )}

        {error && (
          <div className="card border border-rose-500/60 text-rose-200 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="card p-8">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-slate-200">
              Your Name
            </label>
            <input
              type="text"
              name="createdBy"
              value={formData.createdBy}
              onChange={handleChange}
              className="input-field"
              placeholder="Anonymous"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-slate-200">
              Country *
            </label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., India"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-slate-200">
              Region *
            </label>
            <select
              name="region"
              value={formData.region}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select a region</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-slate-200">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field"
              required
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-slate-200">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input-field"
              placeholder="e.g., Diwali Festival"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-slate-200">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="input-field"
              placeholder="Describe the culture or tradition"
              rows="3"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-slate-200">
              Your Story
            </label>
            <textarea
              name="story"
              value={formData.story}
              onChange={handleChange}
              className="input-field"
              placeholder="Share your personal experience with this culture"
              rows="3"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-slate-200">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="input-field"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-slate-200">
              Short Video (optional, max 10MB)
            </label>
            <input
              type="file"
              name="video"
              accept="video/*"
              onChange={handleVideoChange}
              className="text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-amber-400 file:text-slate-950 file:font-semibold hover:file:bg-amber-300"
            />
            {videoLabel && (
              <p className="mt-2 text-xs text-slate-300">
                Selected: {videoLabel}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full btn-primary font-semibold py-3"
          >
            Add Culture
          </button>
        </form>
      </div>
    </div>
  );
}
