import React, { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  setDoc,
  arrayRemove,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import MovieCard from "../Cards/MovieCard";
import { auth, db } from "../../../firebase";
import Card from './Card'
import { Context } from "../../context/Context";


const Wishlist = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState({});
  const { movieId, tvId } = data;
  const { showAlert } = useContext(Context);
  const [list, setlist] = useState([]);

  const getData = async () => {
    if (user) {
      const docRef = await doc(collection(db, "users"), user.uid);
      const data = await getDoc(docRef);
      if (data.exists()) {
        setData(data.get("wishlistData"));
      }
    }
  };

  useEffect(() => {
    getData();
  }, [user, list]);

  const handleRemoveBtn = async (e, id, type) => {

    const updatedList = movieId.filter((val) => val !== id);
    setlist(updatedList);
    if (user) {
        const docRef = await doc(collection(db, "users"), user.uid);
        if (type === "movie") {
            await updateDoc(docRef,{
                wishlistData: {
                    movieId: list
                }
            })
            showAlert("Item Removed successfully");
          } else {
            await updateDoc(docRef,{
              wishlistData: {
                tvId: list
              }
            })
            showAlert("Item Removed successfully");
        }
    }
  }


  console.log(movieId);
  return (
    <div className=" page-container flex gap-x-3 flex-wrap">
      {movieId &&
        movieId.map((item) => <Card key={item} type="movie" id={item} handleRemoveBtn={handleRemoveBtn} />)}
      {tvId &&
        tvId.map((item) => <Card key={item} type="tv" id={item} handleRemoveBtn={handleRemoveBtn} />)}
    </div>
  );
};

export default Wishlist;
