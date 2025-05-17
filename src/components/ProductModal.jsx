import React from 'react';

export default function ProductModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 font-bold text-xl"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
        <p><strong>Category:</strong> {product.category}</p>
        <p className="mt-2 text-sm text-gray-700">{product.description}</p>
      </div>
    </div>
  );
}
