import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // your backend URL
});

export const createOrder = (orderData) => API.post("/orders", orderData);
export const getOrders = () => API.get("/orders");
export const updateOrder = (id, status) => API.patch(`/orders/${id}`, { status });
