import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { OfferProvider } from "./contexts/OfferContext";
import { ProductProvider } from "./contexts/ProductContext";
import Navbar from "./components/Navbar";
import LoginPage from "./Authentication/LoginPage";
import SignUpPage from "./Authentication/SignUpPage";
import OfferGrid from "./components/OfferGrid";
import CategorySection from "./components/SegmentationSection";
import ProductCard from "./components/ProductCard";
import ProfilePage from "./components/Profilepage";
import Categories from "./components/categoryBar";
import Footer from "./components/Footer";
import CartDropdown from "./components/CartDropdown";
import Checkout from "./components/CheckoutPage";
import Admin from "./Admin/Adminpage";
import PageNotFound from "./components/PageNotFound";
import OrderPage from "./components/OrderPage";
import ProductDetails from "./components/ProductDetails";
import OrderConfirmation from "./components/OrderConfirmation";
import yourOrderPage from "./components/yourOrderPage";
const App = () => {
  const { presentUser, adminId } = useAuth();

  return (
    <CartProvider>
      <OfferProvider>
        <ProductProvider>
          <Router>
            <Navbar />
            <CartDropdown />
            <main>
              <div style={{ padding: "90px 30px" }}>
                <Routes>
                  {/* User Routes */}
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route
                    path="/"
                    element={
                      <>
                        <Categories /> <OfferGrid />{" "}
                      </>
                    }
                  />
                  <Route path="/shop" element={<CategorySection />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/OrderConfirmation" element={<OrderConfirmation />} />
                  <Route path="/productdetails" element={<ProductDetails />} />
                  <Route path="/products" element={<ProductCard />} />
                  <Route path="/orders" element={<OrderPage />} />
                  <Route path="/yourOrderPage" element={<yourOrderPage />} /> 

                  {/* Auth Routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/signup" element={<SignUpPage />} />

                  {/* Admin Route */}
                  <Route
                    path="/admin"
                    element={
                      presentUser && presentUser === adminId ? (
                        <Admin />
                      ) : (
                        <PageNotFound />
                      )
                    }
                  />

                  {/* Page Not Found */}
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
              </div>
            </main>
            <Footer />
          </Router>
        </ProductProvider>
      </OfferProvider>
    </CartProvider>
  );
};

export default App;
