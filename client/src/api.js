import axios from "axios";

const API = axios.create({
  baseURL: "https://delivery-tracker-app-1vdi.vercel.app"   // <-- YOUR BACKEND URL (NO trailing slash)
});

export const createOrder = (orderData) => API.post("/orders", orderData);
export const getOrders = () => API.get("/orders");
export const updateOrder = (id, status) => API.patch(`/orders/${id}`, { status });
