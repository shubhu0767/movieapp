import React, {useState, useEffect} from 'react'
import { HomeContent } from './Home';
import { getMoviesData, getGenersData } from "../api/IMDB";
import MovieCard from "../components/Cards/MovieCard";


const Movies = () => {
  const [HindiMovies, setHindiMovies] = useState([]);
  const [tamilMovies, setTamilMovies] = useState([]);
  const [tailguMovies, setTailguMovies] = useState([]);
  const [marathiMovies, setMarathiMovies] = useState([]);
  const [panjabiMovies, setPanjabiMovies] = useState([]);
  const [generMovies, setGenerMovies] = useState([]);


  useEffect(() => {
    getMoviesData(setHindiMovies, "discover/movie", "1", "hi");
    getMoviesData(setTamilMovies, "discover/movie", "1", "ta");
    getMoviesData(setTailguMovies, "discover/movie", "1", "te");
    getMoviesData(setMarathiMovies, "discover/movie", "1", "mr");
    getMoviesData(setPanjabiMovies, "discover/movie", "1", "pa");
    getGenersData(setGenerMovies, "genre/movie/list",);
  }, []);
  // console.log(romanticMovies);

  return (
    <>
      <HomeContent Heading="Bollywood Favorites" endpoints="/discover/movie" data={HindiMovies}  extraMovies={false} />
      <HomeContent Heading="South Hits | Free Dubbed Movies" endpoints="/discover/movie" data={tamilMovies} extraMovies={false} />
      <HomeContent Heading="Top Free Movies | Marathi" endpoints="/discover/movie" data={marathiMovies}  extraMovies={false} />
      <HomeContent Heading="South Dubbed Dhamaka" endpoints="/discover/movie" data={tailguMovies}  extraMovies={false} />
      <HomeContent Heading="Best Panjabi Movies" endpoints="/discover/movie" data={panjabiMovies}  extraMovies={false} />
      {/* <HomeContent Heading="Browse by Genre" data={generMovies}  extraMovies={false}  /> */}
      <h2 className="headingText ml-10 text-white">Browse by Genre</h2>
      <MovieCard movieData={generMovies} isHome="geners" />
    </>
  )
}

export default Movies