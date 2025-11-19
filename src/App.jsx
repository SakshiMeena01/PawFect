// // src/App.jsx
// import React, { useEffect, Suspense } from "react";
// import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// // Components
// import Navbar from "./components/navbar";
// import Footer from "./components/Footer";

// // Auth Pages
// import Login from "./components/login";
// import SignUp from "./components/signUp";

// // Main Pages
// import Home from "./Pages/Home";
// import BreedRecognition from "./Pages/BreedRecognition";
// import ProductDetail from "./Pages/ProductDetail";
// import Cart from "./Pages/Cart";
// import Checkout from "./Pages/Checkout";
// import SellCategorySelect from "./Pages/SellCategorySelect";
// import UploadProductDynamic from "./Pages/UploadProductDynamic";
// import CategoryProducts from "./Pages/CategoryProducts";

// // ✅ Import the CartProvider
// import { CartProvider } from "./context/CartContext";

// // Simple fallback loader for suspense
// const Loader = () => (
//   <div className="flex items-center justify-center min-h-screen bg-gray-50">
//     <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
//   </div>
// );

// function App() {
//   const location = useLocation();

//   // Hide Navbar and Footer on Login/Signup for cleaner auth pages
//   const hideNavbar =
//     location.pathname === "/login" || location.pathname === "/signup";

//   // Scroll to top on route change
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [location.pathname]);

//   return (
//     // ✅ Wrap everything inside CartProvider
//     <CartProvider>
//       <div className="flex flex-col min-h-screen bg-gray-50">
//         {/* ✅ Navbar visible except on Login/Signup */}
//         {!hideNavbar && <Navbar />}

//         {/* ✅ Page Content */}
//         <main className={`${!hideNavbar ? "pt-16 flex-grow" : "flex-grow"}`}>
//           <Suspense fallback={<Loader />}>
//             <Routes>
//               <Route path="/" element={<Navigate to="/signup" />} />
//               <Route path="/login" element={<Login />} />
//               <Route path="/signup" element={<SignUp />} />
//               <Route path="/home" element={<Home />} />
//               <Route path="/breed" element={<BreedRecognition />} />
//               <Route path="/product/:id" element={<ProductDetail />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/checkout" element={<Checkout />} />
//               <Route path="/sell" element={<SellCategorySelect />} />
//               <Route path="/category/:category" element={<CategoryProducts />} />
//               <Route path="/sell/:category" element={<UploadProductDynamic />} />
//             </Routes>
//           </Suspense>
//         </main>

//         {/* ✅ Footer visible except on Login/Signup */}
//         {!hideNavbar && <Footer />}
//       </div>
//     </CartProvider>
//   );
// }

// export default App;
// src/App.jsx
import React, { useEffect, Suspense } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// ✅ Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DogBreedDetector from "./components/DogBreedDetector";

// ✅ Auth Pages
import Login from "./components/Login";
import SignUp from "./components/SignUp";

// ✅ Main Pages
import Home from "./Pages/Home";

import ProductDetail from "./Pages/ProductDetail";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import SellCategorySelect from "./Pages/SellCategorySelect";
import UploadProductDynamic from "./Pages/UploadProductDynamic";
import CategoryProducts from "./Pages/CategoryProducts";

// ✅ Cart Context
import { CartProvider } from "./context/CartContext";
import PawFectChatbot from "./Pages/pawchat";

// ✅ Toast Notifications
import { Toaster } from "react-hot-toast";

// ✅ Loader Component for Suspense fallback
const Loader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

function App() {
  const location = useLocation();

  // ✅ Hide Navbar & Footer on Login/Signup for cleaner UI
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  // ✅ Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen bg-gray-50">
        {/* ✅ Global Toast Notification System */}
        <Toaster position="top-right" reverseOrder={false} />

        {/* ✅ Navbar visible except on Login/Signup */}
        {!hideNavbar && <Navbar />}

        {/* ✅ Page Content */}
        <main className={`${!hideNavbar ? "pt-16 flex-grow" : "flex-grow"}`}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Navigate to="/signup" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/sell" element={<SellCategorySelect />} />
              <Route path="/sell/:category" element={<UploadProductDynamic />} /> 
              <Route path="/breed" element={<DogBreedDetector />} />


            </Routes>
          </Suspense>
        </main>

        {/* ✅ Footer visible except on Login/Signup */}
        {!hideNavbar && <Footer />}
      </div>
    </CartProvider>
  );
}

export default App;
