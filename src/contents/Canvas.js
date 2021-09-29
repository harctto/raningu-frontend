import React from 'react';
import Tabbar from '../components/Tabbar';

function Canvas({ user }) {
    return (
        <>
            <Tabbar user={user} />
            <div className="content-container h-screen justify-center flex items-center text-lg sm:text-9xl">
                Canvas In process....
            </div>
        </>
    )
}

export default Canvas