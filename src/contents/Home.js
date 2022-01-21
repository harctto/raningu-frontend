import React from 'react';
import Tabbar from '../components/Tabbar';
import MobileNav from '../components/MobileNav';
import Card from '../components/Card';  
import { NavLink } from 'react-router-dom';

export default function Home({ user }) {

    return (
        <>
            <MobileNav user={user} />
            <Tabbar user={user} />
            <div className="content-container home">
                <div className="flex flex-row">
                    <div className="w-full flex flex-col justify-center text-center h-screen sm:w-2/3">
                        <span className="cssanimation hu__hu__ font-semibold text-5xl text-orangemain sm:text-9xl leading-10 TiTle">ラーニング</span>
                        <div className="my-14 text-greenmain text-xs sm:text-2xl">
                            <span className="bg-white shadow-md px-4 rounded-lg font-medium sm:px-12">ようこそ！</span>
                        </div>
                        <div className="flex lg:flex-row justify-center flex-col">
                            <NavLink to="/lesson" className="mx-0 sm:mx-4">
                                <Card items={'Lesson'} />
                            </NavLink>
                            <NavLink to="/quiz" className="mx-0 sm:mx-4">
                                <Card items={'Quiz'} />
                            </NavLink>
                            <NavLink to="/canvas" className="mx-0 sm:mx-4">
                                <Card items={'Canvas'} />
                            </NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
