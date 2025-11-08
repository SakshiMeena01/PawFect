// import React from "react";
// import { Link } from "react-router-dom";
// import { productsData } from "../data/productsData";
// import { ShoppingBag } from "lucide-react";

// function FeaturedProducts() {
//   return (
//     <section className="max-w-7xl mx-auto py-16 px-6 bg-gray-50">
//       {/* Header */}
//       <div className="text-center mb-12">
//         <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
//         <p className="text-gray-500 mt-2 text-sm">
//           Handpicked favorites your furry friends will love 🐶
//         </p>
//       </div>

//       {/* Product Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {productsData.map((product) => (
//           <div
//             key={product.id}
//             className="group bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100"
//           >
//             {/* Image */}
//             <div className="relative">
//               <img
//                 src={product.image || product.images?.[0]}
//                 alt={product.name}
//                 className="h-56 w-full object-cover rounded-t-xl"
//               />

//               {/* Discount Badge */}
//               {product.discount && (
//                 <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
//                   {product.discount}
//                 </span>
//               )}
//             </div>

//             {/* Content */}
//             <div className="p-5">
//               {/* Category & Name */}
//               <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wide mb-1">
//                 {product.category}
//               </p>
//               <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition line-clamp-2">
//                 {product.name}
//               </h3>

//               {/* Price Section */}
//               <div className="flex items-center gap-2 mt-2">
//                 <p className="text-xl font-bold text-gray-900">
//                   ₹{product.price}
//                 </p>
//                 {product.oldPrice && (
//                   <p className="text-sm line-through text-gray-400">
//                     ₹{product.oldPrice}
//                   </p>
//                 )}
//               </div>

//               {/* Description */}
//               <p className="text-gray-500 text-sm mt-2 line-clamp-2">
//                 {product.description}
//               </p>

//               {/* Action Button */}
//               <Link
//                 to={`/product/${product.id}`}
//                 className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition w-full"
//               >
//                 <ShoppingBag size={16} />
//                 View Product
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* View All CTA */}
//       <div className="text-center mt-12">
//         <Link
//           to="/home#categories"
//           className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
//         >
//           Browse All Categories
//         </Link>
//       </div>
//     </section>
//   );
// }

// export default FeaturedProducts;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import { ShoppingBag } from "lucide-react";

const categories = [
  { id: "fashion", name: "Fashion & Apparel" },
  { id: "food", name: "Premium Food & Nutrition" },
  { id: "grooming", name: "Grooming & Care" },
  { id: "toys", name: "Interactive Toys & Games" },
  { id: "pet", name: "Pets for Sale" },
];

export default function FeaturedProducts() {
  const [categoryData, setCategoryData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for each category
    const unsubscribes = categories.map((cat) => {
      const ref = collection(db, `products/${cat.id}/items`);
      return onSnapshot(
        ref,
        (snapshot) => {
          setCategoryData((prev) => ({
            ...prev,
            [cat.id]: snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            })),
          }));
        },
        (error) => {
          console.error(`❌ Error fetching ${cat.id}:`, error);
        }
      );
    });

    // Stop loading once first data arrives
    const timer = setTimeout(() => setLoading(false), 1000);

    return () => {
      unsubscribes.forEach((unsub) => unsub());
      clearTimeout(timer);
    };
  }, []);

  // Loader
  if (loading)
    return (
      <div className="flex justify-center py-20">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  // If no data at all
  const totalProducts = Object.values(categoryData).flat().length;
  if (totalProducts === 0)
    return (
      <div className="text-center py-20 text-gray-600">
        No products found. Upload something new!
      </div>
    );

  return (
    <section className="max-w-7xl mx-auto py-16 px-6 bg-gray-50">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
        <p className="text-gray-500 text-sm mt-2">
          Live products uploaded by sellers 🐾
        </p>
      </div>

      {categories.map((cat) => {
        const products = categoryData[cat.id] || [];
        if (products.length === 0) return null;

        return (
          <div key={cat.id} className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-indigo-600">
              {cat.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="group bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100"
                >
                  {/* Image */}
                  <div className="relative">
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="h-56 w-full object-cover rounded-t-xl"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wide mb-1">
                      {cat.name}
                    </p>
                    <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition line-clamp-2">
                      {product.name}
                    </h3>

                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-xl font-bold text-gray-900">
                        ₹{product.price}
                      </p>
                      {product.oldPrice && (
                        <p className="text-sm line-through text-gray-400">
                          ₹{product.oldPrice}
                        </p>
                      )}
                    </div>

                    <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                      {product.description}
                    </p>

                    <Link
                      to={`/product/${product.id}`}
                      state={{ product, category: cat.id }}
                      className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition w-full"
                    >
                      <ShoppingBag size={16} />
                      View Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}
