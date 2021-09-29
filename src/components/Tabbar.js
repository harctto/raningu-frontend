import { React, useState, Fragment } from 'react';
import WebLogo from '../images/logo.png';
import { NavLink, Link } from 'react-router-dom';
import * as HiIcons from 'react-icons/hi';
import { Dialog, Transition } from '@headlessui/react'
import { signOut } from '../services/FirebaseConfig';

function Tabbar({ user }) {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
        { name: 'Home', path: '/home', icons: <HiIcons.HiOutlineHome size="24px" /> },
        { name: 'Lesson', path: '/lesson', icons: <HiIcons.HiBookOpen size="24px" /> },
        { name: 'Quiz', path: '/quiz', icons: <HiIcons.HiOutlineQuestionMarkCircle size="24px" /> },
        { name: 'Canvas', path: '/canvas', icons: <HiIcons.HiOutlinePencil size="24px" /> },
        { name: 'Statistics', path: '/stats', icons: <HiIcons.HiChartPie size="24px" /> },
    ];

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

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
                    return <NavLink exact activeClassName="active" to={data.path} >
                        <div className="item">
                            {data.icons}
                            <span>{data.name}</span>
                        </div>
                    </NavLink>
                })}
            </div>
            <div className="w-full h-px bg-whitemain">
                &nbsp;
            </div>
            <div className="control-div">
                <div className="btn-control text-bluemain bg-whitemain hidden sm:flex" onClick={openModal}>
                    <button type="button">
                        Account
                    </button>
                </div>
                <div className="btn-control text-bluemain bg-whitemain sm:hidden" onClick={openModal}>
                    <HiIcons.HiOutlineUser size="24px" className="ml-1.5" />
                </div>
                
                    <div className="btn-control text-whitemain bg-orangemain hidden sm:flex" onClick={signOut}>
                        <button type="button">
                            Sign Out
                        </button>
                    </div>
                    <div className="btn-control text-whitemain bg-orangemain flex sm:hidden">
                        <HiIcons.HiLogout size="24px" className="ml-1.5" />
                    </div>
                
            </div>
            <div className="profile">
                <img src={user.photoURL} alt="profile" onClick={openModal} />
                <span>{user.displayName}</span>
            </div>

            {/* popup */}
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
        </aside>
    )
}

export default Tabbar