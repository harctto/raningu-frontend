import React from 'react'

export default function Card({items}) {
    return (
        <div className="lg:mx-2 lg:px-16 lg:py-36 text-white bg-greenmain rounded-xl transform duration-500 cursor-pointer shadow-md hover:scale-110 mx-4 my-2 py-10">
            {items}
        </div>
    )
}
