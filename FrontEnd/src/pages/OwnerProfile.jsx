import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [profile, setProfile] = useState({});

    useEffect(() => {
        // Assuming the owner's id is stored in localStorage or passed as a prop
        const ownerId = localStorage.getItem('_id'); // Replace with the actual method to get the owner's ID
        if (ownerId) {
            fetchOwnerDetails(ownerId);
        }
    }, []);

    const fetchOwnerDetails = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem('userInfo')); // Get user object from localStorage
            const token = user.token; // Get token from user object
            if (!token) {
                throw new Error('No token found');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get(`/api/owner/${_id}`, config);
            setProfile(data);
            setName(data.name);
            setEmail(data.email);
            setPhone(data.phone);
            setAddress(data.address);
        } catch (error) {
            console.error('Failed to fetch owner details:', error);
        }
    };

    return (
        <div className="p-20 bg-gray-100 text-black">
            <h1 className='text-center font-bold text-4xl'>Owner Profile Info</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg h-full w-70% text-black mt-10 mx-auto">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded-md"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <textarea
                            className="w-full p-2 border rounded-md"
                            rows="3"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        ></textarea>
                    </div>
                </div>

                <div className="mt-6 text-right">
                    <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300">
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default OwnerProfile;
