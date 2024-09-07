import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";

const Header = ({
  searchQuery,
  setSearchQuery,
  handleButtonClick,
  isPopupVisible,
  setFoodCategory,
}) => {
  return (
    <div className="header">
      <div className="textandinput">
        <div className="fooduzone">
          <span>F</span>
          <span style={{ color: "red" }}>oo</span>
          <span>dy</span>
          <span>&nbsp;</span>
          <span>Z</span>
          <span style={{ color: "red" }}>o</span>
          <span>ne</span>
        </div>
        <div>
          <input
            style={{ color: "white" }}
            type="search"
            placeholder="Search"
            className="searchinput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="buttonss">
        <button
          className="btn btn-danger buttonss addBtn"
          onClick={handleButtonClick}
        >
          <IoAddCircleOutline />
        </button>
        {isPopupVisible && (
          <div className="popup popup-container">
            {/* The Popup Form JSX will be handled by FoodyZoneText */}
          </div>
        )}
        <div className="AllButtons">
          <button
            className="btn btn-danger"
            onClick={() => setFoodCategory("All")}
          >
            All
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setFoodCategory("Breakfast")}
          >
            Breakfast
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setFoodCategory("Lunch")}
          >
            Lunch
          </button>
          <button
            className="btn btn-danger"
            onClick={() => setFoodCategory("Dinner")}
          >
            Dinner
          </button>
        </div>
        <div className="empty"></div>
      </div>
    </div>
  );
};

export default Header;
