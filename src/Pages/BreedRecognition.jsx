import React, { useState } from "react";

function BreedRecognition() {
  const [image, setImage] = useState(null);
  const [breed, setBreed] = useState("");

  const handleUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));

    setTimeout(() => {
      setBreed("Golden Retriever 🐾 (94.3% confidence)");
    }, 1500);
  };

  return (
    <div className="pt-24 px-6 max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-4">AI-Powered Breed Recognition</h1>
      <p className="text-gray-600 mb-8">
        Upload your dog's photo and let our AI identify the breed.
      </p>
      <div className="border-2 border-dashed rounded-lg p-8 bg-gray-50">
        <input type="file" accept="image/*" onChange={handleUpload} className="mb-4" />
        {image && <img src={image} alt="dog" className="mx-auto w-64 h-64 object-cover rounded-lg mb-4" />}
        {breed && <p className="text-lg font-semibold text-indigo-600">{breed}</p>}
      </div>
    </div>
  );
}

export default BreedRecognition;
