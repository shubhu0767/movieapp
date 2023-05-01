import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Wishlist/Card";
import { AiOutlinePlusCircle } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";

import { getSearchMoviesData } from "../api/IMDB";
import Loader from "../assets/Loader";

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

  const fetchMoreData = () => {
    setPageNumber(pageNumber + 1);
    // 20 more records in 1.5 secs
    setTimeout(() => {
      getSearchMoviesData(
        setSearchQueryData,
        "/search/multi",
        pageNumber,
        searchQuery.id
      );
    }, 1500);
  };

  return (
    <>
      <InfiniteScroll
        className="page-container"
        dataLength={searchQueryData.length}
        next={fetchMoreData}
        hasMore={true}
        loader={<Loader />}
      >
        <div className=" flex gap-x-3 flex-wrap">
          {searchQueryData &&
            searchQueryData.map((item) => {
              return <Card key={item.id} id={item.id} type={item?.media_type} />;
            })}
        </div>
      </InfiniteScroll>
    </>
  );
};

export default SearchResult;
