import { addPopularMovies } from "../utils/moviesSlice";
import useFetchData from "./useFetchData";

const usePopularMovies = () => {
  useFetchData(
    "https://api.themoviedb.org/3/movie/popular?page=1",
    addPopularMovies,
    (store) => store.movies.popularMovies
  );
};

export default usePopularMovies;
