import { useSelector } from "react-redux";
import lang from "../utils/languageConstants";

const GPTSearchBar = () => {
  const langKey = useSelector((store) => store.config.lang);
  return (
    <div>
      <form action="" className="pt-40 flex gap-5 justify-center">
        <input
          type="text"
          className="px-4 py-2 rounded-md border border-black w-3/6"
          placeholder={lang[langKey].gptSearchPlaceholder}
        />
        <button className="px-4 bg-gray-500 text-white rounded-md">
          {lang[langKey].search}
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
