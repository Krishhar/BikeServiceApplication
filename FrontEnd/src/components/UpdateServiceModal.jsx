import React, { useState, useEffect } from 'react';

const UpdateServiceModal = ({ service, isOpen, onClose, onUpdate }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        if (service) {
            setName(service.name);
            setDescription(service.description);
            setPrice(service.price);
        }
    }, [service]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedService = { name, description, price };
        onUpdate(service._id, updatedService);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center ">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <span className="close" onClick={onClose}>&times;</span>
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
