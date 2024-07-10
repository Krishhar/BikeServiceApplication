import React from 'react'
import '../styles/Home.css'
import bike from '../assets/bikeImg.png'
import BikeServiceLogog from '../components/BikeServiceLogog'
import { useNavigate } from 'react-router-dom'

// Home component
const Home = () => {
    // Get the navigate function from the useNavigate hook
    const navigate = useNavigate();

    // Event handlers for the sign-in and sign-up buttons
    const handleSignUp = (e) => {
        e.preventDefault()
        navigate('/register')
    }
    const handleSignIn = (e) => {
        e.preventDefault()
        navigate('/login')
    }

    // Render the home page
    return (
        <>
            {/* Navigation section */}
            <section className='bg-black mt-5'>
                <div className='sm:flex justify-around sm:ml-0 ml-10'>
                    {/* Bike service logo */}
                    <BikeServiceLogog />
                    {/* Navigation links */}
                    <div className="flex space-x-4 mt-4 font-semibold">
                        <h2 className="cursor-pointer hover:text-blue-500">
                            Home
                        </h2>
                        <h2 className="cursor-pointer hover:text-blue-500" onClick={handleSignIn}>Sign In</h2>
                        <h2 className="cursor-pointer hover:text-blue-500" onClick={handleSignUp}>Sign Up</h2>
                    </div>
                </div>
            </section>
            {/* Horizontal line separator */}
            <div className="h-0 bg-white mt-5">
                <hr />
            </div>
            {/* Main content section */}
            <div className='flex justify-center'>
                <header className="flex flex-col-reverse md:flex-row w-full sm:h-screen max-w-fit ml-10 relative overflow-x-hidden">
                    {/* Left section with content */}
                    <div className='w-full h-2/4 md:h-full md:w-2/5 flex flex-col justify-center md:items-start gap-8'>
                        <div className="flex flex-col gap-2">
                            {/* Main heading */}
                            <h1 className="text-4xl font-black md:text-8xl">BikeService</h1>
                            {/* Subheading */}
                            <h2 className="text-md md:text-2xl"> Connecting Riders and Shops 🚴‍♂️🛠️</h2>
                            {/* Description */}
                            <br />
                            <p className="max-w-md text-sm md:text-base text-zinc-500">Connect with riders, manage bookings, & grow your shop! 🏪
                                Explore our platform designed to streamline your bike service experience. 🚲</p>
                        </div>
                        {/* Sign-in and sign-up buttons */}
                        <div className="w-full flex items-center justify-center md:justify-start gap-4">
                            <button className='btn1' onClick={handleSignIn}>
                                <span className='btn2'></span>
                                <span className='btn3'></span>
                                <span className='btn4'>Sign In</span>
                            </button>
                            <button className='btn1' onClick={handleSignUp}>
                                <span className='btn2'></span>
                                <span className='btn3'></span>
                                <span className='btn4'>
                                    Sign Up
                                </span>
                            </button>
                        </div>
                    </div>
                    {/* Right section with bike image */}
                    <div className='mt-60 ml-40 sm:block hidden'>
                        <img src={bike} alt='Bike Image' height={'400px'} width={'500px'} />
                    </div>
                </header>
            </div>
        </>
    )
}

export default Home
