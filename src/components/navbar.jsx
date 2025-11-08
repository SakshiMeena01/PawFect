import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";
import logo from "../assets/react.svg";

function Navbar() {
  const { cartItems } = useCart();
  const location = useLocation();

  // Hide navbar on login/signup
  if (location.pathname === "/login" || location.pathname === "/signup") {
    return null;
  }

  // Total cart quantity
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* 🐾 Logo */}
        <Link
          to="/home"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <img src={logo} alt="PawSmart Logo" className="h-8 w-8" />
          <span className="text-indigo-600 font-bold text-xl tracking-tight">
            PawSmart
          </span>
        </Link>

        {/* 🔍 Center Search (Hidden on Mobile) */}
        <div className="hidden md:flex flex-1 justify-center">
          <input
            type="text"
            placeholder="Search for food, toys, grooming..."
            className="w-full max-w-md px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* 🧭 Navigation Links */}
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link
            to="/home#categories"
            className="hover:text-indigo-600 transition"
          >
            Categories
          </Link>

          <Link to="/breed" className="hover:text-indigo-600 transition">
            AI Features
          </Link>

          <Link
            to="/cart"
            className="relative p-2 rounded hover:bg-gray-100 transition"
          >
            <ShoppingCart size={20} />

            {/* 🛒 Cart Badge */}
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          <Link
            to="/profile"
            className="p-2 rounded hover:bg-gray-100 transition"
          >
            <User size={20} />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
