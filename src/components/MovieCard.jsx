import { IMG_CDN_URL } from "../utils/constants";
import PropTypes from 'prop-types';

const MovieCard = ({ posterPath }) => {
  return (
    <div className="w-48">
      <img src={IMG_CDN_URL + posterPath} alt="" />
    </div>
  );
};
MovieCard.propTypes = {
  posterPath: PropTypes.string.isRequired,
};

export default MovieCard;
