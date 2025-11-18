
// import React, { createContext, useState, useContext } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   // ✅ Add item to cart
//   const addToCart = (product, quantity = 1, size = null) => {
//     setCartItems((prev) => {
//       const existing = prev.find(
//         (item) => item.id === product.id && item.size === size
//       );
//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id && item.size === size
//             ? { ...item, quantity: item.quantity + quantity }
//             : item
//         );
//       }
//       return [...prev, { ...product, quantity, size }];
//     });
//   };

//   // ✅ Update item quantity
//   const updateQuantity = (id, size, newQty) => {
//     if (newQty < 1) return; // prevent 0 or negative qty
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item.id === id && item.size === size ? { ...item, quantity: newQty } : item
//       )
//     );
//   };

//   // ✅ Remove item from cart
//   const removeFromCart = (id, size) => {
//     setCartItems((prev) => prev.filter((item) => !(item.id === id && item.size === size)));
//   };

//   // ✅ Clear cart after successful order
//   const clearCart = () => setCartItems([]);

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
import React, { createContext, useState, useContext, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Listen to authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Real-time Firestore cart sync
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    const cartRef = collection(db, "users", user.uid, "cart");
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setCartItems(items);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // ✅ Add item to cart
  const addToCart = async (product, quantity = 1, size = null) => {
    if (!user) {
      toast.error("Please log in to add items to your cart.");
      return;
    }

    const existing = cartItems.find(
      (item) => item.id === product.id && item.size === size
    );

    let newQty = quantity;
    if (existing) newQty = existing.quantity + quantity;

    const itemRef = doc(db, "users", user.uid, "cart", product.id);
    await setDoc(itemRef, { ...product, quantity: newQty, size });

    toast.success(`${product.name} added to your cart!`);
  };

  // ✅ Update quantity
  const updateQuantity = async (id, size, newQty) => {
    if (!user || newQty < 1) return;
    const updatedItem = cartItems.find(
      (item) => item.id === id && item.size === size
    );
    if (!updatedItem) return;

    const itemRef = doc(db, "users", user.uid, "cart", id);
    await setDoc(itemRef, { ...updatedItem, quantity: newQty });

    toast.success("Cart updated!");
  };

  // ✅ Remove item
  const removeFromCart = async (id, size) => {
    if (!user) return;
    await deleteDoc(doc(db, "users", user.uid, "cart", id));
    toast("Item removed from cart", { icon: "🗑️" });
  };

  // ✅ Clear entire cart
  const clearCart = async () => {
    if (!user) return;
    const cartRef = collection(db, "users", user.uid, "cart");
    const snap = await getDocs(cartRef);
    snap.forEach(async (docSnap) => await deleteDoc(docSnap.ref));
    setCartItems([]);
    toast("Cart cleared", { icon: "🧹" });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
