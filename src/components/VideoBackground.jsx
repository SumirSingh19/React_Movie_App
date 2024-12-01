import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import useMovieTrailer from "../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <iframe
        className="w-full h-full aspect-[16/10]"
        src={`https://www.youtube.com/embed/${trailerVideo?.key}?autoplay=1&mute=1&enablejsapi=1`}
        title="Movie Trailer"
        allow="autoplay"
        allowFullScreen
      ></iframe>
    </div>
  );
};

VideoBackground.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default VideoBackground;
