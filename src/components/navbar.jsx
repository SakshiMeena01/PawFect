// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, PawPrint, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import logo from "../assets/react.svg";

export default function Navbar() {
  const { cartItems } = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Hide navbar on login/signup
  if (["/login", "/signup"].includes(location.pathname)) return null;

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: "Home", to: "/home" },
    { name: "Shop", to: "/home#categories" },
    { name: "AI Breed Match", to: "/breed" },
    { name: "Sell", to: "/sell" },
  ];

  return (
    <header className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-[95%] md:w-[90%] bg-white/70 backdrop-blur-lg border border-gray-100 rounded-full shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        {/* 🐾 Logo */}
        <Link
          to="/home"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <div className="flex items-center gap-2">
            <PawPrint className="text-indigo-600" size={24} />
            <span className="font-bold text-indigo-600 text-xl tracking-tight">
              PawSmart
            </span>
          </div>
        </Link>

        {/* 🔍 Search bar */}
        <div className="hidden md:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full w-72 focus-within:ring-2 focus-within:ring-indigo-500 transition">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search toys, food, grooming..."
            className="bg-transparent outline-none text-sm w-full placeholder-gray-500"
          />
        </div>

        {/* 🧭 Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-[15px] font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.to}
              className="relative group text-gray-700 hover:text-indigo-600 transition"
            >
              {link.name}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-indigo-600 transition-all group-hover:w-full"></span>
            </Link>
          ))}

          {/* 🛒 Cart */}
          <Link
            to="/cart"
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center shadow">
                {totalItems}
              </span>
            )}
          </Link>

          {/* 👤 Profile Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
          >
            <button className="p-2 rounded-full hover:bg-gray-100 transition flex items-center gap-2">
              <User size={20} />
            </button>

            {showProfile && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-100 rounded-lg shadow-md w-40 p-2 text-sm animate-fadeIn">
                <Link
                  to="/profile"
                  className="block px-3 py-2 hover:bg-gray-50 rounded-md"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="block px-3 py-2 hover:bg-gray-50 rounded-md"
                >
                  My Orders
                </Link>
                <Link
                  to="/logout"
                  className="block px-3 py-2 text-red-500 hover:bg-gray-50 rounded-md"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* 📱 Mobile Toggle */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* 📱 Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 rounded-b-2xl shadow-lg animate-slideDown">
          <nav className="flex flex-col p-4 space-y-4 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.to}
                className="text-gray-700 hover:text-indigo-600 transition"
                onClick={() => setMobileOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/cart"
              className="flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <ShoppingCart size={18} /> Cart
              {totalItems > 0 && (
                <span className="ml-auto bg-indigo-600 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link
              to="/profile"
              className="flex items-center gap-2"
              onClick={() => setMobileOpen(false)}
            >
              <User size={18} /> Profile
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
