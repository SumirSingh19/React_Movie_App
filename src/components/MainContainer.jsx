import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VIdeoTitle from "./VideoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  // Early return if movies data is unavailable
  if (!movies) return null;

  const mainMovie = movies[0];
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative overflow-hidden w-full h-screen">
      <VIdeoTitle movieId={id} title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
