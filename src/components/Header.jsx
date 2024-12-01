import { onAuthStateChanged, signOut } from "firebase/auth";
import ICON from "../assets/icons/netflix-profile.jpg";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO } from "../utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user) || {};
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

  return (
    <div className="absolute w-full px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between items-center">
      <img
        className="w-44"
        src={LOGO}
        alt="logo"
      />
      {user?.uid && (
        <div className="flex flex-col items-center sm:flex-row gap-2">
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
