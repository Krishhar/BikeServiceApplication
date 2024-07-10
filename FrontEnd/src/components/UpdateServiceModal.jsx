import React, { useState, useEffect } from 'react';

// UpdateServiceModal component
// This component renders a modal for updating a service
// It takes in the following props:
// - service: the current service object
// - isOpen: a boolean indicating whether the modal should be open or not
// - onClose: a function to close the modal
// - onUpdate: a function to update the service

const UpdateServiceModal = ({ service, isOpen, onClose, onUpdate }) => {

    // State variables to hold the updated service data
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    // When the service prop changes, update the state variables
    useEffect(() => {
        if (service) {
            setName(service.name);
            setDescription(service.description);
            setPrice(service.price);
        }
    }, [service]);

    // Handle the form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedService = { name, description, price };
        onUpdate(service._id, updatedService);
        onClose();
    };

    // If the modal is not open, don't render anything
    if (!isOpen) return null;

    // Render the modal
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <span className="close cursor-pointer" onClick={onClose}>&times;</span>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name*</label>
                        <input type="text" id="name" name="name" placeholder="Enter your Service name"
                            className="w-full p-2 border border-gray-300 rounded-md" required
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea id="description" name="description" rows="4" placeholder="Write your Description..."
                            className="w-full p-2 border border-gray-300 rounded-md"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>

                    <div>
                        <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input type="range" id="price" min="0" max="1000" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full" />
                        <p className="mt-2 text-gray-700">₹ {price}</p>
                    </div>

                    <button type="submit"
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >Update Service</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateServiceModal;
