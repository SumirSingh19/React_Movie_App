import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
  const dispatch = useDispatch();

  const trailerVid = useSelector((store) => store.movies.trailerVideo);

  const getMovieVideos = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
        API_OPTIONS
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trailer videos");
      }
      const json = await response.json();
      const trailerData =
        json.results.find((video) => video.type === "Trailer") ||
        json.results[0];
      if (trailerData) {
        dispatch(addTrailerVideo(trailerData));
      }
    } catch (error) {
      console.error("Error fetching movie trailer:", error);
    }
  };

  useEffect(() => {
    if(!trailerVid) getMovieVideos();
  }, [movieId]);
};

export default useMovieTrailer;
