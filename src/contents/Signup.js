// eslint-disable-next-line
import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import { Link, useHistory, Redirect } from "react-router-dom";
//LocalIMG
import Logo from "../images/logo192.png";

// Firebase
import firebase from "../services/FirebaseConfig";

//export
export default function SignUp() {
  // State
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [desc, setDesc] = useState("");

  const stateEmail = (event) => setEmail(event.target.value);
  const stateUsername = (event) => setUsername(event.target.value);
  const statePassword = (event) => setPassword(event.target.value);
  const stateRepassword = (event) => setRepassword(event.target.value);
  const showAlert = (text) => {
    setAlert(true);
    setDesc(text);
  };
  const hideAlert = () => setAlert(false);

  const handleSubmit = async (event) => {
    hideAlert()
    event.preventDefault();
    if (username && email && password && repassword) {
      if (password === repassword) {
        await firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(async (userCredential) => {
            var user = userCredential.user;
            await user.updateProfile({
              displayName: username,
            });
            window.location.reload();
          })
          .catch((error) => {
            var errorMessage = error.message;
            showAlert(errorMessage);
          });
      } else {
        showAlert("Re-password is not correct, try again.");
      }
    } else {
      showAlert("Please type your all information.");
    }
  };

  useEffect(() => {});

  return (
    <div class="flex flex-center items-center justify-center bg-bluemain overflow-hidden h-screen">
      <div className="flex justify-center flex-col body-bg h-screen pt-12 md:pt-0 pb-6 px-2 md:px-0 w-full sm:w-1/2 mt-4">
        <header class="max-w-lg mx-auto text-center">
          <section class="flex justify-center items-center flex-col">
            <img src={Logo} class="w-28 sm:w-52 md:w-52 xl:w-52" alt="logo" />
            <span class="font-bold text-2xl text-white sm:text-4xl">
              Welcome to Rāningu
            </span>
            <p class="text-whitemain mt-2 text-xs sm:text-base">
              Sign up your account.
            </p>
          </section>
        </header>
        <div class="mt-10 mx-8 transform">
          <form onSubmit={handleSubmit}>
            <div class="mb-3 pt-2 rounded bg-gray-200">
              <label
                class="text-gray-700 text-sm font-bold mb-1 ml-4"
                for="email"
              >
                Username
              </label>
              {/* Username */}
              <input
                type="text"
                id="username"
                value={username}
                onChange={stateUsername}
                class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1"
              />
            </div>
            <div class="mb-3 pt-2 rounded bg-gray-200">
              <label
                class="text-gray-700 text-sm font-bold mb-1 ml-4"
                for="email"
              >
                Email
              </label>
              {/* Email */}
              <input
                type="email"
                id="email"
                value={email}
                onChange={stateEmail}
                class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1"
              />
            </div>
            <div class="mb-3 pt-2 rounded bg-gray-200">
              <label
                class="text-gray-700 text-sm font-bold mb-1 ml-4"
                for="password"
              >
                Password
              </label>
              {/* Password */}
              <input
                type="password"
                id="password"
                value={password}
                onChange={statePassword}
                class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1"
              />
            </div>
            <div class="mb-3 pt-2 rounded bg-gray-200">
              <label
                class="text-gray-700 text-sm font-bold mb-1 ml-4"
                for="password"
              >
                Confirm Password
              </label>
              {/* Re-Password */}
              <input
                type="password"
                id="confirm_password"
                value={repassword}
                onChange={stateRepassword}
                class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1"
              />
            </div>
            <div class="max-w-lg mx-auto text-center my-5 text-xs sm:text-base ">
              <p class="text-white">
                Already have an account ?{" "}
                <Link to="/home" class="font-bold hover:underline">
                  Go back
                </Link>
                .
              </p>
            </div>

            {/* Alert */}
            {alert && (
              <div
                class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-2 rounded relative"
                role="alert"
              >
                <strong class="font-bold">Error! </strong>
                <span class="block sm:inline">{desc}</span>
              </div>
            )}

            {/* Submit */}
            <button
              class="bg-orangemain hover:bg-lightorange hover:text-2xl text-white text-xl font-bold py-4 rounded shadow-lg hover:shadow-xl transition duration-500 w-full"
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
