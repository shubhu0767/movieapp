import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import MovieCard from "../components/Cards/MovieCard";
import { getMoviesData } from "../api/IMDB";
import Loader from "../assets/Loader";

const Ratedm = ({category, endpoint, language}) => {
  const [ratedgmovies, setRatedMovies] = useState([]);
  const [pageNumber, setPageNumber] = useState(3);

  useEffect(() => {
    setRatedMovies([]);
    getMoviesData(setRatedMovies, endpoint, "2", language);
  }, [category]);

  const fetchMoreData = () => {
    setPageNumber(pageNumber + 1);
    // 20 more records in 1.5 secs
    setTimeout(() => {
      getMoviesData(setRatedMovies, endpoint, pageNumber , language);
    }, 1500);
  };
  
  return (
    <>
    <div className="mb-6">
      <h1 className="ml-16 text-white text-4xl">{category}</h1>
    </div>
      <InfiniteScroll
        dataLength={ratedgmovies.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Loader />}
      >
        <MovieCard movieData={ratedgmovies} isHome={false} />
      </InfiniteScroll>
    </>
  );
};

export default Ratedm;