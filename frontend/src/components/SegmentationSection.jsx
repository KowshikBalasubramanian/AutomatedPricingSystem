import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CategoryContainer,
  ProductGrid,
  ProductCard,
} from "../StyledComponents/SegmentationSectionStyles";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { useProduct } from "../contexts/ProductContext";
import styled from "styled-components";

const CategorySection = () => {
  const { addToCart } = useCart();
  const { presentUser } = useAuth();
  const { Products } = useProduct();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Simulate a loading delay (e.g., fetching from an API)
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleAddToCart = async (
    productId,
    productTitle,
    productCategory,
    productImage,
    product_Original_Price
  ) => {
    if (presentUser) {
      await addToCart(
        productId,
        productTitle,
        productCategory,
        productImage,
        product_Original_Price
      );
    }
  };

  const handleProductClick = (product) => {
    navigate(`/ProductDetails`, { state: { product } });
  };

  return (
    <CategoryContainer>
      {loading ? (
        <SkeletonGrid>
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </SkeletonGrid>
      ) : (
        <ProductGrid>
          {Products.map((product) => (
            <ProductCard
              key={product._id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 250, damping: 15 }}
            >
              <button
                onClick={() => handleProductClick(product)}
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  cursor: "pointer",
                  textAlign: "inherit",
                  padding: "0",
                }}
              >
                <LazyLoadImage src={product.Image} alt={product.Title} />
                <h4>{product.Title}</h4>
                <p>${product.Original_Price}</p>
              </button>
              <button
                onClick={() =>
                  handleAddToCart(
                    product._id,
                    product.Title,
                    product.Category,
                    product.Image,
                    product.Original_Price
                  )
                }
              >
                Add to Cart
              </button>
            </ProductCard>
          ))}
        </ProductGrid>
      )}
    </CategoryContainer>
  );
};

export default CategorySection;

// Lazy Load Image Component
const LazyLoadImage = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ImageWrapper>
      {!isLoaded && <SkeletonImage />}
      <img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        style={{ display: isLoaded ? "block" : "none" }}
      />
    </ImageWrapper>
  );
};

// Styled Components
const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  justify-items: center;
  padding: 20px;
`;

const SkeletonCard = styled.div`
  width: 100%;
  max-width: 250px;
  height: 350px;
  background-color: #f0f0f0;
  border-radius: 16px;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% {
      background-color: #f0f0f0;
    }
    50% {
      background-color: #e0e0e0;
    }
    100% {
      background-color: #f0f0f0;
    }
  }
`;

const ImageWrapper = styled.div`
  position: relative;
  height: 200px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
  }
`;

const SkeletonImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  border-radius: 16px;
  animation: shimmer 1.5s infinite;
`;
