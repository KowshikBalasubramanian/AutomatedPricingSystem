import React from "react";
import { useLocation, Link } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {};

  if (!orderDetails) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>Order not found</h2>
        <p>Please place an order first.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 20px", textAlign: "center", fontFamily: "Arial, sans-serif", color: "#333" }}>
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "40px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h1 style={{ color: "#4CAF50", fontWeight: "bold", marginBottom: "20px" }}>
          Thank You for Your Order!
        </h1>
        <p style={{ fontSize: "1.2em", marginBottom: "5px" }}>
          <strong>Order ID:</strong> {Math.random().toString(36).substring(7).toUpperCase()}
        </p>
        <p style={{ fontSize: "1.2em", marginBottom: "20px" }}>
          <strong>Total Amount:</strong> ${orderDetails.totalAmount.toFixed(2)}
        </p>
        <p style={{ fontSize: "1.2em", marginBottom: "30px" }}>
          <strong>Order Date:</strong> {new Date(orderDetails.date).toLocaleString()}
        </p>
        
        <div style={{ textAlign: "left", marginBottom: "30px" }}>
          <h3 style={{ borderBottom: "2px solid #ddd", paddingBottom: "10px", color: "#333" }}>
            Items Ordered
          </h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {orderDetails.items.map((item) => (
              <li
                key={item._id}
                style={{
                  marginBottom: "10px",
                  padding: "10px 0",
                  borderBottom: "1px solid #ddd",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  <strong>{item.Title}</strong> - {item.quantity} x ${item.Original_Price}
                </span>
                <span style={{ fontWeight: "bold" }}>
                  ${item.quantity * item.Original_Price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <Link to="/shop">
          <button
            style={{
              padding: "15px 30px",
              backgroundColor: "#6200ea",
              color: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "1em",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#3700b3")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#6200ea")}
          >
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;
