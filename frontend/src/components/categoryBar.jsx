import React from "react";
import {
  CategoryContainer,
  CategoryItem,
} from "../StyledComponents/categoryBarStyles"; // Import styled components
import mobile from "../Images/mobile.png";
import laptop from "../Images/laptop.jpg";
import fashion from "../Images/fashion.jpg";
import home from "../Images/home.jpg";
import grocery from "../Images/grocery.jpg";
import tv from "../Images/tv.jpg";
import beauty from "../Images/beauty.jpg";
import furniture from "../Images/furniture.jpg";
import deal from "../Images/deal.png";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Top Offers", icon: deal, filter: "" }, // No filter for "Top Offers"
  { name: "Mobiles & Tablets", icon: mobile, filter: "smartphone" },
  { name: "TVs & Appliances", icon: tv, filter: "homeappliances" },
  { name: "Electronics", icon: laptop, filter: "electronics" },
  { name: "Fashion", icon: fashion, filter: "fashion" },
  { name: "Beauty", icon: beauty, filter: "beauty" },
  { name: "Home & Kitchen", icon: home, filter: "home" },
  { name: "Furniture", icon: furniture, filter: "furniture" },
  { name: "Grocery", icon: grocery, filter: "grocery" },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (filter) => {
    navigate(`/shop?category=${filter}`); // Navigate with category as a query parameter
  };

  return (
    <CategoryContainer>
      {categories.map((category, index) => (
        <CategoryItem
          key={index}
          onClick={() => handleCategoryClick(category.filter)} // Pass the filter as a query parameter
        >
          <img src={category.icon} alt={category.name} />
          <p>{category.name}</p>
        </CategoryItem>
      ))}
    </CategoryContainer>
  );
};

export default Categories;
