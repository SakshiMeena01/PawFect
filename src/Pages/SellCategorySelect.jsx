// // src/pages/SellCategorySelect.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import fashion from "../assets/fashion.jpg";
// import food from "../assets/food.jpg";
// import grooming from "../assets/grooming.jpg";
// import toys from "../assets/toys.jpg";
// import pet from "../assets/golden-retriever.jpg";

// const categories = [
//   { id: "fashion", name: "Fashion & Apparel", image: fashion },
//   { id: "food", name: "Premium Food & Nutrition", image: food },
//   { id: "grooming", name: "Grooming & Care", image: grooming },
//   { id: "toys", name: "Interactive Toys & Games", image: toys },
//   { id: "pet", name: "Pets for Sale", image: pet },
// ];

// export default function SellCategorySelect() {
//   const navigate = useNavigate();

//   return (
//     <div className="pt-24 max-w-6xl mx-auto px-6">
//       <h1 className="text-3xl font-bold text-center mb-10">
//         What do you want to sell? 🐶
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {categories.map((cat) => (
//           <div
//             key={cat.id}
//             onClick={() => navigate(`/sell/${cat.id}`)}
//             className="cursor-pointer group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100"
//           >
//             <img
//               src={cat.image}
//               alt={cat.name}
//               className="h-48 w-full object-cover group-hover:scale-105 transition"
//             />
//             <div className="p-4 text-center">
//               <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
//                 {cat.name}
//               </h2>
//               <p className="text-gray-500 text-sm mt-1">Click to continue →</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// src/pages/SellCategorySelect.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import fashion from "../assets/fashion.jpg";
import food from "../assets/food.jpg";
import grooming from "../assets/grooming.jpg";
import toys from "../assets/toys.jpg";
import pet from "../assets/golden-retriever.jpg";

const categories = [
  { id: "fashion", name: "Fashion & Apparel", image: fashion, desc: "Trendy outfits and accessories for every breed." },
  { id: "food", name: "Premium Food & Nutrition", image: food, desc: "Healthy, breed-specific food & treats." },
  { id: "grooming", name: "Grooming & Care", image: grooming, desc: "Shampoos, brushes, and hygiene essentials." },
  { id: "toys", name: "Interactive Toys & Games", image: toys, desc: "Fun toys that keep pets active and happy." },
  { id: "pet", name: "Pets for Sale", image: pet, desc: "Find or list adorable pets for loving homes." },
];

export default function SellCategorySelect() {
  const navigate = useNavigate();

  return (
    <div className="pt-24 max-w-6xl mx-auto px-6">
      {/* 🐶 Heading */}
      <div className="text-center mb-10 space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">
          What do you want to sell? 🐶
        </h1>
        <p className="text-gray-500 text-sm">
          Choose a category below and upload your product.  
          Don’t forget to mention your pet’s breed for accurate recommendations!
        </p>
      </div>

      {/* 📦 Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => navigate(`/sell/${cat.id}`)}
            className="cursor-pointer group bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden border border-gray-100 relative"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="h-48 w-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div className="p-5 text-center">
              <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                {cat.name}
              </h2>
              <p className="text-gray-500 text-sm mt-1">{cat.desc}</p>
              <p className="text-indigo-500 text-sm font-medium mt-2 opacity-0 group-hover:opacity-100 transition">
                Click to upload →
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🐾 Breed Info Reminder */}
      <div className="mt-10 bg-indigo-50 border border-indigo-100 p-5 rounded-lg text-center">
        <p className="text-indigo-700 text-sm font-medium">
          💡 Tip: When uploading your product, make sure to include your pet’s breed (e.g., Beagle, Labrador).
          <br />
          This helps PawFect recommend the best items to other pet owners!
        </p>
      </div>
    </div>
  );
}
