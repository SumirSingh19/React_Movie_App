import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addMovieTitle } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieLogo = (movieId) => {
  const dispatch = useDispatch();

  const getLogo = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/" + movieId + "/images",
      API_OPTIONS
    );
    const json = await data.json();
    const filterData = json.logos;
    const baseUrl = "https://image.tmdb.org/t/p/original";
    const logo = `${baseUrl}${filterData?.[2]?.file_path}`;
    dispatch(addMovieTitle(logo));
  };

  useEffect(() => {
    getLogo();
  }, []);
};

export default useMovieLogo;
