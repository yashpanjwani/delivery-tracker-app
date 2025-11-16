import express from "express";
import cors from "cors";
import { db } from "./firebase-key.js";

const app = express();

// ✅ Correct CORS configuration
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://delivery-tracker-app-nine.vercel.app"  // ← your real Vercel domain
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// GET all orders
app.get("/orders", async (req, res) => {
  try {
    const snap = await db.collection("orders").get();
    const result = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    res.json(result);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// CREATE new order
app.post("/orders", async (req, res) => {
  try {
    const { name, item } = req.body;

    if (!name || !item) {
      return res.status(400).json({ error: "Missing name or item" });
    }

    const docRef = await db.collection("orders").add({
      name,
      item,
      status: "Accepted"
    });

    res.status(201).json({ id: docRef.id, message: "Order created" });
  } catch (err) {
    console.error("❌ Create error:", err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

// UPDATE order
app.put("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Missing status" });
    }

    await db.collection("orders").doc(id).update({ status });

    res.json({ message: "Order updated" });
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ error: "Failed to update order" });
  }
});

// ✅ Required for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

export default app;
