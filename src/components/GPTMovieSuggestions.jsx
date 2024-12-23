import { useSelector } from "react-redux";
import MovieList from "../components/MovieList";
import lang from "../utils/languageConstants";

const GPTMovieSuggestions = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  const langKey = useSelector((store) => store.config.lang);

  if (!movieNames || movieNames.length === 0) {
    return (
      <div className="flex justify-center items-center h-12 md:h-40">
        <span className="typing-animation text-[0.8rem] md:text-4xl">
          {lang[langKey]?.suggestionText || lang.en.suggestionText}
        </span>
      </div>
    );
  }

  return (
    <div className="md:p-4 md:m-4">
      <div>
        {movieNames.map((movieName, index) => (
          <MovieList
            key={movieName}
            title={movieName}
            movies={movieResults[index]}
          />
        ))}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
