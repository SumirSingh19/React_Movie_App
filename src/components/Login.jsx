import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    //Validate the form data
    const msg = checkValidData(
      name.current ? name.current.value : null,
      email.current.value,
      password.current.value
    );

    setErrorMessage(msg);
    if (msg) return;
    //else => sign-in / sign-up
    if (!isSignInForm) {
      //sign Up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      //sign In logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div className="text-white">
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/03ad76d1-e184-4d99-ae7d-708672fa1ac2/web/IN-en-20241111-TRIFECTA-perspective_149877ab-fcbd-4e4f-a885-8d6174a1ee81_large.jpg"
          alt=""
          className="h-screen object-cover md:h-full"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-16 pt-40 md:pt-16 h-screen md:h-auto bg-black bg-opacity-75 md:w-2/6 md:mt-32 mx-auto right-0 left-0"
      >
        <h1 className="font-bold text-4xl pb-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 mt-5 w-full bg-transparent text-gray-200 border border-gray-200 rounded-sm placeholder:text-lg placeholder:text-gray-300"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 mt-5 w-full bg-transparent text-gray-200 border border-gray-200 rounded-sm placeholder:text-lg placeholder:text-gray-300"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 mt-5 w-full bg-transparent text-gray-200 border border-gray-200 rounded-sm placeholder:text-gray-300"
        />

        <p className="text-red-500 font-medium text-lg">{errorMessage}</p>
        <button
          className="p-3 mt-9 bg-[#e50914] w-full rounded-sm font-bold"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p
          className="font-medium py-6 cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignInForm
            ? "New to Netflix? Sign Up Now."
            : "Already a User? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
