import ICON1 from "../assets/icons/play.png";
import ICON2 from "../assets/icons/info.png";
import { useSelector } from "react-redux";
import useMovieLogo from "../hooks/useMovieLogo";
import PropTypes from 'prop-types';

const VideoTitle = ({ movieId, overview }) => {
  const officialLogo = useSelector((store) => store.movies.movieTitle);

  useMovieLogo(movieId);

  return (
    <div className="w-screen aspect-video pt-60 px-24 absolute text-white bg-gradient-to-r from-black bg-opacity-50">
      <img src={officialLogo || ""} alt="Movie Logo" className="w-1/4" />
      <p className="text-lg py-6 w-1/3">{overview}</p>
      <div className="flex gap-4">
        <button className="bg-gray-100 text-black px-4 py-2 w-36 text-lg flex items-center justify-center gap-2 rounded-md hover:opacity-80">
          <img src={ICON1} alt="play-icon" />
          Play
        </button>
        <button className="text-white bg-gray-500 px-4 py-2 w-36 text-lg flex items-center justify-center gap-2 rounded-md bg-opacity-70 hover:opacity-80">
        <img src={ICON2} alt="info-icon" />
          More Info
        </button>
      </div>
    </div>
  );
};
VideoTitle.propTypes = {
  movieId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  overview: PropTypes.string.isRequired,
};

export default VideoTitle;
