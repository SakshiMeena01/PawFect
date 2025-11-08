
// // import React, { useEffect } from "react";
// // import CategoryGrid from "../components/CategoryGrid";
// // import FeaturedProducts from "../components/FeaturedProducts";
// // import goldenRetriever from "../assets/golden-retriever.jpg";
// // import { Camera, Brain, Sparkles } from "lucide-react";

// // function Home() {
// //   // Smooth scroll to hash sections (e.g., #categories)
// //   useEffect(() => {
// //     const id = window.location.hash;
// //     if (id) {
// //       const el = document.querySelector(id);
// //       if (el) {
// //         setTimeout(() => {
// //           el.scrollIntoView({ behavior: "smooth", block: "start" });
// //         }, 120);
// //         return;
// //       }
// //     }
// //     window.scrollTo({ top: 0 });
// //   }, []);

// //   return (
// //     <main className="bg-gray-50 min-h-screen w-full pt-16">
// //       {/* HERO SECTION */}
// //       <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-14 px-6">
// //         <div className="max-w-xl space-y-6">
// //           <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
// //             💡 AI-Powered Shopping
// //           </span>
// //           <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
// //             Smart Shopping for{" "}
// //             <span className="text-indigo-600">Smart Dogs</span>
// //           </h1>
// //           <p className="text-gray-600 text-lg">
// //             Upload your dog’s photo, get AI breed predictions, and shop
// //             personalized products with AR try-on technology.
// //           </p>

// //           <div className="flex flex-wrap gap-4">
// //             <a
// //               href="/breed"
// //               className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
// //             >
// //               Try AI Recognition
// //             </a>
// //             <a
// //               href="#categories"
// //               className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition"
// //             >
// //               Browse Products
// //             </a>
// //           </div>

// //           {/* Icons Row */}
// //           <div className="flex flex-wrap gap-8 pt-8 text-sm text-gray-700">
// //             <div className="flex items-center gap-2">
// //               <Brain className="text-indigo-600" size={20} />
// //               <div>
// //                 <p className="font-medium">AI Breed Detection</p>
// //                 <p className="text-gray-500 text-xs">
// //                   94% accuracy using Kaggle datasets
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <Sparkles className="text-green-500" size={20} />
// //               <div>
// //                 <p className="font-medium">Smart Recommendations</p>
// //                 <p className="text-gray-500 text-xs">
// //                   Personalized product suggestions
// //                 </p>
// //               </div>
// //             </div>
// //             <div className="flex items-center gap-2">
// //               <Camera className="text-pink-500" size={20} />
// //               <div>
// //                 <p className="font-medium">AR Try-On</p>
// //                 <p className="text-gray-500 text-xs">
// //                   See products on your dog
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Image Section */}
// //         <div className="mt-12 md:mt-0 relative">
// //           <img
// //             src={goldenRetriever}
// //             alt="Golden Retriever"
// //             className="w-[420px] h-[300px] object-cover rounded-2xl shadow-lg"
// //           />
// //           <div className="absolute top-4 right-4 bg-white text-indigo-600 text-xs font-semibold px-3 py-1 rounded-md shadow">
// //             AR Try-On Ready
// //           </div>
// //           <div className="absolute bottom-4 left-4 bg-white text-gray-700 text-xs px-3 py-1 rounded-md shadow">
// //             🐕 Golden Retriever – 94.21% confidence
// //           </div>
// //         </div>
// //       </section>

// //       {/* CATEGORY GRID */}
// //       <section
// //         id="categories"
// //         className="scroll-mt-20 bg-white py-12 border-t border-gray-100"
// //       >
// //         <div className="max-w-7xl mx-auto px-6 text-center">
// //           <h2 className="text-2xl font-bold text-gray-900 mb-2">
// //             Shop by Category
// //           </h2>
// //           <p className="text-gray-500 mb-8">
// //             Discover products tailored to your dog’s specific needs using our
// //             AI-powered recommendations.
// //           </p>
// //           <CategoryGrid />
// //         </div>
// //       </section>

// //       {/* FEATURED PRODUCTS */}
// //       <section className="py-14 bg-gray-50 border-t border-gray-100">
// //         <div className="max-w-7xl mx-auto px-6 text-center">
// //           <h2 className="text-2xl font-bold text-gray-900 mb-3">
// //             Featured Products
// //           </h2>
// //           <p className="text-gray-500 mb-10">
// //             Hand-picked products with AI recommendations and AR try-on
// //             capabilities.
// //           </p>
// //           <FeaturedProducts />
// //         </div>
// //       </section>

// //       {/* CTA SECTION */}
// //       <section className="bg-indigo-600 text-white py-12">
// //         <div className="max-w-7xl mx-auto px-6 text-center">
// //           <h2 className="text-2xl font-semibold mb-3">
// //             Discover the Future of Pet Shopping 🐾
// //           </h2>
// //           <p className="text-indigo-100 mb-5">
// //             Explore our AI-powered features that make shopping for your furry
// //             friend smarter and easier.
// //           </p>
// //           <a
// //             href="/breed"
// //             className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
// //           >
// //             Try AI Breed Recognition
// //           </a>
// //         </div>
// //       </section>
// //     </main>
// //   );
// // }

// // export default Home;
// import React, { useEffect } from "react";
// import CategoryGrid from "../components/CategoryGrid";
// import FeaturedProducts from "../components/FeaturedProducts";
// import fashionImg from "../assets/fashion.jpg";
// import foodImg from "../assets/food.jpg";
// import groomingImg from "../assets/grooming.jpg";
// import toysImg from "../assets/toys.jpg";
// import goldenRetriever from "../assets/golden-retriever.jpg";
// import { Camera, Brain, Sparkles } from "lucide-react";

// function Home() {
//   useEffect(() => {
//     const id = window.location.hash;
//     if (id) {
//       const el = document.querySelector(id);
//       if (el) {
//         setTimeout(() => {
//           el.scrollIntoView({ behavior: "smooth", block: "start" });
//         }, 120);
//         return;
//       }
//     }
//     window.scrollTo({ top: 0 });
//   }, []);

//   // 🐾 Same product dataset as ProductDetail
//   const categories = [
//     {
//       id: "1",
//       name: "Fashion & Apparel",
//       image: fashionImg,
//       products: "89 products",
//       description: "Stylish sweaters and clothing for your pet.",
//     },
//     {
//       id: "2",
//       name: "Premium Food & Nutrition",
//       image: foodImg,
//       products: "150 products",
//       description: "Healthy meals and treats for every breed.",
//     },
//     {
//       id: "3",
//       name: "Interactive Toys & Games",
//       image: toysImg,
//       products: "124 products",
//       description: "Keep your pet active, playful, and happy.",
//     },
//     {
//       id: "4",
//       name: "Grooming & Care",
//       image: groomingImg,
//       products: "67 products",
//       description: "Professional grooming and coat care tools.",
//     },
//   ];

//   return (
//     <main className="bg-gray-50 min-h-screen w-full pt-16">
//       {/* HERO SECTION */}
//       <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-14 px-6">
//         <div className="max-w-xl space-y-6">
//           <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
//             💡 AI-Powered Shopping
//           </span>
//           <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
//             Smart Shopping for{" "}
//             <span className="text-indigo-600">Smart Dogs</span>
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Upload your dog’s photo, get AI breed predictions, and shop
//             personalized products with AR try-on technology.
//           </p>

//           <div className="flex flex-wrap gap-4">
//             <a
//               href="/breed"
//               className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
//             >
//               Try AI Recognition
//             </a>
//             <a
//               href="#categories"
//               className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition"
//             >
//               Browse Products
//             </a>
//           </div>

//           {/* Features */}
//           <div className="flex flex-wrap gap-8 pt-8 text-sm text-gray-700">
//             <div className="flex items-center gap-2">
//               <Brain className="text-indigo-600" size={20} />
//               <div>
//                 <p className="font-medium">AI Breed Detection</p>
//                 <p className="text-gray-500 text-xs">
//                   94% accuracy using Kaggle datasets
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <Sparkles className="text-green-500" size={20} />
//               <div>
//                 <p className="font-medium">Smart Recommendations</p>
//                 <p className="text-gray-500 text-xs">
//                   Personalized product suggestions
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center gap-2">
//               <Camera className="text-pink-500" size={20} />
//               <div>
//                 <p className="font-medium">AR Try-On</p>
//                 <p className="text-gray-500 text-xs">See products on your dog</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* HERO IMAGE */}
//         <div className="mt-12 md:mt-0 relative">
//           <img
//             src={goldenRetriever}
//             alt="Golden Retriever"
//             className="w-[420px] h-[300px] object-cover rounded-2xl shadow-lg"
//           />
//           <div className="absolute top-4 right-4 bg-white text-indigo-600 text-xs font-semibold px-3 py-1 rounded-md shadow">
//             AR Try-On Ready
//           </div>
//           <div className="absolute bottom-4 left-4 bg-white text-gray-700 text-xs px-3 py-1 rounded-md shadow">
//             🐕 Golden Retriever – 94.21% confidence
//           </div>
//         </div>
//       </section>

//       {/* CATEGORY GRID SECTION */}
//       <section
//         id="categories"
//         className="scroll-mt-20 bg-white py-12 border-t border-gray-100"
//       >
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h2 className="text-2xl font-bold text-gray-900 mb-2">
//             Shop by Category
//           </h2>
//           <p className="text-gray-500 mb-8">
//             Explore handpicked categories with real-time AR and AI-powered recommendations.
//           </p>

//           {/* Category cards */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//             {categories.map((cat) => (
//               <a
//                 key={cat.id}
//                 href={`/product/${cat.id}`}
//                 className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
//               >
//                 <img
//                   src={cat.image}
//                   alt={cat.name}
//                   className="w-full h-40 object-cover"
//                 />
//                 <div className="p-4">
//                   <h3 className="text-lg font-semibold text-gray-800">{cat.name}</h3>
//                   <p className="text-sm text-gray-500">{cat.products}</p>
//                   <p className="text-xs text-gray-400 mt-1">{cat.description}</p>
//                 </div>
//               </a>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* FEATURED PRODUCTS SECTION */}
//       <section className="py-14 bg-gray-50 border-t border-gray-100">
//         <div className="max-w-7xl mx-auto px-6 text-center">
          
//           <FeaturedProducts />
//         </div>
//       </section>

//       {/* CTA SECTION */}
//       <section className="bg-indigo-600 text-white py-12">
//         <div className="max-w-7xl mx-auto px-6 text-center">
//           <h2 className="text-2xl font-semibold mb-3">
//             Discover the Future of Pet Shopping 🐾
//           </h2>
//           <p className="text-indigo-100 mb-5">
//             Explore our AI-powered features that make shopping for your furry
//             friend smarter and easier.
//           </p>
//           <a
//             href="/breed"
//             className="inline-block bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition"
//           >
//             Try AI Breed Recognition
//           </a>
//         </div>
//       </section>
//     </main>
//   );
// }

// export default Home;
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CategoryGrid from "../components/CategoryGrid";
import FeaturedProducts from "../components/FeaturedProducts";
import goldenRetriever from "../assets/golden-retriever.jpg";
import { Brain, Sparkles } from "lucide-react";

function Home() {
  // Smooth scrolling to anchors
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

  return (
    <main className="bg-gray-50 min-h-screen w-full pt-16">
      {/* 🐶 HERO SECTION */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between py-14 px-6 gap-10">
        {/* LEFT SIDE */}
        <div className="max-w-xl space-y-6">
          <span className="text-sm font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
            💡 Smarter Pet Shopping
          </span>

          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight">
            Smart Shopping for <span className="text-indigo-600">Smart Dogs</span>
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            Upload your dog’s photo to get accurate breed predictions and receive
            personalized product suggestions for your furry friend.
          </p>

          {/* CTA BUTTONS */}
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

          {/* FEATURE ROW */}
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

        {/* RIGHT SIDE IMAGE */}
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

      {/* 🛍️ CATEGORY SECTION */}
      <section
        id="categories"
        className="scroll-mt-20 bg-white py-12 border-t border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <CategoryGrid />
        </div>
      </section>

      {/* 🌟 FEATURED PRODUCTS SECTION */}
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          
          <FeaturedProducts />
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
