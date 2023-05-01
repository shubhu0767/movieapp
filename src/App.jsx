import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Tvshow from "./pages/Tvshow";
import Artist from "./pages/Artist";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Ratedm from "./pages/Ratedm";
import Movies from "./pages/Movies";
import SearchResult from "./pages/SearchResult";
import MovieDetails from "./pages/MovieDetails";
import { Context } from "./context/Context";
import Header from "./components/Navbar/Header";
import FooterApp from "./components/Footer";
import WelcomePopupModal from "./components/Modal/WelcomePopupModal";
import RequireModal from "./components/Modal/RequireModal";
import AlertPopup from "./components/Modal/AlertPopup";
import Wishlist from "./components/Wishlist/Wishlist";

function App() {
  const [wishlistData, setWishlistData] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showAlertPopup, setShowAlertPopup] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = localStorage.getItem("hasVisitedBefore");

    if (!hasVisitedBefore) {
      localStorage.setItem("hasVisitedBefore", true);
      setShowPopup(true);
    }
  }, []);

  useEffect(() => {
    let timer;
    if (showAlertPopup || isAdded || isRemoved) {
      timer = setTimeout(() => {
        setShowAlertPopup(false);
        setIsAdded(false);
        setIsRemoved(false);
      }, 3000);
    }

    return () => clearTimeout(timer);
  }, [showAlertPopup, isAdded, isRemoved]);

  const handlePopupClose = () => {
    setShowPopup(false);
    setIsAdded(false);
  };

  const showAlert = (addToWishlist) => {
    if (addToWishlist === "Add to Watchlist") {
      setIsAdded(true);
    } else if (addToWishlist === "Item Removed successfully") {
      setIsRemoved(true);
    } else {
      setShowAlertPopup(true);
    }
  };

  return (
    <>
      <div className="overflow-hidden">
        <Context.Provider value={{ wishlistData, setWishlistData, showAlert }}>
          <div className="h-16">
            <Header />
          </div>
          {showPopup && (
            <WelcomePopupModal
              onClose={handlePopupClose}
              showAlertFuc={showAlert}
            />
          )}
          {showAlertPopup && (
            <AlertPopup
              text="Thank You for Susbcribing"
              showAlert={setShowAlertPopup}
            />
          )}
          {isAdded && (
            <AlertPopup
              text="Item Added Successfully"
              closeAlert={handlePopupClose}
            />
          )}
          {isRemoved && (
            <AlertPopup
              text="Item Removed successfully"
              closeAlert={handlePopupClose}
            />
          )}
          {wishlistData && <RequireModal />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Artist />} />
            <Route path="/tv" element={<Tvshow />} />
            <Route path="/artist" element={<Artist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/movie" element={<Movies />} />
            <Route path="/searchresult/:id" element={<SearchResult />} />
            <Route path="/:id/:id/:id" element={<MovieDetails />} />
            <Route path="/movies/:id" element={<Ratedm />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route
              path="/movies/trendingmovies"
              element={
                <Ratedm
                  category="Top Trending Movies"
                  endpoint="trending/movie/day"
                />
              }
            />
            <Route
              path="/movies/popularmovies"
              element={
                <Ratedm
                  category="Top Popular Movies"
                  endpoint="movie/popular"
                />
              }
            />
            <Route
              path="/movies/ratedmovies"
              element={
                <Ratedm
                  category="Top Rated Movies"
                  endpoint="movie/top_rated"
                />
              }
            />
            <Route
              path="/tv/popular"
              element={
                <Ratedm category="Top TV Popular Shows" endpoint="tv/popular" />
              }
            />
            <Route
              path="/tv/top_rated"
              element={
                <Ratedm
                  category="Top Rated TV Shows"
                  endpoint="/tv/top_rated"
                />
              }
            />
            <Route
              path="/movies/bollywood"
              element={
                <Ratedm
                  category="Bollywood Movies"
                  endpoint="movie/popular"
                  language="hi"
                />
              }
            />
            <Route
              path="/movies/hollywood"
              element={
                <Ratedm
                  category="Hollywood Movies"
                  endpoint="trending/movie/day"
                />
              }
            />
          </Routes>
          <FooterApp />
        </Context.Provider>
      </div>
    </>
  );
}

export default App;
