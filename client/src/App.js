
import './App.css';
import React from "react";
import OrderForm from "./OrderForm";
import OrderList from "./OrderList";

function App() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>🚗 Delivery Tracker Frontend</h1>
      <OrderForm />
      <OrderList />
    </div>
  );
}

export default App;
