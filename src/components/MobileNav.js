import { React, useState, Fragment } from 'react';
import * as HiIcons from 'react-icons/hi';
import { NavLink, Link } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { signOut, signInWithFacebook, signInWithGoogle, singInWithGithub } from '../services/FirebaseConfig';
import GgLogo from '../images/gg-icon.png'
import FbLogo from '../images/fb-icon.png'
import GhLogo from '../images/gh-icon.png'

export default function MobileNav({ user }) {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: 'Home', path: '/home', icons: <HiIcons.HiOutlineHome size="24px" /> },
        { name: 'Lesson', path: '/lesson', icons: <HiIcons.HiBookOpen size="24px" /> },
        { name: 'Quiz', path: '/quiz', icons: <HiIcons.HiOutlineQuestionMarkCircle size="24px" /> },
        { name: 'Canvas', path: '/canvas', icons: <HiIcons.HiOutlinePencil size="24px" /> },
    ];

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleCheckInput = (e) => {
        if (user) {
            window.alert('Login successfully')
        } else {
            window.alert('Please login first')
        }
    }

    return (
        <div className="sm:hidden relative">
            <div className="w-full h-16 flex bg-bluemain items-center">
                <HiIcons.HiViewList className="ml-2 text-white" size="35px" onClick={handleClick} />
            </div>
            <ul className={click ? "nav-options active" : "nav-options"}>
                {menuItems.map((data) => {
                    return <NavLink exact activeClassName="activeMobile" to={data.path} onClick={closeMobileMenu}>
                        <div className="option">
                            {data.icons}
                            <span>{data.name}</span>
                        </div>
                    </NavLink>
                })}
                {user ? <NavLink exact activeClassName="activeMobile" to='/stats' onClick={closeMobileMenu}>
                    <div className="option">
                        <HiIcons.HiChartPie size="24px" />
                        <span>Statistics</span>
                    </div>
                </NavLink> : null}
                <div className="control-div">
                    {user ? <div className="btn-control text-bluemain bg-whitemain flex " onClick={openModal}>
                        <button type="button">
                            Account
                        </button>
                    </div>
                        :
                        <div className="btn-control text-bluemain bg-whitemain flex" onClick={openModal}>
                            <button type="button">
                                Sign In
                            </button>
                        </div>
                    }

                    {user ? <div className="btn-control text-whitemain bg-orangemain flex" onClick={signOut}>
                        <button type="button">
                            Sign Out
                        </button>
                    </div> : null}
                </div>
            </ul>
            {/* popup */}
            {user ?
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
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
                                <div className="modal-pop-div">
                                    {/* headTitle */}
                                    <Dialog.Title as="h1">
                                        Account
                                    </Dialog.Title>
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
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
                :
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        onClose={closeModal}
                    >
                        <div className="min-h-screen px-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-500"
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
                                <div className="modal-pop-div max-w-2xl">
                                    {/* headTitle */}
                                    <Dialog.Title as="h1">

                                    </Dialog.Title>
                                    {/* content */}
                                    <div className="mt-2">
                                        <div class="mt-10 mx-8 transform">
                                            <div class="mb-3 pt-2 rounded bg-gray-200">
                                                <label class="text-gray-700 text-sm font-bold mb-1" for="email">Email</label>
                                                <input type="text" id="email" class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1" />
                                            </div>
                                            <div class="mb-3 pt-2 rounded bg-gray-200">
                                                <label class="text-gray-700 text-sm font-bold mb-1" for="password">Password</label>
                                                <input type="text" id="password" class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1 " />
                                            </div>
                                            <div class="flex justify-end">
                                                <a href="/" class="text-sm text-whitemain hover:text-white hover:underline mb-3">Forgot your password?</a>
                                            </div>

                                            <Link to="/home">
                                                <button className="bg-orangemain hover:bg-lightorange hover:text-2xl text-white text-xl font-bold py-4 rounded shadow-lg hover:shadow-xl transition duration-500 w-full mb-5" type="submit" onClick={handleCheckInput}>Sign In</button>
                                            </Link>
                                        </div>
                                        <div class="max-w-lg mx-auto text-center mt-8 mb-6 text-xs sm:text-base ">
                                            <p class="text-bluemain">Don't have an account? <Link to="/signup" class="font-bold hover:underline">Sign up</Link>.</p>
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
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>
            }
        </div>

    )
}