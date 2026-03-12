import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { api } from '../config';
import CultureCard from '../components/CultureCard';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [cultures, setCultures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      navigate('/login');
      return;
    }
    
    const userData = JSON.parse(storedUser);
    setUser(userData);
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

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
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

  if (loading) {
    return <div className="container py-8 text-center">Loading profile...</div>;
  }

  if (!user) {
    return <div className="container py-8 text-center">Please log in first</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <img
                src="https://via.placeholder.com/120"
                alt={user.name}
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <p className="text-sm text-gray-500">
                  {cultures.length} cultural post{cultures.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-4 border-b">
            <button
              onClick={() => setActiveTab('posts')}
              className={`px-6 py-3 font-semibold transition ${
                activeTab === 'posts'
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-600 hover:text-gray-800'
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
                        <h3 className="text-lg font-bold mb-3">Edit Post</h3>
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
                          src={culture.image}
                          alt={culture.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="text-lg font-bold mb-2">{culture.title}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                            {culture.description}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(culture)}
                              className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(culture._id)}
                              className="flex-1 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition text-sm"
                            >
                              Delete
                            </button>
                          </div>
                          <div className="mt-3 pt-3 border-t flex justify-between text-sm">
                            <span className="text-gray-600">{culture.category}</span>
                            <span className="text-gray-600">❤️ {culture.likes || 0}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-xl text-gray-600 mb-4">You haven't posted any cultures yet</p>
                <a
                  href="/add-culture"
                  className="btn-primary inline-block text-white"
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
