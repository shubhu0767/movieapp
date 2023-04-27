import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getSearchMoviesData } from "../api/IMDB";
import { Dropdown, Button } from "flowbite-react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Loader from "../assets/Loader";
import InfiniteScroll from "react-infinite-scroll-component";

const SearchResult = () => {
  const searchQuery = useParams();
  const [searchQueryData, setSearchQueryData] = useState([]);
  const [pageNumber, setPageNumber] = useState(3);

  useEffect(() => {
    setSearchQueryData([]);
    getSearchMoviesData(setSearchQueryData, "/search/multi", 1, searchQuery.id);
  }, [searchQuery]);

  // const tvShowsData = searchQueryData.filter((data)=> data?.media_type === "tv");
  // const moviesData = searchQueryData.filter((data)=> data?.media_type === "movie");
  // const personsData = searchQueryData.filter((data)=> data?.media_type === "person");

  const movieAndTVData = searchQueryData.filter(
    (data) => data?.media_type === "tv" && data?.media_type === "movie"
  );

  // const fetchMoreData = () => {
  //   setPageNumber(pageNumber + 1);
  //   // 20 more records in 1.5 secs
  //   setTimeout(() => {
  //     getSearchMoviesData(
  //       setSearchQueryData,
  //       "/search/multi",
  //       pageNumber,
  //       searchQuery.id
  //     );
  //   }, 1500);
  // };

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

  return (
    <div className="page-container mt-4">
      <h1>Showing results for "{searchQuery.id}"</h1>
      <div className="divider"></div>
        <div className="flex flex-wrap gap-x-4">
          {searchQueryData &&
            searchQueryData.map((movie) => {
              return (
                <div className="flex items-center h-96 cursor-pointer ">
                  <div className="movieImage w-48 h-72 hover:scale-125 transition delay-150 ease-in-out">
                    <img
                      className="rounded-lg z-10"
                      style={{ width: "100%", height: "100%" }}
                      src={`https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
                      alt={movie?.title}
                    />
                    <div
                      //onClick={() => handleNavgiation(movie?.id, dataType)}
                      className="movieText rounded-lg hidden w-full h-20 bg-gradient-to-b from-transparent to-neutral-800 absolute bottom-0 left-0 text-white"
                    >
                      <h5 className="movieTitle pl-3 left-1">
                        {movie.title || movie.name}
                      </h5>
                      <ul
                        style={{ fontSize: "8px" }}
                        className="list-disc flex"
                      >
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
                          onClick={(e) => handleAddBtn(e, movie?.id, type)}
                        >
                          Remove from Watchlist
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
    </div>
  );
};

export default SearchResult;
