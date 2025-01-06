import { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Search from "./components/Navbar/Search";
import NumResult from "./components/Navbar/NumResult";
import Box from "./components/Hero/Box";
import MovieList from "./components/Hero/MovieList";
import Summary from "./components/Hero/Summary";
import { average } from "./utils/fuctions";
import WatchList from "./components/Hero/WatchList";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import { useMovies } from "./Hooks/useMovies";

const KEY = "c0d89336";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error } = useMovies(query,  handleCloseMovie);
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });


  function handleSelectMovie (id) {
    setSelectedId((selectedId) => ( id === selectedId ? null : id ));
  };

  function handleCloseMovie () {
    setSelectedId(null);
  };

  function handleAddWatch (movie) {
    setWatched((watched) => [...watched, movie]);

    //localStorage.setItem("watched", JSON.stringify([...watched, movie]));
  };

  function handleDeleteWatch (id) {
    setWatched((prevWatched) => prevWatched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);
  

  /*
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`)
    .then((res) => res.json())
    .then((data) => setMovies(data.Search));
  }, []);
*/

  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Navbar>
      <Hero>
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <Summary watched={watched} average={average} />
              <WatchList watched={watched} />
            </>
          }
        />*/}
        <Box>
          {/*isLoading ? <Loader /> : <MovieList movies={movies} />*/}
          {isLoading && <Loader />}
          {!isLoading && !error && <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails watched={watched} selectedId={selectedId} handleCloseMovie={handleCloseMovie} KEY={KEY} handleAddWatch={handleAddWatch} />
          ) : (
            <>
              <Summary watched={watched} average={average} />
              <WatchList watched={watched} handleDeleteWatch={handleDeleteWatch} />
            </>
          )}
        </Box>
      </Hero>
    </>
  );
}
