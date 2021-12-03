import React, { useEffect, useState } from 'react';
import Tabbar from '../components/Tabbar';
import MobileNav from '../components/MobileNav';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
const Quiz_Log = "https://raningu-api.glitch.me/log/get_quiz_log"

// convert function of date to String -> 2021-Dec-03
const toStringWithDate = (date) => {
    const dateparse = new Date(date)
    const stringdate = dateparse.toString()
    const array = stringdate.split(" ");
    return `${[array[3], array[1], array[2]].join("-")} [${array[4]}]`
}

export default function Stats({ user }) {
    // eslint-disable-next-line
    const [logData, setLogData] = useState([]);
    // quiz 1
    const [lebels1, setLebels1] = useState([]);
    const [data1, setData1] = useState([]);
    // quiz2
    const [lebels2, setLebels2] = useState([]);
    const [data2, setData2] = useState([]);
    // quiz3
    const [lebels3, setLebels3] = useState([]);
    const [data3, setData3] = useState([]);

    useEffect(() => {
        if (user) {
            const getLog = async () => {
                try {
                    const res = await axios.post(Quiz_Log, {
                        uid: user.uid
                    })
                    setLogData(res.data)
                    // push data metohd
                    var lebels1_array = []
                    var data1_array = []
                    var lebels2_array = []
                    var data2_array = []
                    var lebels3_array = []
                    var data3_array = []
                    // eslint-disable-next-line
                    res.data.map((data) => {
                        if (data.quiz_name === "Quiz 1 : Alphabet") {
                            lebels1_array.push(toStringWithDate(data.date))
                            data1_array.push(data.score)
                        }
                        else if (data.quiz_name === "Quiz 2 : Colors") {
                            lebels2_array.push(toStringWithDate(data.date))
                            data2_array.push(data.score)
                        }
                        else if (data.quiz_name === "Quiz 3 : Greetings") {
                            lebels3_array.push(toStringWithDate(data.date))
                            data3_array.push(data.score)
                        }
                    })
                    setLebels1(lebels1_array)
                    setData1(data1_array)
                    setLebels2(lebels2_array)
                    setData2(data2_array)
                    setLebels3(lebels3_array)
                    setData3(data3_array)
                } catch (err) {
                    console.error(err);
                }
            }
            getLog();
        }
    }, [user])
    // option for charts
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                min: 0,
                max: 15,
                stepSize: 1
            }
        }
    }

    // charts for quiz 1
    const dataQuiz1 = {
        labels: lebels1,
        datasets: [
            {
                label: 'Quiz 1 : Hiragana',
                data: data1,
                backgroundColor: [
                    '#FE6849',
                    '#ff8269',
                    '#6078d6',
                    '#406341',
                ],
            },
        ],
    };

    // charts for quiz 2
    const dataQuiz2 = {
        labels: lebels2,
        datasets: [
            {
                label: 'Quiz 2 : Colors',
                data: data2,
                backgroundColor: [
                    '#FE6849',
                    '#ff8269',
                    '#6078d6',
                    '#406341',
                ],
            },
        ],
    };

    // charts for quiz 3
    const dataQuiz3 = {
        labels: lebels3,
        datasets: [
            {
                label: 'Quiz 3 : Greetings',
                data: data3,
                backgroundColor: [
                    '#FE6849',
                    '#ff8269',
                    '#6078d6',
                    '#406341',
                ],
            },
        ],
    };

    return (
        <>
            <MobileNav user={user} />
            <Tabbar user={user} />
            <div className="content-container h-full">
                {/* quiz 1 */}
                <div>
                    <Bar
                        data={dataQuiz1}
                        height={400}
                        options={options}
                    />
                </div>
                {/* quiz 2 */}
                <div>
                    <Bar
                        data={dataQuiz2}
                        height={400}
                        options={options}
                    />
                </div>
                {/* quiz 3 */}
                <div>
                    <Bar
                        data={dataQuiz3}
                        height={400}
                        options={options}
                    />
                </div>
            </div>
        </>
    )
}