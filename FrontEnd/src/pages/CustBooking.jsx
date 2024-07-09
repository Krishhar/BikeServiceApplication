import React, { useEffect, useState } from 'react';
import axios from 'axios';
import VehicleSelectModal from '../components/VehicleSelectModel';

const CustBooking = () => {
    const [services, setServices] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('userInfo')));
    const [searchTerm, setSearchTerm] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedServiceId, setSelectedServiceId] = useState(null);

    const handleSubmit = async (vehicle) => {
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

            if (!bookingDate) {
                alert('Please select a booking date');
                return;
            }

            const { data } = await axios.post('/api/bookings/', {
                serviceId: selectedServiceId,
                date: bookingDate,
                vehicleId: vehicle._id
            }, config);
            console.log(data);
            setBookings([...bookings, data]);

            alert('Booked service successfully');
        } catch (error) {
            console.error('Failed to book service:', error);
            alert('Failed to book service');
        }
        setIsModalOpen(false);
    };

    useEffect(() => {
        fetchServices();
        fetchBookings();
        fetchVehicles();
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

            // Fetch the 6 services with the lowest price
            const { data } = await axios.get('/api/services/lowest-price', config);
            setServices(data);
        } catch (error) {
            console.error('Failed to fetch services:', error);
            alert('Failed to fetch Services');
        }
    };

    const fetchVehicles = async () => {
        try {
            const token = user.token;
            if (!token) {
                throw new Error('No token found');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get('/api/vehicle', config);
            setVehicles(data);
        } catch (error) {
            console.error('Failed to fetch vehicles:', error);
            alert('Failed to fetch vehicles');
        }
    };

    const handleSearch = async () => {
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

            // Fetch services based on the search term
            const { data } = await axios.get(`/api/services/search?query=${searchTerm}`, config);

            setServices(data);
        } catch (error) {
            console.error('Failed to fetch services:', error);
            alert('Failed to fetch Services');
        }
    };

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

            const { data } = await axios.get('/api/bookings/', config);
            const sortedBookings = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setBookings(sortedBookings);
            filterBookings(sortedBookings);
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
            alert('Failed to fetch bookings');
        }
    };

    const filterBookings = (bookingsData) => {
        const filteredData = bookingsData.filter((booking) => booking.status !== 'completed');
        setFilteredBookings(filteredData);
    };

    const deleteBooking = async (id) => {
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

            // Make DELETE request to delete the service by ID
            await axios.delete(`/api/bookings/${id}`, config);

            // Remove the deleted service from the local state
            setBookings(bookings.filter(booking => booking._id !== id));

            alert('Booking Deleted');
        } catch (error) {
            console.error('Failed to delete Booking:', error);
            alert('Failed to delete Booking');
        }
    };

    const openModal = (serviceId) => {
        setSelectedServiceId(serviceId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleSelectVehicle = (vehicle) => {
        handleSubmit(vehicle);
    };

    return (
        <div className="p-6 w-full bg-gray-100 h-screen flex text-black">
            <div className="w-30% bg-gray-200 p-6 border-r overflow-y-auto scrollbar-hide">
                <h2 className="text-2xl font-bold mb-4">Bookings</h2>
                <div className="space-y-4 shadow-inner shadow-gray-600 p-4 border-4 border-blue-200">
                    {filteredBookings.map((booking) => (
                        <div key={booking._id}
                            className="bg-gray-200 p-5 rounded shadow-lg shadow-gray-500 border-4 border-solid border-blue-400">
                            <div className='flex justify-between mb-4'>
                                <p className="text-gray-600">Service Name: {booking.serviceId.name}</p>
                                <p className="font-bold border-b-2 border-solid border-blue-400 p-1 rounded-sm">₹{booking.serviceId.price}</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className="text-gray-600">Booked Date: {new Date(booking.date).toISOString().split('T')[0]}</p>
                                <p className={`text-gray-600 font-semibold ${booking.status === 'pending' ? 'text-red-500' : booking.status === 'ready for delivery' ? 'text-purple-500' : 'text-green-500'}`}>{booking.status}</p>
                            </div>

                            <br />
                            <div className='flex justify-between'>
                                <button onClick={() => deleteBooking(booking._id)} className='shadow-md shadow-gray-800 border-2 border-solid border-blue-200 bg-blue-400 p-1 rounded-xl text-white'>
                                    Cancel Booking
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-66% overflow-y-auto scrollbar-hide'>
                <div className="mb-6 flex items-center space-x-4 pl-6 justify-between">
                    <h1 className='text-3xl font-bold text-blue-900'>Services Available</h1>
                    <div className='space-x-4 px-5'>
                        <input
                            type="text"
                            placeholder="Search services"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="p-2 border rounded shadow-inner shadow-gray-400"
                        />
                        <button
                            onClick={handleSearch}
                            className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-sm shadow-black">
                            Search
                        </button>
                    </div>
                </div>

                <div className="mb-4 flex justify-between items-center pl-6">
                    <p className="text-sm text-gray-600">Showing {services.length} services</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-6 overflow-scroll m-3 p-3">
                    {services.map((service, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-md shadow-gray-700 border-2 border-blue-300">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg">{service.name}</h3>
                                    <p className="text-sm text-gray-600">{service.description}</p>
                                </div>
                                <div className="text-gray-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm text-gray-600">Price</span>
                                <span className="font-bold text-blue-500">Rs. {service.price}</span>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-600 text-sm mb-2" htmlFor={`date-${index}`}>
                                    Booking Date
                                </label>
                                <input
                                    type="date"
                                    id={`date-${index}`}
                                    className="p-2 border rounded w-full shadow-inner shadow-gray-400"
                                    onChange={(e) => setBookingDate(e.target.value)}
                                />
                            </div>
                            <button
                                className="w-full bg-blue-200 text-blue-600 font-bold border-2 border-blue-100 py-2 rounded-2xl shadow-md shadow-gray-400"
                                onClick={() => openModal(service._id)}
                            >Book Now</button>
                        </div>
                    ))}
                </div>
            </div>
            <VehicleSelectModal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                vehicles={vehicles}
                onSelectVehicle={handleSelectVehicle}
            />
        </div>
    );
};

export default CustBooking;
