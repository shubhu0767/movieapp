import React, { useState, useEffect, useContext, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";

import { Context } from "../context/Context";
import { getMovieDetailsData } from "../api/IMDB";
import MovieCard from "../components/Cards/MovieCard";
import { HomeContent } from "./Home";

import "../styles/movieDetails.css"

const MovieDetails = () => {
  const currentURLId = useParams();
  const { wishlistData } = useContext(Context);
  const [movieDetails, setMovieDetails] = useState({});
  const [movieVideo, setMovieVideo] = useState([]);
  const [recommandMovies, setRecommandMovie] = useState([]);
  const [similarMovie, setSimilarMovie] = useState([]);
  const [starCast, setStarCastMovie] = useState({});
  const searchPath = useLocation();

  const rating = movieDetails.vote_average &&  parseFloat(movieDetails.vote_average.toFixed(1));

  const mediaType =
    searchPath.pathname == `/movie/movie_details/${currentURLId.id}`
      ? "movie"
      : "tv";

  useEffect(() => {
    getMovieDetailsData(setMovieDetails, `${mediaType}/${currentURLId.id}`);
    getMovieDetailsData(
      setMovieVideo,
      `/${mediaType}/${currentURLId.id}/videos`
    );
    getMovieDetailsData(
      setStarCastMovie,
      `${mediaType}/${currentURLId.id}/credits`
    );
    getMovieDetailsData(
      setRecommandMovie,
      `${mediaType}/${currentURLId.id}/recommendations`
    );
    getMovieDetailsData(
      setSimilarMovie,
      `${mediaType}/${currentURLId.id}/similar`
    );
  }, [searchPath]);

  const genres = movieDetails?.genres;

  const parents = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gridTemplateRows: "repeat(2, 0fr)",
    gridColumnGap: "20px",
    gridRowGap: "14px",
    alignItems: "start",
    justifyItems: "center",
  };

  const toHoursAndMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if(hours === 0 ){
      return `${minutes}m`;
    }
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  console.log("Details", movieDetails);
  // console.log("Details2", movieDetails?.spoken_languages && movieDetails?.spoken_languages[0]);

  return (
    <>
      <div className="page-container">
        <div className="movieDetails flex justify-between ">
          {movieDetails && <div className="youtubeVideo">
            <iframe
              // style={{}}
              // className="w-full h-full"
              src={`https://www.youtube.com/embed/${movieVideo[0]?.key}?autoplay=1`}
              title="3 Idiots | OFFICIAL trailer #1 US/indian (2009)"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>}
          <div className="movieText ml-10 mx-auto">
            <h1 className="text-white text-5xl font-bold">
              {movieDetails?.title || movieDetails?.name}
            </h1>
            <h3 className="text-2xl my-3">{movieDetails?.tagline}</h3>
            <h3 className="text-lg my-3">{movieDetails?.overview}</h3>
            <div className="text-xl" style={parents}>
              <span>Time</span>
              <span>Date</span>
              <span>Rating</span>
              <span>Language</span>
              <span>{toHoursAndMinutes(movieDetails.runtime)}</span>
              <span>
                {movieDetails.release_date || movieDetails.first_air_date}
              </span>
              <span>{rating}</span>
              <span>{ movieDetails.id && movieDetails?.spoken_languages[0]?.english_name}</span>
            </div>
            <div className="mt-1"> {/* genres */}
            <span className="text-xl">Genres: </span>
              <span className="font-semibold">
                {genres &&
                  genres.map((gener, i) => {
                    return (
                      <span key={gener.id}>
                        {gener.name}
                        {i < genres.length - 1 && ","}{" "}
                      </span>
                    );
                  })}
              </span>
            </div>
          </div>
        </div>

        <div className="my-8">
          <span className="text-white my-4 text-3xl font-bold">
            Trailers & Videos
          </span>
        </div>
      </div>
      <div className="trailers">
        <MovieCard movieData={movieVideo} isHome="youtubeVideos" />
      </div>
      <div>
        <HomeContent
          Heading="Star Cast"
          endpoints="/movie/movie_details"
          data={starCast.cast}
          extraMovies={false}
        />
        {recommandMovies.length != 0 && (
          <HomeContent
            Heading="Recommendations Movies"
            endpoints="/movie/movie_details"
            data={recommandMovies}
            extraMovies={false}
          />
        )}

        {similarMovie.length != 0 && (
          <HomeContent
            Heading="Similar Movies"
            endpoints="/movie/movie_details"
            data={similarMovie}
            extraMovies={false}
          />
        )}
      </div>
    </>
  );
};

export default MovieDetails;
