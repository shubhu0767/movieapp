import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import img from "../assets/dummy-image-square.jpg";
import { NavLink } from "react-router-dom";

const Home = ({ setid }) => {
  const [moviedata, setMovieData] = useState([]);
  const dummyImage = img;

  const apiData = () => {
    return fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => res.json())
      .then((data) => setMovieData(data));
  };

  useEffect(() => {
    apiData();
  }, []);

  const handleClick = (id) => {
    // console.log(id);
    setid(id);
  };

  return (
    <>
      {moviedata.map((list) => {
        // console.log(list);
        return (
          <div>
            <Card className="card-section">
              <div className="card-image">
                <Card.Img
                  className="show-image"
                  variant="top"
                  src={list.show.image?.original || dummyImage}
                />
              </div>
              <Card.Body>
                <Card.Title>Show Name:-{list.show.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Language:- {list.show.language}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Rating:- {list.show.rating.average}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Country:- {list.show.network?.country?.name}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-light">
                  Geners:- {`${list.show.genres} `}
                </Card.Subtitle>
                <NavLink to="/details">
                  <Button
                    onClick={() => handleClick(list.show.id)}
                    variant="primary"
                  >
                    More Details
                  </Button>
                </NavLink>
              </Card.Body>
            </Card>
          </div>
        );
      })}
    </>
  );
};

export default Home;
