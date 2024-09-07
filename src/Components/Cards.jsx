import React, { useState, useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, storage } from "../Configuration";
import Background from "./Background"; // Import Background component

function FoodyZoneText() {
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [InputValueofdec, setInputValueofdec] = useState("");
  const [InputValueofprice, setInputValueofprice] = useState("");
  const [foods, setFoods] = useState([]); // State to store fetched data

  const handleButtonClick = () => {
    setIsPopupVisible(true);
  };

  const uploadImage = async (image) => {
    if (!image) return null;

    try {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = await uploadBytesResumable(storageRef, image);
      const downloadURL = await getDownloadURL(uploadTask.ref);
      console.log("File available at", downloadURL);
      return downloadURL;
    } catch (error) {
      console.error("Upload failed", error);
      return null;
    }
  };

  const writeData = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImage(selectedImage);
      await addDoc(collection(db, "Foods"), {
        title: inputValue,
        desc: InputValueofdec,
        imageUrl: imageUrl,
        price: InputValueofprice,
      });

      setInputValue("");
      setInputValueofdec("");
      setInputValueofprice("");
      setSelectedImage(null);

      fetchData(); // Fetch the updated data after submission
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  // Fetch data from Firestore
  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Foods"));
      const foodsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFoods(foodsData);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        {/* Existing UI code */}
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
                type="search"
                placeholder="Search"
                className="searchinput"
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
                <form onSubmit={writeData} className="popupForm">
                  {/* Form fields */}
                  <label
                    style={{ marginRight: "120px", fontSize: "14px" }}
                    htmlFor="title"
                  >
                    Enter Food Name
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your data"
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                  />
                  <hr />
                  <label
                    style={{ marginRight: "100px", fontSize: "14px" }}
                    htmlFor="title"
                  >
                    Enter Food Description
                  </label>
                  <input
                    required
                    className="input"
                    type="text"
                    placeholder="Enter your data"
                    value={InputValueofdec}
                    onChange={(event) => setInputValueofdec(event.target.value)}
                  />
                  <hr />
                  <label
                    style={{ marginRight: "140px", fontSize: "14px" }}
                    htmlFor="title"
                  >
                    Enter Food Image
                  </label>
                  <div className="imagechoose">
                    {selectedImage && (
                      <div>
                        <img
                          alt="not found"
                          width={"50px"}
                          src={URL.createObjectURL(selectedImage)}
                        />
                        <br /> <br />
                        <button
                          className="btn btn-primary"
                          onClick={() => setSelectedImage(null)}
                        >
                          Remove
                        </button>
                        <br />
                      </div>
                    )}
                    <input
                      className="input"
                      type="file"
                      name="myImage"
                      placeholder="image"
                      onChange={(event) => {
                        setSelectedImage(event.target.files[0]);
                      }}
                    />
                  </div>
                  <hr />
                  <label
                    style={{ marginRight: "90px", fontSize: "14px" }}
                    htmlFor="title"
                  >
                    Enter Food Price
                  </label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Enter your data"
                    value={InputValueofprice}
                    onChange={(event) =>
                      setInputValueofprice(event.target.value)
                    }
                  />
                  <div className="popupButton">
                    <button
                      className="btn btn-danger"
                      onClick={() => setIsPopupVisible(false)}
                    >
                      Close
                    </button>
                    <button className="btn btn-primary" type="submit">
                      Submit
                    </button>
                  </div>
                </form>
                <div className="popup-overlay"></div>
              </div>
            )}
          </div>
          <div className="AllButtons">
            <button className="btn btn-danger">All</button>
            <button className="btn btn-danger">BreakFast</button>
            <button className="btn btn-danger">Lunch</button>
            <button className="btn btn-danger">Dinner</button>
          </div>
        </div>
      </div>
      <Background foods={foods} />
    </>
  );
}

export default FoodyZoneText;
