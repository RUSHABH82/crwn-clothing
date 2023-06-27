import React from "react";
import "./category-item.style.scss";

export const CategoryItem = ({category}) => {
  const { imageUrl, title } = category;
  console.log(category)
  return (
    <div className="category-container">
      <div
        className="background-image"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop now</p>
      </div>
    </div>
  );
};
