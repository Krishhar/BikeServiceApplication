import React, { useEffect, useState } from 'react';
import axios from 'axios';

// OwnerProfile component
const OwnerProfile = () => {
    // State variables to hold owner information
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);

    // Fetch owner details when the component mounts
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo && userInfo._id) {
            fetchOwnerDetails(userInfo._id);
        }
    }, []);

    // Function to fetch owner details
    const fetchOwnerDetails = async (id) => {
        try {
            // Get the user token from localStorage
            const user = JSON.parse(localStorage.getItem('userInfo'));
            const token = user.token;

            // If no token found, throw an error
            if (!token) {
                throw new Error('No token found');
            }

            // Set up the axios request configuration
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Make a GET request to fetch the owner details
            const { data } = await axios.get(`/api/owner/${id}`, config);
            setProfile(data);
            setName(data.name);
            setEmail(data.email);
            setPhone(data.ph);
            setAddress(data.address);
        } catch (error) {
            console.error('Failed to fetch owner details:', error);
        } finally {
            setLoading(false);
        }
    };

    // Function to update owner details
    const updateOwnerDetails = async () => {
        try {
            // Get the user token from localStorage
            const user = JSON.parse(localStorage.getItem('userInfo'));
            const token = user.token;

            // If no token found, throw an error
            if (!token) {
                throw new Error('No token found');
            }

            // Set up the axios request configuration
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            // Create the updated profile object
            const updatedProfile = {
                name,
                email,
                phone,
                address
            };

            // Make a PUT request to update the owner details
            const { data } = await axios.put(`/api/owner/${profile._id}`, updatedProfile, config);
            setProfile(data);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Failed to update owner details:', error);
        }
    };

    // Render the owner profile component
    return (
        <div className="p-20 bg-gray-100 text-black">
            <h1 className='text-center font-bold text-4xl'>Owner Profile Info</h1>
            {loading ? (
                <div className="text-center">Loading...</div>
            ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg h-full w-70% text-black mt-10 mx-auto">
                    <div className="space-y-4">
                        {/* Name input field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        {/* Email input field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Phone input field */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                            <input
                                type="text"
                                className="w-full p-2 border rounded-md"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>

                        {/* Address textarea */}
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

                    {/* Save changes button */}
                    <div className="mt-6 text-right">
                        <button
                            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                            onClick={updateOwnerDetails}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OwnerProfile;
