import Tabbar from '../components/Tabbar'
import MobileNav from '../components/MobileNav';
// eslint-disable-next-line
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/Card'
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
const Quiz_API = "https://raningu-api.glitch.me/data/quiz"
const Quiz_Log = "https://raningu-api.glitch.me/log/quiz_log"


export default function Quiz({ user }) {
    const [quiz, setQuiz] = useState([]);
    let { path, url } = useRouteMatch();

    useEffect(() => {
        const getQuiz = async () => {
            try {
                const res = await axios.get(Quiz_API);
                setQuiz(res.data)
            } catch (err) {
                console.error(err);
            }
        };
        getQuiz()
    }, [])

    return (
        <>
            <MobileNav user={user} />
            <Tabbar user={user} />
            <div className="content-container h-screen flex justify-center items-center flex-col">
                <Switch>
                    <Route exact path={path}>
                        <div className="quiz-choose-box">
                            {quiz.length > 0 ?
                                quiz.map((data) => {
                                    return (
                                        <Link to={`${url}/${data.quiz_id}`} className="text-2xl sm:mx-4">
                                            <Card items={data.quiz_name} />
                                        </Link>
                                    )
                                })
                                :
                                <div className="loader"></div>
                            }
                        </div>
                    </Route>
                    {/* if don't have quiz redirect to /quiz preventing err */}
                    <Route path={`${path}/:quizId`}>
                        {quiz.length > 0 ? <EachQuiz quiz={quiz} user={user} />
                            : <Redirect to="/quiz" />}
                    </Route>
                </Switch>
            </div>
        </>
    )
}

function EachQuiz({ quiz, user }) {
    const { quizId } = useParams();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    // eslint-disable-next-line
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quiz[0].questions.length) {
            setCurrentQuestion(nextQuestion);
        } 
        
        // post to log api
        if (nextQuestion + 1 === quiz[0].questions.length) {
            if (user) {
                (async () => {
                    await axios.post(Quiz_Log, {
                        uid: user.uid,
                        date: Date.now(),
                        quiz_name: quiz[quizId - 1].quiz_name,
                        score: score
                    })
                  })();
            }
        }
    };

    return (
        <>
            <div className="flex flex-row flex-wrap quiz-box overflow-auto">
                {quiz.length > 0 ? (() => {
                    if ((currentQuestion + 1) === quiz[0].questions.length) {
                        return <div className='score-section'>
                            You scored {score} out of {quiz[quizId - 1].questions.length}
                            <Link to={'/quiz'}>
                                <div className="bg-orangemain rounded-xl my-2 duration-500 py-3 px-5">
                                    back
                                </div>
                            </Link>
                        </div>
                    }
                    else {
                        return <div className="quiz-box">
                            <div className='question-section'>
                                You scored {score} out of {quiz[quizId - 1].questions.length}
                                <div className='question-count'>
                                    <span>Question {currentQuestion + 1}</span>/{quiz[quizId - 1].questions.length}
                                </div>
                                <div className='question-text'>
                                    {quiz[quizId - 1].questions[currentQuestion].questionText}
                                </div>
                            </div>
                            <div className="answer-section">
                                {quiz[quizId - 1].questions[currentQuestion].answerOptions.map((answerOption) => (
                                    <button
                                        onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                                    >
                                        {answerOption.answerText}
                                    </button>
                                ))}
                            </div>
                        </div>
                    }
                })() : (
                    <div className="loader"></div>
                )}
            </div>
        </>
    );
}