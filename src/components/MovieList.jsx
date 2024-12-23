import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const validMovies = movies?.filter((movie) => movie.poster_path); // Filter out invalid movies

  return (
    <div className="p-6 relative z-50 flex flex-col gap-1 py-3 md:py-5">
      <h2 className="text-sm md:text-lg font-bold mb-1 md:mb-4 text-white">{title}</h2>
      <div className="flex overflow-x-scroll hide-scrollbar">
        {validMovies && validMovies.length > 0 ? (
          validMovies.map((movie) => (
            <div
              key={movie.poster_path}
              className="md:min-w-[12.6rem] min-w-[8.5rem] flex-shrink-0"
            >
              <MovieCard posterPath={movie.poster_path} />
            </div>
          ))
        ) : (
          <p>No movies available</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
