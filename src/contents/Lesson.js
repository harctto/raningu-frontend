import React from 'react';
import LessonAPI from '../json/LessonAPI.json';
import Tabbar from '../components/Tabbar';
import Card from '../components/Card';

function Lesson({ user }) {

    return (
        <>
            <Tabbar user={user} />
            <div className="content-container h-screen">
                <span>Example Word</span>
                <div className="flex flex-wrap flex-row">
                    {LessonAPI.hira.map((data) => {
                        return <img src={data.img} className="w-16" alt={data.read} />
                    })}
                </div>
                <div className="w-full bg-black h-2">
                    &nbsp;
                </div>
                <div className="flex flex-wrap flex-row">
                    {LessonAPI.kana.map((data) => {
                        return <img src={data.img} className="w-16" alt={data.read} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Lesson