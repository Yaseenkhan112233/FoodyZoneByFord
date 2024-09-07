// src/components/Popup.jsx

import React from "react";

function Popup({
  inputValue,
  setInputValue,
  InputValueofdec,
  setInputValueofdec,
  InputValueofprice,
  setInputValueofprice,
  selectedImage,
  setSelectedImage,
  formFoodCategory,
  setFormFoodCategory,
  writeData,
  handleDelete,
  handleClosePopup,
  editFoodId,
}) {
  return (
    <div className="popup popup-container">
      <form onSubmit={writeData} className="popupForm">
        <label htmlFor="title">Enter Food Name</label>
        <input
          required
          className="input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <label htmlFor="desc">Enter Food Description</label>
        <input
          required
          className="input"
          type="text"
          value={InputValueofdec}
          onChange={(e) => setInputValueofdec(e.target.value)}
        />
        <label htmlFor="image">Upload Food Image</label>
        <input
          className="input"
          type="file"
          onChange={(e) => setSelectedImage(e.target.files[0])}
        />
        <label htmlFor="price">Enter Food Price</label>
        <input
          required
          className="input"
          type="text"
          value={InputValueofprice}
          onChange={(e) => setInputValueofprice(e.target.value)}
        />
        <label htmlFor="category">Select Food Category</label>
        <select
          style={{ backgroundColor: "transparent", color: "white" }}
          required
          className="input"
          value={formFoodCategory}
          onChange={(e) => setFormFoodCategory(e.target.value)}
        >
          <option
            style={{
              backgroundColor: "rgb(97, 0, 0, 0.9)",
              color: "white",
            }}
            value=""
          >
            Select Category
          </option>
          <option
            style={{
              backgroundColor: "rgb(97, 0, 0, 0.9)",
              color: "white",
            }}
            value="Breakfast"
          >
            Breakfast
          </option>
          <option
            style={{
              backgroundColor: "rgb(97, 0, 0, 0.9)",
              color: "white",
            }}
            value="Lunch"
          >
            Lunch
          </option>
          <option
            style={{
              backgroundColor: "rgb(97, 0, 0, 0.9)",
              color: "white",
            }}
            value="Dinner"
          >
            Dinner
          </option>
        </select>
        <div style={{ display: "flex", marginTop: "5px" }}>
          <button className="btn btn-primary" type="submit">
            {editFoodId ? "Update" : "Add Food"}
          </button>

          {editFoodId && (
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
          <button
            className="btn btn-secondary"
            type="button"
            onClick={handleClosePopup}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default Popup;
