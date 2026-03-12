import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api, API_BASE_URL } from '../config';
import { getMediaUrl } from '../utils/media';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cultures, setCultures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [savingAvatar, setSavingAvatar] = useState(false);
  const [avatarMessage, setAvatarMessage] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);
    setAvatarPreview(userData.avatarUrl || userData.avatar || '');
    fetchUserCultures(userData.id);
  }, [navigate]);

  const fetchUserCultures = async (userId) => {
    try {
      const response = await axios.get(api.getUserCultures(userId));
      setCultures(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching cultures:', error);
      setLoading(false);
    }
  };

  const getCultureVideoSrc = (culture) => getMediaUrl(culture.videoUrl);
  const getCultureImageSrc = (culture) =>
    getMediaUrl(culture.image) || 'https://via.placeholder.com/300';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setAvatarPreview('');
    setAvatarFile(null);
    navigate('/');
    window.location.reload();
  };

  const handleEdit = (culture) => {
    setEditingId(culture._id);
    setEditData(culture);
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        api.updateCulture(editingId),
        editData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setEditingId(null);
      fetchUserCultures(user.id);
    } catch (error) {
      console.error('Error updating culture:', error);
    }
  };

  const handleDelete = async (cultureId) => {
    if (window.confirm('Are you sure you want to delete this culture?')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          api.deleteCulture(cultureId),
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        fetchUserCultures(user.id);
      } catch (error) {
        console.error('Error deleting culture:', error);
      }
    }
  };

  const handleLike = async (cultureId) => {
    try {
      await axios.put(api.likeCulture(cultureId));
      fetchUserCultures(user.id);
    } catch (error) {
      console.error('Error liking culture:', error);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setAvatarMessage('');
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  const handleSaveAvatar = async () => {
    if (!avatarFile) {
      setAvatarMessage('Please select an image first.');
      return;
    }

    try {
      setSavingAvatar(true);
      setAvatarMessage('');
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('avatar', avatarFile);

      const response = await axios.post(api.uploadAvatar(), formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      const updatedUser = response.data.user || response.data;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setAvatarPreview(updatedUser.avatarUrl || updatedUser.avatar || avatarPreview);
      setAvatarMessage('Profile photo updated successfully.');
      setAvatarFile(null);
    } catch (error) {
      console.error('Error updating profile photo:', error);
      setAvatarMessage('Failed to update profile photo. Please try again.');
    } finally {
      setSavingAvatar(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-8 text-center text-slate-300">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container py-8 text-center text-slate-300">
        Please log in first
      </div>
    );
  }

  const getAvatarSrc = () => {
    const raw =
      avatarPreview ||
      user.avatarUrl ||
      user.avatar ||
      'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=400&q=80';

    if (raw.startsWith('http')) return raw;

    // raw like "/avatars/filename.jpg" should be served from backend (without /api)
    const apiBase = API_BASE_URL.replace('/api', '');
    return `${apiBase}${raw}`;
  };

  return (
    <div className="min-h-screen bg-transparent py-8">
      <div className="container animate-fade-up">
        {/* Profile Header */}
        <div className="card p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src={getAvatarSrc()}
                alt={user.name}
                className="w-24 h-24 rounded-full border-4 border-amber-300/70 shadow-lg shadow-amber-500/40"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2 text-amber-100">
                  {user.name}
                </h1>
                <p className="text-slate-300 mb-2">{user.email}</p>
                <p className="text-sm text-slate-400">
                  {cultures.length} cultural post{cultures.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 rounded-xl bg-rose-500/90 text-slate-50 font-semibold hover:bg-rose-400 transition shadow-md shadow-rose-500/40 hover:shadow-lg"
            >
              Logout
            </button>
          </div>

            {/* Avatar uploader */}
            <div className="mt-6 grid gap-3 md:max-w-md">
              <label className="text-sm font-semibold text-slate-200">
                Profile photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="text-xs text-slate-300 file:mr-3 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-amber-400 file:text-slate-950 file:font-semibold hover:file:bg-amber-300"
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleSaveAvatar}
                  disabled={savingAvatar}
                  className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {savingAvatar ? 'Saving...' : 'Save Profile Photo'}
                </button>
              </div>
              {avatarMessage && (
                <p className="text-xs text-slate-300 mt-1">
                  {avatarMessage}
                </p>
              )}
            </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-4 border-b border-slate-700">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'posts'
                  ? 'border-b-2 border-amber-400 text-amber-300'
                  : 'text-slate-400 hover:text-slate-100'
              }`}
            >
              My Posts ({cultures.length})
            </button>
          </div>
        </div>

        {/* Posts Section */}
        {activeTab === 'posts' && (
          <div>
            {cultures.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cultures.map(culture => (
                  <div key={culture._id} className="relative">
                    {editingId === culture._id ? (
                      <div className="card p-6">
                        <h3 className="text-lg font-bold mb-3 text-amber-100">
                          Edit Post
                        </h3>
                        <input
                          type="text"
                          value={editData.title}
                          onChange={(e) => setEditData({...editData, title: e.target.value})}
                          className="input-field mb-3"
                          placeholder="Title"
                        />
                        <textarea
                          value={editData.description}
                          onChange={(e) => setEditData({...editData, description: e.target.value})}
                          className="input-field mb-3"
                          placeholder="Description"
                          rows="4"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleSaveEdit}
                            className="flex-1 btn-primary"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => setEditingId(null)}
                            className="flex-1 btn-secondary"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="card">
                        <img
                          src={getCultureImageSrc(culture)}
                          alt={culture.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-bold mb-2 text-amber-100">
                            {culture.title}
                          </h3>
                          <p className="text-sm text-slate-300 mb-3 line-clamp-2">
                            {culture.description}
                          </p>
                          {getCultureVideoSrc(culture) && (
                            <video
                              src={getCultureVideoSrc(culture)}
                              className="w-full rounded-lg mb-3 max-h-64 object-cover"
                              controls
                            />
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(culture)}
                              className="flex-1 px-3 py-2 rounded-lg bg-amber-400 text-slate-950 font-semibold hover:bg-amber-300 transition text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(culture._id)}
                              className="flex-1 px-3 py-2 rounded-lg bg-rose-500 text-slate-50 hover:bg-rose-400 transition text-sm"
                            >
                              Delete
                            </button>
                          </div>
                          <div className="mt-3 pt-3 border-t border-slate-700 flex justify-between text-sm">
                            <span className="badge-pill">{culture.category}</span>
                            <span className="text-slate-300">
                              ❤️ {culture.likes || 0}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 card">
                <p className="text-xl text-slate-200 mb-4">
                  You haven't posted any cultures yet
                </p>
                <a
                  href="/add-culture"
                  className="btn-primary inline-block"
                >
                  Create Your First Post
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
