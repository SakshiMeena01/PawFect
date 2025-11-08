
// import React from "react";
// import { useLocation } from "react-router-dom";

// function ProductDetail() {
//   const { state } = useLocation();
//   const product = state?.product;

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
//             {product.images?.length > 1 && (
//               <div className="flex gap-3 mt-3">
//                 {product.images.map((img, i) => (
//                   <img
//                     key={i}
//                     src={img}
//                     alt={`View ${i + 1}`}
//                     className="w-20 h-20 object-cover rounded border hover:scale-105 transition"
//                   />
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="flex-1 space-y-4">
//             <p className="text-gray-600">{product.description}</p>
//             <p className="text-lg font-semibold">
//               Price: ₹{product.price}
//               {product.oldPrice && (
//                 <span className="ml-2 text-gray-400 line-through">
//                   ₹{product.oldPrice}
//                 </span>
//               )}
//             </p>

//             {product.attributes?.sizes && (
//               <div>
//                 <p className="font-semibold">Available Sizes:</p>
//                 <div className="flex gap-2 mt-1">
//                   {product.attributes.sizes.map((s, i) => (
//                     <span
//                       key={i}
//                       className="px-3 py-1 border rounded text-sm text-gray-700"
//                     >
//                       {s}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { state } = useLocation();
  const product = state?.product;
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  if (!product)
    return (
      <div className="pt-24 text-center text-gray-600">
        Product not found 😢
      </div>
    );

  return (
    <div className="pt-24 max-w-5xl mx-auto px-6">
      <h2 className="text-3xl font-bold mb-6">{product.name}</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left: Images */}
          <div className="flex-1">
            <img
              src={product.images?.[0]}
              alt={product.name}
              className="w-full h-80 object-cover rounded"
            />
            {product.images?.length > 1 && (
              <div className="flex gap-3 mt-3">
                {product.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Preview ${i + 1}`}
                    className="w-20 h-20 object-cover rounded border hover:scale-105 transition"
                  />
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex-1 space-y-4">
            <p className="text-gray-600">{product.description}</p>
            <p className="text-lg font-semibold">
              Price: ₹{product.price}
              {product.oldPrice && (
                <span className="ml-2 text-gray-400 line-through">
                  ₹{product.oldPrice}
                </span>
              )}
            </p>

            {/* Size selector if available */}
            {product.attributes?.sizes?.length > 0 && (
              <div>
                <p className="font-semibold mb-1">Select Size:</p>
                <div className="flex gap-2">
                  {product.attributes.sizes.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedSize(s)}
                      className={`px-3 py-1 rounded border ${
                        selectedSize === s
                          ? "bg-indigo-600 text-white"
                          : "border-gray-300 text-gray-700"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity selector */}
            <div className="flex items-center gap-3">
              <p className="font-semibold">Quantity:</p>
              <div className="flex items-center border rounded">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 text-lg"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 text-lg"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={() => addToCart(product, quantity, selectedSize)}
              className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
