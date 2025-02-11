import { FilmViewNavigationBar } from "./NavigationBars";
import { DisplayMovieInfo } from "./ListMovies";

function FilmView({ movie, onHomePageClick, aboutClick, onBackClick }) {
  return (
    <>
      {/* Need to code FilmViewNavigationBar */}
      <FilmViewNavigationBar
        onHomePageClick={onHomePageClick}
        aboutClick={aboutClick}
        onBackClick={onBackClick}
      />
      {/* Need more code in DisplayMovie so it displays info */}
      <DisplayMovieInfo movie={movie} />
    </>
  );
}

export default FilmView;
