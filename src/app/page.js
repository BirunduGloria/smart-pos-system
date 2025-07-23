'use client'

import { useState, useEffect } from 'react'
import NavBar from '../components/NavBar'

export default function Home() {
  const [currency, setCurrency] = useState('KES')
  const [hasMounted, setHasMounted] = useState(false)

  useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) return null 

  const exchangeRate = 0.0069 // 1 KES = 0.0069 USD
  const isAdmin = true // Later: replace with actual role logic

  const convert = (price) =>
    currency === 'USD'
      ? `$${(price * exchangeRate).toFixed(2)}`
      : `KSh ${price}`

  const products = [
    { id: 1, name: 'Product A', price: 200, discount: true, unitsSold: 120, stock: 3, expiresSoon: false },
    { id: 2, name: 'Product B', price: 500, discount: false, unitsSold: 60, stock: 10, expiresSoon: true },
    { id: 3, name: 'Product C', price: 150, discount: true, unitsSold: 20, stock: 2, expiresSoon: false },
    { id: 4, name: 'Product D', price: 300, discount: false, unitsSold: 55, stock: 8, expiresSoon: false },
  ]

  return (
    <>
      <NavBar />

      <main className="pt-24 px-8">
        {/* Header and Currency Selector */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Smart POS</h1>
          <div>
            <label className="mr-2 text-gray-600">Currency:</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border px-2 py-1 rounded"
            >
              <option value="KES">KES</option>
              <option value="USD">USD</option>
            </select>
          </div>
        </div>

        {/* Featured Products */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Featured Products</h2>
          <ul className="grid grid-cols-2 gap-4">
            {products
              .filter((product) => product.discount)
              .map((product) => (
                <li key={product.id} className="bg-white p-4 rounded shadow">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">{convert(product.price)}</p>
                </li>
              ))}
          </ul>
        </section>

        {/* Fast Selling Products */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Fast Selling Products</h2>
          <ul className="grid grid-cols-2 gap-4">
            {products
              .filter((product) => product.unitsSold > 50)
              .map((product) => (
                <li key={product.id} className="bg-white p-4 rounded shadow">
                  <p className="font-medium">{product.name}</p>
                  <p className="text-sm text-gray-600">{convert(product.price)}</p>
                  <p className="text-xs text-gray-500">{product.unitsSold} units sold</p>
                </li>
              ))}
          </ul>
        </section>

        {/* Smart Stock Alerts */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Smart Stock Alerts</h2>
          <ul className="list-disc ml-6 text-sm text-red-600">
            {products
              .filter((product) => product.stock < 5)
              .map((product) => (
                <li key={product.id}>
                  {product.name} - only {product.stock} left
                </li>
              ))}
          </ul>
        </section>

        {/* Admin-only: Expiring Soon */}
        {isAdmin && (
          <section>
            <h2 className="text-xl font-semibold mb-3">Expiring Soon</h2>
            <ul className="list-disc ml-6 text-sm text-orange-500">
              {products
                .filter((product) => product.expiresSoon)
                .map((product) => (
                  <li key={product.id}>
                    {product.name} - expiring soon
                  </li>
                ))}
            </ul>
          </section>
        )}
      </main>
    </>
  )
}
