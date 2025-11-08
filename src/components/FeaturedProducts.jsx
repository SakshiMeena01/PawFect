import React from "react";
import { Link } from "react-router-dom";
import { productsData } from "../data/productsData";
import { ShoppingBag } from "lucide-react";

function FeaturedProducts() {
  return (
    <section className="max-w-7xl mx-auto py-16 px-6 bg-gray-50">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
        <p className="text-gray-500 mt-2 text-sm">
          Handpicked favorites your furry friends will love 🐶
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productsData.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={product.image || product.images?.[0]}
                alt={product.name}
                className="h-56 w-full object-cover rounded-t-xl"
              />

              {/* Discount Badge */}
              {product.discount && (
                <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                  {product.discount}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Category & Name */}
              <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wide mb-1">
                {product.category}
              </p>
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition line-clamp-2">
                {product.name}
              </h3>

              {/* Price Section */}
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

              {/* Description */}
              <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                {product.description}
              </p>

              {/* Action Button */}
              <Link
                to={`/product/${product.id}`}
                className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition w-full"
              >
                <ShoppingBag size={16} />
                View Product
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All CTA */}
      <div className="text-center mt-12">
        <Link
          to="/home#categories"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Browse All Categories
        </Link>
      </div>
    </section>
  );
}

export default FeaturedProducts;
