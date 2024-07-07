import React from 'react'
import BikeServiceLogog from './BikeServiceLogog'

const Nav = () => {
    return (
        <>
        <section className='bg-black mt-5'>
            <div className='sm:flex justify-around sm:ml-0 ml-10'>
                <BikeServiceLogog/>
                <div className="flex space-x-4 mt-4 font-semibold">
                    <h2 className="cursor-pointer hover:text-blue-500">
                        Home
                    </h2>
                    <h2 className="cursor-pointer hover:text-blue-500">Services</h2>
                    <h2 className="cursor-pointer hover:text-blue-500">Bookings</h2>
                    <h2 className="cursor-pointer hover:text-blue-500">Reports</h2>
                </div>
            </div>
        </section>
        <div className="h-1 bg-white mt-6">
        <hr/>
      </div>
        </>
    )
}

export default Nav