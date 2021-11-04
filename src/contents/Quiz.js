import Tabbar from '../components/Tabbar'
import MobileNav from '../components/MobileNav';
// eslint-disable-next-line
import React, { useState, useEffect } from 'react'

export default function Quiz({ user }) {

    return (
        <>
            <MobileNav user={user} />
            <Tabbar user={user} />
            <div className="content-container h-screen flex justify-center items-center flex-col">
                
            </div>
        </>
    )
}