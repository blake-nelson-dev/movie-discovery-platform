import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Dropdown, Form, Col, Row } from "react-bootstrap";
const HomePageNavigationBarDropdown = ({ onSearchParamsChange }) => {
  const [searchParams, setSearchParams] = useState({
    startYear: null,
    endYear: null,
    genre: null,
    filmType: null,
  });

  const handleSearchParamsChange = (field, value) => {
    const newSearchParams = { ...searchParams, [field]: value };
    setSearchParams(newSearchParams);
    onSearchParamsChange(newSearchParams); // Call the callback function with updated searchParams
    console.log("searchParams changed. They are now:");
    console.log(searchParams);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
        Menu
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Form.Group controlId="startYear">
          <Form.Label>Start Year:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter start year"
            value={searchParams.startYear}
            onChange={(e) =>
              handleSearchParamsChange("startYear", e.target.value)
            }
          />
        </Form.Group>

        <Form.Group controlId="endYear">
          <Form.Label>End Year:</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter end year"
            value={searchParams.endYear}
            onChange={(e) =>
              handleSearchParamsChange("endYear", e.target.value)
            }
          />
        </Form.Group>

        <Form.Group controlId="genre">
          <Form.Label>Genre:</Form.Label>
          <Form.Control
            as="select"
            custom
            value={searchParams.genre}
            onChange={(e) => handleSearchParamsChange("genre", e.target.value)}
          >
            <option value={""}>select genre...</option>
            <option value="Action">Action</option>
            <option value="Adult">Adult</option>
            <option value="Adventure">Adventure</option>
            <option value="Animation">Animation</option>
            <option value="Biography">Biography</option>
            <option value="Comedy">Comedy</option>
            <option value="Crime">Crime</option>
            <option value="Documentary">Documentary</option>
            <option value="Drama">Drama</option>
            <option value="Family">Family</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Film-Noir">Film-Noir</option>
            <option value="Game-Show">Game-Show</option>
            <option value="History">History</option>
            <option value="Horror">Horror</option>
            <option value="Music">Music</option>
            <option value="Musical">Musical</option>
            <option value="Mystery">Mystery</option>
            <option value="News">News</option>
            <option value="Reality-TV">Reality-TV</option>
            <option value="Romance">Romance</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Short">Short</option>
            <option value="Sport">Sport</option>
            <option value="Talk-Show">Talk-Show</option>
            <option value="Thriller">Thriller</option>
            <option value="War">War</option>
            <option value="Western">Western</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="filmType">
          <Form.Label>Type:</Form.Label>
          <Form.Control
            as="select"
            custom
            value={searchParams.filmType}
            onChange={(e) =>
              handleSearchParamsChange("filmType", e.target.value)
            }
          >
            <option value={null}>select type</option>
            <option value="movie">Movie</option>
            <option value="musicVideo">Music Video</option>
            <option value="podcastEpisode">Podcast Episode</option>
            <option value="podcastSeries">Podcast Series</option>
            <option value="short">Short</option>
            <option value="tvEpisode">TV Episode</option>
            <option value="tvMiniSeries">TV Mini Series</option>
            <option value="tvMovie">TV Movie</option>
            <option value="tvPilot">TV Pilot</option>
            <option value="tvSeries">TV Series</option>
            <option value="tvShort">TV Short</option>
            <option value="tvSpecial">TV Special</option>
            <option value="video">Video</option>
            <option value="videoGame">Video Game</option>
            {/* Add more film type options as needed */}
          </Form.Control>
        </Form.Group>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export { HomePageNavigationBarDropdown };
