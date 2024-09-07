// import React, { useState, useEffect } from "react";
// import { IoAddCircleOutline } from "react-icons/io5";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import {
//   collection,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
//   getDocs,
// } from "firebase/firestore"; // Import update and delete
// import { db, storage } from "../Configuration";
// import Background from "./Background"; // Import the Background component

// function FoodyZoneText() {
//   const [inputValue, setInputValue] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [InputValueofdec, setInputValueofdec] = useState("");
//   const [InputValueofprice, setInputValueofprice] = useState("");
//   const [foods, setFoods] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [editFoodId, setEditFoodId] = useState(null); // New state to track edit mode
//   const [foodCategory, setFoodCategory] = useState("");

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     const querySnapshot = await getDocs(collection(db, "Foods"));
//     const foodsData = querySnapshot.docs.map((doc) => ({
//       ...doc.data(),
//       id: doc.id,
//     }));
//     setFoods(foodsData);
//   };

//   const handleButtonClick = () => {
//     setIsPopupVisible(true);
//     clearForm();
//   };

//   const clearForm = () => {
//     setInputValue("");
//     setInputValueofdec("");
//     setInputValueofprice("");
//     setSelectedImage(null);
//     setEditFoodId(null); // Reset edit mode
//   };

//   const uploadImage = async (image) => {
//     if (!image) return null;

//     try {
//       const storageRef = ref(storage, `images/${image.name}`);
//       const uploadTask = await uploadBytesResumable(storageRef, image);
//       const downloadURL = await getDownloadURL(uploadTask.ref);
//       return downloadURL;
//     } catch (error) {
//       console.error("Upload failed", error);
//       return null;
//     }
//   };

//   const writeData = async (e) => {
//     e.preventDefault();

//     try {
//       const imageUrl = selectedImage ? await uploadImage(selectedImage) : null;

//       if (editFoodId) {
//         // Update existing food
//         const foodRef = doc(db, "Foods", editFoodId);
//         await updateDoc(foodRef, {
//           title: inputValue,
//           desc: InputValueofdec,
//           imageUrl:
//             imageUrl || foods.find((food) => food.id === editFoodId).imageUrl, // If no new image, keep the old one
//           price: InputValueofprice,
//         });
//       } else {
//         // Create new food
//         await addDoc(collection(db, "Foods"), {
//           title: inputValue,
//           desc: InputValueofdec,
//           imageUrl: imageUrl,
//           price: InputValueofprice,
//         });
//       }

//       clearForm();
//       setIsPopupVisible(false);
//       fetchData(); // Refresh the list
//     } catch (error) {
//       console.error("Error uploading data", error);
//     }
//   };

//   const handleEditClick = (food) => {
//     // Pre-fill the form with the selected food data
//     setInputValue(food.title);
//     setInputValueofdec(food.desc);
//     setInputValueofprice(food.price);
//     setEditFoodId(food.id);
//     setIsPopupVisible(true);
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteDoc(doc(db, "Foods", editFoodId));
//       clearForm();
//       setIsPopupVisible(false);
//       fetchData(); // Refresh the list after deletion
//     } catch (error) {
//       console.error("Error deleting food", error);
//     }
//   };

//   const handleClosePopup = () => {
//     clearForm();
//     setIsPopupVisible(false);
//   };

//   const filteredFoods = foods.filter((food) =>
//     food.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <>
//       <div>
//         <div className="header">
//           <div className="textandinput">
//             <div className="fooduzone">
//               <span>F</span>
//               <span style={{ color: "red" }}>oo</span>
//               <span>dy</span>
//               <span>&nbsp;</span>
//               <span>Z</span>
//               <span style={{ color: "red" }}>o</span>
//               <span>ne</span>
//             </div>
//             <div>
//               <input
//                 type="search"
//                 placeholder="Search"
//                 className="searchinput"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//           </div>
//           <div className="buttonss">
//             <div>
//               <button
//                 className="btn btn-danger buttonss addBtn"
//                 onClick={handleButtonClick}
//               >
//                 <IoAddCircleOutline />
//               </button>

//               {isPopupVisible && (
//                 <div className="popup popup-container">
//                   <form onSubmit={writeData} className="popupForm">
//                     <label htmlFor="title">Enter Food Name</label>
//                     <input
//                       required
//                       className="input"
//                       type="text"
//                       value={inputValue}
//                       onChange={(e) => setInputValue(e.target.value)}
//                     />
//                     <label htmlFor="desc">Enter Food Description</label>
//                     <input
//                       required
//                       className="input"
//                       type="text"
//                       value={InputValueofdec}
//                       onChange={(e) => setInputValueofdec(e.target.value)}
//                     />
//                     <label htmlFor="image">Upload Food Image</label>
//                     <input
//                       className="input"
//                       type="file"
//                       onChange={(e) => setSelectedImage(e.target.files[0])}
//                     />
//                     <label htmlFor="price">Enter Food Price</label>
//                     <input
//                       required
//                       className="input"
//                       type="text"
//                       value={InputValueofprice}
//                       onChange={(e) => setInputValueofprice(e.target.value)}
//                     />
//                     <label htmlFor="category">Select Food Category</label>
//                     <select
//                       style={{ backgroundColor: "transparent", color: "white" }}
//                       required
//                       className="input"
//                       value={foodCategory}
//                       onChange={(e) => setFoodCategory(e.target.value)}
//                     >
//                       <option
//                         style={{
//                           backgroundColor: "rgb(97, 0, 0, 0.9)",
//                           color: "white",
//                         }}
//                         value=""
//                       >
//                         Select Category
//                       </option>
//                       <option
//                         style={{
//                           backgroundColor: "rgb(97, 0, 0, 0.9)",
//                           color: "white",
//                         }}
//                         value="Breakfast"
//                       >
//                         Breakfast
//                       </option>
//                       <option
//                         style={{
//                           backgroundColor: "rgb(97, 0, 0, 0.9)",
//                           color: "white",
//                         }}
//                         value="Lunch"
//                       >
//                         Lunch
//                       </option>
//                       <option
//                         style={{
//                           backgroundColor: "rgb(97, 0, 0, 0.9)",
//                           color: "white",
//                         }}
//                         value="Dinner"
//                       >
//                         Dinner
//                       </option>
//                     </select>

//                     <div className="popupButton">
//                       {editFoodId ? (
//                         <>
//                           <button
//                             className="btn btn-danger"
//                             onClick={handleDelete}
//                           >
//                             Delete
//                           </button>
//                           <button className="btn btn-primary" type="submit">
//                             Update
//                           </button>
//                         </>
//                       ) : (
//                         <button className="btn btn-primary" type="submit">
//                           Submit
//                         </button>
//                       )}
//                       <button
//                         className="btn btn-danger"
//                         onClick={handleClosePopup}
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               )}
//             </div>
//             <div className="AllButtons">
//               //{" "}
//               <button
//                 className="btn btn-danger"
//                 onClick={() => setSelectedCategory("All")}
//               >
//                 All
//               </button>
//               <button
//                 className="btn btn-danger"
//                 onClick={() => setSelectedCategory("Breakfast")}
//               >
//                 Breakfast
//               </button>
//               <button
//                 className="btn btn-danger"
//                 onClick={() => setSelectedCategory("Lunch")}
//               >
//                 Lunch
//               </button>
//               <button
//                 className="btn btn-danger"
//                 onClick={() => setSelectedCategory("Dinner")}
//               >
//                 Dinner
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Background foods={filteredFoods} onEdit={handleEditClick} />
//     </>
//   );
// }

// export default FoodyZoneText;

import React, { useState, useEffect } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db, storage } from "../Configuration";
import Background from "./Background";

function FoodyZoneText() {
  const [inputValue, setInputValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [InputValueofdec, setInputValueofdec] = useState("");
  const [InputValueofprice, setInputValueofprice] = useState("");
  const [foods, setFoods] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editFoodId, setEditFoodId] = useState(null);
  const [foodCategory, setFoodCategory] = useState("All");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "Foods"));
    const foodsData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    setFoods(foodsData);
  };

  const handleButtonClick = () => {
    setIsPopupVisible(true);
    clearForm();
  };

  const clearForm = () => {
    setInputValue("");
    setInputValueofdec("");
    setInputValueofprice("");
    setSelectedImage(null);
    setEditFoodId(null);
    setFoodCategory("All"); // Reset category
  };

  const uploadImage = async (image) => {
    if (!image) return null;

    try {
      const storageRef = ref(storage, `images/${image.name}`);
      const uploadTask = await uploadBytesResumable(storageRef, image);
      const downloadURL = await getDownloadURL(uploadTask.ref);
      return downloadURL;
    } catch (error) {
      console.error("Upload failed", error);
      return null;
    }
  };

  const writeData = async (e) => {
    e.preventDefault();

    try {
      const imageUrl = selectedImage ? await uploadImage(selectedImage) : null;

      if (editFoodId) {
        const foodRef = doc(db, "Foods", editFoodId);
        await updateDoc(foodRef, {
          title: inputValue,
          desc: InputValueofdec,
          imageUrl:
            imageUrl || foods.find((food) => food.id === editFoodId).imageUrl,
          price: InputValueofprice,
          category: foodCategory, // Add category field
        });
      } else {
        await addDoc(collection(db, "Foods"), {
          title: inputValue,
          desc: InputValueofdec,
          imageUrl: imageUrl,
          price: InputValueofprice,
          category: foodCategory, // Add category field
        });
      }

      clearForm();
      setIsPopupVisible(false);
      fetchData();
    } catch (error) {
      console.error("Error uploading data", error);
    }
  };

  const handleEditClick = (food) => {
    setInputValue(food.title);
    setInputValueofdec(food.desc);
    setInputValueofprice(food.price);
    setEditFoodId(food.id);
    setFoodCategory(food.category); // Pre-fill category
    setIsPopupVisible(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "Foods", editFoodId));
      clearForm();
      setIsPopupVisible(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting food", error);
    }
  };

  const handleClosePopup = () => {
    clearForm();
    setIsPopupVisible(false);
  };

  const filteredFoods = foods.filter((food) => {
    const matchesSearchQuery = food.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      foodCategory === "All" || food.category === foodCategory;
    return matchesSearchQuery && matchesCategory;
  });

  return (
    <>
      <div>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="buttonss">
            <div>
              <button
                className="btn btn-danger buttonss addBtn"
                onClick={handleButtonClick}
              >
                <IoAddCircleOutline />
              </button>

              {isPopupVisible && (
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
                      value={foodCategory}
                      onChange={(e) => setFoodCategory(e.target.value)}
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

                    <div className="popupButton">
                      {editFoodId ? (
                        <>
                          <button
                            className="btn btn-danger"
                            onClick={handleDelete}
                          >
                            Delete
                          </button>
                          <button className="btn btn-primary" type="submit">
                            Update
                          </button>
                        </>
                      ) : (
                        <button className="btn btn-primary" type="submit">
                          Submit
                        </button>
                      )}
                      <button
                        className="btn btn-danger"
                        onClick={handleClosePopup}
                      >
                        Close
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
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
      </div>
      <Background foods={filteredFoods} onEdit={handleEditClick} />
    </>
  );
}

export default FoodyZoneText;
