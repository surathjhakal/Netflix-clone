import React, { useEffect, useState } from "react";
import "./Banner.css";
import axios from "../HandlingFiles/axios";
import requests from "../HandlingFiles/requests";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length)
        ]
      );
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + "..." : string;
  };

  const handleClick = () => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name || " ")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  const opts = {
    height: "390",
    width: "99%",
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div
      className="banner_custom"
      style={{
        backgroundSize: "cover",
        backgroundImage: `${
          movie?.backdrop_path &&
          `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`
        }`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.name || movie?.title || movie?.original_name}
        </h1>
        <div className="banner_buttons">
          <button className="banner_button" onClick={handleClick}>
            Play
          </button>
          <button className="banner_button">My list</button>
        </div>
        <h1 className="banner_description">{truncate(movie.overview, 150)}</h1>
      </div>
      <div className="banner_fadeBottom" />
      {trailerUrl && (
        <YouTube style={{ padding: "40px" }} videoId={trailerUrl} opts={opts} />
      )}
    </div>
  );
};

export default Banner;
