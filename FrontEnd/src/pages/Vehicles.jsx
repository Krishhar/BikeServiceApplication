import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [formData, setFormData] = useState({
        brand: '',
        model: '',
        year: '',
        licensePlate: '',
        color: '',
    });
    const [editingVehicle, setEditingVehicle] = useState(null);

    const fetchVehicles = async () => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.get('/api/vehicle', config);
            setVehicles(response.data);
        } catch (error) {
            console.error('Failed to fetch vehicles:', error);
        }
    };

    useEffect(() => {
        fetchVehicles();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            if (editingVehicle) {
                // Update vehicle
                const response = await axios.put(`/api/vehicle/${editingVehicle._id}`, formData, config);
                setVehicles(vehicles.map(vehicle => (vehicle._id === editingVehicle._id ? response.data : vehicle)));
                setEditingVehicle(null);
            } else {
                // Add new vehicle
                const response = await axios.post('/api/vehicle', formData, config);
                setVehicles([...vehicles, response.data]);
            }

            setFormData({
                brand: '',
                model: '',
                year: '',
                licensePlate: '',
                color: '',
            });

            alert('Added vehicle sudccesfully')
        } catch (error) {
            console.error('Failed to save vehicle:', error);
        }
    };

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

    const handleDelete = async (vehicleId) => {
        try {
            const token = JSON.parse(localStorage.getItem('userInfo')).token;
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            await axios.delete(`/api/vehicle/${vehicleId}`, config);
            setVehicles(vehicles.filter(vehicle => vehicle._id !== vehicleId));

            alert("deleted vehicle successfully")
        } catch (error) {
            console.error('Failed to delete vehicle:', error);
        }
    };

    return (
        <div className="flex text-black h-screen">
            {/* Sidebar to view added vehicles */}
            <div className="w-40% bg-gray-200 p-4 m-6">
                <h2 className="text-xl font-bold mb-4">My Vehicles</h2>
                <ul className="space-y-4">
                    {vehicles.map((vehicle) => (
                        <li key={vehicle._id}>
                            <div className="bg-white rounded-lg shadow-md p-6 flex justify-between items-center">
                                <div className="flex-grow">
                                    <h3 className="text-xl font-semibold mb-3">{vehicle.brand} {vehicle.model}</h3>
                                    <div className="space-y-2 text-gray-600">
                                        <p><span className="font-medium">Year:</span> {vehicle.year}</p>
                                        <p><span className="font-medium">License Plate:</span> {vehicle.licensePlate}</p>
                                        <p><span className="font-medium">Color:</span> {vehicle.color}</p>
                                    </div>
                                    <div className="flex mt-4 space-x-3">
                                        <button
                                            className="bg-blue-600 text-white px-4 py-2 rounded-full font-medium hover:bg-blue-700 transition duration-300"
                                            onClick={() => handleEdit(vehicle)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition duration-300"
                                            onClick={() => handleDelete(vehicle._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center ml-6">
                                    <div className="text-5xl mb-2">
                                        { '🏍️'}
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Form to add or update a vehicle */}
            <div className="w-3/4 p-4">
                <h2 className="text-xl font-bold mb-4">{editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Model</label>
                        <input
                            type="text"
                            name="model"
                            value={formData.model}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Year</label>
                        <input
                            type="text"
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">License Plate</label>
                        <input
                            type="text"
                            name="licensePlate"
                            value={formData.licensePlate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Color</label>
                        <input
                            type="text"
                            name="color"
                            value={formData.color}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Vehicles;
