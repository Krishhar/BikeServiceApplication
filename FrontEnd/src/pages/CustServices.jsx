import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustServices = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('userInfo')));

    useEffect(() => {
        fetchServices();
    }, [user]);

    const fetchServices = async () => {
        try {
            const token = user.token; // Get token from user object
            if (!token) {
                throw new Error('No token found');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get('/api/services/customer', config);
            setBookings(data);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        }
    };

    

    return (
        <div className="p-6 bg-gray-100 text-black h-screen">
            <h1 className="text-2xl font-semibold mb-4 text-black overflow-scroll">Previous Booking Details</h1>
            <div className="bg-white rounded-lg shadow">
                <div className="flex justify-between items-center p-4 border-b">

                    <input type="text" placeholder="Search booking..." className="p-2 bg-gray-100 rounded-md" />
                </div>
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
  )
}

export default CustServices