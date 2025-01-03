import React from "react";
import { useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating"
import Loader from "../Loader/Loader";

const MovieDetails = ({ selectedId, handleCloseMovie, KEY }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Genre: genre,
    Plot: plot,
    imbdRating: imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Country: country,
  } = movie;

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };
    getMovieDetails();
  }, [selectedId]);

  return (
    <div className="details">
      {isLoading ? <Loader /> : 
      <>
      <header>
        <button className="btn-back" onClick={handleCloseMovie}>
          &larr;
        </button>
        <img src={poster} alt={`poster of ${movie} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐️</span> {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
        <StarRating maxRating={10} size="24px" />
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring: {actors}</p>
        <p>Directed by: {director}</p>
        <p>Country: {country}</p>
      </section>
      </>}
    </div>
  );
};

export default MovieDetails;
