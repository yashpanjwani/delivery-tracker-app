import axios from "axios";

const API = axios.create({
  baseURL: "https://delivery-tracker-app.onrender.com"
});


export const createOrder = (orderData) => API.post("/orders", orderData);
export const getOrders = () => API.get("/orders");
export const updateOrder = (id, status) => API.put(`/orders/${id}`, { status });

