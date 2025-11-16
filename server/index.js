import express from "express";
import cors from "cors";
import { db } from "./firebase-key.js";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc
} from "firebase/firestore";

const app = express();

// 👇👇👇 ADD HERE — right after creating app
app.use(cors());
app.options("*", cors());   // required for POST on Vercel
app.use(express.json());
// 👆👆👆 PLACE IT EXACTLY HERE

// GET all orders
app.get("/orders", async (req, res) => {
  try {
    const snap = await getDocs(collection(db, "orders"));
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

    const docRef = await addDoc(collection(db, "orders"), {
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

    const orderRef = doc(db, "orders", id);
    await updateDoc(orderRef, { status });

    res.json({ message: "Order updated" });
  } catch (err) {
    console.error("❌ Update error:", err);
    res.status(500).json({ error: "Failed to update order" });
  }
});

// ❗ DO NOT use app.listen() on Vercel
export default app;
