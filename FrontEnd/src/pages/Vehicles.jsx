import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Vehicles component
const Vehicles = () => {
    // State variables to hold the vehicles and the form data
    const [vehicles, setVehicles] = useState([]);
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        licensePlate: '',
        color: '',
    });
    const [editingVehicle, setEditingVehicle] = useState(null);

    // Function to fetch the vehicles
    const fetchVehicles = async () => {
        try {
            // Get the user token from localStorage
            const token = JSON.parse(localStorage.getItem('userInfo')).token;

            // Set up the axios request configuration
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Make a GET request to fetch the vehicles
            const response = await axios.get('/api/vehicle', config);
            setVehicles(response.data);
        } catch (error) {
            console.error('Failed to fetch vehicles:', error);
        }
    };

    // Fetch the vehicles when the component mounts
    useEffect(() => {
        fetchVehicles();
    }, []);

    // Function to handle form data changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Get the user token from localStorage
            const token = JSON.parse(localStorage.getItem('userInfo')).token;

            // Set up the axios request configuration
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            if (editingVehicle) {
                // Update the existing vehicle
                const response = await axios.put(`/api/vehicle/${editingVehicle._id}`, formData, config);
                setVehicles(vehicles.map(vehicle => (vehicle._id === editingVehicle._id ? response.data : vehicle)));
                setEditingVehicle(null);
            } else {
                // Add a new vehicle
                const response = await axios.post('/api/vehicle', formData, config);
                setVehicles([...vehicles, response.data]);
            }

            // Reset the form data
            setFormData({
                brand: '',
                model: '',
                year: '',
                licensePlate: '',
                color: '',
            });

            // Display a success message
            alert('Added vehicle successfully');
        } catch (error) {
            console.error('Failed to save vehicle:', error);
        }
    };

    // Function to handle vehicle editing
    const handleEdit = (vehicle) => {
        setEditingVehicle(vehicle);
        setFormData({
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            licensePlate: vehicle.licensePlate,
            color: vehicle.color,
        });
    };

    // Function to handle vehicle deletion
    const handleDelete = async (vehicleId) => {
        try {
            // Get the user token from localStorage
            const token = JSON.parse(localStorage.getItem('userInfo')).token;

            // Set up the axios request configuration
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Make a DELETE request to delete the vehicle
            await axios.delete(`/api/vehicle/${vehicleId}`, config);
            setVehicles(vehicles.filter(vehicle => vehicle._id !== vehicleId));

            // Display a success message
            alert("Deleted vehicle successfully");
        } catch (error) {
            console.error('Failed to delete vehicle:', error);
        }
    }

// Render the Vehicles component
    return (
        <div className="flex text-black h-screen bg-white">
            {/* Sidebar to view added vehicles */}
            <div className="w-40% bg-gray-200 p-4 m-6 border-4 border-blue-300 mb-40 overflow-y-scroll scroll-smooth">
                <h2 className="text-xl font-bold mb-4">My Vehicles</h2>
                <ul className="space-y-4">
                    {vehicles.map((vehicle) => (
                        <li key={vehicle._id}>
                            <div className="bg-white rounded-lg shadow-inner shadow-black border-4 border-blue-200 p-6 flex justify-between items-center">
                                <div className="flex-grow">
                                    <h3 className="text-xl font-semibold mb-3">{vehicle.brand} {vehicle.model}</h3>
                                    <div className="space-y-2 text-gray-600">
                                        <p><span className="font-medium">Year:</span> {vehicle.year}</p>
                                        <p><span className="font-medium">License Plate:</span> {vehicle.licensePlate}</p>
                                        <p><span className="font-medium">Color:</span> {vehicle.color}</p>
                                    </div>
                                    <div className="flex mt-4 space-x-3 ">
                                        <button
                                            className="bg-blue-600 text-white shadow-md border-2 border-blue-300 p-2 shadow-gray-700 px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300"
                                            onClick={() => handleEdit(vehicle)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-600 text-white shadow-md border-2 border-red-300 p-2 shadow-gray-700 px-4 py-2 rounded-full font-medium hover:bg-red-700 transition duration-300"
                                            onClick={() => handleDelete(vehicle._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center ml-6">
                                    <div className="text-5xl mb-2 shadow-inner shadow-black border-8 border-double border-blue-300 bg-blue-600 py-1 hover:bg-black">
                                        { '🏍️'}{'🧑‍🔧'}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Form to add or update a vehicle */}
            <div className="w-3/4 p-4 mx-20 mb-40 mt-6 shadow-inner shadow-gray-700">
                <h2 className="text-xl font-extrabold mb-4">{editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full p-2 border-4 border-blue-500 rounded-xl bg-blue-100 shadow-inner shadow-gray-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold">Model</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            className="w-full p-2 border-4 border-blue-500 rounded-xl bg-blue-100 shadow-inner shadow-gray-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold">Year</label>
                        <input
                            type="text"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full p-2 rounded-xl bg-blue-100 border-4 border-blue-500 shadow-inner shadow-gray-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold">License Plate</label>
                        <input
                            type="text"
                            name="licensePlate"
                            value={formData.licensePlate}
                            onChange={handleChange}
                            className="w-full p-2 border-4 border-blue-500 rounded-xl bg-blue-100 shadow-inner shadow-gray-600"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold">Color</label>
                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className="w-full p-2 rounded-xl bg-blue-100 shadow-inner border-4 border-blue-500 shadow-gray-600"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white border-4 border-blue-200 px-4 py-2 rounded shadow-md shadow-gray-500"
                    >
                        {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Vehicles;
