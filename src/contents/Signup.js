// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
// eslint-disable-next-line
import { Link, useHistory } from 'react-router-dom'
//LocalIMG
import Logo from '../images/logo192.png'

//export
export default function SignUp({ user }) {

    const handleCheckInput = (e) => {
        if (user) {
            
        } else {
            window.alert('Please enter all the information')
        }
    }

    useEffect(() => {

    })

    return (
        <div class="flex flex-center items-center justify-center bg-bluemain overflow-hidden h-screen">
            <div className="flex justify-center flex-col body-bg h-screen pt-12 md:pt-0 pb-6 px-2 md:px-0 w-full sm:w-1/2 mt-4">
                <header class="max-w-lg mx-auto text-center">
                    <section class="flex justify-center items-center flex-col">
                        <img src={Logo} class="w-28 sm:w-52 md:w-52 xl:w-52" alt="logo" />
                        <span class="font-bold text-2xl text-white sm:text-4xl">Welcome to Rāningu</span>
                        <p class="text-whitemain mt-2 text-xs sm:text-base">Sign up your account.</p>
                    </section>
                </header>
                <div class="mt-10 mx-8 transform">
                    <div class="mb-3 pt-2 rounded bg-gray-200">
                        <label class="text-gray-700 text-sm font-bold mb-1 ml-4" for="email">Username</label>
                        <input type="text" id="username" class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1" />
                    </div>
                    <div class="mb-3 pt-2 rounded bg-gray-200">
                        <label class="text-gray-700 text-sm font-bold mb-1 ml-4" for="email">Email</label>
                        <input type="text" id="email" class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1" />
                    </div>
                    <div class="mb-3 pt-2 rounded bg-gray-200">
                        <label class="text-gray-700 text-sm font-bold mb-1 ml-4" for="password">Password</label>
                        <input type="text" id="password" class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1" />
                    </div>
                    <div class="mb-3 pt-2 rounded bg-gray-200">
                        <label class="text-gray-700 text-sm font-bold mb-1 ml-4" for="password">Confirm Password</label>
                        <input type="text" id="confirm_password" class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1" />
                    </div>
                    <div class="max-w-lg mx-auto text-center my-5 text-xs sm:text-base ">
                        <p class="text-white">Already have an account ? <Link to="/home" class="font-bold hover:underline">Go back</Link>.</p>
                    </div>
                    <button class="bg-orangemain hover:bg-lightorange hover:text-2xl text-white text-xl font-bold py-4 rounded shadow-lg hover:shadow-xl transition duration-500 w-full" type="submit" onClick={handleCheckInput}>Sign Up</button>
                </div>
            </div>
        </div>
    )
}
