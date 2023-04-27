import axios from "axios";

export const getMoviesData = async (
  setState,
  endpoint,
  page,
  language = "en"
) => {
  const API_URL = `${
    import.meta.env.VITE_REACT_APP_BASE_URL
  }${endpoint}?api_key=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }&page=${page}&language=en-US&with_original_language=${language}`;
  
  const { data } = await axios.get(API_URL);
  // console.log("Link--->", API_URL);
  setState((prev) => [...prev, ...data.results]);
};

export const getMovieDetailsData = async (setState, endpoint) => {
  const API_URL = `${
    import.meta.env.VITE_REACT_APP_BASE_URL
  }${endpoint}?api_key=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }&language=en-US`;
  const { data } = await axios.get(API_URL);
  if(data.results){
    // console.log("Link--->", data.results);
    setState([...data.results]);
  }else{
    console.log(data);
    setState(data);
  }
};
export const getGenersData = async (setState, endpoint) => {
  const API_URL = `${
    import.meta.env.VITE_REACT_APP_BASE_URL
  }${endpoint}?api_key=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }&language=en-US`;
  const { data } = await axios.get(API_URL);
  // console.log("Link--->", data);
  setState((prev) => [...prev, ...data.genres]);
};

export const getSearchMoviesData = async (setState, endpoint, page, query) => {
  const API_URL = `${
    import.meta.env.VITE_REACT_APP_BASE_URL
  }${endpoint}?api_key=${
    import.meta.env.VITE_REACT_APP_API_KEY
  }&query=${query}&page=${page}&language=en-US&with_original_language=hi`;
  // console.log("Link--->", API_URL);
  const { data } = await axios.get(API_URL);

  await setState(data.results);
};

// TMDB API URL =  https://api.themoviedb.org/3/movie/550?api_key=6eadfdcd81f1a1198668023f8fbda548
// TMDB API Key = 6eadfdcd81f1a1198668023f8fbda548
// TMDB Access Token = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWFkZmRjZDgxZjFhMTE5ODY2ODAyM2Y4ZmJkYTU0OCIsInN1YiI6IjY0MTk3MmQzMGQ1ZDg1MDBlMGU3YWQzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.muw8JY83Od5Rl_2alS3zA7kfWU46W4LgY_JgCaCQE2U
