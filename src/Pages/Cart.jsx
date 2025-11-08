import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";

function Cart() {
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="pt-24 text-center">
        <h1 className="text-2xl font-bold mb-4">Your Cart is Empty 🛒</h1>
        <Link
          to="/home"
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="pt-24 max-w-4xl mx-auto px-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b pb-3 gap-3"
          >
            <div>
              <h2 className="font-semibold text-gray-800">{item.name}</h2>
              <p className="text-gray-500 text-sm">
                Qty: {item.quantity} {item.size && `| Size: ${item.size}`}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                className="px-3 py-1 border rounded-md text-lg hover:bg-gray-100"
              >
                -
              </button>
              <span className="font-medium">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                className="px-3 py-1 border rounded-md text-lg hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <p className="font-semibold text-red-600 w-24 text-right">
              ₹{item.price * item.quantity}
            </p>

            {/* Remove Button */}
            <button
              onClick={() => removeFromCart(item.id, item.size)}
              className="text-gray-500 hover:text-red-600 transition"
              title="Remove"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}

        {/* Cart Total */}
        <div className="flex justify-between font-bold text-lg pt-4">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>

        {/* Checkout Button */}
        <Link
          to="/checkout"
          className="block text-center mt-6 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;
