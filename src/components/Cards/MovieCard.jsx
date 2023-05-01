import React, {useContext } from "react";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, doc, setDoc, arrayUnion } from "firebase/firestore";

import generBGIMG from "../../assets/generBGIMG.png";
import profilePic from "../../assets/profilePic.png";
import { Context } from "../../context/Context";
import { auth, db } from "../../../firebase";

import "./movieCard.css";
import ContentCard from "./ContentCard";

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

  const handleAddBtn = async (e, id) => {
    e.stopPropagation();
    if (user) {
      const docRef = await doc(collection(db, "users"), user.uid);
      if (dataType === "movie") {
        await setDoc(
          docRef,
          {
            wishlistData: {
              movieId: arrayUnion(id),
            },
          },
          { merge: true }
        );
      } else {
        await setDoc(
          docRef,
          {
            wishlistData: {
              tvId: arrayUnion(id),
            },
          },
          { merge: true }
        );
      }
      showAlert(e.target.innerHTML);
    } else {
      setWishlistData(true);
    }
  };

  // console.log("data", movieData);
  return (
    <div className="page-container">
      {isHomeData === "cast" ? (
        <>
          <Swiper {...settings}>
            {movieData?.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <div className="flex justify-center">
                    {item?.profile_path ? (
                      <img
                        className="h-40 w-40 rounded-full"
                        src={
                          `https://image.tmdb.org/t/p/original/${item?.profile_path}` ||
                          `${profilePic}`
                        }
                        alt=""
                      />
                    ) : (
                      <img
                        className="h-40 w-40 rounded-full"
                        src={profilePic}
                        alt=""
                      />
                    )}
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
              <ContentCard
                movie={movie}
                dataType={dataType}
                handleAddBtn={handleAddBtn}
                handleNavgiation={handleNavgiation}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className="flex flex-wrap justify-evenly gap-1 ">
          {movieData.map((movie, i) => (
            <ContentCard
              movie={movie}
              dataType={dataType}
              handleAddBtn={handleAddBtn}
              handleNavgiation={handleNavgiation}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
