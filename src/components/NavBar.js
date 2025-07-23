import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="flex space-x-6 p-4 bg-white shadow text-lg">
      <Link href="/" className="hover:text-green-600 font-medium">Home</Link>
      <Link href="/products" className="hover:text-green-600 font-medium">Products</Link>
      <Link href="/cart" className="hover:text-green-600 font-medium">Cart</Link>
      <Link href="/login" className="hover:text-green-600 font-medium">Login</Link>
      <Link href="/inventory" className="hover:text-green-600 font-medium">Inventory</Link>
    </nav>
  );
}
