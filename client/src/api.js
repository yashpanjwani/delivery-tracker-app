import axios from "axios";

const API = axios.create({
  baseURL: "https://delivery-tracker-app-beta.vercel.app"
});


export const createOrder = (orderData) => API.post("/orders", orderData);
export const getOrders = () => API.get("/orders");
export const updateOrder = (id, status) => API.patch(`/orders/${id}`, { status });
