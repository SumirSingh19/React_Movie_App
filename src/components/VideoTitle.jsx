import ICON1 from "../assets/icons/play.png";
import ICON2 from "../assets/icons/info.png";
import { useSelector } from "react-redux";
import useMovieLogo from "../hooks/useMovieLogo";

const VideoTitle = ({ movieId, overview }) => {
  const officialLogo = useSelector((store) => store.movies.movieTitle);

  useMovieLogo(movieId);

  return (
    <div className="w-screen aspect-video pt-[22rem] md:pt-60 px-10 md:px-24 absolute text-white bg-gradient-to-r from-black bg-opacity-50">
      <img src={officialLogo || ""} alt="Movie Logo" className="w-2/4 md:w-1/4" />
      <p className="text-xs md:text-lg py-6 md:w-1/3">{overview}</p>
      <div className="flex gap-4">
        <button className="bg-gray-100 text-black px-2 py-1 md:px-4 md:py-2 w-20 md:w-36 text-sm md:text-lg flex items-center justify-center gap-1 md:gap-2 rounded-md hover:opacity-80">
          <img src={ICON1} className="w-4 md:w-7" alt="play-icon" />
          Play
        </button>
        <button className="text-white bg-gray-500 px-2 py-1 md:px-4 md:py-2 w-28 md:w-36 text-sm md:text-lg flex items-center justify-center gap-1 md:gap-2 rounded-md bg-opacity-70 hover:opacity-80">
        <img src={ICON2} className="w-4 md:w-6" alt="info-icon" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
