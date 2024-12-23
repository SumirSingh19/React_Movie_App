import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";

const useFetchData = (url, action, selector) => {
    const dispatch = useDispatch();

    const movieData = useSelector(selector);

    const fetchData = async () => {
      try {
        const response = await fetch(url, API_OPTIONS);
        if (!response.ok) {
          throw new Error(`Failed to fetch data from ${url}`);
        }
        const json = await response.json();
        dispatch(action(json.results));
      } catch (error) {
        console.error(`Error fetching data from ${url}:`, error);
      }
    };
  
    useEffect(() => {
      if(!movieData) fetchData();
    }, []);
  };
  
  export default useFetchData;
  