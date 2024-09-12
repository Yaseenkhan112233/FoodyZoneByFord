import React from "react";

function FoodCard({ food, onEdit }) {
  return (
    <div className="cardss">
      <div className="cardImageandtext">
        <div className="image-card">
          <img
            src={food.imageUrl}
            alt={food.title}
            style={{
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>
        <div className="text-card">
          <h1 className="egg">{food.title}</h1>
          <p className="eggpara">{food.desc}</p>
        </div>
      </div>
      <div
        className="button-card"
        style={{
          display: "flex",
          justifyContent: "space-between",
          paddingRight: "10px",
        }}
      >
        <button className="btn btn-primary" onClick={() => onEdit(food)}>
          Edit
        </button>
        <button className="btn btn-danger">${food.price}</button>
      </div>
    </div>
  );
}

export default FoodCard;
