import React, { useEffect, useState } from "react";
import { HomeNavigationBar } from "./NavigationBars";
import { MovieList } from "./ListMovies";

function HomePage({
  handleMovieClick,
  handleSearch,
  aboutClick,
  topBoxOfficeAllTime,
  topRated,
  topRatedSeries,
  mostPopularSeries,
}) {
  return (
    <>
      <HomeNavigationBar handleSearch={handleSearch} aboutClick={aboutClick} />
      <div className="container">
        <MovieList
          movies={topBoxOfficeAllTime}
          header="Top Box Office Of All Time"
          handleMovieClick={handleMovieClick}
        />
        <MovieList
          movies={topRated}
          header="Top Rated Movies"
          handleMovieClick={handleMovieClick}
        />
        <MovieList
          movies={topRatedSeries}
          header="Top Rated Series"
          handleMovieClick={handleMovieClick}
        />
        <MovieList
          movies={mostPopularSeries}
          header="Most Popular Series"
          handleMovieClick={handleMovieClick}
        />
      </div>
    </>
  );
}

export default HomePage;
