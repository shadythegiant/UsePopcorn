import { useState } from "react";
import Nav from "./Nav";
import Box1 from "./Box1";
import Box2 from "./Box2";
import { tempMovieData, tempWatchedData } from "./TempData";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

//

export default function App() {
  const [watched, setWatched] = useState(tempWatchedData);
  const [movies, setMovies] = useState(tempMovieData);
  const [query, setQuery] = useState("");
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <>
      <Nav movies={movies} query={query} setQuery={setQuery} />
      <main className="main">
        <Box1 movies={movies} isOpen1={isOpen1} setIsOpen1={setIsOpen1} />
        <Box2
          watched={watched}
          isOpen2={isOpen2}
          setIsOpen2={setIsOpen2}
          avgImdbRating={avgImdbRating}
          avgUserRating={avgUserRating}
          avgRuntime={avgRuntime}
        />
      </main>
    </>
  );
}
