// src/OrderList.jsimport { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";










import React, { useEffect, useState } from "react";
import axios from "axios";
import { collection, onSnapshot ,getDocs, query,doc, updateDoc} from "firebase/firestore";
import { db } from "./firebaseClient";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


async function testFirestoreConnection() {
  console.log("📡 Testing Firestore connection...");
  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    if (querySnapshot.empty) {
      console.warn("⚠️ No documents found in 'orders' collection!");
    } else {
      querySnapshot.forEach((doc) => {
        console.log("🔥 Order:", doc.id, doc.data());
      });
    }
  } catch (error) {
    console.error("❌ Firestore error:", error);
  }
}
testFirestoreConnection();








  // Fetch orders from server
 
  
  

 useEffect(() => {
  console.log("🔄 Setting up Firestore live listener...");

  const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
    const ordersData = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("📡 Live update received:", ordersData);
    setOrders(ordersData);
    setLoading(false);
  });

  return () => {
    console.log("🛑 Unsubscribing Firestore listener");
    unsubscribe();
  };
}, []);





  // Update order status on server, then refresh local list
 const updateStatus = async (id, newStatus) => {
  try {
    const ref = doc(db, "orders", id);
    await updateDoc(ref, { status: newStatus });

    console.log("🔥 Status updated in Firestore:", newStatus);
  } catch (err) {
    console.error("❌ Error updating Firestore:", err);
  }
};


  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{ marginBottom: "10px" }}>
            <b>{order.name}</b> ordered <b>{order.item}</b>
 —{" "}
            <select
              value={order.status}
              onChange={(e) => updateStatus(order.id, e.target.value)}
              style={{ marginRight: "8px" }}
            >
              <option value="Accepted">Accepted</option>
              <option value="On the way">On the way</option>
              <option value="Delivered">Delivered</option>
            </select>

            <span className={`status ${order.status.toLowerCase().replace(/\s/g, "-")}`}>
              {order.status}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;



