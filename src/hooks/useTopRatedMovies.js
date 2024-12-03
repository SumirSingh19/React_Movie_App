import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTopRatedMovies } from "../utils/moviesSlice";
import { useEffect } from "react";

const useTopRatedMovies = () => {
  // Fetch Data from TMDB API and update store
  const dispatch = useDispatch();

  const topRatedMovies = async () => {
    try {
      const data = await fetch("https://api.themoviedb.org/3/movie/top_rated?page=1", API_OPTIONS);
      if (!data.ok) {
        throw new Error("Failed to fetch data");
      }
      const json = await data.json();
      dispatch(addTopRatedMovies(json.results));
    } catch (error) {
      console.error("Error fetching top rated movies:", error);
    }
  };
  

  useEffect(() => {
    topRatedMovies();
  }, []);
};

export default useTopRatedMovies;