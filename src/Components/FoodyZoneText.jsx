// import React, { useState, useEffect } from "react";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
// import {
//   collection,
//   addDoc,
//   updateDoc,
//   deleteDoc,
//   doc,
//   getDocs,
//   query,
//   where,
// } from "firebase/firestore";
// import { db, storage } from "../Configuration";
// import Background from "./Background";
// import Header from "./Header";
// import Popup from "./Popup"; // Import the Popup component

// function FoodyZoneText() {
//   const [inputValue, setInputValue] = useState("");
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const [InputValueofdec, setInputValueofdec] = useState("");
//   const [InputValueofprice, setInputValueofprice] = useState("");
//   const [foods, setFoods] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [editFoodId, setEditFoodId] = useState(null);
//   const [foodCategory, setFoodCategory] = useState("All");
//   const [formFoodCategory, setFormFoodCategory] = useState("All");

//   useEffect(() => {
//     fetchData();
//   }, [searchQuery, foodCategory]);

//   const fetchData = async () => {
//     try {
//       let q = collection(db, "Foods");

//       if (foodCategory !== "All") {
//         q = query(q, where("category", "==", foodCategory));
//       }

//       if (searchQuery) {
//         q = query(
//           q,
//           where("title", ">=", searchQuery.toLowerCase()),
//           where("title", "<=", searchQuery.toLowerCase() + "\uf8ff")
//         );
//       }

//       const querySnapshot = await getDocs(q);
//       const foodsData = querySnapshot.docs.map((doc) => ({
//         ...doc.data(),
//         id: doc.id,
//       }));

//       setFoods(foodsData);
//     } catch (error) {
//       console.error("Error fetching data", error);
//     }
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
//     setEditFoodId(null);
//     setFormFoodCategory("All");
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
//         const foodRef = doc(db, "Foods", editFoodId);
//         await updateDoc(foodRef, {
//           title: inputValue,
//           desc: InputValueofdec,
//           imageUrl:
//             imageUrl || foods.find((food) => food.id === editFoodId).imageUrl,
//           price: InputValueofprice,
//           category: formFoodCategory,
//         });
//       } else {
//         await addDoc(collection(db, "Foods"), {
//           title: inputValue,
//           desc: InputValueofdec,
//           imageUrl: imageUrl,
//           price: InputValueofprice,
//           category: formFoodCategory,
//         });
//       }

//       clearForm();
//       setIsPopupVisible(false);
//       fetchData();
//     } catch (error) {
//       console.error("Error uploading data", error);
//     }
//   };

//   const handleEditClick = (food) => {
//     setInputValue(food.title);
//     setInputValueofdec(food.desc);
//     setInputValueofprice(food.price);
//     setEditFoodId(food.id);
//     setFormFoodCategory(food.category);
//     setIsPopupVisible(true);
//   };

//   const handleDelete = async () => {
//     try {
//       await deleteDoc(doc(db, "Foods", editFoodId));
//       clearForm();
//       setIsPopupVisible(false);
//       fetchData();
//     } catch (error) {
//       console.error("Error deleting food", error);
//     }
//   };

//   const handleClosePopup = () => {
//     clearForm();
//     setIsPopupVisible(false);
//   };

//   const filteredFoods = foods.filter((food) => {
//     const matchesSearchQuery = food.title
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchesCategory =
//       foodCategory === "All" || food.category === foodCategory;
//     return matchesSearchQuery && matchesCategory;
//   });

//   return (
//     <>
//       <Header
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         handleButtonClick={handleButtonClick}
//         isPopupVisible={isPopupVisible}
//         setFoodCategory={setFoodCategory}
//       />
//       {isPopupVisible && (
//         <Popup
//           inputValue={inputValue}
//           setInputValue={setInputValue}
//           InputValueofdec={InputValueofdec}
//           setInputValueofdec={setInputValueofdec}
//           InputValueofprice={InputValueofprice}
//           setInputValueofprice={setInputValueofprice}
//           selectedImage={selectedImage}
//           setSelectedImage={setSelectedImage}
//           formFoodCategory={formFoodCategory}
//           setFormFoodCategory={setFormFoodCategory}
//           writeData={writeData}
//           handleDelete={handleDelete}
//           handleClosePopup={handleClosePopup}
//           editFoodId={editFoodId}
//         />
//       )}
//       <Background foods={filteredFoods} onEdit={handleEditClick} />
//     </>
//   );
// }

// export default FoodyZoneText;

// src/components/FoodyZoneText.jsx

import React, { useState, useEffect } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db, storage } from "../Configuration";
import Background from "./Background";
import Header from "./Header";
import Popup from "./Popup";

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
  const [formFoodCategory, setFormFoodCategory] = useState("All");
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    fetchData();
  }, [searchQuery, foodCategory]);

  const fetchData = async () => {
    setLoading(true); // Set loading to true when starting fetch
    try {
      let q = collection(db, "Foods");

      if (foodCategory !== "All") {
        q = query(q, where("category", "==", foodCategory));
      }

      if (searchQuery) {
        q = query(
          q,
          where("title", ">=", searchQuery.toLowerCase()),
          where("title", "<=", searchQuery.toLowerCase() + "\uf8ff")
        );
      }

      const querySnapshot = await getDocs(q);
      const foodsData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setFoods(foodsData);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false); // Set loading to false when fetch is done
    }
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
    setFormFoodCategory("All");
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
          category: formFoodCategory,
        });
      } else {
        await addDoc(collection(db, "Foods"), {
          title: inputValue,
          desc: InputValueofdec,
          imageUrl: imageUrl,
          price: InputValueofprice,
          category: formFoodCategory,
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
    setFormFoodCategory(food.category);
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
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleButtonClick={handleButtonClick}
        isPopupVisible={isPopupVisible}
        setFoodCategory={setFoodCategory}
      />
      {isPopupVisible && (
        <Popup
          inputValue={inputValue}
          setInputValue={setInputValue}
          InputValueofdec={InputValueofdec}
          setInputValueofdec={setInputValueofdec}
          InputValueofprice={InputValueofprice}
          setInputValueofprice={setInputValueofprice}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          formFoodCategory={formFoodCategory}
          setFormFoodCategory={setFormFoodCategory}
          writeData={writeData}
          handleDelete={handleDelete}
          handleClosePopup={handleClosePopup}
          editFoodId={editFoodId}
        />
      )}
      <Background
        foods={filteredFoods}
        onEditClick={handleEditClick}
        loading={loading} // Pass loading state
      />
    </>
  );
}

export default FoodyZoneText;
