// Import necessary modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");
const API_KEY = ""; // Add your RapidAPI key here

// Create an instance of Express
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Function to fetch all movies from a given list
async function fetchAllMovies(listName, maxPage) {
  const allMovies = [];
  let nextPage = `/titles?list=${listName}&page=1&info=base_info&limit=10&sort=year.decr`; // Initial page
  let nextPageIndex = 1; // Assume at least one page

  // Fetch movies for each page until there are no more pages
  while (nextPageIndex <= maxPage && nextPage) {
    const url = `https://moviesdatabase.p.rapidapi.com${nextPage}`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.get(url, options);
      const data = response.data;
      allMovies.push(...data.results); // Assuming the movies are in a 'results' array in the response
      nextPageIndex++; // Update total pages from the response
      nextPage = data.next; // Get the next page URL from the response, or null if no more pages
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch movies");
    }
  }
  return allMovies;
}

app.get("/movie-list/:listName/:maxPage", async (req, res) => {
  const listName = req.params.listName;
  const maxPage = parseInt(req.params.maxPage);

  try {
    const allMovies = await fetchAllMovies(listName, maxPage);
    const validMovies = await filterValidImages(allMovies);
    // console.log("Filtering complete");
    res.json(validMovies); // Send all movies as JSON response
    // console.log(validMovies)
  } catch (error) {}
});

// Function to filter out movies with invalid primaryImage URLs
async function filterValidImages(movies) {
  const validMovies = [];
  for (const movie of movies) {
    if (movie.primaryImage && movie.primaryImage.url) {
      try {
        // Check if the image URL returns a valid image
        // console.log('Checking image URL for movie:', movie.originalTitleText.text);
        const response = await axios.head(movie.primaryImage.url);

        if (
          response.headers["content-type"] &&
          response.headers["content-type"].startsWith("image")
        ) {
          validMovies.push(movie);
        }
      } catch (error) {
        // console.error(`Error checking image URL for movie: ${movie.originalTitleText.text}`, error);
      }
    } else {
    }
  }
  return validMovies;
}

async function fetchSearchedMovies(
  title,
  startYear,
  endYear,
  genre,
  filmType,
  page
) {
  let url;

  if (title == "null") {
    // url = `https://moviesdatabase.p.rapidapi.com/titles?genre=Action&startYear=2000&titleType=movie&page=1&info=base_info&endYear=2020&limit=20`;
    url = `https://moviesdatabase.p.rapidapi.com/titles?info=base_info&page=${page}&limit=20`;
  } else {
    // url = 'https://moviesdatabase.p.rapidapi.com/titles/search/title/avengers?exact=false&info=base_info&page=1&endYear=&startYear=&titleType=&limit=20&genre=';
    //url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}?exact=false&info=base_info&page=1&endYear=${nendYear}&startYear=${nstartYear}&titleType=${nfilmType}&limit=20&genre=${ngenre}`;
    url = `https://moviesdatabase.p.rapidapi.com/titles/search/title/${title}?exact=false&info=base_info&page=${page}&limit=20`;
  }

  if (startYear != "null") {
    url += `&startYear=${startYear}`;
  }
  if (endYear != "null") {
    url += `&endYear=${endYear}`;
  }
  if (genre != "null") {
    url += `&genre=${genre}`;
  }
  if (filmType != "null") {
    url += `&titleType=${filmType}`;
  }

  const searchedMovies = [];
  const options = {
    headers: {
      "X-RapidAPI-Key": API_KEY,
      "X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com",
    },
  };

  console.log(url);

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    searchedMovies.push(...data.results);
  } catch (error) {
    // console.error(error);
    // Send an error response back to the client
    res.status(500).json({ error: "Internal Server Error" });
  }

  return searchedMovies;
}

app.get(
  "/movie-search/:searchTitle/:startYear/:endYear/:genre/:filmType/:page",
  async (req, res) => {
    title = req.params.searchTitle;
    startYear = req.params.startYear;
    endYear = req.params.endYear;
    genre = req.params.genre;
    filmType = req.params.filmType;
    page = parseInt(req.params.page);

    try {
      const searchedMovies = await fetchSearchedMovies(
        title,
        startYear,
        endYear,
        genre,
        filmType,
        page
      );
      const filteredSearchedMovies = await filterValidImages(searchedMovies);
      // Send the data back to the client
      res.json(filteredSearchedMovies);
    } catch (error) {}
  }
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
