// server/index.js
import express from "express";
import cors from "cors";
import { db } from "./firebase-key.js";

const app = express();

app.use(cors());
app.options("*", cors());
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
    console.log("BODY:", req.body);

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

    const orderRef = db.collection("orders").doc(id);
    await orderRef.update({ status });

    res.json({ message: "Order updated" });
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ error: "Failed to update order" });
  }
});

// export app for Vercel
export default app;
