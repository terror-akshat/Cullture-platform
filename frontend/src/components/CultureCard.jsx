import React from 'react';

export default function CultureCard({ culture, onLike }) {
  return (
    <div className="card overflow-hidden">
      <img 
        src={culture.image} 
        alt={culture.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-gray-800">{culture.title}</h3>
            <p className="text-sm text-gray-600">{culture.country}</p>
          </div>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-semibold">
            {culture.category}
          </span>
        </div>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{culture.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">By {culture.createdBy}</span>
          <button
            onClick={() => onLike(culture._id)}
            className="text-red-500 hover:text-red-700 transition flex items-center gap-1"
          >
            ❤️ {culture.likes || 0}
          </button>
        </div>
      </div>
    </div>
  );
}
