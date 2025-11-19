/*
import React, { useState } from "react";

const DogBreedDetector = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // -------- HANDLE IMAGE UPLOAD --------
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
  };

  // -------- SEND TO FLASK BACKEND --------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please upload an image!");

    const formData = new FormData();
    formData.append("image", selectedFile); // VERY IMPORTANT: backend expects "image"

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.error) {
        alert("Prediction failed: " + data.error);
      } else {
        setResult(data);
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Check Flask terminal.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
          🐾 PawFect – Dog Breed Detector
        </h2>

         
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 bg-gray-50 border border-gray-300 rounded-lg cursor-pointer"
          />

          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-4 rounded-xl shadow-md w-full h-56 object-cover"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600 transition duration-300"
          >
            {loading ? "Detecting..." : "Detect Breed"}
          </button>
        </form>

        //result
        {result && (
          <div className="mt-6 text-center space-y-3">
            <h3 className="text-xl font-bold text-gray-800">
              🐶 Predicted Breed:
            </h3>
            <p className="text-lg font-semibold text-blue-600">
              {result.breed} ({result.confidence}% confidence)
            </p>

            prediction 3
            <div className="mt-4">
              <h4 className="text-md text-gray-600 font-semibold">Top 3 Predictions:</h4>
              <ul className="mt-2 space-y-1">
                {result.top_k.map((item, index) => (
                  <li
                    key={index}
                    className="text-gray-700 bg-gray-100 p-2 rounded-lg"
                  >
                    {index + 1}. {item.breed} —{" "}
                    <span className="text-blue-600">{item.confidence}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DogBreedDetector;*/



import React, { useState } from "react";

// --- Breed Information Data (Frontend Lookup) ---
// This data MUST be defined directly in the file because external file imports are not supported.
const ALL_BREEDS = [
    "Afghan", "African Wild Dog", "Airedale", "American Hairless", "American Spaniel", "Basenji", "Basset", 
    "Beagle", "Bearded Collie", "Bermaise", "Bichon Frise", "Blenheim", "Bloodhound", "Bluetick", 
    "Border Collie", "Borzoi", "Boston Terrier", "Boxer", "Bull Mastiff", "Bull Terrier", "Bulldog", 
    "Cairn", "Chihuahua", "Chinese Crested", "Chow", "Clumber", "Cockapoo", "Cocker", "Collie", 
    "Corgi", "Coyote", "Dalmation", "Dhole", "Dingo", "Doberman", "Elk Hound", "French Bulldog", 
    "German Sheperd", "Golden Retriever", "Great Dane", "Great Perenees", "Greyhound", "Groenendael", 
    "Irish Spaniel", "Irish Wolfhound", "Japanese Spaniel", "Komondor", "Labradoodle", "Labrador", 
    "Lhasa", "Malinois", "Maltese", "Mex Hairless", "Newfoundland", "Pekinese", "Pit Bull", "Pomeranian", 
    "Poodle", "Pug", "Rhodesian", "Rottweiler", "Saint Bernard", "Schnauzer", "Scotch Terrier", 
    "Shar_Pei", "Shiba Inu", "Shih-Tzu", "Siberian Husky", "Vizsla", "Yorkie"
];

const DEFAULT_BREED_INFO = {
    description: "Detailed information for this breed is currently unavailable. This is a recognized breed by the model. Please check back later or consult a veterinarian.",
    temperament: ["N/A", "Breed details pending"],
    origin: "N/A"
};

// Start with detailed entries and use the spread operator to fill the rest with placeholders
const DETAILED_BREED_INFO = {
    // Existing and common breeds
    "Golden Retriever": {
        description: "A friendly, intelligent, and devoted dog. Golden Retrievers are active, powerful dogs that need regular exercise. They are well-known for their lustrous, long coat and gentle, eager-to-please nature, making them excellent family pets.",
        temperament: ["Friendly", "Intelligent", "Devoted", "Eager to Please", "Patient"],
        origin: "Scotland"
    },
    "Labrador": {
        description: "The Labrador is America's most popular dog breed. They are friendly, outgoing, and high-spirited companions who thrive on exercise and training. Highly versatile and devoted family members.",
        temperament: ["Outgoing", "Even-Tempered", "Agile", "Devoted", "Gentle"],
        origin: "Newfoundland"
    },
    "Cocker": { // Changed from Cocker Spaniel
        description: "Known as the 'Merry Cocker,' this breed is famous for its gorgeous, flowing coat, large expressive eyes, and happy disposition. Generally gentle and playful.",
        temperament: ["Merry", "Gentle", "Playful", "Sensitive", "Affectionate"],
        origin: "England"
    },
    // Newly added popular breeds
    "German Sheperd": {
        description: "A highly intelligent, versatile, and courageous dog, often used in police and military work. They require plenty of mental stimulation and physical activity.",
        temperament: ["Intelligent", "Courageous", "Loyal", "Alert", "Obedient"],
        origin: "Germany"
    },
    "Poodle": {
        description: "Known for their hypoallergenic coat and high intelligence, Poodles are active and elegant dogs. They come in three sizes: Standard, Miniature, and Toy.",
        temperament: ["Intelligent", "Active", "Alert", "Trainable", "Loyal"],
        origin: "Germany/France"
    },
    "Boxer": {
        description: "Energetic, playful, and loyal dogs known for their distinctive square head and muscular build. They are patient and great with children, often displaying puppy-like behavior well into adulthood.",
        temperament: ["Playful", "Loyal", "Energetic", "Patient", "Brave"],
        origin: "Germany"
    },
    "Beagle": {
        description: "Merry, curious, and friendly hounds famous for their sense of smell and baying howl. They are great family dogs but require a secure yard due to their strong tracking instinct.",
        temperament: ["Merry", "Curious", "Friendly", "Determined", "Excitable"],
        origin: "England"
    },
    "Shih-Tzu": {
        description: "A charismatic 'lion dog' prized for its long, flowing double coat and confident, friendly demeanor. They are adaptable companions but require regular grooming.",
        temperament: ["Affectionate", "Playful", "Outgoing", "Friendly", "Lively"],
        origin: "Tibet"
    },
    "Siberian Husky": {
        description: "A working breed known for its endurance, striking blue or multi-colored eyes, and dense double coat. They are friendly, mischievous, and highly energetic, needing significant exercise.",
        temperament: ["Loyal", "Mischievous", "Energetic", "Independent", "Friendly"],
        origin: "Siberia"
    },
    "French Bulldog": {
        description: "A charming, adaptable, and playful dog with 'bat ears' and a smooshed face. They are excellent companions who do well in apartments but require care in hot weather.",
        temperament: ["Adaptable", "Playful", "Affectionate", "Easygoing", "Charming"],
        origin: "France"
    },
    "Doberman": {
        description: "A sleek, powerful, and fearless guardian. Dobermans are highly intelligent and require consistent training and socialization. They are deeply loyal to their families.",
        temperament: ["Fearless", "Loyal", "Intelligent", "Alert", "Obedient"],
        origin: "Germany"
    },
    "Rottweiler": {
        description: "A robust, powerful working dog known for its gentle nature with family and strong protective instincts. Proper socialization and training are essential for this intelligent breed.",
        temperament: ["Loyal", "Devoted", "Protective", "Good-natured", "Confident"],
        origin: "Germany"
    },
    "Pug": {
        description: "A charming, mischievous, and loving companion dog recognized by its flat, wrinkled face and curled tail. Pugs are well-suited for apartment living but are sensitive to heat.",
        temperament: ["Charming", "Mischievous", "Loving", "Docile", "Sociable"],
        origin: "China"
    },
    "Yorkie": {
        description: "The Yorkshire Terrier, or 'Yorkie,' is a small dog with a big personality. They are energetic, feisty, and affectionate, often sporting a glossy, silky coat.",
        temperament: ["Energetic", "Feisty", "Affectionate", "Intelligent", "Confident"],
        origin: "England"
    },
    "Cockapoo": {
    description: "A friendly and affectionate hybrid breed created by crossing a Cocker Spaniel and a Poodle. Cockapoos are known for their cheerful personality, low-shedding coat, and strong attachment to families, making them excellent companion dogs.",
    temperament: ["Friendly", "Affectionate", "Intelligent", "Energetic", "People-oriented"],
    origin: "United States"
},

"Pomeranian": {
    description: "A small, fluffy toy breed with a bold and lively personality. Despite their tiny size, Pomeranians are confident, curious, and full of energy. Their fox-like expression and double coat make them instantly recognizable.",
    temperament: ["Lively", "Alert", "Bold", "Inquisitive", "Playful"],
    origin: "Germany/Poland (historical Pomerania region)"
}

};

// Create a map that includes all breeds with default data, then overwrite the detailed ones
const BREED_INFO = ALL_BREEDS.reduce((acc, breedName) => {
    acc[breedName] = DETAILED_BREED_INFO[breedName] || DEFAULT_BREED_INFO;
    return acc;
}, {});

// Custom component for a nice loading spinner
const Spinner = () => (
    <div className="flex items-center justify-center space-x-2">
        <span className="text-xl animate-spin">🔄</span> 
        <span>Detecting...</span>
    </div>
);

// Custom component for visualizing confidence
const ConfidenceBar = ({ confidence }) => {
    const widthStyle = { width: `${confidence}%` };
    const color = confidence > 80 ? 'bg-pink-400' : confidence > 50 ? 'bg-purple-300' : 'bg-gray-400';

    return (
        <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                    className={`${color} h-2.5 rounded-full transition-all duration-500 ease-out`}
                    style={widthStyle}
                ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">{confidence}% confidence</p>
        </div>
    );
};

// Helper function to map the predicted index back to the breed name string
const getBreedName = (index) => {
    // Ensure index is an integer and within bounds
    if (typeof index === 'number' && index >= 0 && index < ALL_BREEDS.length) {
        return ALL_BREEDS[index];
    }
    console.error("Invalid breed index received:", index);
    return "Unknown Breed";
};


const DogBreedDetector = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Using the local Flask URL for the backend API
    const apiUrl = `http://127.0.0.1:5000/predict`; 

    // -------- HANDLE IMAGE UPLOAD --------
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        setResult(null); // Clear previous results on new file selection
    };

    // Helper for custom modal (replaces alert)
    const showMessage = (message, isError = false) => {
        console.error(isError ? `Error: ${message}` : `Message: ${message}`);
        setResult({ error: message, isError: isError });
    };

    // -------- SEND TO FLASK BACKEND (REAL INTEGRATION) --------
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedFile) return showMessage("Please upload an image!", true);

        setLoading(true);
        setResult(null);

        const formData = new FormData();
        formData.append("image", selectedFile);

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                 // Throwing an error for better catch handling
                throw new Error(`Server responded with status ${response.status}.`);
            }

            let data = await response.json();
            console.log("REAL API Raw Response:", data);

            if (data.error) {
                showMessage(data.error, true);
            } else {
                // --- INDEX TRANSLATION LOGIC ADDED HERE ---
                // 1. Translate the main predicted breed index to its name
                if (typeof data.breed === 'number') {
                    data.breed = getBreedName(data.breed);
                }
                
                // 2. Translate the top_k list indices to names
                if (data.top_k && Array.isArray(data.top_k)) {
                    data.top_k = data.top_k.map(item => {
                        // Check if the breed property is a number (index)
                        if (typeof item.breed === 'number') {
                            return { ...item, breed: getBreedName(item.breed) };
                        }
                        return item; // Keep as is if already a string
                    });
                }
                // ------------------------------------------

                setResult({ ...data, isError: false });
            }

        } catch (err) {
            console.error("Request failed:", err);
            // Consolidated error message for user
            showMessage(`Failed to connect to backend or process request. Details: ${err.message}`, true);
        }

        setLoading(false);
    };

    // Custom File Input Styling Logic
    const openFileBrowser = () => document.getElementById('file-upload').click();

    // Get info for the top predicted breed. Use result.breed as the key (which is now guaranteed to be a string)
    const breedInfo = result && result.breed 
        ? BREED_INFO[result.breed] || DEFAULT_BREED_INFO
        : null;


    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
            {/* Added Tailwind and Font links for reliable styling in the single file */}
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;600;700&display=swap" rel="stylesheet" />
            
            <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-5xl font-comfortaa transform transition duration-500 hover:shadow-3xl
                          flex flex-col md:flex-row md:space-x-8">
                
                {/* -------- LEFT COLUMN: UPLOAD & PREVIEW -------- */}
                <div className="md:w-1/2 mb-8 md:mb-0">
                    {/* Header for the left column */}
                    <header className="text-center mb-6 border-b pb-4 border-purple-100">
                        <h2 className="text-4xl font-extrabold text-pink-700 flex items-center justify-center space-x-2">
                            <span className="text-purple-500 text-3xl">🐾</span> 
                            <span>PawFect Pic</span>
                        </h2>
                        <p className="text-md text-gray-500 mt-2">
                            Upload your furry friend's photo!
                        </p>
                    </header>

                    {/* UPLOAD FORM */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <div 
                            onClick={openFileBrowser}
                            className={`
                                p-8 border-2 border-dashed rounded-xl cursor-pointer 
                                transition duration-300 ease-in-out 
                                ${preview ? 'border-pink-300 bg-pink-50 hover:bg-pink-100' : 'border-purple-200 hover:border-pink-300 hover:bg-purple-50'}
                            `}
                        >
                            <div className="text-center">
                                <span className="mx-auto h-8 w-8 text-pink-400 text-4xl block">📸</span>
                                <p className="mt-2 text-sm text-gray-600 font-medium">
                                    {selectedFile ? selectedFile.name : "Click to choose an image"}
                                </p>
                                <p className="text-xs text-gray-400">PNG, JPG, up to 10MB</p>
                            </div>
                        </div>

                        {/* Image Preview - Fixed to object-contain */}
                        {preview && (
                            <div className="relative flex justify-center items-center h-80">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="mt-2 rounded-2xl shadow-xl max-w-full max-h-full object-contain border-4 border-white"
                                />
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading || !selectedFile}
                            className={`
                                w-full py-3 font-semibold rounded-xl transition duration-300 ease-in-out 
                                shadow-md transform hover:scale-[1.01]
                                ${loading || !selectedFile
                                    ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                    : "bg-gradient-to-r from-pink-400 to-purple-500 text-white hover:from-pink-500 hover:to-purple-600 shadow-lg shadow-pink-200/50"
                                }
                            `}
                        >
                            {loading ? <Spinner /> : "Detect My PawFect Breed!"}
                        </button>
                    </form>
                </div>

                {/* -------- RIGHT COLUMN: RESULTS -------- */}
                <div className="md:w-1/2 p-6 bg-purple-50 rounded-2xl border border-purple-100 shadow-inner">
                    <h3 className="text-3xl font-bold text-purple-700 text-center mb-6">
                        Results & Paw-some Info!
                    </h3>

                    {result && result.isError ? (
                        <div className="mt-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded-lg">
                            <p className="font-semibold">Oh no, an error!</p>
                            <p className="text-sm">{result.error}</p>
                        </div>
                    ) : result && !result.isError && breedInfo ? (
                        <div className="space-y-6">
                            {/* Predicted Breed Card */}
                            <div className="p-4 bg-pink-100 border border-pink-200 rounded-xl shadow-lg">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-lg font-bold text-purple-800 flex items-center space-x-2">
                                        <span className="w-5 h-5">💖</span> 
                                        <span>It's a {result.breed}!</span>
                                    </h4>
                                    <div className="text-2xl font-extrabold text-pink-600">
                                        {result.confidence}%
                                    </div>
                                </div>
                                <ConfidenceBar confidence={result.confidence} />
                            </div>

                            {/* BREED INFO SECTION */}
                            <div className="p-5 bg-white border border-gray-100 rounded-xl shadow-md space-y-4">
                                <h4 className="text-xl font-bold text-purple-700 border-b pb-2 border-pink-100">
                                    Meet the {result.breed}!
                                </h4>
                                <p className="text-gray-700 leading-relaxed text-sm">{breedInfo.description}</p>
                                
                                <div className="flex justify-between text-sm font-medium border-t pt-3 border-purple-100">
                                    <span className="text-gray-600">Origin: </span>
                                    <span className="text-purple-800">{breedInfo.origin}</span>
                                </div>
                                <div className="border-t pt-3 border-purple-100">
                                    <h5 className="font-semibold text-gray-700 mb-2">Wonderful Traits:</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {breedInfo.temperament.map((trait, index) => (
                                            <span 
                                                key={index}
                                                className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full"
                                            >
                                                {trait}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Top Alternatives */}
                            {result.top_k && result.top_k.length > 0 && (
                                <div className="mt-4">
                                    <h4 className="text-lg text-purple-600 font-semibold mb-3 border-b pb-2 border-pink-100">Other Paw-sibilities:</h4>
                                    <ul className="space-y-3">
                                        {result.top_k.map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex justify-between items-center bg-purple-100 p-3 rounded-lg hover:bg-purple-200 transition duration-150"
                                            >
                                                <span className="text-purple-700 font-medium">
                                                    {index + 1}. {item.breed}
                                                </span>
                                                <span className="text-sm font-bold text-pink-600 bg-white px-3 py-1 rounded-full shadow-sm">
                                                    {item.confidence}%
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        // Initial state or no result yet
                        <div className="text-center p-8 bg-purple-100 rounded-xl text-purple-600">
                            <span className="block text-6xl mb-4">✨</span>
                            <p className="text-lg font-semibold">Ready to discover your dog's breed!</p>
                            <p className="text-md mt-2">Upload a picture on the left to get started.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DogBreedDetector;