// src/pages/CategoryProducts.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { db, auth } from "../firebase";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { Sparkles, Filter, ArrowDownWideNarrow } from "lucide-react";

export default function CategoryProducts() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [breedFilter, setBreedFilter] = useState("all");
  const [sortOption, setSortOption] = useState("newest");
  const [userBreed, setUserBreed] = useState("");

  const allBreeds = [
    "all",
    "beagle",
    "labrador",
    "golden retriever",
    "pug",
    "german shepherd",
    "husky",
    "bulldog",
    "pomeranian",
    "rottweiler",
  ];

  // 🐾 Fetch user breed (if logged in)
  useEffect(() => {
    const fetchUserBreed = async () => {
      const user = auth.currentUser;
      if (!user) return;
      try {
        const snap = await getDocs(
          query(collection(db, "users"), where("email", "==", user.email))
        );
        if (!snap.empty) {
          const breed = snap.docs[0].data().breed;
          setUserBreed(breed);
          setBreedFilter(breed || "all");
        }
      } catch (err) {
        console.error("Error fetching user breed:", err);
      }
    };
    fetchUserBreed();
  }, []);

  // 🛍 Fetch category products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let ref = collection(db, `products/${category}/items`);
        let q;

        // Apply breed filter & sorting
        if (breedFilter !== "all") {
          q = query(ref, where("breed", "==", breedFilter));
        } else {
          q = query(ref);
        }

        const snap = await getDocs(q);
        let items = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Sort locally after fetching
        if (sortOption === "lowToHigh") {
          items.sort((a, b) => a.price - b.price);
        } else if (sortOption === "highToLow") {
          items.sort((a, b) => b.price - a.price);
        } else if (sortOption === "newest") {
          items.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
        }

        setProducts(items);
      } catch (err) {
        console.error("Error fetching category items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, breedFilter, sortOption]);

  // 🌟 Fetch Recommended (Breed-based)
  useEffect(() => {
    const fetchRecommended = async () => {
      if (!userBreed) return;
      try {
        const ref = collection(db, `products/${category}/items`);
        const q = query(ref, where("breed", "==", userBreed));
        const snap = await getDocs(q);
        const rec = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecommended(rec);
      } catch (err) {
        console.error("Error fetching recommended:", err);
      }
    };
    fetchRecommended();
  }, [userBreed, category]);

  // 🕓 Loading State
  if (loading)
    return (
      <div className="flex justify-center py-24">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
      {/* 🔹 Header and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-3xl font-bold capitalize text-gray-900">
          {category} Products 🛍️
        </h1>

        <div className="flex flex-wrap gap-4">
          {/* Breed Filter */}
          <div className="flex items-center gap-2">
            <Filter size={18} className="text-indigo-500" />
            <select
              value={breedFilter}
              onChange={(e) => setBreedFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500"
            >
              {allBreeds.map((b) => (
                <option key={b} value={b}>
                  {b === "all" ? "All Breeds" : b}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Option */}
          <div className="flex items-center gap-2">
            <ArrowDownWideNarrow size={18} className="text-green-500" />
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-green-500"
            >
              <option value="newest">Newest First</option>
              <option value="lowToHigh">Price: Low → High</option>
              <option value="highToLow">Price: High → Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* 🐾 Product Grid */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500 py-10">
          No products found for this breed 😿
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 border border-gray-100"
            >
              <div className="relative">
                <img
                  src={p.images?.[0]}
                  alt={p.name}
                  className="h-56 w-full object-cover rounded-t-xl"
                />
              </div>

              <div className="p-5">
                <p className="text-xs text-indigo-500 font-semibold uppercase tracking-wide mb-1">
                  {p.breed || "All Breeds"}
                </p>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition line-clamp-2">
                  {p.name}
                </h3>

                <div className="flex items-center gap-2 mt-2">
                  <p className="text-xl font-bold text-gray-900">
                    ₹{p.price}
                  </p>
                  {p.oldPrice && (
                    <p className="text-sm line-through text-gray-400">
                      ₹{p.oldPrice}
                    </p>
                  )}
                </div>

                <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                  {p.description}
                </p>

                <Link
                  to={`/product/${p.id}`}
                  state={{ product: p, category }}
                  className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition w-full"
                >
                  View Product
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🌟 Recommended Section */}
      {recommended.length > 0 && (
        <section className="mt-20 bg-indigo-50 rounded-xl p-8 shadow-inner">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="text-indigo-600" size={22} />
            <h2 className="text-2xl font-semibold text-gray-800">
              Recommended for your {userBreed} 🐾
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recommended.slice(0, 4).map((p) => (
              <div
                key={p.id}
                className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4"
              >
                <img
                  src={p.images?.[0]}
                  alt={p.name}
                  className="w-full h-44 object-cover rounded-md"
                />
                <h3 className="font-semibold mt-3 text-gray-800">{p.name}</h3>
                <p className="text-gray-500 text-sm mb-1">
                  {p.breed || "All breeds"}
                </p>
                <p className="text-indigo-600 font-semibold mb-2">
                  ₹{p.price}
                </p>

                <Link
                  to={`/product/${p.id}`}
                  state={{ product: p, category }}
                  className="bg-indigo-600 text-white block py-2 rounded text-center hover:bg-indigo-700 transition"
                >
                  View Product
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
