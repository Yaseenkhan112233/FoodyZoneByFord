import React from "react";
import FoodCard from "./Cards.jsx"; // Make sure to import the new component

function Background({ foods, onEdit, loading }) {
  return (
    <div className="Body">
      {loading ? (
        <div className="loading">
          <div className="loading-icon"></div>
        </div>
      ) : (
        <div className="cardContainer">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Background;
