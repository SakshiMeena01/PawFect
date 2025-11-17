const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Server is working!");
});

app.post("/create-order", async (req, res) => {
  const { amount, name, email, phone } = req.body;

  try {
    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/orders",
      {
        order_amount: amount,
        order_currency: "INR",
        customer_details: {
          customer_id: email,
          customer_email: email,
          customer_phone: phone,
        },
      },
      {
        headers: {
          "x-client-id": process.env.CASHFREE_APP_ID,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY,
          "x-api-version": "2022-09-01",
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error);
    res.status(500).json(error.response?.data || "Server error");
  }
});

app.listen(5000, () => {
  console.log("🔥 Server running at http://localhost:5000");
});
