import React from "react";
import { Link } from "react-router-dom";
import { productsData } from "../data/productsData";

function CategoryGrid() {
  return (
    <section className="max-w-7xl mx-auto py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Shop by Category
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {productsData.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <img
              src={product.image || product.images?.[0]}
              alt={product.category}
              className="h-48 w-full object-cover rounded-t-xl"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg">{product.category}</h3>
              <p className="text-gray-500 text-sm">{product.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default CategoryGrid;
