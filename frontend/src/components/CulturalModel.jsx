import React from "react";

export default function CultureModal({ culture, onClose }) {
  if (!culture) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white max-w-2xl w-full rounded-xl p-6 relative shadow-lg">

        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-xl"
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
        <h2 className="text-2xl font-bold mb-2">{culture.title}</h2>

        <p className="text-gray-600 mb-2">
          <strong>Country:</strong> {culture.country}
        </p>

        <p className="text-gray-600 mb-4">
          <strong>Category:</strong> {culture.category}
        </p>

        <p className="text-gray-700 leading-relaxed">
          {culture.description}
        </p>

      </div>
    </div>
  );
}