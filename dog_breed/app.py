import os
import io
import json
import traceback
from typing import List, Tuple

from flask import Flask, request, jsonify
import numpy as np
from PIL import Image

import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from flask_cors import CORS

app = Flask(__name__)
CORS(app)




# ------------------------------
# Paths - adjusted with correct weights file name
# ------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "model")
MODEL_WEIGHTS_PATH = os.path.join(MODEL_DIR, "PawFect_model_final.weights.h5")  # UPDATED
LABELS_PATH = os.path.join(MODEL_DIR, "class_indices.json")
UPLOAD_FOLDER = os.path.join(BASE_DIR, "uploads")
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ------------------------------
# Inference constants
# ------------------------------
IMG_SIZE = (224, 224)
ALLOWED_EXTS = {"jpg", "jpeg", "png"}
TOP_K = 3

# ------------------------------
# Utilities
# ------------------------------
def allowed_file(filename: str) -> bool:
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTS

def load_labels(labels_path: str) -> List[str]:
    with open(labels_path, "r") as f:
        class_indices = json.load(f)
    inv = {v: k for k, v in class_indices.items()}
    class_names = [inv[i] for i in range(len(inv))]
    return class_names

def preprocess_pil_image(pil_img: Image.Image) -> np.ndarray:
    img = pil_img.convert("RGB").resize(IMG_SIZE)
    arr = np.array(img, dtype=np.float32)
    arr = np.expand_dims(arr, axis=0)
    return arr

def top_k_from_logits(logits: np.ndarray, class_names: List[str], k: int = 3) -> List[Tuple[str, float]]:
    probs = logits[0]
    idx = np.argsort(probs)[::-1][:k]
    return [(class_names[i], float(probs[i])) for i in idx]

# ------------------------------
# Build functional model (same as training)
# ------------------------------
def build_functional_inference_model(num_classes: int) -> keras.Model:

    inputs = keras.Input(shape=(224, 224, 3))
    base = keras.applications.MobileNetV3Large(
        weights=None,
        include_top=False,
        pooling=None,
        include_preprocessing=True,
        name="MobileNetV3Large",
    )
    x = base(inputs, training=False)
    x = layers.GlobalAveragePooling2D(name="gap")(x)

    x = layers.Dense(512, activation="relu", name="dense_512")(x)
    x = layers.BatchNormalization(name="bn_512")(x)
    x = layers.Dropout(0.4, name="drop_040")(x)

    x = layers.Dense(256, activation="relu", name="dense_256")(x)
    x = layers.BatchNormalization(name="bn_256")(x)
    x = layers.Dropout(0.3, name="drop_030")(x)

    x = layers.Dense(128, activation="relu", name="dense_128")(x)
    x = layers.BatchNormalization(name="bn_128")(x)
    x = layers.Dropout(0.2, name="drop_020")(x)

    outputs = layers.Dense(num_classes, activation="softmax", name="preds")(x)
    model = keras.Model(inputs, outputs, name="pawfect_functional")
    return model

# ------------------------------
# Load labels + model weights
# ------------------------------
print("🔍 Preparing model weights:", MODEL_WEIGHTS_PATH)
if not os.path.exists(MODEL_WEIGHTS_PATH):
    raise FileNotFoundError(f"Weights file not found at {MODEL_WEIGHTS_PATH}")

if not os.path.exists(LABELS_PATH):
    raise FileNotFoundError(f"class_indices.json not found at {LABELS_PATH}")

CLASS_NAMES = load_labels(LABELS_PATH)
NUM_CLASSES = len(CLASS_NAMES)

MODEL = build_functional_inference_model(NUM_CLASSES)
_ = MODEL(tf.zeros((1, 224, 224, 3)))
MODEL.load_weights(MODEL_WEIGHTS_PATH)
print("✅ Model built and weights loaded successfully with", NUM_CLASSES, "classes.")

# ------------------------------
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "PawFect Dog Breed Classification API is running!"})

# Health check
# ------------------------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok", "num_classes": NUM_CLASSES}), 200

# ------------------------------
# Predict route
# ------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    try:
        if "image" in request.files:
            file = request.files["image"]
            if file.filename == "" or not allowed_file(file.filename):
                return jsonify({"error": "Invalid file. Allowed: jpg, jpeg, png"}), 400
            img_bytes = file.read()
            filename = file.filename
        else:
            img_bytes = request.get_data()
            if not img_bytes:
                return jsonify({"error": "No image uploaded"}), 400
            filename = "upload.png"

        save_path = os.path.join(UPLOAD_FOLDER, filename)
        with open(save_path, "wb") as f:
            f.write(img_bytes)

        pil_img = Image.open(io.BytesIO(img_bytes))
        inp = preprocess_pil_image(pil_img)

        preds = MODEL.predict(inp, verbose=0)
        class_index = int(np.argmax(preds[0]))
        confidence = float(np.max(preds[0]))
        topk = top_k_from_logits(preds, CLASS_NAMES, k=TOP_K)

        return jsonify({
            "breed": CLASS_NAMES[class_index],
            "confidence": round(confidence * 100.0, 2),
            "top_k": [
                {"breed": name, "confidence": round(prob * 100.0, 2)}
                for name, prob in topk
            ],
        }), 200

    except Exception as e:
        print("Prediction error:", e)
        traceback.print_exc()
        return jsonify({"error": "Inference failed", "detail": str(e)}), 500

# ------------------------------
# Run server
# ------------------------------
if __name__ == "__main__":
    app.run(debug=True)
