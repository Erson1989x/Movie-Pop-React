import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import { tempMovieData} from "../src/utils/tempMovieData";
import { tempWatchedData} from "../src/utils/tempWatchedData";


export default function App() {
    const [movies, setMovies] = useState(tempMovieData);
    const [watched, setWatched] = useState(tempWatchedData);

  return (
    <>
      <Navbar movies={movies} />
      <Hero movies={movies} watched={watched}/>
   
    </>
  );
}
