
// import React, { useEffect, useState } from "react";
// import { useLocation, useParams } from "react-router-dom";
// import { db } from "../firebase";
// import { doc, getDoc } from "firebase/firestore";
// import { useCart } from "../context/CartContext";

// function ProductDetail() {
//   const { id } = useParams();
//   const { state } = useLocation();
//   const [product, setProduct] = useState(state?.product || null);
//   const [loading, setLoading] = useState(!state);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     const fetchProduct = async () => {
//       if (state?.product) return;

//       const categories = ["fashion", "food", "toys", "grooming", "pet"];
//       for (const cat of categories) {
//         const ref = doc(db, `products/${cat}/items/${id}`);
//         const snap = await getDoc(ref);
//         if (snap.exists()) {
//           setProduct({ id: snap.id, ...snap.data() });
//           break;
//         }
//       }
//       setLoading(false);
//     };

//     fetchProduct();
//   }, [id, state]);

//   if (loading) return <p className="pt-24 text-center">Loading...</p>;
//   if (!product)
//     return (
//       <div className="pt-24 text-center text-gray-600">
//         Product not found 😢
//       </div>
//     );

//   return (
//     <div className="pt-24 max-w-5xl mx-auto px-6">
//       <h2 className="text-3xl font-bold mb-6">{product.name}</h2>
//       <div className="bg-white p-6 rounded-lg shadow">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="flex-1">
//             <img
//               src={product.images?.[0]}
//               alt={product.name}
//               className="w-full h-80 object-cover rounded"
//             />
//           </div>
//           <div className="flex-1 space-y-4">
//             <p className="text-gray-600">{product.description}</p>
//             <p className="text-lg font-semibold text-indigo-600">
//               ₹{product.price}
//             </p>
//             <p className="text-sm text-gray-500">Breed: {product.breed}</p>

//             <button
//               onClick={() => addToCart(product, 1)}
//               className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
//             >
//               Add to Cart 🛒
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;
// src/pages/ProductDetail.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { Heart, ShoppingCart, Share2, Minus, Plus } from "lucide-react";

function ProductDetail() {
  const { state } = useLocation();
  const product = state?.product;
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images?.[0] || "");

  if (!product)
    return (
      <div className="pt-24 text-center text-gray-600 text-lg">
        Product not found 😢
      </div>
    );

  return (
    <div className="pt-24 pb-20 max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* 🖼 Product Image Gallery */}
        <div className="flex-1">
          {/* Main Image */}
          <div className="relative">
            <img
              src={mainImage}
              alt={product.name}
              className="w-full h-[480px] object-cover rounded-2xl shadow-md transition-all duration-300"
            />
          </div>

          {/* Thumbnail Gallery */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 mt-4 justify-center md:justify-start">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition transform hover:scale-105 ${
                    mainImage === img
                      ? "border-indigo-500 ring-2 ring-indigo-400"
                      : "border-gray-200"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 📄 Product Details */}
        <div className="flex-1 space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-gray-500 text-sm mt-1">
              Sold by:{" "}
              <span className="font-medium">
                {product.sellerName || "Unknown Seller"}
              </span>
            </p>
          </div>

          {/* 💸 Price */}
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-indigo-600">₹{product.price}</p>
            {product.oldPrice && (
              <p className="text-gray-400 line-through text-lg">₹{product.oldPrice}</p>
            )}
          </div>

          {/* 🐶 Breed Info */}
          <div className="text-gray-600 space-y-1">
            {product.breed && (
              <p>
                <span className="font-semibold text-gray-800">Breed:</span>{" "}
                {product.breed}
              </p>
            )}
            {product.stock && (
              <p>
                <span className="font-semibold text-gray-800">Stock:</span>{" "}
                {product.stock} items left
              </p>
            )}
            {product.category && (
              <p>
                <span className="font-semibold text-gray-800">Category:</span>{" "}
                {product.category}
              </p>
            )}
          </div>

          {/* 📏 Sizes */}
          {product.attributes?.sizes?.length > 0 && (
            <div>
              <p className="font-semibold mb-2 text-gray-800">Select Size:</p>
              <div className="flex flex-wrap gap-2">
                {product.attributes.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md transition ${
                      selectedSize === size
                        ? "bg-indigo-600 text-white"
                        : "border-gray-300 text-gray-700 hover:border-indigo-500"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 🔢 Quantity Selector */}
          <div className="flex items-center gap-3">
            <p className="font-semibold text-gray-800">Quantity:</p>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-lg hover:bg-gray-100"
              >
                <Minus size={18} />
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-lg hover:bg-gray-100"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* 🛒 Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              onClick={() => addToCart(product, quantity, selectedSize)}
              className="bg-indigo-600 text-white flex items-center gap-2 px-6 py-3 rounded-lg hover:bg-indigo-700 transition font-medium"
            >
              <ShoppingCart size={20} /> Add to Cart
            </button>

            <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition">
              Buy Now
            </button>

            <button className="p-3 rounded-full border hover:bg-pink-100 hover:border-pink-400 transition">
              <Heart size={20} className="text-pink-500" />
            </button>
            <button className="p-3 rounded-full border hover:bg-gray-100 transition">
              <Share2 size={20} className="text-gray-600" />
            </button>
          </div>

          {/* 📝 Description */}
          {product.description && (
            <div className="mt-6 border-t pt-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Product Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
