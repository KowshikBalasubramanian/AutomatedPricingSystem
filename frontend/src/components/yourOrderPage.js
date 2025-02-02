import React from "react";
import styled from "styled-components";
import { useAuth } from "../contexts/AuthContext";

const OrderPage = () => {
  const { presentUserDetails } = useAuth();

  return (
    <OrderContainer>
      <h2>Your Orders</h2>
      {presentUserDetails?.purchase_history && presentUserDetails.purchase_history.length > 0 ? (
        <OrderList>
          {presentUserDetails.purchase_history.map((order, index) => (
            <OrderCard key={index}>
              <OrderDetails>
                <p><strong>Order ID:</strong> {order.order_id || `ORD-${index + 1}`}</p>
                <p><strong>Product ID:</strong> {order.product_id}</p>
                <p><strong>Product Name:</strong> {order.product_name}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                <p><strong>Price:</strong> ${order.price}</p>
                <p><strong>Order Date:</strong> {order.date || "Not Available"}</p>
              </OrderDetails>
            </OrderCard>
          ))}
        </OrderList>
      ) : (
        <p>You have no orders yet.</p>
      )}
    </OrderContainer>
  );
};

export default OrderPage;

// Styled Components for better styling of the order page
const OrderContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OrderCard = styled.li`
  background-color: #fff;
  padding: 20px;
  margin: 15px 0;
  border-radius: 8px;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
`;

const OrderDetails = styled.div`
  p {
    margin: 5px 0;
  }
  strong {
    color: #333;
  }
`;
