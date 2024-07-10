import React, { useEffect, useState } from 'react';
import axios from 'axios';

// CustServices component
const CustServices = () => {
    // State variables to hold the bookings and the user information
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('userInfo')));

    // Fetch the services when the component mounts or the user changes
    useEffect(() => {
        fetchServices();
    }, [user]);

    // Function to fetch the services
    const fetchServices = async () => {
        try {
            // Get the token from the user object
            const token = user.token;

            // If no token is found, throw an error
            if (!token) {
                throw new Error('No token found');
            }

            // Set up the axios request configuration
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Make a GET request to fetch the customer's bookings
            const { data } = await axios.get('/api/services/customer', config);
            setBookings(data);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        }
    };

    // Render the CustServices component
    return (
        <div className="p-6 bg-gray-100 text-black h-screen">
            {/* Section title */}
            <h1 className="text-2xl font-semibold mb-4 text-black overflow-scroll">Previous Booking Details</h1>
            <div className="bg-white rounded-lg shadow">
                {/* Search input */}
                <div className="flex justify-between items-center p-4 border-b">
                    <input type="text" placeholder="Search booking..." className="p-2 bg-gray-100 rounded-md" />
                </div>
                {/* Bookings table */}
                <div className="p-4">
                    <p className="text-gray-500 mb-4">{bookings.length} documents</p>
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-gray-500">
                                <th className="py-2">Owner Name</th>
                                <th>Service</th>
                                <th>Vehicle</th>
                                <th>Phone</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Map through the bookings and render a table row for each one */}
                            {bookings.map((booking, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <div>
                                                <p className="font-medium">{booking.ownerId.name}</p>
                                                <p className="text-xs text-gray-500">
                                                    Booked on {new Date(booking.date).toISOString().split('T')[0]}
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>{booking.serviceId.name}</td>
                                    <td>
                                        <div className="flex items-center">
                                            {booking.vehicleId.licensePlate}
                                        </div>
                                    </td>
                                    <td>{booking.ownerId.ph}</td>
                                    <td>
                                        <span className={`px-2 py-1 rounded-full text-xs ${booking.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default CustServices
