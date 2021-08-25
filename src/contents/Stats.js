import React, { useEffect, useState } from 'react';
import Tabbar from '../components/Tabbar';

function Stats({user}) {
    const [value, setvalue] = useState(null);

    const valueFetch = () => {
        fetch('https://covid19.ddc.moph.go.th/api/Cases/today-cases-all')
            .then(response => response.json())
            .then(data => setvalue(data))
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        valueFetch();;
    })

    return (
        <>
            <Tabbar user={user}/>
            <div className="content-container h-screen">
                <div>
                    {value && value.map((data => 
                        <div className="flex flex-col">
                            <span>Last Update : {data.update_date}</span>
                            <span>New Case : {data.new_case}</span>
                            <span>Total Case : {data.total_case}</span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Stats