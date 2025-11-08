import React, { useState } from "react";
import { useCart } from "../context/CartContext";

function Checkout() {
  const { clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleOrder = (e) => {
    e.preventDefault();
    clearCart(); // ✅ empty the cart
    setOrderPlaced(true); // ✅ show success message
  };

  if (orderPlaced) {
    return (
      <div className="pt-24 flex flex-col items-center text-center">
        <h1 className="text-3xl font-bold text-green-600 mb-4">
          🎉 Order Placed Successfully!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with PawSmart. Your furry friend will love it! 🐾
        </p>
        <a
          href="/home"
          className="bg-indigo-600 text-white px-6 py-3 rounded hover:bg-indigo-700"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="pt-24 max-w-4xl mx-auto px-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form
        className="bg-white p-6 rounded-lg shadow space-y-4"
        onSubmit={handleOrder}
      >
        <input
          type="text"
          placeholder="Full Name"
          className="border px-4 py-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="Address"
          className="border px-4 py-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="City"
          className="border px-4 py-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="Pincode"
          className="border px-4 py-2 w-full rounded"
          required
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 w-full"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
