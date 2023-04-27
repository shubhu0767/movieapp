import React, { useState, useEffect } from "react";
import { getMovieDetailsData } from "../../api/IMDB";
import { CiCircleRemove } from "react-icons/ci";

const Card = ({ id, type, handleRemoveBtn }) => {
  const [movie, setDetails] = useState({});

  useEffect(() => {
    getMovieDetailsData(setDetails, `${type}/${id}`);
  }, []);
  
  
  console.log(movie);
  return (
      <>
      {movie.id && (
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
                <CiCircleRemove />

                <button
                  style={{ fontSize: "12px" }}
                  className="ml-2"
                  onClick={(e) => handleRemoveBtn(e, movie?.id, type)}
                >
                  Remove from Watchlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
