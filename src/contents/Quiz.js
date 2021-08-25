import React, { useState } from 'react';
import Tabbar from '../components/Tabbar';
import { Link } from 'react-router-dom'

function Quiz({user}) {
    const [text, setText] = useState('')
    console.log(text)
    const handleInput = (e) => {
        setText(e.target.value)
    }
    const handleClick = () => {
        console.log('fsdfds' + { text })
    }
    return (
        <>
            <Tabbar user={user}/>
            <div className="content-container">
                <input type="text" onChange={e => handleInput(e)}></input>
                <Link to={{ pathname: '/canvas', state: { name: {text} } }} onClick={handleClick}>
                    ddsfasfd
                </Link>
            </div>
        </>
    )
}

export default Quiz