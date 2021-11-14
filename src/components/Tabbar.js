import { React, useState, Fragment } from "react";
import WebLogo from "../images/logo.png";
import { NavLink, Link } from "react-router-dom";
import * as HiIcons from "react-icons/hi";
import { Dialog, Transition } from "@headlessui/react";
import {
  signOut,
  signInWithEmailAndPassword,
  signInWithFacebook,
  signInWithGoogle,
  singInWithGithub,
} from "../services/FirebaseConfig";
//LocalIMG
import GgLogo from "../images/gg-icon.png";
import FbLogo from "../images/fb-icon.png";
import GhLogo from "../images/gh-icon.png";
import UserIcon from "../images/default-user.png";

export default function Tabbar({ user }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Home",
      path: "/home",
      icons: <HiIcons.HiOutlineHome size="24px" />,
    },
    {
      name: "Lesson",
      path: "/lesson",
      icons: <HiIcons.HiBookOpen size="24px" />,
    },
    {
      name: "Quiz",
      path: "/quiz",
      icons: <HiIcons.HiOutlineQuestionMarkCircle size="24px" />,
    },
    {
      name: "Canvas",
      path: "/canvas",
      icons: <HiIcons.HiOutlinePencil size="24px" />,
    },
  ];

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // Login
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const stateEmail = (event) => setEmail(event.target.value);
  const statePassword = (event) => setPassword(event.target.value);
  const [alert, setAlert] = useState(false);
  const [desc, setDesc] = useState("");
  const showAlert = (text) => {
    setAlert(true);
    setDesc(text);
  };
  const hideAlert = () => setAlert(false);

  const handleSubmit = async (event) => {
    hideAlert();
    event.preventDefault();
    if (email && password) {
      const result = await signInWithEmailAndPassword(email, password);
      if (result.res === "error") {
        showAlert(result.errMsg);
      }
    } else {
      showAlert("Please type your Email/Password information.");
    }
  };

  return (
    <aside className="sidebar-div">
      <Link to="/home">
        <div className="sidebar-logo">
          <img src={WebLogo} alt="" />
          <span>Rāningu</span>
        </div>
      </Link>
      <div className="menu-div">
        {menuItems.map((data) => {
          return (
            <NavLink activeClassName="active" to={data.path}>
              <div className="item">
                {data.icons}
                <span>{data.name}</span>
              </div>
            </NavLink>
          );
        })}
        {user ? (
          <NavLink exact activeClassName="active" to="/stats">
            <div className="item">
              <HiIcons.HiChartPie size="24px" />
              <span>Statistics</span>
            </div>
          </NavLink>
        ) : null}
      </div>
      <div className="w-full h-px bg-whitemain">&nbsp;</div>
      <div className="control-div">
        {user ? (
          <div
            className="btn-control text-bluemain bg-whitemain hidden sm:flex"
            onClick={openModal}
          >
            <button type="button">Account</button>
          </div>
        ) : (
          <div
            className="btn-control text-bluemain bg-whitemain hidden sm:flex"
            onClick={openModal}
          >
            <button type="button">Sign In</button>
          </div>
        )}
        <div
          className="btn-control text-bluemain bg-whitemain sm:hidden"
          onClick={openModal}
        >
          <HiIcons.HiOutlineUser size="24px" className="ml-1.5" />
        </div>

        {user ? (
          <div
            className="btn-control text-whitemain bg-orangemain hidden sm:flex"
            onClick={signOut}
          >
            <button type="button">Sign Out</button>
          </div>
        ) : null}
        <div className="btn-control text-whitemain bg-orangemain flex sm:hidden">
          <HiIcons.HiLogout size="24px" className="ml-1.5" />
        </div>
      </div>
      <div className="profile">
        {user ? (
          <img
            src={user.photoURL ? user.photoURL : UserIcon}
            alt="profile"
            onClick={openModal}
          />
        ) : null}
        {user ? <span>{user.displayName}</span> : null}
      </div>

      {/* ######################popup###################### */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              {user ?
                <div className="modal-pop-div">
                  {/* headTitle */}
                  <Dialog.Title as="h1">Account</Dialog.Title>
                  {/* content */}
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      <span>Email : {user.email}</span>
                    </p>
                  </div>
                  {/* button */}
                  <div className="mt-4">
                    <button
                      type="button"
                      className="clsbtn"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
                :
                <div className="modal-pop-div max-w-2xl">
                  {/* headTitle */}
                  <Dialog.Title as="h1"></Dialog.Title>
                  {/* content */}
                  <div className="mt-2">
                    <div class="mt-10 mx-8 transform">
                      <form onSubmit={handleSubmit}>
                        <div class="mb-3 pt-2 rounded bg-gray-200">
                          <label
                            class="text-gray-700 text-sm font-bold mb-1"
                            for="email"
                          >
                            Email
                          </label>
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
                            class="text-gray-700 text-sm font-bold mb-1"
                            for="password"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={statePassword}
                            class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1 "
                          />
                        </div>
                        <div class="flex justify-end">
                          <a
                            href="/"
                            class="text-sm text-whitemain hover:text-white hover:underline mb-3"
                          >
                            Forgot your password?
                          </a>
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
                        {/* Alert */}

                        <button
                          className="bg-orangemain hover:bg-lightorange hover:text-2xl text-white text-xl font-bold py-4 rounded shadow-lg hover:shadow-xl transition duration-500 w-full mb-5"
                          type="submit"
                        >
                          Sign In
                        </button>
                      </form>
                    </div>
                    <div class="max-w-lg mx-auto text-center mt-8 mb-6 text-xs sm:text-base ">
                      <p class="text-bluemain">
                        Don't have an account?{" "}
                        <Link to="/signup" class="font-bold hover:underline">
                          Sign up
                        </Link>
                        .
                      </p>
                    </div>
                    <div class="flex flex-row justify-center items-center auth-signin">
                      <img src={GgLogo} alt="gg" onClick={signInWithGoogle} />
                      <img src={FbLogo} alt="fb" onClick={signInWithFacebook} />
                      <img src={GhLogo} alt="gh" onClick={singInWithGithub} />
                    </div>
                  </div>
                  {/* button */}
                  <div className="mt-4">
                    <button
                      type="button"
                      className="clsbtn"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </div>
              }
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </aside>
  );
}
