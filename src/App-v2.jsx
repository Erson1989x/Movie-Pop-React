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

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const KEY = "c0d89336";

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => ( id === selectedId ? null : id ));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatch = (movie) => {
    setWatched((watched) => [...watched, movie]);
  }

  const handleDeleteWatch = (id) => {
    setWatched((prevWatched) => prevWatched.filter((movie) => movie.imdbID !== id));
  };
  
  useEffect(
    () => {
      const controller = new AbortController();
  
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
            signal: controller.signal}
        );
  
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
  
        const data = await res.json();
  
        if (data.Response === "False") {
          console.log("API response:", data);
          throw new Error("Movie not found");
        }
  
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          console.log(err.message);
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    if (query.length < 3) {
      setMovies([]);
      setError("");
      return;
    }
  
    handleCloseMovie();
    fetchMovies();
  
    return () => {
      controller.abort();
    }
  }, [query]);


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
