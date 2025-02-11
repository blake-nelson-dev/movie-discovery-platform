import { MovieSearchResults } from "./ListMovies";
import { ResultsViewNavigationBar } from "./NavigationBars";
import { MovieList } from "./ListMovies";

import React, { useEffect, useState } from "react";

const ResultsView = ({ searchTitle, searchParams, handleMovieClick, aboutClick, page, onHomePageClick, onBackClick, setPage }) => {
  let startYear = searchParams.startYear;
  let endYear = searchParams.endYear;
  let genre = searchParams.genre;
  let filmType = searchParams.filmType;
  const [currentPage, setCurrentPage] = useState(page)
  const [searchedMovies, setsearchedMovies] = useState([]);

  useEffect(() => {
    fetchResults(searchTitle, startYear, endYear, genre, filmType, currentPage);
  }, []);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1); // Increment page counter using setPage
    setPage(currentPage + 1)
    fetchResults(searchTitle, startYear, endYear, genre, filmType, currentPage + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setCurrentPage(currentPage - 1); // Decrement page counter using setPage
      setPage(currentPage - 1)
      fetchResults(searchTitle, startYear, endYear, genre, filmType, currentPage - 1); // Call fetchResults with new page
    }
  };

  const fetchResults = async (
    searchTitle,
    startYear,
    endYear,
    genre,
    filmType,
    currentPage
  ) => {
    let nsearchTitle;
    let nstartYear;
    let nendYear;
    let ngenre;
    let nfilmType;

    if (searchTitle == "") {
      nsearchTitle = "null";
    } else {
      nsearchTitle = searchTitle;
    }
    if (typeof startYear == "object") {
      nstartYear = "null";
    } else {
      nstartYear = startYear;
    }
    if (typeof endYear == "object") {
      nendYear = "null";
    } else {
      nendYear = endYear;
    }
    if (typeof genre == "object") {
      ngenre = "null";
    } else {
      ngenre = genre;
    }
    if (typeof filmType == "object") {
      nfilmType = "null";
    } else {
      nfilmType = filmType;
    }

    try {
      const response = await fetch(
        `http://localhost:4000/movie-search/${nsearchTitle}/${nstartYear}/${nendYear}/${ngenre}/${nfilmType}/${currentPage}`
      );
      const data = await response.json();

      setsearchedMovies(data); // Update the state here
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  if (!searchParams) {
    return <div>!searchParams</div>; // Or any other loading indicator
  }
  console.log("searchTitle: ");
  console.log(searchTitle);
  console.log("Search Params: ");
  console.log(searchParams);

  let currentSite = 2;

  return (
    <>
      <ResultsViewNavigationBar onHomePageClick={onHomePageClick} aboutClick={aboutClick} onBackClick={onBackClick}/>
      <MovieSearchResults
        movies={searchedMovies}
        handleMovieClick={handleMovieClick}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        currentSite = {currentSite}
      />
    </>
  );
};

export default ResultsView;
