import React, { useState, useEffect } from "react";
import Banner from "../components/Banner";
import MovieCard from "../components/Cards/MovieCard";
import { getMoviesData } from "../api/IMDB";
import { NavLink } from "react-router-dom";
import Login from "./Login";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";


const Home = () => {
  const [trendingmovies, setTrendingMovies] = useState([]);
  const [popularmovies, setPopularMovies] = useState([]);
  const [upcomingmovies, setUpcomingMovies] = useState([]);
  const [ratedgmovies, setRatedMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [topRatedTV, setTopRatedTV] = useState([]);
  const [user] = useAuthState(auth);


  useEffect(() => {
    getMoviesData(setTrendingMovies, "trending/movie/day", "1");
    getMoviesData(setPopularMovies, "movie/popular", "1");
    getMoviesData(setUpcomingMovies, "movie/upcoming", "1");
    getMoviesData(setRatedMovies, "movie/top_rated", "1");
    getMoviesData(setPopularTV, "tv/popular", "1");
    getMoviesData(setTopRatedTV, "/tv/top_rated", "1");
  }, []);
  // console.log("Trending movies", trendingmovies);
  // console.log("Popular movies", popularmovies);

  return (
    <>
      <Banner movies={upcomingmovies} />
      <HomeContent
        Heading="Trending Hollywood Movies"
        endpoints="/movies/trendingmovies"
        data={trendingmovies}
      />
      <HomeContent
        Heading="Top Popular Movies"
        endpoints="/movies/popularmovies"
        data={popularmovies}
      />
      <HomeContent
        Heading="Top Rated Movies"
        endpoints="/movies/ratedmovies"
        data={ratedgmovies}
      />
      <HomeContent
        Heading="Popular TV Serials"
        endpoints="/tv/popular"
        data={popularTV}
      />
      <HomeContent
        Heading="Top Rated TV Serials"
        endpoints="/tv/top_rated"
        data={topRatedTV}
      />
      {/* <HomeContent Heading={"IMDB Top Picks"} endpoints={"/tv/top_rated"} data={topRatedTV} />
      <HomeContent Heading={"Your Favourite Superstars"} endpoints={"/tv/top_rated"} data={topRatedTV} />
      <HomeContent Heading={"Watch Again Exclusively"} endpoints={"/tv/top_rated"} data={topRatedTV} />
      <HomeContent Heading={"Must Watch Bollywood"} endpoints={"/tv/top_rated"} data={topRatedTV} /> */}
    </>
  );
};

export function HomeContent({ Heading, endpoints, data, extraMovies = true }) {
  let dataType;
  if (endpoints === "/movies/popularmovies" || endpoints === "/movies/trendingmovies" 
      || endpoints === "/movies/ratedmovies" || endpoints === "/discover/movie"
      || endpoints === "/movie/movie_details") {
    dataType = "movie";
  }else dataType = "tv";
  

  return (
    <>
      <div className="flex items-center justify-between mt-3">
        <h2 className="headingText ml-10 text-white">{Heading}</h2>
        {extraMovies && (
          <NavLink className="moreText text-white" to={endpoints}>
            See More
          </NavLink>
        )}
      </div>
      <MovieCard dataType={dataType} movieData={data} isHome={Heading === "Star Cast" ? "cast" : true} />
    </>
  );
}

export default Home;
