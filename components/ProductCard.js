import React from 'react';

export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="border p-4 rounded">
      <h2 className="font-bold">{product.name}</h2>
      <p>{product.category}</p>
      <button onClick={onAddToCart} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
}
