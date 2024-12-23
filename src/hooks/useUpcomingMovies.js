import { addUpcomingMovies } from "../utils/moviesSlice";
import useFetchData from "./useFetchData";

const useUpcomingMovies = () => {
  useFetchData(
    "https://api.themoviedb.org/3/movie/upcoming?page=1",
    addUpcomingMovies,
    (store) => store.movies.upcomingMovies
  );
};

export default useUpcomingMovies;
