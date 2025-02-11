import React from "react";
import { AboutNavigationBar } from "./NavigationBars";

const About = ({ onHomePageClick, onBackClick }) => {
  return (
    <>
      <AboutNavigationBar onHomePageClick={onHomePageClick} onBackClick={onBackClick}/>
      <div className="container">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src="./Blake.jpg"
              alt="Author 1"
              className="img-fluid rounded"
              width="412"
            />
            <h2>Blake Nelson</h2>
            <p>Email: blakenelson.dev@gmail.com</p>
            <p>SE/ComS319 Construction of User Interfaces, Spring 2024</p>
            <p>5/8/2024</p>
            <p>Ali Jannesari, Ph.D.    Email: jannesar@iastate.edu</p>
          </div>
          <div className="col-md-6 text-center">
            <img
              src="./Grant.jpeg"
              alt="Grant Smith"
              className="img-fluid rounded"
              width="412"
            />
            <h2>Grant Smith</h2>
            <p>Email: grantes@iastate.edu</p>
            <p>SE/ComS319 Construction of User Interfaces, Spring 2024</p>
            <p>5/8/2024</p>
            <p>Ali Jannesari, Ph.D.    Email: jannesar@iastate.edu</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
