"use client";

import React, { useEffect, useState, useContext } from "react";
import { fetchProducts } from "../lib/api";
import ProductCard from "../components/ProductCard";
import { CartContext } from "../context/CartContext";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchProducts().then(setProducts);
  }, []);

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase()) &&
    (category === "All" || product.category === category)
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product Catalog</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      {/* Category Dropdown */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded mb-4"
      >
        {categories.map((cat) => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </div>
    </div>
  );
}
