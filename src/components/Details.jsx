import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

const Details = ({ id }) => {
  const [moviedata, setMovieData] = useState([]);

  const apiData = () => {
    return fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((res) => res.json())
      .then((data) => setMovieData(data));
  };

  useEffect(() => {
    apiData();
  }, []);

  return (
    <>
      {moviedata.map((list) => {
        if (list.show.id === id) {
          console.log(list.show.id);
          return (
            <div>
              <Card>
                <Card.Img
                  height="400px"
                  variant="top"
                  src={list.show.image?.original}
                />
                <Card.Body>
                  <Card.Text>{list.show.summary}</Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        }
      })}
    </>
  );
};

export default Details;
