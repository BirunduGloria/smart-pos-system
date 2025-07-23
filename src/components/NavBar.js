"use client";

import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex space-x-6 text-lg font-medium text-gray-700">
          <Link href="/" className="hover:text-green-600">Home</Link>
          <Link href="/products" className="hover:text-green-600">Products</Link>
          <Link href="/cart" className="hover:text-green-600">Cart</Link>
          <Link href="/login" className="hover:text-green-600">Login</Link>
          <Link href="/inventory" className="hover:text-green-600">Inventory</Link>
        </div>
      </div>
    </nav>
  );
}
