import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addUpcomingMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useUpcomingMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    try {
      const data = await fetch("https://api.themoviedb.org/3/movie/upcoming?page=1", API_OPTIONS);
      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await data.json();
      dispatch(addUpcomingMovies(json.results));
    } catch (error) {
      console.error("Error fetching upcoming movies:", error);
    }
  };
  

  useEffect(() => {
    getUpcomingMovies();
  }, []);
};

export default useUpcomingMovies;