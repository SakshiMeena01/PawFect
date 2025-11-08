// import React from "react";
// import { useParams } from "react-router-dom";
// import golden from "../assets/golden-retriever.jpg";

// function ProductDetail() {
//   const { id } = useParams();

//   return (
//     <div className="pt-24 max-w-5xl mx-auto px-6">
//       <h2 className="text-3xl font-bold mb-6">Product Details (ID: {id})</h2>
//       <div className="bg-white p-6 rounded-lg shadow">
//         <img src={golden} className="w-full h-80 object-cover rounded mb-6" alt="product" />
//         <p className="text-gray-600 mb-4">
//           Smart Collar with GPS & Health Monitoring
//         </p>
//         <p className="text-lg font-semibold mb-4">$149.99</p>
//         <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductDetail;
import React, { useState } from "react";
import { useParams } from "react-router-dom";


// 🖼 Import your local images
import fashionImg from "../assets/fashion.jpg";
import foodImg from "../assets/food.jpg";
import groomingImg from "../assets/grooming.jpg";
import toysImg from "../assets/toys.jpg";
import { useCart } from "../context/CartContext";


function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();


  // 🧩 Local temp data using your local images
  const productsData = [
    {
      id: "1",
      brand: "Zigly Lifestyle",
      name: "ZL Winterized Crimson Cozy Red Cable Knit Dog Sweater",
      category: "Fashion & Apparel",
      price: 1049,
      oldPrice: 1499,
      discount: "30% OFF",
      description:
        "Keep your dog warm and stylish with this cozy red cable-knit sweater. Made from soft acrylic yarn for comfort and warmth during winter walks.",
      sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL"],
      images: [
        fashionImg,
        fashionImg,
        fashionImg // You can later replace these with actual side/top view pics
      ]
    },
    {
      id: "2",
      name: "Premium Dog Food - Chicken & Rice",
      category: "Premium Food & Nutrition",
      price: 799,
      description: "Nutritious and tasty meal for all breeds.",
      image: foodImg
    },
    {
      id: "3",
      name: "Dog Grooming Kit - Clippers & Brush Combo",
      category: "Grooming & Care",
      price: 599,
      description: "Professional grooming kit with clippers and brush.",
      image: groomingImg
    },
    {
      id: "4",
      name: "Interactive Dog Toys - Ball & Rope Combo",
      category: "Interactive Toys & Games",
      price: 499,
      description: "Fun and safe toys to keep your pets active and playful.",
      image: toysImg
    }
  ];

  const product = productsData.find((p) => p.id === id);

  // 🧠 State hooks
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes ? product.sizes[0] : null
  );
  const [mainImage, setMainImage] = useState(
  product?.images?.[0] || product?.image
);

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="pt-24 text-center text-gray-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="pt-24 max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-10">
        {/* 🖼️ Left Section */}
        <div className="md:w-1/2 flex flex-col items-center">
          <img
            src={mainImage}
            alt={product.name}
            className="w-[400px] h-[400px] object-cover rounded-lg shadow-lg mb-4"
          />

          {/* 👕 Multiple views for Fashion */}
          {product.category === "Fashion & Apparel" && (
            <div className="flex gap-3 flex-wrap justify-center">
              {product.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`View ${index + 1}`}
                  onClick={() => setMainImage(img)}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer border ${
                    mainImage === img ? "border-blue-600" : "border-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* 📋 Right Section */}
        <div className="md:w-1/2">
          {product.brand && (
            <h3 className="text-xl text-gray-600">{product.brand}</h3>
          )}
          <h1 className="text-3xl font-bold mt-1 text-gray-800">
            {product.name}
          </h1>

          {/* 💰 Price */}
          <div className="mt-3 flex items-center gap-2">
  {product.oldPrice && (
    <span className="text-gray-500 line-through text-lg">
      ₹{product.oldPrice * quantity}
    </span>
  )}
  <span className="text-3xl font-semibold text-red-600">
    ₹{product.price * quantity}
  </span>
  {product.discount && (
    <span className="bg-red-100 text-red-600 text-sm px-2 py-1 rounded">
      {product.discount}
    </span>
  )}
</div>


          <p className="mt-4 text-gray-700 leading-relaxed">
            {product.description}
          </p>

          {/* 🧵 Size options only for Fashion */}
          {product.category === "Fashion & Apparel" && product.sizes && (
            <div className="mt-6">
              <h2 className="font-medium text-gray-800">Select Size:</h2>
              <div className="flex flex-wrap gap-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm ${
                      selectedSize === size
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ➕ Quantity Selector */}
          <div className="mt-6 flex items-center gap-4">
            <button
              className="px-3 py-1 border rounded-md text-lg"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </button>
            <span className="text-lg">{quantity}</span>
            <button
              className="px-3 py-1 border rounded-md text-lg"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          {/* 🛒 Add to Cart */}
          <button
  onClick={() => addToCart(product, quantity, selectedSize)}
  className="mt-8 bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition"
>
  Add to Cart
</button>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
