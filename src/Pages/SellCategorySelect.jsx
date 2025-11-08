// src/pages/SellCategorySelect.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import fashion from "../assets/fashion.jpg";
import food from "../assets/food.jpg";
import grooming from "../assets/grooming.jpg";
import toys from "../assets/toys.jpg";
import pet from "../assets/golden-retriever.jpg";

const categories = [
  { id: "fashion", name: "Fashion & Apparel", image: fashion },
  { id: "food", name: "Premium Food & Nutrition", image: food },
  { id: "grooming", name: "Grooming & Care", image: grooming },
  { id: "toys", name: "Interactive Toys & Games", image: toys },
  { id: "pet", name: "Pets for Sale", image: pet },
];

export default function SellCategorySelect() {
  const navigate = useNavigate();

  return (
    <div className="pt-24 max-w-6xl mx-auto px-6">
      <h1 className="text-3xl font-bold text-center mb-10">
        What do you want to sell? 🐶
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/sell/${cat.id}`)}
            className="cursor-pointer group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-48 w-full object-cover group-hover:scale-105 transition"
            />
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
                {cat.name}
              </h2>
              <p className="text-gray-500 text-sm mt-1">Click to continue →</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
