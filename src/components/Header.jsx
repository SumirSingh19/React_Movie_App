import { onAuthStateChanged, signOut } from "firebase/auth";
import ICON from "../assets/icons/netflix-profile.jpg";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import LOGO from "../assets/images/logo.png"
import { SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGPTSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user) || {};
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => navigate("/"))
      .catch((error) => {
        console.error("Sign-out error:", error);
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleGPTSearchClick = () => {
    //Toggle GPT Search
    dispatch(toggleGPTSearchView());
  };

  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  useEffect(() => {
    handleGPTSearchClick();
  }, []);

  return (
    <div className="absolute w-full px-2 md:px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between items-center sm: md:">
      <img className="w-44" src={LOGO} alt="logo" />
      {user?.uid && (
        <div className="flex items-center sm:flex-row gap-4 md:gap-2">
          {showGPTSearch && (
            <select
              name="Language"
              className="md:p-2 bg-inherit md:m-2 bg-gray-600 text-white rounded-md"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option
                  className="bg-gray-700"
                  key={lang.identifier}
                  value={lang.identifier}
                >
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="py-1 md:m-2 px-3 bg-gray-600 text-white text-sm rounded-md"
            onClick={handleGPTSearchClick}
          >
            {showGPTSearch?"Home Page" : "GPT Search"}
          </button>
          <img
            src={user?.photoURL || ICON}
            className="w-10 cursor-pointer rounded-sm shadow-sm"
            alt="User Icon"
            title={user?.displayName || "Profile"}
            onClick={() => navigate("/profile")}
          />
          <button
            onClick={handleSignOut}
            className="inline-flex items-center justify-center p-0.5 text-sm font-medium text-gray-900 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 hover:text-white focus:ring-2 focus:ring-pink-200"
          >
            <span className="px-2 py-1 bg-white hover:bg-black rounded-md group-hover:bg-opacity-0">
              Sign Out
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
