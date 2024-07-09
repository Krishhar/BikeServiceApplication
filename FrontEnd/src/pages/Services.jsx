import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider'; // Import the custom hook
import bin from '../assets/delete.png';
import UpdateServiceModal from '../components/UpdateServiceModal';

const Services = () => {
    const { user } = useAuth(); // Access user state from context
    const [services, setServices] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        if (user && user.token) {
            fetchServices();
        }
    }, [user]); // Fetch services when user changes

    const handlePriceChange = (event) => {
        setPrice(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
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

            const { data } = await axios.post('/api/services/', { name, description, price }, config);
            console.log(data)
            setServices([...services, data]);
            setName('');
            setDescription('');
            setPrice(0);

        } catch (error) {
            console.error('Failed to add service:', error);
            // alert('Failed to add service');
        }
    };

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

            const { data } = await axios.get('/api/services', config);
            setServices(data);
        } catch (error) {
            console.error('Failed to fetch services:', error);
            // alert('Failed to fetch services');
        }
    };

    const deleteService = async (id) => {
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
            await axios.delete(`/api/services/${id}`, config);

            // Remove the deleted service from the local state
            setServices(services.filter(service => service._id !== id));
        } catch (error) {
            console.error('Failed to delete service:', error);
            // alert('Failed to delete service');
        }
    };

    const updateService = async (id, updatedService) => {
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

            // Make PUT request to update the service by ID
            const { data } = await axios.put(`/api/services/${id}`, updatedService, config);

            // Update the service in the local state
            setServices(services.map(service => (service._id === id ? data : service)));
        } catch (error) {
            console.error('Failed to update service:', error);
            // alert('Failed to update service');
        }
    };

    const openModal = (service) => {
        setSelectedService(service);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedService(null);
        setModalOpen(false);
    };

    return (
        <>
        <div className="flex h-screen bg-gray-100 text-black">
                <div className="w-40% bg-gray-200 p-6 border-r overflow-scroll ">
                <h2 className="text-2xl font-bold mb-4">Services</h2>
                <div className="space-y-4">
                    {services.map((service) => (
                        <div key={service._id} 
                        className="bg-gray-200 p-4 rounded shadow-md shadow-black border-4 border-solid border-blue-400">
                            <div className='flex justify-between'>
                                <h3 className="font-bold text-xl">{service.name}</h3>
                                <p className="font-bold border-b-2 border-solid border-blue-400 p-1 rounded-sm">₹{service.price}</p>
                            </div>
                            <p className="text-gray-600">{service.description}</p>

                            <br />
                            <div className='flex justify-between'>
                                <button
                                    className="w-70% bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 shadow-md shadow-gray-900"
                                    onClick={() => openModal(service)}
                                >
                                    Update
                                </button>
                                <button onClick={() => deleteService(service._id)} className='shadow-sm shadow-black border-2 border-solid border-blue-600'>
                                    <img src={bin} alt='delete' height={'15px'} width={'25px'}
                                        className='cursor-pointer'
                                    />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='h-full border-solid border-2'></div>
            <div className="w-full flex flex-col items-center bg-gray-800">
                <div className="w-full max-w-md p-10 rounded-xl bg-white mt-20 shadow-lg shadow-black border-4 border-solid border-blue-700" >
                    <h1 className="text-2xl font-bold mb-2">Add Services</h1>
                    <p className="text-sm text-gray-600 mb-6 font-bold">
                        Enter the
                        <ol className="list-decimal list-inside ml-2 font-semibold">
                            <li>Name of the Service</li>
                            <li>Description of the Service</li>
                            <li>Price of the Service</li>
                        </ol>
                    </p>

                    <form className="space-y-4 border-4 border-gray-700 shadow-inner shadow-gray-700  p-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                            <input type="text" id="name" name="name" placeholder="Enter your Service name"
                                className="w-full p-2 border-2 shadow-inner shadow-black border-gray-300 rounded-md"
                                required
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea id="description" name="description" rows="4" placeholder="Write your Description..."
                                className="w-full p-2 border-2 shadow-inner shadow-black border-gray-300 rounded-md"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}></textarea>
                        </div>

                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                            <input type="range" id="price" min="0" max="1000" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full" />
                            <p className="mt-2 text-gray-700">₹ {price}</p>
                        </div>

                        <button type="submit"
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-2xl shadow-md shadow-black hover:bg-blue-700 "
                        >Add Service</button>
                    </form>
                </div>
            </div>
            <UpdateServiceModal
                service={selectedService}
                isOpen={isModalOpen}
                onClose={closeModal}
                onUpdate={updateService}
            />
        </div>
        </>
    );
};

export default Services;
