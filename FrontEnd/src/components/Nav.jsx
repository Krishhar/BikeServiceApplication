import React from 'react'
import BikeServiceLogog from './BikeServiceLogog'

// Nav component
const Nav = () => {
    // Render the navigation bar
    return (
        <>
            {/* Section for the navigation bar */}
            <section className='bg-black mt-5'>
                {/* Container for the logo and navigation links */}
                <div className='sm:flex justify-around sm:ml-0 ml-10'>
                    {/* Render the BikeServiceLogog component */}
                    <BikeServiceLogog />

                    {/* Container for the navigation links */}
                    <div className="flex space-x-4 mt-4 font-semibold">
                        {/* Navigation link for the Home page */}
                        <h2 className="cursor-pointer hover:text-blue-500">
                            Home
                        </h2>

                        {/* Navigation link for the Services page */}
                        <h2 className="cursor-pointer hover:text-blue-500">Services</h2>

                        {/* Navigation link for the Bookings page */}
                        <h2 className="cursor-pointer hover:text-blue-500">Bookings</h2>

                        {/* Navigation link for the Reports page */}
                        <h2 className="cursor-pointer hover:text-blue-500">Reports</h2>
                    </div>
                </div>
            </section>

            {/* Horizontal line separator */}
            <div className="h-1 bg-white mt-6">
                <hr />
            </div>
        </>
    )
}

export default Nav