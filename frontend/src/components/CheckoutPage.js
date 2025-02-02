import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import {
  CheckoutContainer,
  LeftSection,
  RightSection,
  AddressSection,
  ProductList,
  ProductItem,
  ProductDetails,
  ActionButtons,
  PriceDetails,
  PriceRow,
  TotalAmount,
  SavingMessage,
  PlaceOrderButton,
} from "../StyledComponents/CheckoutPageStyles";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const CheckoutPage = () => {
  const { cartItems, incrementItem, decrementItem, deleteItem, clearCart } = useCart();
  const { presentUser } = useAuth();
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate(); // For navigation after placing the order

  // Calculate the total price whenever cartItems change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + item.Original_Price * item.quantity, 0);
    setTotalPrice(total);
  }, [cartItems]);

  // Handle Place Order
  const handlePlaceOrder = () => {
    if (!presentUser) {
      alert("Please log in to place your order.");
      return;
    }

    const orderDetails = {
      userId: presentUser.id,
      items: cartItems,
      totalAmount: totalPrice + 20, // Add packaging fee
      date: new Date().toISOString(),
    };
    
    clearCart();
    // Navigate to Order Confirmation page and pass order details
    navigate("/OrderConfirmation", { state: { orderDetails } });

    
    
  };

  return (
    <CheckoutContainer>
      <LeftSection>
        <AddressSection>
          <h3>From Saved Addresses</h3>
          <button>Enter Delivery Pincode</button>
        </AddressSection>
        <ProductList>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ProductItem key={item._id}>
                <img src={item.Image} alt={item.Title} />
                <ProductDetails>
                  <h4>{item.Title}</h4>
                  <span>${item.Original_Price}</span>
                  <ActionButtons>
                    <button onClick={() => decrementItem(item._id)}>
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => incrementItem(item._id)}>
                      <FaPlus />
                    </button>
                    <button onClick={() => deleteItem(item._id)}>
                      <FaTrash />
                    </button>
                  </ActionButtons>
                </ProductDetails>
              </ProductItem>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </ProductList>
      </LeftSection>
      <RightSection>
        <PriceDetails>
          <h3>Price Details</h3>
          <PriceRow>
            <span>Price ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
            <span>${totalPrice.toFixed(2)}</span>
          </PriceRow>
          <PriceRow>
            <span>Discount</span>
            <span className="discount">- $0.00</span>
          </PriceRow>
          <PriceRow>
            <span>Delivery Charges</span>
            <span className="free">$0 Free</span>
          </PriceRow>
          <PriceRow>
            <span>Secured Packaging Fee</span>
            <span>$20</span>
          </PriceRow>
          <TotalAmount>
            <h4>Total Amount</h4>
            <h4>${(totalPrice + 20).toFixed(2)}</h4>
          </TotalAmount>
          <SavingMessage>You will save $0 on this order</SavingMessage>
        </PriceDetails>
        <PlaceOrderButton onClick={handlePlaceOrder}>Place Order</PlaceOrderButton>
      </RightSection>
    </CheckoutContainer>
  );
};

export default CheckoutPage;
