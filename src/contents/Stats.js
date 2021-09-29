import React, { useEffect, useState } from 'react';
import Tabbar from '../components/Tabbar';
import axios from 'axios';
const API_URL = 'https://covid19.ddc.moph.go.th/api/Cases/today-cases-by-provinces'

function Stats({ user }) {
    const [value, setValue] = useState([]);

    useEffect(() => {
        axios.get(API_URL).then(res => {
            setValue(res.data);
        });
    }, [])

    return (
        <>
            <Tabbar user={user} />
            <div className="content-container">
                <span className="text-2xl">Test API Call with COVID API</span>
                <table className="table-fixed">
                    <thead className=" bg-blue-300">
                        <tr>
                            <th className="w-2/5">Provinces</th>
                            <th className="w-1/5">New Case</th>
                            <th className="w-1/5">Total Case</th>
                        </tr>
                    </thead>
                    {value && value.map((data =>
                        <tbody className="bg-blue-100">
                            <tr>
                                <td>{data.province}</td>
                                <td>{data.new_case}</td>
                                <td>{data.total_case}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </>
    )
}

export default Stats