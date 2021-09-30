import React, { useEffect, useState } from 'react';
import Tabbar from '../components/Tabbar';
import axios from 'axios'
const LessonURL_1 = 'https://raningu-api.herokuapp.com/lessons/lesson1';
const LessonURL_2 = 'https://raningu-api.herokuapp.com/lessons/lesson2';

function Lesson({ user }) {
    const [lesson1, setLesson1] = useState([])
    const [lesson2, setLesson2] = useState([])

    useEffect(() => {
        axios.get(LessonURL_1).then(res => {
            setLesson1(res.data)
        });
        axios.get(LessonURL_2).then(res => {
            setLesson2(res.data)
        });
    },[])

    return (
        <>
            <Tabbar user={user} />
            <div className="content-container h-screen">
                <span>Example Word</span>
                <div className="flex flex-wrap flex-row">
                    {lesson1.map((data) => {
                        return <img src={data.img} className="w-16" alt={data.read} />
                    })}
                </div>
                <div className="w-full bg-black h-2">
                    &nbsp;
                </div>
                <div className="flex flex-wrap flex-row">
                    {lesson2.map((data) => {
                        return <img src={data.img} className="w-16" alt={data.read} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Lesson