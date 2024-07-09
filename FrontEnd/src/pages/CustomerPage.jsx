import React, { useEffect, useState } from 'react';
import BikeServiceLogo from '../components/BikeServiceLogog'; // Corrected spelling
import CustServices from './CustServices';
import CustBooking from './CustBooking';
import Vehicles from './Vehicles';
import CustomerProfile from './CustomerProfile';

const CustomerPage = () => {
  const [selectedSection, setSelectedSection] = useState('bookings');

  // Load the selected section from localStorage on component mount
  useEffect(() => {
    try {
      const savedSection = localStorage.getItem('selectedSection');
      if (savedSection) {
        setSelectedSection(savedSection);
      }
    } catch (error) {
      console.error('Error fetching from localStorage:', error);
    }
  }, []);

  // Save the selected section to localStorage whenever it changes
  const handleSectionChange = (section) => {
    setSelectedSection(section);
    localStorage.setItem('selectedSection', section);
  };

  const logOut = () => {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('selectedSection');
    // Clear any other session-related data
    window.location.href = '/login'; // Redirect to login page
  };

  return (
    <div className='bg-white h-screen'>
      <section className="bg-gray-50 text-black p-5">
        <div className="sm:flex justify-around sm:ml-0 ml-10">
          <BikeServiceLogo />
          <div className="flex space-x-4 mt-4 font-semibold">
            <h2
              className="cursor-pointer hover:text-blue-500"
              onClick={() => handleSectionChange('bookings')}
            >
              Bookings
            </h2>
            <h2
              className="cursor-pointer hover:text-blue-500"
              onClick={() => handleSectionChange('services')}
            >
              Services
            </h2>
            {/* Uncomment if needed */}
            <h2
              className="cursor-pointer hover:text-blue-500"
              onClick={() => handleSectionChange('vehicles')}
            >
              Vehicles
            </h2>
            <h2
              className="cursor-pointer hover:text-blue-500"
              onClick={() => handleSectionChange('profile')}
            >
              Profile
            </h2>
            <h2
              className="cursor-pointer hover:text-blue-500"
              onClick={() => logOut()}
            >
              Logout
            </h2>
          </div>
        </div>
      </section>
      <div className="h-1 bg-black mt-4">
        <hr />
      </div>
      <div>
        {selectedSection === 'services' && <CustServices />}
        {selectedSection === 'bookings' && <CustBooking />}
        {selectedSection === 'vehicles' && <Vehicles/>}
        {/* Render Reports Section if uncommented */}
        {/* {selectedSection === 'reports' && <div>Reports Section</div>} */}
        {selectedSection === 'profile' && <CustomerProfile/>}
      </div>
    </div>
  );
};

export default CustomerPage;
