// src/OrderList.jsimport { collection, onSnapshot, doc, updateDoc } from "firebase/firestore";










const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error("❌ Failed to fetch orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrder(id, newStatus);
      fetchOrders(); // refresh after update
    } catch (error) {
      console.error("❌ Failed to update order:", error);
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
            <b>{order.name}</b> ordered <b>{order.item}</b> —{" "}
            <select
              value={order.status}
              onChange={(e) =>
                handleStatusChange(order.id, e.target.value)
              }
            >
              <option value="Accepted">Accepted</option>
              <option value="On the way">On the way</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderList;
