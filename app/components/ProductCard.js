// components/ProductCard.js
"use client";
import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="border p-4 rounded-xl shadow-md">
      <h2 className="text-lg font-bold mb-2">{product.name}</h2>
      <p className="text-gray-700 mb-1">Price: ${product.price}</p>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
