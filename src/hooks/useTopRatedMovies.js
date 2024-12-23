import { addTopRatedMovies } from "../utils/moviesSlice";
import useFetchData from "./useFetchData";

const useTopRatedMovies = () => {
  useFetchData(
    "https://api.themoviedb.org/3/movie/top_rated?page=1",
    addTopRatedMovies,
    (store) => store.movies.topRatedMovies
  );
};

export default useTopRatedMovies;
