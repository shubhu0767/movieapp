import React, { useContext, useEffect, useState } from "react";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, db } from "../../../firebase";
import Card from "./Card";
import { Context } from "../../context/Context";

const Wishlist = () => {
  const [user, loading, error] = useAuthState(auth);
  const [data, setData] = useState({});
  const { movieId, tvId } = data;
  const { showAlert } = useContext(Context);

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
  }, [user]);

  const handleRemoveBtn = async (e, id, type) => {
    e.stopPropagation();
    if (user) {
      const docRef = await doc(collection(db, "users"), user.uid);
      if (type === "movie") {
        const updatedMovieList = movieId.filter((val) => val !== id);
        await updateDoc(docRef, {
          wishlistData: {
            movieId: updatedMovieList,
            tvId: tvId,
          },
        });
      } else {
        const updatedTVList = tvId.filter((val) => val !== id);
        await updateDoc(docRef, {
          wishlistData: {
            movieId: movieId,
            tvId: updatedTVList,
          },
        });
      }
      showAlert("Item Removed successfully");
      getData();
    }
  };


  return (
    <div className=" page-container">
      <h1 className="text-3xl">Wishlist</h1>
      <div className="flex gap-x-3 flex-wrap">
        {movieId &&
          movieId.map((item) => (
            <Card
              key={item}
              type="movie"
              id={item}
              handleRemoveBtn={handleRemoveBtn}
            />
          ))}
        {tvId &&
          tvId.map((item) => (
            <Card
              key={item}
              type="tv"
              id={item}
              handleRemoveBtn={handleRemoveBtn}
            />
          ))}
      </div>
    </div>
  );
};

export default Wishlist;
