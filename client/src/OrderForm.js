import React, { useState } from "react";
import axios from "axios";

function OrderForm() {
  const [user, setUser] = useState("");
  const [item, setItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await axios.post("http://localhost:5000/orders", { 
  name: user,
  item: item 
});

      setMessage("✅ Order created successfully!");
      setUser("");
      setItem("");
    } catch (err) {
      setMessage("❌ Failed to create order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Create a New Order</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          placeholder="User name"
          required
        />
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Item name"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Order"}
        </button>
      </form>

      {message && (
        <p className={`message ${message.includes("✅") ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default OrderForm;
