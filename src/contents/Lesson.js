import React, { useEffect, useState } from 'react';
import Tabbar from '../components/Tabbar';
import axios from 'axios'
import MobileNav from '../components/MobileNav';
import { FcSpeaker } from "react-icons/fc";
import { useSpeechSynthesis } from 'react-speech-kit';
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
import Artboard from '../images/lesson_artboard.gif'
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
            } catch (err) {
                console.error(err);
            }
        };
        getLesson()
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <MobileNav user={user} />
            <Tabbar user={user} />
            <div className="content-container h-screen flex flex-col justify-center items-center">
                <div className="flex flex-row h-1/6 items-center overflow-auto w-4/5">
                    {lesson.length > 0 ? lesson.map((data) => {
                        return (
                            <Link to={`${url}/${data.lesson_id}`}>
                                <div className="lesson-choose-box">
                                    <span>
                                        {data.lesson_name}
                                    </span>
                                </div>
                            </Link>
                        )
                    }) : null}
                </div>
                <Switch>
                    <Route exact path={path}>
                        <div className="w-5/6 sm:flex">
                            {lesson.length > 0 ?
                                <img src={Artboard} alt="lesson_artboard" className="rounded-lg shadow-md"/>
                                :
                                <div className="loader self-center"></div>
                            }
                        </div>
                    </Route>
                    {/* if don't have lesson redirect to /lesson preventing err */}
                    <Route path={`${path}/:lessonId`}>
                        {lesson.length > 0 ? <EachLesson lesson={lesson} />
                            : <Redirect to="/lesson" />}
                    </Route>
                </Switch>
            </div>
        </>
    )
}

//lesson board
function EachLesson({ lesson }) {
    const { lessonId } = useParams();
    // speak
    const { speak, voices } = useSpeechSynthesis();
    const setJapanVoice = voices.filter(x => x.lang === 'ja-JP');
    const voice = setJapanVoice[0]
    // eslint-disable-next-line
    const [rate, setRate] = useState(0.7);

    return (
        <>
            <div className="flex flex-row flex-wrap lesson-box overflow-auto">
                {lesson ?
                    (() => {
                        if (lessonId >= 1 && lessonId <= 2)
                            return <>
                                <div className="sm:text-2xl py-5 bg-orangemain text-white w-full">
                                    Press on a word to hear the sound.
                                </div>
                                <div>
                                    {lesson[lessonId - 1].data.map((data) => {
                                        return <button onClick={() => speak({ text: data.word, voice, rate })} >
                                            <img src={data.img} className="sm:w-44 w-14" alt={data.read} />
                                        </button>
                                    })}
                                </div>
                            </>
                        else
                            return <>
                                <table className="table-auto w-full lesson-table">
                                    <thead>
                                        <tr className="bg-lightorange text-white tracking-widest sm:text-2xl text-sm">
                                            <th className="w-1/4 py-3">Word</th>
                                            <th className="w-1/4">Reading</th>
                                            <th className="w-1/4">Meaning</th>
                                            <th className="w-1/4">Voice</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lesson[lessonId - 1].data.map((data) => {
                                            return <tr>
                                                <td className="sm:text-xl text-xs font-bold py-3">{data.word}</td>
                                                <td className="sm:text-xl text-xs">{data.read}</td>
                                                <td className="sm:text-xl text-xs">{data.meaning}</td>
                                                <td><button onClick={() => speak({ text: data.word, voice, rate })} ><FcSpeaker size="36px" /></button></td>
                                            </tr>
                                        })}
                                    </tbody>
                                </table>
                            </>
                    })()
                    : <div className="loader self-center"></div>
                }
            </div>
        </>
    );
}