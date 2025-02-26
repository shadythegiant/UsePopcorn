import { useEffect, useState } from "react";
import StarRating from "./StarRating";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

//
//  const KEYS = [ '4b447405',
//   'eb0c0475',
//   '7776cbde',
//   'ff28f90b',
//   '6c3a2d45',
//   'b07b58c8',
//   'ad04b643',
//   'a95b5205',
//   '777d9323',
//   '2c2c3314',
//   'b5cff164',
//   '89a9f57d',
//   '73a9858a',
//   'efbd8357']

// const KEY = "f84fc31d";
const KEY = "ff28f90b";

//  ----------------------------------------- App component -------------------------------
export default function App() {
  // constants and state
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedId] = useState(null);

  // handle functions

  function handleSetSelectedId(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseMovie() {
    setSelectedId(null);
  }

  function handleAddWatched(movie) {
    // we create an arrray destruct already existig movie object and add the new one
    setWatched((watched) => [...watched, movie]);
  }

  // effect

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        // throwing erro if !res.ok

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        console.log(data);
        // throw error if Respose false
        if (data.Response === "False") throw new Error("Movie was not found");

        setMovies(data.Search);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    } else {
      fetchMovies();
    }
  }, [query]);

  //  ------------------------------  JSX -------------------------------------------------

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {error && <Error message={error} />}
          {!isLoading && !error && (
            <MovieList
              movies={movies}
              handleSetSelectedId={handleSetSelectedId}
            />
          )}
        </Box>

        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              handleCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched = {watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

// NavBar Component

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

// LOGO

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

//  SEARCH COMP

function Search({ query, setQuery }) {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

// MAIN
function Main({ children }) {
  return <main className="main">{children}</main>;
}

// BOX

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

function MovieList({ movies, handleSetSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleSetSelectedId={handleSetSelectedId}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, handleSetSelectedId }) {
  return (
    <li onClick={() => handleSetSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMoviesList({ watched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }) {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

function Loader() {
  return <p className="loader">Loading ...</p>;
}

function Error({ message }) {
  return <p className="error"> {message}</p>;
}

// selected Movie component
function MovieDetails({ selectedID, handleCloseMovie, onAddWatched , watched }) {
  // state to track movie selected

  const [movie, setMovie] = useState({});
  const [userRating ,setUserRating] = useState(''); 
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: directors,
    Genre: genre,
  } = movie;

  // 
  const isWatched = watched.map(movie => movie.imdbID).includes(selectedID)

  // to fetch indvidual movies we need an effect everytime the comp renders

  useEffect(() => {
    async function fetchMovieDetail() {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedID}`
      );
      const data = await res.json();
      console.log(data);
      setMovie(data);
    }

    fetchMovieDetail();
  }, [selectedID]);

  // functions
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedID,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: parseFloat(runtime),
      userRating
    };

   
    onAddWatched(newWatchedMovie);
    handleCloseMovie();
  }

  // --------------------------------- JSX ----------------------------------

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={handleCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`poster of ${movie}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span> {imdbRating} Imdb Rating
          </p>
        </div>
      </header>
      <section>
       {!isWatched ? <> <div className="rating">
          <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
       {userRating > 0 &&    <button className="btn-add" onClick={handleAdd}>
            {" "}
            + Add to list
          </button> }
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {directors}</p></> : <p>you rated this movie </p>}
      </section>
    </div>
  );
}
