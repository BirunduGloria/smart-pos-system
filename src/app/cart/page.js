'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [currency, setCurrency] = useState('KES');
  const [sales, setSales] = useState([]);

  const currencyRates = {
    KES: 1,
    USD: 0.007, // adjust as needed
  };

  // 🧠 Fetch cart items from your json-server
  useEffect(() => {
    axios.get('http://localhost:3001/cart')
      .then(res => setCart(res.data))
      .catch(err => console.error('Error loading cart:', err));

    axios.get('http://localhost:3001/sales')
      .then(res => setSales(res.data))
      .catch(err => console.error('Error loading sales:', err));
  }, []);

  // 💡 Handle quantity change
  function handleQuantityChange(id, quantity) {
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCart(updated);

    axios.patch(`http://localhost:3001/cart/${id}`, { quantity })
      .catch(err => console.error('Error updating quantity:', err));
  }

  // ❌ Remove item from cart
  function handleRemove(id) {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);

    axios.delete(`http://localhost:3001/cart/${id}`)
      .catch(err => console.error('Error removing item:', err));
  }

  // ✅ Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ) * currencyRates[currency];

  // 🛒 Checkout (submit to /sales)
  function handleCheckout() {
    if (cart.length === 0) return alert('Cart is empty');

    const sale = {
      date: new Date().toISOString(),
      items: cart,
      total,
      currency,
    };

    axios.post('http://localhost:3001/sales', sale)
      .then(() => {
        alert('Checkout successful!');
        setCart([]);

        // Clear cart from backend
        cart.forEach(item =>
          axios.delete(`http://localhost:3001/cart/${item.id}`)
        );
      })
      .catch(err => console.error('Checkout error:', err));
  }

  // 🔁 Reorder past sale
  function handleReorder(sale) {
    sale.items.forEach(item => {
      axios.post('http://localhost:3001/cart', item)
        .then(() => alert('Reorder added to cart!'))
        .catch(err => console.error('Reorder error:', err));
    });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>

      <div className="mb-4">
        <label className="mr-2 font-medium">Currency:</label>
        <select
          value={currency}
          onChange={e => setCurrency(e.target.value)}
          className="border p-1 rounded"
        >
          <option value="KES">KES</option>
          <option value="USD">USD</option>
        </select>
      </div>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <table className="w-full border mb-6">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">Item</th>
              <th className="p-2">Qty</th>
              <th className="p-2">Subtotal ({currency})</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={e => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="w-16 border p-1"
                    min={1}
                  />
                </td>
                <td className="p-2">
                  {(item.price * item.quantity * currencyRates[currency]).toFixed(2)}
                </td>
                <td className="p-2">
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {cart.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold">
            Total: {total.toFixed(2)} {currency}
          </h2>
          <button
            onClick={handleCheckout}
            className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
          >
            Checkout
          </button>
        </div>
      )}

      {/* Past Sales */}
      <div>
        <h2 className="text-xl font-bold mt-10 mb-4">Past Purchases</h2>
        {sales.length === 0 ? (
          <p className="text-gray-500">No purchases yet.</p>
        ) : (
          <ul className="space-y-4">
            {sales.map(sale => (
              <li key={sale.id} className="border p-4 rounded shadow-sm">
                <p className="mb-2 font-medium">Date: {new Date(sale.date).toLocaleString()}</p>
                <p className="mb-2">Total: {sale.total.toFixed(2)} {sale.currency}</p>
                <button
                  onClick={() => handleReorder(sale)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Reorder
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
