import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify'; 

const CustomerLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.warn("Fill all Fields", {
                position: "bottom-right",
                autoClose: 6000,
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                }
            };

            const userData = {
                email,
                password,
            };

            const { data } = await axios.post(
                "/api/customer/login",
                userData,
                config
            );

            toast.success("Login successful", {
                position: "bottom-right",
                autoClose: 6000,
            });

            navigate('/customerPage');
        } catch (err) {
            toast.error(`Error Occurred! ${err.response?.data?.message || err.message}`, {
                position: "bottom-right",
                autoClose: 5000,
            });
        }
    }
  return (
      <div className="login-page">
          <div className="login-section customer-login">
                  <div className="ebook-container">
                  <h2>BIKERS</h2>
                  <h1>Your Bike's Best Friend</h1>
                  <p>
                      Keep your ride in top shape with easy service bookings, maintenance reminders, and expert care from local bike shops. Never miss a tune-up and enjoy smoother rides year-round.
                  </p>
                  <button>Find a Shop</button>
                  
              </div>
          </div>
          <div className="login-section owner-login">
              <div className="login-container">
              <h2 className='text-3xl text-green-900'>Login</h2>
                  <p>to Bike Service for Customers</p>
                  <input
                      type="email"
                      placeholder="Your work email"
                      onChange={(e)=>{setEmail(e.target.value)}}
                  />
                  <input
                      type="password"
                      placeholder="Your Password"
                      onChange={(e)=>{setPassword(e.target.value)}}
                  />
                  <button onClick={handleLogin}>Login</button>
                  </div>
          </div>
      </div>
  )
}

export default CustomerLoginForm