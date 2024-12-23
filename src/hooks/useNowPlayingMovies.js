import useFetchData from "./useFetchData";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  useFetchData(
    "https://api.themoviedb.org/3/movie/now_playing?page=1",
    addNowPlayingMovies,
    (store) => store.movies.nowPlayingMovies
  );
};

export default useNowPlayingMovies;
