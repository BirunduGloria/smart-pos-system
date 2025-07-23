// src/components/NavBar.js
import Link from 'next/link'

export default function NavBar() {
  return (
    <nav className="w-full fixed top-0 left-0 bg-white shadow z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-green-700">Smart POS</div>
        <div className="flex space-x-6 text-lg">
          <Link href="/" className="hover:text-green-600 font-medium">Home</Link>
          <Link href="/products" className="hover:text-green-600 font-medium">Products</Link>
          <Link href="/cart" className="hover:text-green-600 font-medium">Cart</Link>
          <Link href="/inventory" className="hover:text-green-600 font-medium">Inventory</Link>
          <Link href="/login" className="hover:text-green-600 font-medium">Login</Link>
        </div>
      </div>
    </nav>
  )
}
