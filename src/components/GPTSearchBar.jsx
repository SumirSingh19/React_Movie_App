import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { HfInference } from "@huggingface/inference";
import { API_OPTIONS } from "../utils/constants";
import { addAiMovieResult } from "../utils/gptSlice";
import lang from "../utils/languageConstants";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchText = useRef(null);

  const inference = new HfInference(`${import.meta.env.VITE_HUGGING_FACE_KEY}`);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await data.json();
      return json.results;
    } catch (err) {
      console.error("Error fetching TMDB data:", err);
      return [];
    }
  };

  const handleSearchClick = async () => {
    const query = searchText.current.value.trim();
    if (!query || query.length < 3) {
      setError("Please enter at least 3 characters.");
      return;
    }

    setLoading(true);
    setError(null);

    const movieQuery = `List 5-6 movie names related to: "${query}". Only provide the movie names in a comma-separated format.`;

    let movies = [];

    try {
      const result = await inference.textGeneration({
        model: "google/gemma-2-9b-it",
        inputs: movieQuery,
      });

      const cleanResult = result.generated_text.split(".").slice(-1)[0].trim();

      movies = cleanResult
        .split(",")
        .map((movie) => movie.trim())
        .filter((movie) => movie);

      setSearchResults(movies);
    } catch (err) {
      setError("Error fetching results. Please try again.");
      console.error("Error fetching results:", err);
    } finally {
      setLoading(false);
    }

    if (movies.length > 0) {
      const promiseArr = movies.map((movie) => searchMovieTMDB(movie));
      const movieResults = await Promise.all(promiseArr);

      dispatch(addAiMovieResult({ movieNames: movies, movieResults }));
    }
  };

  return (
    <div>
      <form
        action=""
        className="pt-40 flex gap-2 md:gap-5 justify-center"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          className="px-4 py-1.5 md:py-2 rounded-md border border-black w-4/6 md:w-3/6 placeholder:text-sm md:placeholder:text-base placeholder:italic font-sans"
          placeholder={
            lang[langKey]?.gptSearchPlaceholder || lang.en.gptSearchPlaceholder
          }
          disabled={loading}
        />
        <button
          className={`px-4 bg-gray-500 text-white rounded-md ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
          onClick={handleSearchClick}
          disabled={loading}
        >
          {loading
            ? lang[langKey]?.searching || lang.en.searching
            : lang[langKey]?.search || lang.en.search}
        </button>
      </form>
      {error && <div className="text-red-500 px-12 md:px-[21rem] text-sm md:text-base">{error}</div>}
    </div>
  );
};

export default GPTSearchBar;
