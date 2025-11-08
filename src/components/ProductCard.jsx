import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden transform hover:-translate-y-1">
      <div className="relative">
        <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
        {product.tag && (
          <span className="absolute top-3 left-3 bg-indigo-500 text-white text-xs px-2 py-1 rounded">
            {product.tag}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-1">${product.price.toFixed(2)}</p>
        <p className="text-gray-400 line-through text-sm">${product.oldPrice}</p>
        <p className="text-yellow-500 text-sm mb-2">⭐ {product.rating}</p>
        <Link
          to={`/product/${product.id}`}
          className="bg-indigo-600 text-white w-full block py-2 rounded text-center hover:bg-indigo-700 transition"
        >
          Add to Cart
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
