import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addPopularMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const usePopularMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const getPopularMovies = async () => {
    try {
      const data = await fetch("https://api.themoviedb.org/3/movie/popular?page=1", API_OPTIONS);
      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await data.json();
      dispatch(addPopularMovies(json.results));
    } catch (error) {
      console.error("Error fetching popular movies:", error);
    }
  };
  

  useEffect(() => {
    getPopularMovies();
  }, []);
};

export default usePopularMovies;