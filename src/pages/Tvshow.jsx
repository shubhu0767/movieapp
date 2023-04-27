import React,{useState, useEffect} from 'react';
import { HomeContent } from './Home';
import { getMoviesData, getGenersData } from "../api/IMDB";
import MovieCard from "../components/Cards/MovieCard";


const Tvshow = () => {
  const [hindiTVShow, setHindiTVShow] = useState([]);
  const [marathiTVShow1, setMarathiTVShow1] = useState([]);
  const [marathiTV, setMarathiTV] = useState([]);
  const [genresTV, setGenresTV] = useState([]);

  useEffect(() => {
    getMoviesData(setHindiTVShow, "discover/tv", "1", "hi");
    getMoviesData(setMarathiTVShow1, "discover/tv", "2", "mr");
    getMoviesData(setMarathiTV, "discover/tv", "1", "mr");
    getGenersData(setGenresTV, "genre/tv/list");
  }, []);
  // console.log(marathiTV);

  return (
    <>
      <HomeContent Heading="Evergreen Hindi TV Shows Free" endpoints="/discover/tv" data={hindiTVShow}  extraMovies={false} />
      <HomeContent Heading="Most Watched Marathi TV Shows" endpoints="/discover/tv" data={marathiTVShow1}  extraMovies={false} />
      <HomeContent Heading="Popular Free Shows | Marathi" endpoints="/discover/tv" data={marathiTV}  extraMovies={false} />
      {/* <HomeContent Heading="Browse by Language" endpoints="" data={}  extraMovies={false} /> */}
      {/* <HomeContent Heading="Browse by Genre" endpoints="" data={geners}  extraMovies={false} /> */}
      <h2 className="headingText ml-10 text-white">Browse by Genre</h2>
      <MovieCard movieData={genresTV} isHome="geners" />
      {/* <h2 className="headingText ml-10 text-white">Browse by Language</h2>
      <MovieCard movieData={genresTV} isHome="geners" /> */}
    </>
  )
}

export default Tvshow