import React from 'react';
import { getMediaUrl } from '../utils/media';

export default function CultureCard({ culture, onLike }) {
  const videoSrc = getMediaUrl(culture.videoUrl);
  const imageSrc = getMediaUrl(culture.image) || 'https://via.placeholder.com/300';

  return (
    <div className="card overflow-hidden animate-fade-up">
      <img 
        src={imageSrc}
        alt={culture.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-amber-100">{culture.title}</h3>
            <p className="text-sm text-slate-300">{culture.country}</p>
          </div>
          <span className="badge-pill">
            {culture.category}
          </span>
        </div>
        <p className="text-slate-200 text-sm mb-3 line-clamp-2">
          {culture.description}
        </p>
        {videoSrc && (
          <video
            src={videoSrc}
            className="w-full rounded-lg mb-3 max-h-64 object-cover"
            controls
          />
        )}
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-400">
            By {culture.createdBy}
          </span>
          <button
            onClick={() => onLike(culture._id)}
            className="text-rose-400 hover:text-rose-300 transition flex items-center gap-1"
          >
            ❤️ {culture.likes || 0}
          </button>
        </div>
      </div>
    </div>
  );
}