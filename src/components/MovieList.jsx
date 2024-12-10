import MovieCard from "./MovieCard";
import PropTypes from "prop-types";

const MovieList = ({ title, movies }) => {
  return (
    <div className="p-6 bg-transparent -mt-20">
      <h2 className="text-lg font-bold mb-4 text-white">{title}</h2>
      <div className="flex overflow-x-scroll hide-scrollbar">
        {movies && movies.length > 0 ? (
          movies?.map((movie) => (
            <div
              key={movie.poster_path}
              className="min-w-[200px] flex-shrink-0"
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

MovieList.propTypes = {
  title: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      poster_path: PropTypes.string,
    })
  ).isRequired,
};

export default MovieList;
