import GPTMovieSuggestions from "./GPTMovieSuggestions"
import GPTSearchBar from "./GPTSearchBar"

const GPTSearch = () => {
  return (
    <div className="bg-slate-300">
      <GPTSearchBar/>
      <GPTMovieSuggestions />
    </div>
  )
}

export default GPTSearch