import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMovieTitle } from "../utils/moviesSlice";
import { useEffect } from "react";

export const useMovieLogo = (movieId) => {
  const dispatch = useDispatch();

  const getLogo = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/images`, API_OPTIONS);
      if (!response.ok) throw new Error("Failed to fetch logo");

      const json = await response.json();
      const logoPath = json.logos?.[5]?.file_path;
      if (logoPath) {
        const logoUrl = `https://image.tmdb.org/t/p/original${logoPath}`;
        dispatch(addMovieTitle(logoUrl));
      }
    } catch (error) {
      console.error("Error fetching movie logo:", error);
    }
  };

  useEffect(() => {
    if (!movieId) return; // Prevent unnecessary calls if movieId is undefined

    getLogo();
  }, [movieId]); // Depend on movieId
};

export default useMovieLogo;