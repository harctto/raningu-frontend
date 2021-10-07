import React from 'react'
import Tabbar from '../components/Tabbar'

function Quiz({user}) {
    return (
        <>
            <Tabbar user={user} />
            <div className="content-container h-screen justify-center flex items-center text-lg sm:text-9xl">
                Quiz In process....
            </div>
        </>
    )
}

export default Quiz
