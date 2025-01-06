import React, { useRef } from "react";
import { useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating";
import Loader from "../Loader/Loader";

const MovieDetails = ({
  selectedId,
  handleCloseMovie,
  KEY,
  handleAddWatch,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(() => {
    if(userRating)
    countRef.current++;
  },[userRating]);

  const isWatched = watched.map((movie) => movie.imbdID).includes(selectedId);
  const watchedUserRating = watched.find(
    (movie) => movie.imbdID === selectedId
  )?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    Genre: genre,
    Plot: plot,
    imdbRating: imdbRating,
    Released: released,
    Actors: actors,
    Director: director,
    Country: country,
  } = movie;

  const handleAdd = () => {
    const newMovie = {
      imbdID: selectedId,
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      imdbRating: Number(imdbRating),
      userRating,
      countRatingDecisions: countRef.current,
    };
    handleAddWatch(newMovie);
    handleCloseMovie();
  };

  useEffect(() => {
    const callback = (e) => {
      if (e.code === "Escape") {
        handleCloseMovie();
      }
    };
    document.addEventListener("keydown", callback);
    return () => {
      document.removeEventListener("keydown", callback);
    };
  }, [handleCloseMovie]);

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

  useEffect(() => {
    if (!title) return;

    document.title = `Movie | ${title}`;

    return () => {
      document.title = "MoviePop";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
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
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size="24px"
                    setUserRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie - {watchedUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring: {actors}</p>
            <p>Directed by: {director}</p>
            <p>Country: {country}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
