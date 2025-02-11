# FilmQuest 🎬

FilmQuest is a dynamic web application that provides users with comprehensive movie information and discovery tools. Built with React and Node.js, it leverages movie database APIs to deliver up-to-date information about films, including top-rated movies, new releases, and detailed search capabilities.

## Features

- Browse curated movie lists
- Search movies by title, year, genre, and film type
- Advanced filtering options
- Responsive design for all devices
- Real-time movie data updates
- Image validation to ensure high-quality movie posters

## Technologies Used

### Frontend
- React 18.3.1
- React Bootstrap
- CSS3
- Modern JavaScript (ES6+)

### Backend
- Node.js
- Express
- Axios for API requests
- CORS for cross-origin resource sharing

## Prerequisites

Before running FilmQuest, ensure you have the following installed:
- Node.js (Latest LTS version recommended)
- npm (Comes with Node.js)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/filmquest.git
cd filmquest
```

2. Install frontend dependencies:
```bash
cd frontend
npm install
```

3. Install backend dependencies:
```bash
cd ../backend
npm install
```

## Configuration

The backend requires API keys to access movie data. Create your own API keys from the MovieDatabase API service:

1. Sign up at RapidAPI
2. Subscribe to the MovieDatabase API
3. Copy your API key
4. Update the API keys in `server.js`

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```
The server will start on port 4000.

2. In a new terminal, start the frontend:
```bash
cd frontend
npm start
```
The application will open in your default browser at http://localhost:3000.

## Usage

- Use the navigation bar to browse different movie categories
- Apply filters using the dropdown menus to refine your search
- Click on movie cards to view detailed information
- Use the search functionality to find specific movies

## API Endpoints

The backend provides the following main endpoints:

- `/movie-list/:listName/:maxPage` - Fetch movies from specific lists
- `/movie-search/:searchTitle/:startYear/:endYear/:genre/:filmType/:page` - Search movies with filters

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- MovieDatabase API for providing comprehensive movie data
- All contributors who have helped improve FilmQuest
- Grant Smith - equal creator and developer