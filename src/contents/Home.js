import React from 'react';
import Tabbar from '../components/Tabbar';

function Home({user}) {
    return (
        <>
            <Tabbar user={user} />
            <div className="content-container">
                <h1>
                    
                </h1>
            </div>
        </>
    )
}

export default Home