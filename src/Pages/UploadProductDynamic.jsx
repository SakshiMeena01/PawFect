// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { db, ts, auth } from "../firebase";
// import { collection, addDoc } from "firebase/firestore";

// const CLOUDINARY_CLOUD_NAME = "dbr2ryy8f";
// const CLOUDINARY_UPLOAD_PRESET = "pawfect_uploader";

// export default function UploadProductDynamic() {
//   const { category } = useParams();
//   const navigate = useNavigate();
//   const user = auth.currentUser;

//   const [form, setForm] = useState({
//     name: "",
//     price: "",
//     oldPrice: "",
//     description: "",
//     stock: "",
//     brand: "",
//   });
//   const [images, setImages] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Handle form input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle file input
//   const handleFileChange = (e) => setImages([...e.target.files]);

//   // Upload to Cloudinary with error handling
//   const uploadToCloudinary = async (file) => {
//     try {
//       const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
//       const fd = new FormData();
//       fd.append("file", file);
//       fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

//       const res = await fetch(url, { method: "POST", body: fd });
//       if (!res.ok) throw new Error("Upload failed");
//       const data = await res.json();
//       return data.secure_url;
//     } catch (err) {
//       console.error("Cloudinary Upload Error:", err);
//       alert("⚠️ Image upload failed. Please try again.");
//       return null;
//     }
//   };

//   // Submit handler
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!user) return alert("Please log in to upload a product.");

//     if (!form.name.trim() || !form.price.trim() || images.length === 0) {
//       return alert("⚠️ Please fill out all required fields and upload at least one image.");
//     }

//     setLoading(true);

//     // Upload images sequentially
//     const uploaded = [];
//     for (let img of images) {
//       const url = await uploadToCloudinary(img);
//       if (url) uploaded.push(url);
//     }

//     if (uploaded.length === 0) {
//       setLoading(false);
//       return alert("⚠️ Image upload failed. Try again.");
//     }

//     const docData = {
//       ...form,
//       price: Number(form.price),
//       oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
//       category: getCategoryName(category),
//       images: uploaded,
//       sellerId: user.uid,
//       sellerName: user.displayName || user.email || "Seller",
//       createdAt: ts(),
//       isPet: category === "pet",
//       attributes: getCategoryAttributes(form, category),
//     };

//     try {
//       await addDoc(collection(db, `products/${category}/items`), docData);
//       alert("🎉 Product uploaded successfully!");
//       navigate("/home");
//     } catch (err) {
//       console.error("Firestore Error:", err);
//       alert("⚠️ Failed to upload product. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Return readable category name
//   const getCategoryName = (cat) => {
//     switch (cat) {
//       case "fashion":
//         return "Fashion & Apparel";
//       case "food":
//         return "Premium Food & Nutrition";
//       case "grooming":
//         return "Grooming & Care";
//       case "toys":
//         return "Interactive Toys & Games";
//       case "pet":
//         return "Pets for Sale";
//       default:
//         return "Miscellaneous";
//     }
//   };

//   // Category-specific fields
//   const getCategoryAttributes = (form, cat) => {
//     switch (cat) {
//       case "fashion":
//         return {
//           sizes: form.sizes?.split(",").map((s) => s.trim()) || [],
//           color: form.color,
//           material: form.material,
//         };
//       case "food":
//         return {
//           flavor: form.flavor,
//           weight: form.weight,
//           ageGroup: form.ageGroup,
//         };
//       case "grooming":
//         return {
//           productType: form.productType,
//           scent: form.scent,
//           volume: form.volume,
//         };
//       case "toys":
//         return {
//           toyType: form.toyType,
//           material: form.material,
//           size: form.size,
//         };
//       case "pet":
//         return {
//           breed: form.breed,
//           age: form.age,
//           gender: form.gender,
//           vaccinated: form.vaccinated === "true",
//         };
//       default:
//         return {};
//     }
//   };

//   // Render dynamic input fields
//   const renderCategoryFields = () => {
//     switch (category) {
//       case "fashion":
//         return (
//           <>
//             <input
//               name="sizes"
//               placeholder="Available sizes (comma separated)"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <input
//               name="color"
//               placeholder="Color"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <input
//               name="material"
//               placeholder="Material"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <label className="text-sm text-gray-500">Upload 3 Images (front, side, back)</label>
//           </>
//         );

//       case "food":
//         return (
//           <>
//             <input
//               name="flavor"
//               placeholder="Flavor"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <input
//               name="weight"
//               placeholder="Weight (e.g., 5kg)"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <input
//               name="ageGroup"
//               placeholder="Age Group (Puppy, Adult, Senior)"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <label className="text-sm text-gray-500">Upload 1 Image</label>
//           </>
//         );

//       case "grooming":
//         return (
//           <>
//             <input
//               name="productType"
//               placeholder="Product Type (e.g., Shampoo)"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <input
//               name="scent"
//               placeholder="Scent"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <input
//               name="volume"
//               placeholder="Volume (e.g., 500ml)"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <label className="text-sm text-gray-500">Upload 1 Image</label>
//           </>
//         );

//       case "toys":
//         return (
//           <>
//             <input
//               name="toyType"
//               placeholder="Toy Type (e.g., Chew Toy)"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <input
//               name="material"
//               placeholder="Material"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <input
//               name="size"
//               placeholder="Size (Small/Medium/Large)"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <label className="text-sm text-gray-500">Upload 2 Images (front and close-up)</label>
//           </>
//         );

//       case "pet":
//         return (
//           <>
//             <input
//               name="breed"
//               placeholder="Breed"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <input
//               name="age"
//               placeholder="Age (e.g., 6 months)"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <input
//               name="gender"
//               placeholder="Gender (Male/Female)"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             />
//             <select
//               name="vaccinated"
//               onChange={handleChange}
//               className="border p-2 rounded w-full"
//             >
//               <option value="">Vaccinated?</option>
//               <option value="true">Yes</option>
//               <option value="false">No</option>
//             </select>
//             <label className="text-sm text-gray-500">Upload 2 Images (front and side)</label>
//           </>
//         );

//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="pt-24 max-w-3xl mx-auto px-6">
//       <button
//         onClick={() => navigate("/sell")}
//         className="text-indigo-600 hover:underline mb-4"
//       >
//         ← Back to Categories
//       </button>

//       <h1 className="text-2xl font-bold mb-4 capitalize">
//         Upload {getCategoryName(category)}
//       </h1>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow space-y-4"
//       >
//         <input
//           name="name"
//           placeholder="Product Name"
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//         />
//         <input
//           name="brand"
//           placeholder="Brand"
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//         />
//         <input
//           name="price"
//           type="number"
//           placeholder="Price (₹)"
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//         />
//         <input
//           name="oldPrice"
//           type="number"
//           placeholder="Old Price (optional)"
//           onChange={handleChange}
//           className="border p-2 rounded w-full"
//         />
//         <textarea
//           name="description"
//           placeholder="Description"
//           onChange={handleChange}
//           rows="4"
//           className="border p-2 rounded w-full"
//         />

//         {renderCategoryFields()}

//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={handleFileChange}
//           className="mt-2"
//         />

//         {/* Image Preview */}
//         {images.length > 0 && (
//           <div className="grid grid-cols-3 gap-3 mt-4">
//             {Array.from(images).map((file, i) => (
//               <img
//                 key={i}
//                 src={URL.createObjectURL(file)}
//                 alt={`Preview ${i + 1}`}
//                 className="w-full h-28 object-cover rounded"
//               />
//             ))}
//           </div>
//         )}

//         <button
//           disabled={loading}
//           className={`${
//             loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
//           } text-white px-6 py-2 rounded w-full font-medium transition`}
//         >
//           {loading ? "Uploading..." : "Upload Product"}
//         </button>
//       </form>
//     </div>
//   );
// }
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, ts, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const CLOUDINARY_CLOUD_NAME = "dbr2ryy8f";
const CLOUDINARY_UPLOAD_PRESET = "pawfect_uploader";

export default function UploadProductDynamic() {
  const { category } = useParams();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [form, setForm] = useState({
    name: "",
    price: "",
    oldPrice: "",
    description: "",
    stock: "",
    brand: "",
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file selection
  const handleFileChange = (e) => setImages([...e.target.files]);

  // Upload single image to Cloudinary
  const uploadToCloudinary = async (file) => {
    const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await fetch(url, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error?.message || "Upload failed");
      return data.secure_url;
    } catch (err) {
      console.error("❌ Cloudinary Upload Error:", err);
      alert("⚠️ Image upload failed. Please try again.");
      return null;
    }
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return alert("Please log in to upload a product.");
    if (!form.name.trim() || !form.price.trim() || images.length === 0)
      return alert("⚠️ Please fill all required fields and upload at least one image.");

    setLoading(true);
    setProgress(0);

    const uploaded = [];
    try {
      let completed = 0;

      for (let img of images) {
        const url = await uploadToCloudinary(img);
        if (url) uploaded.push(url);
        completed++;
        setProgress(Math.round((completed / images.length) * 100));
      }

      if (uploaded.length === 0) throw new Error("No images uploaded.");

      const docData = {
        ...form,
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
        category: getCategoryName(category),
        images: uploaded,
        sellerId: user.uid,
        sellerName: user.displayName || user.email || "Seller",
        createdAt: ts(),
        isPet: category === "pet",
        attributes: getCategoryAttributes(form, category),
      };

      await addDoc(collection(db, `products/${category}/items`), docData);

      alert("🎉 Product uploaded successfully!");
      // Reset form
      setForm({
        name: "",
        price: "",
        oldPrice: "",
        description: "",
        stock: "",
        brand: "",
      });
      setImages([]);
      setProgress(0);
      navigate("/home");
    } catch (err) {
      console.error("❌ Upload Error:", err.message);
      alert("⚠️ Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Get readable category name
  const getCategoryName = (cat) => {
    switch (cat) {
      case "fashion":
        return "Fashion & Apparel";
      case "food":
        return "Premium Food & Nutrition";
      case "grooming":
        return "Grooming & Care";
      case "toys":
        return "Interactive Toys & Games";
      case "pet":
        return "Pets for Sale";
      default:
        return "Miscellaneous";
    }
  };

  // Get category-specific attributes
  const getCategoryAttributes = (form, cat) => {
    switch (cat) {
      case "fashion":
        return {
          sizes: form.sizes?.split(",").map((s) => s.trim()) || [],
          color: form.color,
          material: form.material,
        };
      case "food":
        return {
          flavor: form.flavor,
          weight: form.weight,
          ageGroup: form.ageGroup,
        };
      case "grooming":
        return {
          productType: form.productType,
          scent: form.scent,
          volume: form.volume,
        };
      case "toys":
        return {
          toyType: form.toyType,
          material: form.material,
          size: form.size,
        };
      case "pet":
        return {
          breed: form.breed,
          age: form.age,
          gender: form.gender,
          vaccinated: form.vaccinated === "true",
        };
      default:
        return {};
    }
  };

  // Render dynamic fields per category
  const renderCategoryFields = () => {
    switch (category) {
      case "fashion":
        return (
          <>
            <input
              name="sizes"
              placeholder="Available sizes (comma separated)"
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
            <input name="color" placeholder="Color" onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="material" placeholder="Material" onChange={handleChange} className="border p-2 rounded w-full" />
            <label className="text-sm text-gray-500">Upload 3 Images (front, side, back)</label>
          </>
        );

      case "food":
        return (
          <>
            <input name="flavor" placeholder="Flavor" onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="weight" placeholder="Weight (e.g., 5kg)" onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="ageGroup" placeholder="Age Group (Puppy, Adult, Senior)" onChange={handleChange} className="border p-2 rounded w-full" />
            <label className="text-sm text-gray-500">Upload 1 Image</label>
          </>
        );

      case "grooming":
        return (
          <>
            <input name="productType" placeholder="Product Type (e.g., Shampoo)" onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="scent" placeholder="Scent" onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="volume" placeholder="Volume (e.g., 500ml)" onChange={handleChange} className="border p-2 rounded w-full" />
            <label className="text-sm text-gray-500">Upload 1 Image</label>
          </>
        );

      case "toys":
        return (
          <>
            <input name="toyType" placeholder="Toy Type (e.g., Chew Toy)" onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="material" placeholder="Material" onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="size" placeholder="Size (Small/Medium/Large)" onChange={handleChange} className="border p-2 rounded w-full" />
            <label className="text-sm text-gray-500">Upload 2 Images (front and close-up)</label>
          </>
        );

      case "pet":
        return (
          <>
            <input name="breed" placeholder="Breed" onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="age" placeholder="Age (e.g., 6 months)" onChange={handleChange} className="border p-2 rounded w-full" />
            <input name="gender" placeholder="Gender (Male/Female)" onChange={handleChange} className="border p-2 rounded w-full" />
            <select name="vaccinated" onChange={handleChange} className="border p-2 rounded w-full">
              <option value="">Vaccinated?</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <label className="text-sm text-gray-500">Upload 2 Images (front and side)</label>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="pt-24 max-w-3xl mx-auto px-6">
      <button onClick={() => navigate("/sell")} className="text-indigo-600 hover:underline mb-4">
        ← Back to Categories
      </button>

      <h1 className="text-2xl font-bold mb-4 capitalize">Upload {getCategoryName(category)}</h1>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow space-y-4">
        <input name="name" placeholder="Product Name" onChange={handleChange} className="border p-2 rounded w-full" />
        <input name="brand" placeholder="Brand" onChange={handleChange} className="border p-2 rounded w-full" />
        <input name="price" type="number" placeholder="Price (₹)" onChange={handleChange} className="border p-2 rounded w-full" />
        <input name="oldPrice" type="number" placeholder="Old Price (optional)" onChange={handleChange} className="border p-2 rounded w-full" />
        <textarea name="description" placeholder="Description" onChange={handleChange} rows="4" className="border p-2 rounded w-full" />

        {renderCategoryFields()}

        <input type="file" accept="image/*" multiple onChange={handleFileChange} className="mt-2" />

        {/* Image Preview */}
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {Array.from(images).map((file, i) => (
              <img key={i} src={URL.createObjectURL(file)} alt={`Preview ${i + 1}`} className="w-full h-28 object-cover rounded" />
            ))}
          </div>
        )}

        {/* Upload progress bar */}
        {loading && (
          <div className="mt-4 text-center">
            <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
              <div className="bg-indigo-600 h-3 rounded-full transition-all" style={{ width: `${progress}%` }}></div>
            </div>
            <p className="text-gray-600 text-sm">{progress}% Uploaded</p>
          </div>
        )}

        <button
          disabled={loading}
          className={`${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white px-6 py-2 rounded w-full font-medium transition`}
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
}
