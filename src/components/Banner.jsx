import React,{useState, useEffect} from "react";
import dummyImg from "../assets/dummy-image-square.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../styles/image-gallery.css"

const Banner = ({movies}) => {

  const settings = {
    spaceBetween:30,
    centeredSlides:true,
    autoplay:{
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination:{
      clickable: true,
    },
    navigation:true,
    modules:[Autoplay, Pagination, Navigation],
    className:"banner",
  }
  // console.log(movies);

  return (
    <div className="image-gallery-wrapper border-none">
      <Swiper {...settings}>
        {movies.map((image,key) => (
          key < 6 ? (
          <SwiperSlide key={key}>
            <img className="sliderImg" src={`https://image.tmdb.org/t/p/original/${image.backdrop_path}`} alt="" />
          </SwiperSlide>
          ) : ('')
        ))}
      </Swiper>

    </div>
  );
};

export default Banner;
