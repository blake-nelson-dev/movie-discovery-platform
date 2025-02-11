import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import {
  Navbar,
  Dropdown,
  Button,
  FormControl,
  Form,
  Container,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import { HomePageNavigationBarDropdown } from "./Dropdowns";
import ResultsView from "./ResultsView";

const HomeNavigationBar = ({ handleSearch, aboutClick }) => {
  const [searchTerm, setsearchTerm] = useState("");
  const [searchParams, setSearchParams] = useState({
    startYear: null,
    endYear: null,
    genre: null,
    filmType: null,
  });
  const handleSearchParamsChange = (newSearchParams) => {
    setSearchParams(newSearchParams);
  };

  const handleClick = () => {
    handleSearch(searchTerm, searchParams); // Pass searchTerm to handleSearch function
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Row className="w-100 align-items-center">
          {/* Container 1: Name of the website */}
          <Col xs="auto">
            <Navbar.Brand className="mr-auto">FilmQuest</Navbar.Brand>
          </Col>

          {/* Container 2: Dropdown Button */}
          <Col xs="auto">
            <HomePageNavigationBarDropdown
              onSearchParamsChange={handleSearchParamsChange}
            />
          </Col>

          {/* Container 3: Search Bar */}
          <Col>
            <InputGroup>
              <FormControl
                variant="outline-light"
                placeholder="Search..."
                aria-label="Search"
                aria-describedby="basic-addon1"
                value={searchTerm}
                onChange={(e) => setsearchTerm(e.target.value)}
              />
              <Button
                variant="outline-light"
                className="dropdown-menu-end"
                onClick={handleClick}
              >
                Search
              </Button>
            </InputGroup>
          </Col>

          {/* Container 5: About Button */}
          <Col xs="auto">
            <Button variant="outline-warning" onClick={aboutClick}>
              About
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

{
  /* Need to code FilmViewNavigationBar */
}

const ResultsViewNavigationBar = ({onHomePageClick, aboutClick}) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Row className="w-100 align-items-center">
          {/* Container 1: Name of the website */}
          <Col xs="auto">
            <Navbar.Brand>FilmQuest</Navbar.Brand>
            <Button
              variant="outline-warning"
              onClick={onHomePageClick}
              className="ms-2"
            >
              Home Page
            </Button>
            
          </Col>

          {/* Container 5: About Button */}
          <Col xs="auto" className="ms-auto">
            <Button variant="outline-warning" onClick={aboutClick}>
              About
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

const FilmViewNavigationBar = ({ onHomePageClick, aboutClick, onBackClick }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Row className="w-100 align-items-center">
          {/* Container 1: Name of the website */}
          <Col xs="auto">
            <Navbar.Brand>FilmQuest</Navbar.Brand>
            <Button
              variant="outline-warning"
              onClick={onHomePageClick}
              className="ms-2"
            >
              Home Page
            </Button>
            <Button
              variant="outline-warning"
              onClick={onBackClick}
              className="ms-2"
            >
              Back
            </Button>
          </Col>

          {/* Container 5: About Button */}
          <Col xs="auto" className="ms-auto">
            <Button variant="outline-warning" onClick={aboutClick}>
              About
            </Button>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

const AboutNavigationBar = ({ onHomePageClick, onBackClick }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container fluid>
        <Row className="w-100 align-items-center">
          {/* Container 1: Name of the website */}
          <Col xs="auto">
            <Navbar.Brand>FilmQuest</Navbar.Brand>
            <Button
              variant="outline-warning"
              onClick={onHomePageClick}
              className="ms-2"
            >
              Home Page
            </Button>
            <Button
              variant="outline-warning"
              onClick={onBackClick}
              className="ms-2"
            >
              Back
            </Button>
          </Col>

          {/* Container 5: About Button */}
          <Col xs="auto" className="ms-auto">
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export { HomeNavigationBar, ResultsViewNavigationBar, FilmViewNavigationBar, AboutNavigationBar };
