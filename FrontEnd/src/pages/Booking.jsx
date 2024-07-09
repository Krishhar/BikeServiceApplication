import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('userInfo')));
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [errorMessage, setErrorMessage] = useState('');
    const [emailMsg, setEmailMsg] = useState('');

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
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

            const { data } = await axios.get('/api/bookings/owner', config);
            setBookings(data);
            setFilteredBookings(data);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        }
    };

    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            const token = user.token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const updatedBooking = bookings.find(booking => booking._id === bookingId);
            if (!updatedBooking) {
                setErrorMessage('Booking not found');
                return;
            }

            // Prevent editing if current status is 'completed'
            if (updatedBooking.status === 'completed') {
                setErrorMessage('Cannot edit a completed booking');
                return;
            }

            // Ensure 'completed' status can only come after 'ready for delivery'
            if (newStatus === 'completed' && updatedBooking.status !== 'ready for delivery') {
                setErrorMessage('Cannot mark as completed before marking as ready for delivery');
                alert('Cannot mark as completed before marking as ready for delivery');
                return;
            }

            await axios.put(`/api/bookings/owner/${bookingId}`, { status: newStatus }, config);

            // Update the bookings state with the new status
            setBookings(prevBookings => prevBookings.map(booking =>
                booking._id === bookingId ? { ...booking, status: newStatus } : booking
            ));
            setFilteredBookings(prevBookings => prevBookings.map(booking =>
                booking._id === bookingId ? { ...booking, status: newStatus } : booking
            ));

            if(newStatus === 'ready for delivery'){
                alert("Email sent to user")
            }

            // Clear the error message if update is successful
            setErrorMessage('');
        } catch (error) {
            console.error('Failed to update booking status:', error);
            setErrorMessage('Failed to update booking status');
        }
    };

    const handleFilterChange = (status) => {
        setFilterStatus(status);
        if (status === 'all') {
            setFilteredBookings(bookings);
        } else {
            setFilteredBookings(bookings.filter(booking => booking.status === status));
        }
    };

    return (
        <div className="p-6 bg-gray-100 text-black h-screen overflow-scroll">
            <h1 className="text-2xl font-semibold mb-4 text-black">Booking Details</h1>
            <div className="bg-white rounded-lg shadow ">
                <div className="flex justify-between items-center p-4 border-b">
                    <div className="space-x-4">
                        <button
                            className={`font-medium ${filterStatus === 'all' ? 'text-blue-600' : 'text-gray-500'}`}
                            onClick={() => handleFilterChange('all')}
                        >
                            All
                        </button>
                        <button
                            className={`${filterStatus === 'pending' ? 'text-blue-600' : 'text-gray-500'}`}
                            onClick={() => handleFilterChange('pending')}
                        >
                            Pending
                        </button>
                        <button
                            className={`${filterStatus === 'ready for delivery' ? 'text-blue-600' : 'text-gray-500'}`}
                            onClick={() => handleFilterChange('ready for delivery')}
                        >
                            ready for delivery
                        </button>
                        <button
                            className={`${filterStatus === 'completed' ? 'text-blue-600' : 'text-gray-500'}`}
                            onClick={() => handleFilterChange('completed')}
                        >
                            completed
                        </button>
                    </div>

                    <input type="text" placeholder="Search booking..." className="p-2 bg-gray-100 rounded-md" />
                </div>
                <div className="p-4">
                    <p className="text-gray-500 mb-4">{bookings.length} documents</p>
                    <table className="w-full overflow-scroll">
                        <thead>
                            <tr className="text-left text-gray-500">
                                <th className="py-2">Customer Name</th>
                                <th>Service</th>
                                <th>Vehicle</th>
                                <th>Phone</th>
                                <th>Status</th>
                                <th>Update Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBookings.map((booking, index) => (
                                <tr key={index} className="border-t">
                                    <td className="py-4">
                                        <div className="flex items-center">
                                            <div>
                                                <p className="font-medium">{booking.customerId.name}</p>
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
                                    <td>{booking.customerId.ph}</td>
                                    <td>
                                        <span className={`px-2 py-1 rounded-full text-xs ${booking.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td>
                                        <select
                                            value={booking.status}
                                            onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                            className="px-2 py-1 rounded-full text-xs"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="ready for delivery">ready for delivery</option>
                                            <option value="completed">completed</option>
                                        </select>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {errorMessage && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4" role="alert">
                            <span className="block sm:inline">{errorMessage}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Booking;
