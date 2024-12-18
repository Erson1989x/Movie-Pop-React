import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Search from "./components/Navbar/Search";
import NumResult from "./components/Navbar/NumResult";
import { tempMovieData } from "../src/utils/tempMovieData";
import { tempWatchedData } from "../src/utils/tempWatchedData";
import Box from "./components/Hero/Box";
import MovieList from "./components/Hero/MovieList";
import Summary from "./components/Hero/Summary";
import { average } from "./utils/fuctions";
import WatchList from "./components/Hero/WatchList";

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
        <Box>
          <MovieList movies={movies} />
        </Box>
        <Box>
        <Summary watched={watched} average={average}/>
        <WatchList watched={watched} />
        </Box>
      </Hero>
    </>
  );
}
