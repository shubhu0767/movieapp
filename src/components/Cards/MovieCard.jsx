import React, { useState, useEffect, useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, setDoc, arrayUnion } from "firebase/firestore";

import generBGIMG from "../../assets/generBGIMG.png";
import { Context } from "../../context/Context";
import { auth, db } from "../../../firebase";

import "./movieCard.css";


const MovieCard = ({ dataType, movieData, isHome }) => {
  const { setWishlistData, showAlert } = useContext(Context);
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);

  const isHomeData = isHome;

  const settings = {
    breakpoints: {
      1469: {
        slidesPerView: 6,
        slidesPerGroup: 6,
      },
      1200: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      850: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      550: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      480: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        // centeredSlides:true,
      },
    },
    pagination: {
      type: "none",
      clickable: true,
    },
    navigation: true,
    modules: [Pagination, Navigation],
    className: "",
  };

  const settingsForYoutubeVideo = {
    breakpoints: {
      1469: {
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
      1200: {
        slidesPerView: 3,
        slidesPerGroup: 3,
      },
      1000: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      700: {
        slidesPerView: 2,
        slidesPerGroup: 2,
      },
      480: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        // centeredSlides:true,
      },
    },
    pagination: {
      type: "none",
      clickable: true,
    },
    navigation: true,
    modules: [Pagination, Navigation],
    className: "",
  };
  // console.log("MovieCard File", movieData);
  const handleNavgiation = (movieId, dataType) => {
    navigate(`/${dataType}/${dataType}_details/${movieId}`);
  };

  // console.log("Context", setWishlistData);

  const handleAddBtn = async (e,id) => {
    e.stopPropagation();
    if (user) {
      const docRef = await doc(collection(db, "users"), user.uid);
      if (dataType === "movie") {
        await setDoc(docRef, {
          wishlistData: {
            movieId: arrayUnion(id)
          },
        }, { merge: true })
      }else {
        await setDoc(docRef, {
          wishlistData: {
            tvId: arrayUnion(id)
          },
        }, { merge: true })
      }
      showAlert(e.target.innerHTML);
    }else {
      // alert("Please Login/Signup for used Features of this APP");
      setWishlistData(true);
    }
  };

  console.log("data", movieData);
  return (
    <div className="page-container">
      {isHomeData === "cast" ? (
        <>
          <Swiper {...settings}>
            {movieData?.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className="flex justify-center">
                    <img
                      className="h-40 w-40 rounded-full"
                      src={`https://image.tmdb.org/t/p/original/${item?.profile_path}`}
                      alt=""
                    />
                  </div>
                  <h2 className="text-lg">Orignal Name: {item.name}</h2>
                  <h2>Character Name: {item.character}</h2>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      ) : isHomeData === "geners" ? (
        <Swiper {...settings}>
          {movieData.map((movie) => (
            // console.log(movie)
            <SwiperSlide key={movie.id}>
              <div className="flex ml-8 items-center h-48 cursor-pointer">
                <div className="aspect-video hover:scale-125 transition delay-150 ease-in-out">
                  <img
                    className="rounded-lg"
                    style={{ width: "100%", height: "100%" }}
                    src={generBGIMG}
                    alt={movie?.title}
                  />
                  <div className="rounded-lg w-full h-full bg-gradient-to-b from-transparent to-neutral-800 absolute bottom-0 text-white">
                    <h1 className="first-letter:pl-3 left-1 text-lg absolute top-24">
                      {movie.name}
                    </h1>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : isHomeData === "youtubeVideos" ? (
        <Swiper {...settingsForYoutubeVideo}>
          {movieData.map((video) => {
            return (
              <SwiperSlide key={video.id}>
                <div className="flex justify-center">
                  <iframe
                    className="aspect-video"
                    src={`https://www.youtube.com/embed/${video?.key}`}
                    title="3 Idiots | OFFICIAL trailer #1 US/indian (2009)"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : isHomeData ? (
        <Swiper {...settings}>
          {movieData.map((movie) => (
            // console.log(movie)
            <SwiperSlide key={movie.id}>
              <div className="movieCard flex items-center h-96 cursor-pointer ">
                <div className="movieImage w-48 h-72 hover:scale-125 transition delay-150 ease-in-out">
                  <img
                    className="rounded-lg z-10"
                    style={{ width: "100%", height: "100%" }}
                    src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                    alt={movie?.title}
                  />
                  <div
                    onClick={() => handleNavgiation(movie?.id, dataType)}
                    className="movieText rounded-lg hidden w-full h-20 bg-gradient-to-b from-transparent to-neutral-800 absolute bottom-0 left-0 text-white"
                  >
                    <h5 className="movieTitle pl-3 left-1">
                      {movie.title || movie.name}
                    </h5>
                    <ul style={{ fontSize: "8px" }} className="list-disc flex">
                      <li className="text-xs my-1 pl-1 left-1">
                        ◑ {movie?.release_date || movie?.first_air_date}
                      </li>
                      <li className="text-xs my-1 pl-1 left-1">
                        ◐ {movie?.vote_average}
                      </li>
                      <li className="text-xs my-1 pl-1 left-1">
                        ◐ {movie?.original_language}
                      </li>
                    </ul>
                    <label className=" "></label>
                    <div className="movieOverview">
                      <span className="text-xs">{movie?.overview}</span>
                    </div>
                    <div className="justify-center flex items-center mt-1">
                      <AiOutlinePlusCircle />

                      <button
                        style={{ fontSize: "12px" }}
                        className="ml-2"
                        onClick={(e) => handleAddBtn(e, movie?.id)}
                      >
                        Add to Watchlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-wrap justify-evenly gap-1 ">
          {movieData.map((movie, i) => (
            // console.log("trending", i)
            <div className="w-60 " key={i}>
              <div className="w-60">
                <img
                  style={{ width: "100%" }}
                  src={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                  alt=""
                />
              </div>
              <div>
                <h5 className="text-center text-white">
                  {movie?.title || movie?.name}
                </h5>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
