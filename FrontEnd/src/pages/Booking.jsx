import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Booking = () => {
    // State variables to hold bookings, user, filtered bookings, filter status, and error message
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('userInfo')));
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch bookings when the component mounts
    useEffect(() => {
        fetchBookings();
    }, []);

    // Function to fetch bookings
    const fetchBookings = async () => {
        try {
            // Get token from user object
            const token = user.token;

            // If no token found, throw an error
            if (!token) {
                throw new Error('No token found');
            }

            // Set up axios request configuration
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Make GET request to fetch bookings
            const { data } = await axios.get('/api/bookings/owner', config);

            // Set the bookings and filtered bookings in the local state
            setBookings(data);
            setFilteredBookings(data);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
        }
    };

    // Function to handle booking status change
    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            // Get token from user object
            const token = user.token;

            // Set up axios request configuration
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Find the booking to be updated
            const updatedBooking = bookings.find(booking => booking._id === bookingId);

            // If booking not found, set an error message
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

            // Make PUT request to update the booking status
            await axios.put(`/api/bookings/owner/${bookingId}`, { status: newStatus }, config);

            // Update the bookings and filtered bookings state with the new status
            setBookings(prevBookings => prevBookings.map(booking =>
                booking._id === bookingId ? { ...booking, status: newStatus } : booking
            ));
            setFilteredBookings(prevBookings => prevBookings.map(booking =>
                booking._id === bookingId ? { ...booking, status: newStatus } : booking
            ));

            // If the new status is 'ready for delivery', send an email to the user
            if (newStatus === 'ready for delivery') {
                alert("Email sent to user")
            }

            // Clear the error message if the update is successful
            setErrorMessage('');
        } catch (error) {
            console.error('Failed to update booking status:', error);
            setErrorMessage('Failed to update booking status');
        }
    };

    // Function to handle filter change
    const handleFilterChange = (status) => {
        // Update the filter status
        setFilterStatus(status);

        // If the status is 'all', set the filtered bookings to the full list
        if (status === 'all') {
            setFilteredBookings(bookings);
        }
        // Otherwise, filter the bookings based on the selected status
        else {
            setFilteredBookings(bookings.filter(booking => booking.status === status));
        }
    }

    // Function to handle booking cancellation
    const handleCancelBooking = async (bookingId) => {
        try {
            // Get token from user object
            const token = user.token;

            // If no token found, throw an error
            if (!token) {
                throw new Error('No token found');
            }

            // Set up axios request configuration
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Make DELETE request to cancel the booking
            await axios.delete(`/api/bookings/owner/${bookingId}`, config);

            // Remove the canceled booking from the local state
            setBookings(bookings.filter((booking) => booking._id !== bookingId));

            // Display an alert message
            alert('Booking canceled successfully');
        } catch (error) {
            console.error('Failed to cancel booking:', error);
            alert("Failed to cancel booking");
        }
    };


// Render the booking component

    return (
        <div className="p-6 bg-gray-100 text-black h-screen overflow-scroll">
            <h1 className="text-2xl font-semibold mb-4 text-black">Booking Details</h1>
            <div className="bg-white rounded-lg shadow">
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
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Loop through the filtered bookings and render a table row for each one */}
                            {filteredBookings.map((booking, index) => (
                                <tr key={index} className="border-t">
                                    {/* Table cell for the customer information */}
                                    <td className="py-4">
                                        <div>
                                            {/* Customer name */}
                                            <p className="font-medium">{booking.customerId.name}</p>
                                            <br />
                                            {/* Date booked */}
                                            <p className="text-xs text-gray-500">
                                                Booked on {new Date(booking.date).toISOString().split('T')[0]}
                                            </p>
                                        </div>
                                    </td>
                                    {/* Table cell for the service name */}
                                    <td>{booking.serviceId.name}</td>
                                    {/* Table cell for the vehicle information */}
                                    <td>
                                        <div className="flex items-center">
                                            {/* Vehicle license plate */}
                                            {booking.vehicleId?.licensePlate || 'N/A'}
                                        </div>
                                    </td>
                                    {/* Table cell for the customer phone number */}
                                    <td>{booking.customerId.ph}</td>
                                    {/* Table cell for the booking status */}
                                    <td>
                                        <span className={`px-2 py-1 rounded-full text-xs ${booking.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    {/* Table cell for the status select dropdown */}
                                    <td>
                                        <select
                                            value={booking.status}
                                            onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                                            className="px-2 py-1 rounded-full text-xs"
                                        >
                                            {/* Options for the status select dropdown */}
                                            <option value="pending">Pending</option>
                                            <option value="ready for delivery">ready for delivery</option>
                                            <option value="completed">completed</option>
                                        </select>
                                    </td>
                                    <td>
                                        {booking.status === 'pending' && (
                                            <button
                                                className="text-red-600"
                                                onClick={() => handleCancelBooking(booking._id)}
                                            >
                                                Cancel
                                            </button>
                                        )}
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

export default Booking;
