import React from "react";
import Banner from "./Banner";
import Navbar from "./Navbar";
import requests from "../HandlingFiles/requests";
import Row from "./Row";
import "./HomeScreen.css";

const HomeScreen = () => {
  return (
    <div className="homeScreen">
      <Navbar />
      <Banner />
      <Row
        title="Netflix Orignals"
        fetchUrl={requests.fetchNetflixOriginals}
        isLargeRow
        key="Netflix Orignals"
      />
      <Row title="Trending" fetchUrl={requests.fetchTrending} key="Trending" />
      <Row
        title="Top Rated"
        fetchUrl={requests.fetchTopRated}
        key="Top Rated"
      />
      <Row title="Crime" fetchUrl={requests.fetchCrimeMovies} key="Crime" />
      <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} key="Comedy" />
      <Row
        title="Mystery"
        fetchUrl={requests.fetchMysteryMovies}
        key="Mystery"
      />
      <Row
        title="Romance"
        fetchUrl={requests.fetchRomanceMovies}
        key="Romance"
      />
      <Row
        title="Documentaries"
        fetchUrl={requests.fetchDocumentaries}
        key="Documentaries"
      />
    </div>
  );
};

export default HomeScreen;
