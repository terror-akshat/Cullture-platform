import React from "react";

export default function CultureModal({ culture, onClose }) {
  if (!culture) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card animate-fade-up">

        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-xl text-slate-400 hover:text-amber-300 transition"
          onClick={onClose}
        >
          ✖
        </button>

        {/* Image */}
        {culture.image && (
          <img
            src={culture.image}
            alt={culture.title}
            className="w-full h-60 object-cover rounded-lg mb-4"
          />
        )}

        {/* Content */}
        <h2 className="text-2xl font-bold mb-2 text-amber-100">
          {culture.title}
        </h2>

        <p className="text-slate-300 mb-2">
          <strong>Country:</strong> {culture.country}
        </p>

        <p className="text-slate-300 mb-4">
          <strong>Category:</strong> {culture.category}
        </p>

        <p className="text-slate-100 leading-relaxed">
          {culture.description}
        </p>

      </div>
    </div>
  );
}