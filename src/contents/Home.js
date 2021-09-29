import React from 'react';
import Tabbar from '../components/Tabbar';
import Card from '../components/Card';
function Home({ user }) {
    return (
        <>
            <Tabbar user={user} />
            <div className="content-container home">
                <div className="flex flex-row">
                    <div className="w-full flex flex-col justify-center text-center h-screen sm:w-2/3">
                        <span className="cssanimation hu__hu__ font-semibold text-5xl text-orangemain sm:text-9xl leading-10 TiTle">ラーニング</span>
                        <div className="my-14 text-greenmain text-xs sm:text-2xl">
                            <span className="bg-white shadow-md px-4 rounded-lg font-medium sm:px-12">ようこそ！ - <span className="font-semibold">{user.displayName}</span></span>
                        </div>
                        <div className="flex sm:flex-row justify-center flex-col">
                            <Card items={'Lesson'}/>
                            <Card items={'Quiz'}/>
                            <Card items={'Canvas'}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home