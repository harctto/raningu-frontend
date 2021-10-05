import React, { useEffect, useState } from 'react';
import Tabbar from '../components/Tabbar';
import axios from 'axios'
import MobileNav from '../components/MobileNav';
const Lesson_API = 'https://raningu-api-v2.herokuapp.com/lessons/all_lessons';

function Lesson({ user }) {
    const [l1, setl1] = useState([])
    const [l2, setl2] = useState([])

    const getLesson = async () => {
        try {
            const res = await axios.get(Lesson_API);
            setl1(res.data[0].data)
            setl2(res.data[1].data)
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getLesson()
    }, [])

    return (
        <>
            <MobileNav user={user} />
            <Tabbar user={user} />
            <div className="content-container h-screen">
                <div className="flex flex-wrap flex-row">
                    {l1.map((data) => {
                        return <img src={data.img} className="w-16" alt={data.read} />
                    })}
                </div>
                <div className="w-full bg-black h-2">
                    &nbsp;
                </div>
                <div className="flex flex-wrap flex-row">
                    {l2.map((data) => {
                        return <img src={data.img} className="w-16" alt={data.read} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Lesson