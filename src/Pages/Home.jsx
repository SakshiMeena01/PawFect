
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../firebase";
import CategoryGrid from "../components/CategoryGrid";
import goldenRetriever from "../assets/golden-retriever.jpg";
import { Brain, Sparkles } from "lucide-react";

function Home() {
  const navigate = useNavigate();
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧠 Smooth scroll for hash navigation
  useEffect(() => {
    const handleHashScroll = () => {
      const id = window.location.hash;
      if (id) {
        const el = document.querySelector(id);
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 100);
        }
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    handleHashScroll();
  }, []);

  // 🐶 Fetch breed-based recommendations
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          setLoading(false);
          return;
        }

        // Find user’s saved breed
        const userRef = collection(db, "users");
        const userSnap = await getDocs(query(userRef, where("email", "==", user.email)));

        if (!userSnap.empty) {
          const userData = userSnap.docs[0].data();
          const userBreed = userData.breed;

          // Fetch recommendations matching that breed
          const categories = ["fashion", "food", "toys", "grooming", "accessories"];
          const recItems = [];

          for (const cat of categories) {
            const q = query(collection(db, `products/${cat}/items`), where("breed", "==", userBreed));
            const snap = await getDocs(q);
            snap.forEach((doc) => recItems.push({ id: doc.id, category: cat, ...doc.data() }));
          }

          setRecommended(recItems);
        }
      } catch (err) {
        console.error("⚠️ Error fetching recommendations:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  return (
    <main className="bg-gray-50 min-h-screen w-full pt-16">
      {/* 🐶 HERO SECTION */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-14 px-6 gap-10">
        <div className="max-w-xl space-y-6">
          <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            💡 Smarter Pet Shopping
          </span>

          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Smart Shopping for{" "}
            <span className="text-indigo-600">Smart Dogs</span>
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            Upload your dog’s photo to get accurate breed predictions and
            personalized product suggestions tailored for your furry friend.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/breed"
              className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Try AI Recognition
            </Link>
            <a
              href="#categories"
              className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition"
            >
              Browse Products
            </a>
          </div>

          <div className="flex flex-wrap gap-10 pt-8 text-sm text-gray-700">
            <Link
              to="/breed"
              className="flex items-center gap-3 cursor-pointer hover:scale-105 transition"
            >
              <Brain className="text-indigo-600" size={22} />
              <div>
                <p className="font-medium">AI Breed Detection</p>
                <p className="text-gray-500 text-xs">
                  94% accuracy using Kaggle datasets
                </p>
              </div>
            </Link>

            <a
              href="#categories"
              className="flex items-center gap-3 cursor-pointer hover:scale-105 transition"
            >
              <Sparkles className="text-green-500" size={22} />
              <div>
                <p className="font-medium">Smart Recommendations</p>
                <p className="text-gray-500 text-xs">
                  Personalized product suggestions
                </p>
              </div>
            </a>
          </div>
        </div>

        <div className="md:w-1/2 flex justify-center relative group">
          <img
            src={goldenRetriever}
            alt="Golden Retriever"
            className="w-[420px] h-[300px] object-cover rounded-2xl shadow-lg group-hover:scale-105 transition duration-500"
          />
          <div className="absolute bottom-4 left-4 bg-white/80 text-gray-700 text-xs px-3 py-1 rounded-md shadow">
            🐕 Golden Retriever — 94% Match
          </div>
        </div>
      </section>

      {/* 🛍️ SELL PRODUCT BUTTON */}
      <section className="text-center py-10 bg-white border-t border-gray-100">
        <button
          onClick={() => navigate("/sell")}
          className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition shadow-md"
        >
          Sell a Product 🛒
        </button>
        <p className="text-gray-500 text-sm mt-2">
          List your pet, food, or accessories for sale on PawFect.
        </p>
      </section>

      {/* 🐾 RECOMMENDED PRODUCTS (IF ANY) */}
      {recommended.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              🐾 Recommended for Your Pet
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {recommended.map((p) => (
                <div
                  key={p.id}
                  className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4"
                >
                  <div className="flex items-center justify-center h-40 bg-gray-50 rounded-md">
                    <img
                      src={p.images?.[0]}
                      alt={p.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold mt-3 text-gray-800">{p.name}</h3>
                  <p className="text-gray-500 text-sm mb-1">{p.brand}</p>
                  <p className="text-indigo-600 font-semibold">₹{p.price}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 🛒 CATEGORY GRID */}
      <section
        id="categories"
        className="scroll-mt-20 bg-white py-12 border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <CategoryGrid />
        </div>
      </section>

      {/* 🐾 CTA SECTION */}
      <section className="bg-indigo-600 text-white py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-semibold mb-3">
            Because Every Pet Deserves the Best 🐾
          </h2>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Experience personalized shopping powered by AI. Get products
            perfectly suited for your pet’s breed and needs.
          </p>
          <a
            href="#categories"
            className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
          >
            Start Shopping
          </a>
        </div>
      </section>
    </main>
  );
}

export default Home;