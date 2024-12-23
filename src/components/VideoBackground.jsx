import { useSelector } from "react-redux";
import useMovieTrailer from "../hooks/useMovieTrailer";
import { memo } from 'react'; // Add memoization

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  // Only fetch trailer when movieId changes
  useMovieTrailer(movieId);

  // Don't render until we have the video key
  if (!trailerVideo?.key) return null;

  return (
    <div className="w-screen h-screen overflow-hidden">
      <iframe
        className="w-full h-full z-10 aspect-[16/10]"
        src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0`}
        title="Movie Trailer"
        allow="autoplay"
        allowFullScreen
      ></iframe>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export default memo(VideoBackground);