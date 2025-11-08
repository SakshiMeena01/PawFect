import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

// Fetch all products under a given category
export const fetchProductsByCategory = async (category) => {
  try {
    const ref = collection(db, `products/${category}/items`);
    const snapshot = await getDocs(ref);

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return products;
  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return [];
  }
};
