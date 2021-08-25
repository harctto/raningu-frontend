import React from 'react';
import Hiragana from '../json/hira.json'
import Katakana from '../json/kana.json'
import Tabbar from '../components/Tabbar';

function Lesson({user}) {

    return (
        <>
            <Tabbar user={user}/>
            <div className="content-container">
                <div className="flex flex-wrap flex-row">
                    {Hiragana.map((data) => {
                        return <img src={data.img} className="w-15" alt={data.read} />
                    })}
                </div>
                <div className="w-full bg-black h-2">
                    &nbsp;
                </div>
                <div className="flex flex-wrap flex-row">
                    {Katakana.map((data) => {
                        return <img src={data.img} className="w-15" alt={data.read} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Lesson