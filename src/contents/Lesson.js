import React, { useEffect, useState } from 'react';
import Tabbar from '../components/Tabbar';
import axios from 'axios'
import MobileNav from '../components/MobileNav';
import {
    // eslint-disable-next-line
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useRouteMatch,
    Redirect
} from "react-router-dom";
const Lesson_API = 'https://raningu-api.glitch.me/data/lessons';

//export to app
export default function Lesson({ user }) {
    const [lesson, setLesson] = useState([]);
    let { path, url } = useRouteMatch();

    useEffect(() => {
        const getLesson = async () => {
            try {
                const res = await axios.get(Lesson_API);
                setLesson(res.data)
                console.log(lesson)
            } catch (err) {
                console.error(err);
            }
        };
        getLesson()
        console.log(lesson);
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <MobileNav user={user} />
            <Tabbar user={user} />
            <div className="content-container h-screen flex flex-col justify-center items-center">
                <div className="flex flex-row h-1/6 items-center">
                    {lesson.length > 0 ? lesson.map((data) => {
                        return (
                            <Link to={`${url}/${data.lesson_id}`}>
                                <div className="lesson-choose-box">
                                    {data.lesson_name}
                                </div>
                            </Link>
                        )
                    }) : null}
                </div>
                <Switch>
                    <Route exact path={path}>
                        <div className="lesson-box">
                            {lesson.length > 0 ?
                                <span className="text-xl sm:text-4xl">Please select a lesson <br /> (แปะชั่วคราว ตรงนี้เป็น Artwork gif animation)</span>
                                :
                                <div class="loader"></div>
                            }
                        </div>
                    </Route>
                    {/* if don't have lesson redirect to /lesson preventing err */}
                    <Route path={`${path}/:lessonId`}>
                        {lesson.length > 0 ? <EachLesson lesson={lesson} />
                        : <Redirect to="/lesson"/>}
                    </Route>
                </Switch>
            </div>
        </>
    )
}

//lesson board
function EachLesson({ lesson }) {
    const { lessonId } = useParams();

    return (
        <>
            <div className="flex flex-row flex-wrap lesson-box overflow-auto">
                {lesson ? lesson[lessonId - 1].data.map((data) => {
                    return <img src={data.img} className="w-20" alt={data.read} />
                }) : <div class="loader"></div>}
            </div>
        </>
    );
}