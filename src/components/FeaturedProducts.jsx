// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { db } from "../firebase";
// import { collection, onSnapshot } from "firebase/firestore";
// import { ShoppingBag } from "lucide-react";

// const categories = [
//   { id: "fashion", name: "Fashion & Apparel" },
//   { id: "food", name: "Premium Food & Nutrition" },
//   { id: "grooming", name: "Grooming & Care" },
//   { id: "toys", name: "Interactive Toys & Games" },
//   { id: "pet", name: "Pets for Sale" },
// ];

// export default function FeaturedProducts() {
//   const [categoryData, setCategoryData] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribes = categories.map((cat) => {
//       const ref = collection(db, `products/${cat.id}/items`);
//       return onSnapshot(
//         ref,
//         (snapshot) => {
//           setCategoryData((prev) => ({
//             ...prev,
//             [cat.id]: snapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//             })),
//           }));
//         },
//         (error) => {
//           console.error(`❌ Error fetching ${cat.id}:`, error);
//         }
//       );
//     });

//     const timer = setTimeout(() => setLoading(false), 1000);
//     return () => {
//       unsubscribes.forEach((unsub) => unsub());
//       clearTimeout(timer);
//     };
//   }, []);

//   if (loading)
//     return (
//       <div className="flex justify-center py-20">
//         <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
//       </div>
//     );

//   const totalProducts = Object.values(categoryData).flat().length;
//   if (totalProducts === 0)
//     return (
//       <div className="text-center py-20 text-gray-600">
//         No products found. Upload something new!
//       </div>
//     );

//   return (
//     <section className="max-w-7xl mx-auto py-16 px-6 bg-gray-50">
//       <div className="text-center mb-10">
//         <h2 className="text-3xl font-bold text-gray-900">✨ Featured Products</h2>
//         <p className="text-gray-500 text-sm mt-2">
//           Browse trending items from all categories 🐾
//         </p>
//       </div>

//       {categories.map((cat) => {
//         const products = categoryData[cat.id] || [];
//         if (products.length === 0) return null;

//         return (
//           <div key={cat.id} className="mb-16">
//             <h3 className="text-2xl font-semibold mb-6 text-indigo-600">
//               {cat.name}
//             </h3>

//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//               {products.map((product) => (
//                 <Link
//                   key={product.id}
//                   to={`/product/${cat.id}/${product.id}`} // ✅ Pass both category + id
//                   className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 border border-gray-100"
//                 >
//                   {/* Image */}
//                   <div className="relative overflow-hidden rounded-t-xl">
//                     <img
//                       src={product.images?.[0]}
//                       alt={product.name}
//                       className="h-56 w-full object-cover rounded-t-xl transition-transform duration-500 group-hover:scale-105"
//                     />
//                   </div>

//                   {/* Product Info */}
//                   <div className="p-5">
//                     <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wide mb-1">
//                       {cat.name}
//                     </p>
//                     <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition line-clamp-2">
//                       {product.name}
//                     </h3>

//                     <div className="flex items-center gap-2 mt-2">
//                       <p className="text-xl font-bold text-gray-900">
//                         ₹{product.price}
//                       </p>
//                       {product.oldPrice && (
//                         <p className="text-sm line-through text-gray-400">
//                           ₹{product.oldPrice}
//                         </p>
//                       )}
//                     </div>

//                     <p className="text-gray-500 text-sm mt-2 line-clamp-2">
//                       {product.description}
//                     </p>

//                     <div className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition w-full">
//                       <ShoppingBag size={16} />
//                       View Product
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         );
//       })}
//     </section>
//   );
// }
