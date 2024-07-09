import React, { useEffect, useState } from 'react';
import Services from './Services';
import BikeServiceLogo from '../components/BikeServiceLogog'; // Corrected spelling
import Booking from './Booking';
import OwnerProfile from './OwnerProfile';

const OwnerPage = () => {
  const [selectedSection, setSelectedSection] = useState('services');

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
    <div>
      <section className="bg-gray-50 text-black p-5">
        <div className="sm:flex justify-around sm:ml-0 ml-10">
          <BikeServiceLogo />
          <div className="flex space-x-4 mt-4 font-semibold">
            <h2
              className="cursor-pointer hover:text-blue-500"
              onClick={() => handleSectionChange('services')}
            >
              Services
            </h2>
            <h2
              className="cursor-pointer hover:text-blue-500"
              onClick={() => handleSectionChange('bookings')}
            >
              Bookings
            </h2>
            {/* Uncomment if needed */}
            {/* <h2
              className="cursor-pointer hover:text-blue-500"
              onClick={() => handleSectionChange('reports')}
            >
              Reports
            </h2> */}
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
      <div className="h-1 bg-black">
        <hr />
      </div>
      <div>
        {selectedSection === 'services' && <Services />}
        {selectedSection === 'bookings' && <Booking />}
        {/* Render Reports Section if uncommented */}
        {/* {selectedSection === 'reports' && <div>Reports Section</div>} */}
        {selectedSection === 'profile' && <OwnerProfile />}
      </div>
    </div>
  );
};

export default OwnerPage;
