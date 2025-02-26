

# Movie Tracker Web App ( usePopcorn ) part of the Jonas Shmedttman React course 

Welcome to the **Movie Tracker Web App**, a React-based project built as part of a React course to explore the power of state management with hooks and data fetching with the `useEffect` hook. This web app allows users to search for movies using the [OMDB API](http://www.omdbapi.com/), track movies they’ve watched, rate them, and view insightful metrics like the average runtime of watched movies and the average rating.

## Features

- **Search Movies**: Use the OMDB API to search for movies by title.
- **Track Watched Movies**: Add movies to your "Watched" list.
- **Rate Movies**: Assign ratings to movies you’ve watched.
- **View Metrics**: See stats like:
  - Average runtime of watched movies (in minutes).
  - Average rating of watched movies.
  - Total number of movies watched.
- **Responsive Design**: A clean and user-friendly interface that works on all devices. ( not implemented yet the app doesn't suppor mobile ) 

## Tech Stack

- **React**: Frontend library for building the user interface.
- **React Hooks**:
  - `useState`: Manages local state for movie data, ratings, and search input.
  - `useEffect`: Handles side effects like fetching data from the OMDB API.
- **OMDB API**: External API for fetching movie details.
- **CSS**: Styling for a sleek and intuitive UI.

## Learning Objectives

This project is designed to help you master:
- Managing component state with the `useState` hook.
- Fetching and handling asynchronous data with the `useEffect` hook.
- Working with external APIs in a React application.
- Building a dynamic and interactive user interface.

## Prerequisites

Before running the project, ensure you have the following:
- [Node.js](https://nodejs.org/) (v14 or higher) installed.
- An API key from [OMDB API](http://www.omdbapi.com/apikey.aspx) (free tier available).
- Basic knowledge of React and JavaScript.

## Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/shadythegiant/UsePopcorn.git
   cd movie-tracker
   ```

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**  
   Create a `.env` file in the root directory and add your OMDB API key:
   ```plaintext
   REACT_APP_OMDB_API_KEY=your_api_key_here
   ```

4. **Run the App**  
   ```bash
   npm start
   ```
   The app will launch at `http://localhost:3000` in your browser.

## Usage

1. **Search for a Movie**: Enter a movie title in the search bar and hit "Search".
2. **Add to Watched List**: Click "Add to Watched" on a movie result to track it.
3. **Rate the Movie**: Assign a rating (e.g., 1–10) to the movie.
4. **View Stats**: Check the dashboard for averages and totals based on your watched movies.



## How It Works

- **State Management**: The `useState` hook tracks the search query, movie results, watched movies, and ratings in the app’s state.
- **Data Fetching**: The `useEffect` hook triggers an API call to OMDB whenever the search query changes, fetching movie data dynamically.
- **Metrics Calculation**: The app computes averages and totals based on the watched movie list, updating in real-time as you add or rate movies.

## Example

Search for "Inception":
- Add it to your watched list with a rating of 8.
- Search for "The Matrix" and add it with a rating of 9.
- Stats might show:
  - Average Rating: 8.5
  - Average Runtime: 145 minutes
  - Total Movies Watched: 2

## Future Improvements

- Add local storage to persist the watched list across sessions.
- Implement sorting and filtering for the watched list.
- Enhance the UI with animations or a dark mode toggle.

## Contributing

This is a learning project, but feel free to fork it and experiment! Submit a pull request if you’d like to share your enhancements.

## Acknowledgments

- Thanks to the [OMDB API](http://www.omdbapi.com/) for providing free movie data.
- Built as part of a React course to deepen understanding of hooks and API integration.

Happy coding, and enjoy tracking your movies!

