import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Brand */}
        <div>
          <h3 className="text-lg font-bold text-white mb-3">PawSmart</h3>
          <p className="text-gray-400">
            AI-powered pet shopping made easy and personalized for your furry friend.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Shop</h4>
          <ul className="space-y-1 text-gray-400">
            <li>Food & Nutrition</li>
            <li>Toys & Games</li>
            <li>Clothes & Accessories</li>
            <li>Grooming & Care</li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h4 className="font-semibold mb-3 text-white">AI Features</h4>
          <ul className="space-y-1 text-gray-400">
            <li>Breed Recognition</li>
            <li>AR Try-On</li>
            <li>Smart Recommendations</li>
          </ul>
        </div>

        {/* Subscribe */}
        <div>
          <h4 className="font-semibold mb-3 text-white">Stay Updated</h4>
          <p className="text-gray-400 mb-3">Get the latest AI features & offers.</p>
          <input
            type="email"
            placeholder="Enter your email"
            className="border px-3 py-2 w-full rounded mb-2 text-gray-900"
          />
          <button className="bg-indigo-500 text-white px-4 py-2 rounded w-full hover:bg-indigo-600">
            Subscribe
          </button>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm py-4 border-t border-gray-700">
        © 2025 PawSmart AI. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
