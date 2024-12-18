import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Search from "./components/Navbar/Search";
import NumResult from "./components/Navbar/NumResult";
import { tempMovieData } from "../src/utils/tempMovieData";
import { tempWatchedData } from "../src/utils/tempWatchedData";
import ListBox from "./components/Hero/ListBox";
import WatchBox from "./components/Hero/WatchBox";
import MovieList from "./components/Hero/MovieList";

export default function App() {
  const [movies, setMovies] = useState(tempMovieData);
  const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Navbar>
        <Search />
        <NumResult movies={movies} />
      </Navbar>
      <Hero>
        <ListBox>
          <MovieList movies={movies} />
        </ListBox>
        <WatchBox movies={movies} watched={watched} />
      </Hero>
    </>
  );
}
