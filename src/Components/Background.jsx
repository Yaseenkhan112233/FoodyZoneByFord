import React from "react";

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
            <div className="cardss" key={food.id}>
              <div className="cardImageandtext">
                <div className="image-card">
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
                <button
                  className="btn btn-primary"
                  onClick={() => onEdit(food)}
                >
                  Edit
                </button>
                <button className="btn btn-danger">${food.price}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Background;

// import React from "react";
// import PropTypes from "prop-types";

// function Background({ foods, onEditClick, loading }) {
//   if (loading) {
//     return <div className="loading">Loading...</div>; // Display loading indicator
//   }

//   return (
//     <div className="background-container">
//       {foods.length === 0 ? (
//         <p>No foods available</p>
//       ) : (
//         foods.map((food) => (
//           <div key={food.id} className="food-card">
//             <h3>{food.title}</h3>
//             <p>{food.desc}</p>
//             <img src={food.imageUrl} alt={food.title} />
//             <p>${food.price}</p>
//             <p>Category: {food.category}</p>
//             <button onClick={() => onEditClick(food)}>Edit</button>
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

// Background.propTypes = {
//   foods: PropTypes.array.isRequired,
//   onEditClick: PropTypes.func.isRequired,
//   loading: PropTypes.bool.isRequired, // Prop type for loading state
// };

// export default Background;
