// src/pages/UploadProductDynamic.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, ts, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

const CLOUDINARY_CLOUD_NAME = "dbr2ryy8f";
const CLOUDINARY_UPLOAD_PRESET = "pawfect_uploader";

const CATEGORY_FIELDS = {
  fashion: [
    { name: "size", label: "Available Sizes", placeholder: "S, M, L, XL" },
    { name: "color", label: "Color", placeholder: "Red, Blue, etc." },
    { name: "fabric", label: "Fabric", placeholder: "Cotton, Polyester..." },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: ["Men", "Women", "Unisex"],
    },
  ],
  food: [
    { name: "weight", label: "Weight", placeholder: "500g, 1kg" },
    { name: "expiryDate", label: "Expiry Date", type: "date" },
    { name: "ingredients", label: "Ingredients" },
    {
      name: "isVegetarian",
      label: "Is Vegetarian?",
      type: "select",
      options: ["Yes", "No"],
    },
  ],
  grooming: [
    { name: "productType", label: "Product Type", placeholder: "Shampoo, Conditioner..." },
    { name: "volume", label: "Volume (ml)", placeholder: "e.g., 250ml" },
    { name: "usageInstructions", label: "Usage Instructions" },
  ],
  toys: [
    { name: "toyType", label: "Toy Type", placeholder: "Ball, Rope, Chew..." },
    { name: "material", label: "Material", placeholder: "Rubber, Plastic..." },
    { name: "ageGroup", label: "Age Group", placeholder: "Puppy, Adult..." },
  ],
  accessories: [
    { name: "accessoryType", label: "Accessory Type", placeholder: "Leash, Collar..." },
    { name: "material", label: "Material" },
    { name: "size", label: "Size", placeholder: "S, M, L" },
  ],
};

export default function UploadProductDynamic() {
  const { category } = useParams();
  const navigate = useNavigate();
  const user = auth.currentUser;

  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
    oldPrice: "",
    description: "",
    breed: "", // ✅ for filtering
  });

  const [details, setDetails] = useState({});
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (CATEGORY_FIELDS[category]?.some((f) => f.name === name)) {
      setDetails((prev) => ({ ...prev, [name]: value }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => setImages([...e.target.files]);

  const uploadToCloudinary = async (file) => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: "POST", body: fd }
    );
    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in to upload a product.");
    if (!form.name || !form.price || !form.breed || images.length === 0)
      return alert("⚠️ Fill all fields including breed and upload images.");

    setLoading(true);
    const uploadedImages = [];

    for (let img of images) {
      const url = await uploadToCloudinary(img);
      if (url) uploadedImages.push(url);
    }

    const docData = {
      ...form,
      category,
      images: uploadedImages,
      price: Number(form.price),
      oldPrice: form.oldPrice ? Number(form.oldPrice) : null,
      details,
      sellerId: user.uid,
      sellerName: user.displayName || user.email,
      createdAt: ts(),
    };

    try {
      await addDoc(collection(db, `products/${category}/items`), docData);
      alert("🎉 Product uploaded successfully!");
      navigate("/home");
    } catch (err) {
      console.error("❌ Firestore Error:", err);
      alert("Upload failed. Check Firestore rules or connection.");
    } finally {
      setLoading(false);
    }
  };

  const fields = CATEGORY_FIELDS[category] || [];

  return (
    <div className="pt-24 max-w-3xl mx-auto px-6">
      <button
        onClick={() => navigate("/sell")}
        className="text-indigo-600 hover:underline mb-4"
      >
        ← Back to Categories
      </button>

      <h1 className="text-2xl font-bold mb-4 capitalize">
        Upload {category} Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow space-y-4"
      >
        {/* Common Fields */}
        <input
          name="name"
          placeholder="Product Name"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="breed"
          placeholder="Breed (e.g., Beagle, Pug, Golden Retriever)"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="price"
          type="number"
          placeholder="Price (₹)"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <input
          name="oldPrice"
          type="number"
          placeholder="Old Price (optional)"
          onChange={handleChange}
          className="border p-2 rounded w-full"
        />
        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          rows="3"
          className="border p-2 rounded w-full"
        />

        {/* Dynamic Category Fields */}
        {fields.map((f) => (
          <div key={f.name}>
            <label className="text-sm text-gray-700">{f.label}</label>
            {f.type === "select" ? (
              <select
                name={f.name}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              >
                <option value="">Select {f.label}</option>
                {f.options.map((opt) => (
                  <option key={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                name={f.name}
                placeholder={f.placeholder}
                onChange={handleChange}
                className="border p-2 rounded w-full"
              />
            )}
          </div>
        ))}

        {/* Image Upload */}
        <label className="text-sm text-gray-700 font-medium">Upload Images</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        {images.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mt-4">
            {images.map((file, i) => (
              <img
  key={i}
  src={URL.createObjectURL(file)}
  alt={`Preview ${i}`}
  className="w-full h-28 object-contain bg-gray-100 rounded border p-1"
/>
            ))}
          </div>
        )}

        <button
          disabled={loading}
          className={`${
            loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
          } text-white w-full py-2 rounded font-semibold transition`}
        >
          {loading ? "Uploading..." : "Upload Product"}
        </button>
      </form>
    </div>
  );
}
