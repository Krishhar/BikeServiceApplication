import React from 'react';
import OwnerLogin from '../components/OwnerLogin';
import CustomerLogin from '../components/CustomerLogin';
import '../styles/Login.css';
import BikeServiceLogog from '../components/BikeServiceLogog';
import OwnerLoginForm from '../components/OwnerLoginForm';
import CustomerLoginForm from '../components/CustomerLoginForm';

const Login = () => {
    return (
        <>
            <div className='p-5 flex justify-between bg-gray-200'>
                <BikeServiceLogog />
            </div>
            <div className="login-page">
                <div className="login-section" style={{ backgroundColor: '#56c35a1f' }}>
                    <OwnerLogin />
                </div>
                <div className="login-section">
                    <CustomerLogin />
                </div>
            </div>
            {/* <OwnerLoginForm/> */}
            {/* <CustomerLoginForm/> */}
        </>
    );
};

export default Login;
