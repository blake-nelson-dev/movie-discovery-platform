import React from "react";
import { useState, useEffect, useRef } from "react";
import { Row, Button, Col, Card, Container } from "react-bootstrap";

// Calculate the width and height to maintain aspect ratio of 2:3
const aspectRatio = 2 / 3;
const movieCardWidth = 210; // Adjust this value as needed
const movieCardHeight = movieCardWidth / aspectRatio;

const MovieCard = ({ movie, onClick }) => {
  const handleClick = () => {
    onClick(movie);
  };

  return (
    <Col xs={6} md={4} lg={3} xl={2} className="mb-4" onClick={handleClick}>
      <Card
        style={{
          width: `${movieCardWidth}px`,
          height: `${movieCardHeight}px`,
          backgroundColor: "var(--dark)",
          color: "var(--light)",
          overflow: "hidden", // Ensure content doesn't overflow
          borderRadius: "0.5rem", // Apply rounded corners to the card
        }}
      >
        <div style={{ overflow: "hidden" }}>
          {/* Container to contain the image */}
          <img
            src={movie.primaryImage.url}
            alt={movie.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ensure the image covers the container
            }}
          />
        </div>
        <Card.Body style={{ maxHeight: "3.5rem", overflow: "hidden" }}>
          <Card.Title
            style={{
              fontSize: "0.875rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {movie.originalTitleText.text}
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

const MediaCard = ({ movie, onClick }) => {
  const handleClick = () => {
    onClick(movie);
  };
  return (
    <Col xs={6} md={4} lg={3} xl={2} className="mb-4" onClick={handleClick}>
      <Card>
        <Card.Img
          variant="top"
          src={movie.primaryImage.url}
          alt={movie.title}
        />
        <Card.Body style={{ maxHeight: "3.5rem", overflow: "hidden" }}>
          <Card.Title
            style={{
              fontSize: "0.875rem",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {movie.originalTitleText.text}
          </Card.Title>
        </Card.Body>
      </Card>
    </Col>
  );
};

const MovieList = ({ movies, header, handleMovieClick, }) => {
  const [moviesPerRow, setMoviesPerRow] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const calculateMoviesPerRow = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const newMoviesPerRow = Math.floor(containerWidth / movieCardWidth);
        setMoviesPerRow(newMoviesPerRow);
      }
    };

    calculateMoviesPerRow();

    const handleResize = () => {
      calculateMoviesPerRow();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleNext = () => {
    const newStartIndex = startIndex + moviesPerRow;
    setStartIndex(Math.min(newStartIndex, movies.length));
  };

  const handlePrev = () => {
    const newStartIndex = startIndex - moviesPerRow;
    setStartIndex(Math.max(newStartIndex, 0));
  };

  if (!movies) {
    return null; // Render nothing if movies is not yet defined
  }

  return (
    <div ref={containerRef}>
      <h3>{header}</h3>
      <Row
        xs={2}
        md={4}
        lg={5}
        xl={6}
        className="g-2 d-flex justify-content-center"
      >
        {movies
          .slice(startIndex, startIndex + moviesPerRow)
          .map((movie, index) => (
            <MovieCard
              key={index}
              movie={movie}
              onClick={() => handleMovieClick(movie)}
              cardWidth={210}
            />
          ))}
      </Row>
      <div className="text-center mt-3">
        <Button
          variant="warning"
          onClick={handlePrev}
          disabled={startIndex === 0}
        >
          {"< Prev"}
        </Button>{" "}
        <Button
          variant="warning"
          onClick={handleNext}
          disabled={startIndex + moviesPerRow >= movies.length}
        >
          {"Next >"}
        </Button>
      </div>
    </div>
  );
};

const MovieSearchResults = ({
  movies,
  handleMovieClick,
  handleNextPage,
  handlePrevPage,
  currentSite
}) => {
  return (
    <>
      <Row
        xs={2}
        md={4}
        lg={5}
        xl={6}
        className="g-2 d-flex justify-content-center"
      >
        {movies.map((movie) => (
          <MediaCard movie={movie} onClick={handleMovieClick}/>
        ))}
      </Row>
      <div className="text-center mt-3">
        <Button variant="warning" onClick={handlePrevPage}>
          {"< Prev"}
        </Button>{" "}
        <Button variant="warning" onClick={handleNextPage}>
          {"Next >"}
        </Button>
      </div>
    </>
  );
};

const DisplayMovieInfo = ({ movie }) => {
  const title = movie.titleText?.text ?? 'No title available';
  const caption = movie.primaryImage?.caption?.plainText ?? 'No caption available';
  const releaseDate = `${movie.releaseDate?.day}/${movie.releaseDate?.month}/${movie.releaseDate?.year}` ?? 'No release date available';
  const plot = movie.plot?.plotText?.plainText ?? 'No plot available';
  const rating = movie.ratingsSummary?.aggregateRating ?? 'No rating available';
  const genres = Array.isArray(movie.genres?.genres) ? movie.genres.genres : [];
  const runtime = movie.runtime?.seconds ?? 'No runtime available';

  function formatRuntime(seconds) {
    if(seconds == 'No runtime available'){
      return 'No runtime available'
    } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
  
      return `${hours} hours, ${minutes} minutes, ${remainingSeconds} seconds`;
    }
  }

  const formattedRuntime = formatRuntime(runtime);

  console.log("current movie");
  console.log(movie);

  return (
    <div className="bg-light py-5">
      <Container>
        <Row>
          <Col xs={12} md={4} className="mb-4">
            <img
              src={movie.primaryImage.url}
              alt={caption}
              className="img-fluid"
            />
            <p className="mt-3">{caption}</p>
          </Col>
          <Col xs={12} md={6} className="mb-4">
            <div className="px-4">
              <h1 className="display-1">{title}</h1>
              <p className="lead mb-4">Release Date: {releaseDate}</p>
              <p className="mb-4">{plot}</p>
              <p className="mb-4">Rating: {rating}</p>
              <p className="mb-2">Genres:</p>
              <ul className="list-unstyled mb-4">
                {genres.map((genre, index) => (
                  <li key={index}>{genre.text}</li>
                ))}
              </ul>
              <p className="mb-0">Runtime: {formattedRuntime}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export { MovieList, MovieSearchResults, DisplayMovieInfo };
