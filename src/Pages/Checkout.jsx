import React, { useState } from "react";

const Checkout = () => {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handlePayment = async () => {
    if (!amount || !name || !email || !phone) {
      alert("Please fill all fields");
      return;
    }

    try {
      // 1️⃣ Call your Node.js backend (Express API)
      const response = await fetch("http://localhost:5000/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Number(amount),
          name,
          email,
          phone,
        }),
      });

      const data = await response.json();

      console.log("Order response:", data);

      if (!data.payment_session_id) {
        alert("Order creation failed");
        return;
      }

      // 2️⃣ Cashfree Checkout SDK
      const cashfree = new window.Cashfree({
        mode: "sandbox", // change later to production
      });

      cashfree.checkout({
        paymentSessionId: data.payment_session_id,
        redirectTarget: "_self",
      });
    } catch (err) {
      console.error("Payment error", err);
      alert("Payment failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Checkout</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        type="text"
        placeholder="Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        style={{ width: "100%", padding: 10, marginBottom: 10 }}
      />

      <button
        onClick={handlePayment}
        style={{
          width: "100%",
          padding: 12,
          backgroundColor: "#2ecc71",
          color: "white",
          border: "none",
          fontSize: 16,
          cursor: "pointer",
        }}
      >
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;
