import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { signInWithFacebook, signInWithGoogle, singInWithGithub } from '../services/FirebaseConfig';
//LocalIMG
import Logo from '../images/logo192.png'
import GgLogo from '../images/gg-icon.png'
import FbLogo from '../images/fb-icon.png'
import GhLogo from '../images/gh-icon.png'

//export
function Signin({ user }) {
    const history = useHistory();

    const [email, setKeep] = useState('');

    const handleInput = (e) => {
        setKeep(e.target.value)
    }

    const handleCheckInput = (e) => {
        if (user) {
            history.push("/home");
        } else {
            window.alert('Please login first')
        }
    }

    useEffect(() => {
        if (user) {
            setKeep(user.email);
        } else {
            setKeep('Login system is in process');
        }
    }, [user])

    return (
        <div class="flex flex-center items-center justify-center bg-bluemain overflow-hidden h-screen">
            <div className="flex justify-center flex-col body-bg h-screen pt-12 md:pt-0 pb-6 px-2 md:px-0 w-full sm:w-1/2 mt-4">
                <header class="max-w-lg mx-auto text-center">
                    <section class="flex justify-center items-center flex-col">
                        <img src={Logo} class="w-28 sm:w-52 md:w-52 xl:w-52" alt="logo" />
                        <span class="font-bold text-2xl text-white sm:text-4xl">Welcome to Rāningu</span>
                        <p class="text-whitemain mt-2 text-xs sm:text-base">Sign in to your account.</p>
                    </section>
                </header>
                <div class="mt-10 mx-8 transform">
                    <div class="mb-3 pt-2 rounded bg-gray-200">
                        <label class="text-gray-700 text-sm font-bold mb-1 ml-3 hidden sm:block" for="email">Email</label>
                        <input type="text" id="email-big" class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1 hidden sm:block" value={email} onChange={handleInput} defaultValue={'In process. . .'} required disabled />
                        <input type="text" id="email-small" class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1 block sm:hidden" placeholder="Email" value={email} onChange={handleInput} defaultValue={null} required disabled />
                    </div>
                    <div class="mb-3 pt-2 rounded bg-gray-200">
                        <label class="text-gray-700 text-sm font-bold mb-1 ml-3 hidden sm:block" for="password">Password</label>
                        <input type="text" id="password-big" class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1 hidden sm:block" value='Please login with Google, Facebook or Github first' disabled />
                        <input type="text" id="password-small" class="bg-gray-200 rounded w-full text-gray-400 focus:outline-none border-b-8 border-gray-300 focus:border-orangemain focus:mx-4 transition duration-500 px-3 pb-1 block sm:hidden" placeholder="Password" value='Please login with Google, Facebook or Github first' disabled />
                    </div>
                    <div class="flex justify-end">
                        <a href="/" class="text-sm text-whitemain hover:text-white hover:underline mb-3">Forgot your password?</a>
                    </div>

                    <Link to="/home">
                        <button class="bg-orangemain hover:bg-lightorange hover:text-2xl text-white text-xl font-bold py-4 rounded shadow-lg hover:shadow-xl transition duration-500 w-full" type="submit" onClick={handleCheckInput}>Sign In</button>
                    </Link>
                </div>

                <div class="max-w-lg mx-auto text-center mt-8 mb-6 text-xs sm:text-base ">
                    <p class="text-white">Don't have an account? <Link to="/signup" class="font-bold hover:underline">Sign up</Link>.</p>
                </div>

                <div class="flex flex-row justify-center items-center auth-signin">
                    <img src={GgLogo} alt="gg" onClick={signInWithGoogle} />
                    <img src={FbLogo} alt="fb" onClick={signInWithFacebook} />
                    <img src={GhLogo} alt="gh" onClick={singInWithGithub} />
                </div>
            </div>
        </div>
    )
}

export default Signin