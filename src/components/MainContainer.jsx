import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VIdeoTitle from "./VIdeoTitle";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  //early return
  if (!movies) return;

  const mainMovie = movies[0];

  const { original_title, overview, id } = mainMovie;

  return (
    <div className="relative overflow-hidden w-full">
      <VIdeoTitle movieId={id} title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
