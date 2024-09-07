import React from "react";

function Background({ foods, onEdit }) {
  return (
    <div className="Body">
      <div className="cardContainer">
        {foods.map((food) => (
          <div className="cardss" key={food.id}>
            <div className="cardImageandtext">
              <div
                style={{ width: "200px", padding: "10px" }}
                className="cardImage"
              >
                <img
                  src={food.imageUrl}
                  alt={food.title}
                  style={{
                    // height: "200px",
                    // width: "200px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />

                <button
                  className="btn btn-primary"
                  onClick={() => onEdit(food)}
                >
                  Edit
                </button>
              </div>
              <div
                style={{
                  width: "200px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  // alignItems: "center",
                }}
                className="titlebtndesc"
              >
                <h1 className="egg">{food.title}</h1>
                <p className="eggpara">{food.desc}</p>
              </div>
              <div
                style={{
                  height: "200px",
                  width: "120px",
                  // backgroundColor: "black",
                  display: "flex",
                  // marginBottom: "3vh",

                  justifyContent: "center",
                  alignItems: "flex-end",
                }}
              >
                <button className="btn btn-danger">${food.price}</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Background;
