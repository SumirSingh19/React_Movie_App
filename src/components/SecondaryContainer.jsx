import { useSelector } from "react-redux";
import MovieList from "./MovieList";

export const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    <div className="relative">
      {/* Content overlapping the trailer */}
      <div className="-mt-20 relative z-40">
        <MovieList title="Now Playing" movies={movies?.nowPlayingMovies} />
        <MovieList title="Top Rated" movies={movies?.topRatedMovies} />
        <MovieList title="Popular" movies={movies?.popularMovies} />
        <MovieList title="Upcoming" movies={movies?.upcomingMovies} />
      </div>

      {/* Background layer starts from here */}
      <div className="absolute top-0 w-full h-full bg-black z-0"></div>
    </div>
  );
};
