import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [profile, setProfile] = useState({});

    useEffect(() => {
        const customerId = localStorage.getItem('_id');
        if (customerId) {
            fetchcustomerDetails(customerId);
        }
    }, []);

    const fetchcustomerDetails = async (id) => {
        try {
            const user = JSON.parse(localStorage.getItem('userInfo'));
            const token = user.token;
            if (!token) {
                throw new Error('No token found');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await axios.get(`/api/customers/${id}`, config);
            setProfile(data);
            setName(data.name);
            setEmail(data.email);
            setPhone(data.phone);
        } catch (error) {
            console.error('Failed to fetch customer details:', error);
        }
    };

    const updatecustomerDetails = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('userInfo'));
            const token = user.token;
            if (!token) {
                throw new Error('No token found');
            }

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const updatedProfile = {
                name,
                email,
                phone
            };

            const { data } = await axios.put(`/api/customers/${profile._id}`, updatedProfile, config);
            setProfile(data);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Failed to update customer details:', error);
        }
    };

    return (
        <div className="p-20 bg-gray-100 text-black">
            <h1 className='text-center font-bold text-4xl'>customer Profile Info</h1>
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

                </div>

                <div className="mt-6 text-right">
                    <button
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                        onClick={updatecustomerDetails}
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerProfile;
