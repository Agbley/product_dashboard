import React from 'react';

export default function ProductCard({ product, onEdit, onDelete, onClick, isFavorite, onToggleFavorite }) {
  return (
    <div className="bg-white p-4 rounded shadow hover:shadow-lg transition relative" onClick={onClick}>
      {/* ❤️ Favorite toggle button added */}
      <button
        className="absolute top-2 right-2 text-xl"
        onClick={(e) => {
          e.stopPropagation(); // prevent modal opening
          onToggleFavorite(product.id);
        }}
        title={isFavorite ? 'Unmark Favorite' : 'Mark Favorite'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      <h2 className="text-lg font-semibold">{product.name}</h2>
      <p>💲 {product.price.toFixed(2)}</p>
      <p>📦 {product.category}</p>
      <p>⭐ {product.rating}</p>
      <div className="mt-2 flex gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(product); }}
          className="text-blue-600"
        >Edit</button>
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
          className="text-red-600"
        >Delete</button>
      </div>
    </div>
  );
}
