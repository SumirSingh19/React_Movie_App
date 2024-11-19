import { useState } from "react";
import Header from "./Header";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

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
        />
      </div>
      <form className="absolute p-16 bg-black bg-opacity-75 w-2/6 mt-36 mx-auto right-0 left-0 font-helvetica">
        <h1 className="font-bold text-4xl pb-2">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (<input
          type="text"
          placeholder="Full Name"
          className="p-4 mt-5 w-full bg-transparent text-gray-200 border border-gray-200 rounded-sm placeholder:text-lg placeholder:text-gray-300"
        />
      )}
      
        <input
          type="text"
          placeholder="Email Address"
          className="p-4 mt-5 w-full bg-transparent text-gray-200 border border-gray-200 rounded-sm placeholder:text-lg placeholder:text-gray-300"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-4 mt-5 w-full bg-transparent text-gray-200 border border-gray-200 rounded-sm placeholder:text-gray-300"
        />

        <button className="p-3 mt-9 bg-[#e50914] w-full rounded-sm font-bold font-">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="font-medium py-6 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now."
            : "Already a User? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
