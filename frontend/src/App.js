import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./HomePage";
import ResultsView from "./ResultsView";
import FilmView from "./FilmView";
import About from "./About.js";

function App() {
  // State to manage the current view
  const [viewer, setViewer] = useState(0);
  const [currentSite, setCurrentSite] = useState(0);

  //States for HomePage
  const [topBoxOfficeAllTime, settopBoxOfficeAllTime] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [topRatedSeries, setTopRatedSeries] = useState([]);
  const [mostPopularSeries, setMostPopularSeries] = useState([]);

  //States for ResultsView
  const [searchTitle, setSearchTitle] = useState("");
  const [searchParams, setSearchParams] = useState({
    startYear: null,
    endYear: null,
    genre: null,
    filmType: null,
  });
  const [page, setPage] = useState(1)

  //States for FilmView
  const [currentDisplayedFilm, setCurrentDisplayedFilm] = useState(null);

  //Renders lists once
  useEffect(() => {
    fetchMovies("top_boxoffice_200", 5, settopBoxOfficeAllTime);
    fetchMovies("top_rated_english_250", 5, setTopRated);
    fetchMovies("top_rated_series_250", 5, setTopRatedSeries);
    fetchMovies("most_pop_series", 5, setMostPopularSeries);
  }, []);

  //Function for fetching movie lists used on HomePage
  const fetchMovies = async (list, pagesToFetch, setFunction) => {
    try {
      let timesRun = 1;
      const response = await fetch(
        `http://localhost:4000/movie-list/${list}/${pagesToFetch}`
      );
      const data = await response.json();

      console.log("Times fetched: " + timesRun);
      timesRun++;
      console.log("HomePage Fetch Complete");

      setFunction(data); // Set all fetched movies
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const changeViewer = (view) => {
    setViewer(view); // Function to update the viewer state
  };

  const changeCurrentSite = (current) => {
    setCurrentSite(current)
  }


  const handleMovieClick = (movie) => {
    setCurrentDisplayedFilm(movie);
    console.log("handleMovieClick setCurrentSite = " + currentSite)
    changeViewer(2);
  };

  const handleSearch = (title, params) => {
    setSearchTitle(title);
    setSearchParams(params);
    changeCurrentSite(1)
    console.log("HandleSearch setCurrentSite = " + currentSite)
    changeViewer(1); // Change viewer to ResultsView
  };


  const handleHomePageClick = () => {
    setPage(1);
    changeCurrentSite(0)
    console.log("HandleHomePageClick setCurrentSite = " + currentSite)
    changeViewer(0);

  };

  const aboutClick = () => {
    changeViewer(3);
  };

  const onBackClick = () => {
    if(currentSite == 0){
      handleHomePageClick()
    }else {
      changeViewer(1)
    }
    
  }

  return (
    <>
      {viewer === 0 && (
        <HomePage
          handleMovieClick={handleMovieClick}
          handleSearch={handleSearch}
          aboutClick={aboutClick}
          topBoxOfficeAllTime={topBoxOfficeAllTime}
          topRated={topRated}
          topRatedSeries={topRatedSeries}
          mostPopularSeries={mostPopularSeries}
        />
      )}
      {viewer === 1 && (
        <ResultsView
          searchTitle={searchTitle}
          searchParams={searchParams}
          handleMovieClick={handleMovieClick}
          aboutClick={aboutClick}
          page={page}
          onHomePageClick={handleHomePageClick}
          setPage={setPage}
          
        />
      )}
      {viewer === 2 && (
        <FilmView
          movie={currentDisplayedFilm}
          onHomePageClick={handleHomePageClick}
          aboutClick={aboutClick}
          onBackClick={onBackClick}
        />
      )}
      {viewer === 3 && <About onHomePageClick={handleHomePageClick} onBackClick={onBackClick} />}
    </>
  );
}

export default App;
