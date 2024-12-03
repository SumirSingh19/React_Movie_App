import { useSelector } from "react-redux";
import MovieList from "./MovieList";

export const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log(movies);

  return (
    <div className="relative -mt-28">
      <MovieList title={"Now Playing"} movies={movies?.nowPlayingMovies} />
      <MovieList title={"Top Rated"} movies={movies?.topRatedMovies} />
      <MovieList title={"Popular"} movies={movies?.popularMovies} />
      <MovieList title={"Upcoming"} movies={movies?.upcomingMovies} />
    </div>
  );
};
