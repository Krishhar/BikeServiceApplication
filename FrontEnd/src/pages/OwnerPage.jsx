import React, { useEffect, useState } from 'react';
import Services from './Services';
import BikeServiceLogo from '../components/BikeServiceLogog'; // Corrected spelling
import Booking from './Booking';
import OwnerProfile from './OwnerProfile';

// OwnerPage component
const OwnerPage = () => {
  // State variable to keep track of the selected section
  const [selectedSection, setSelectedSection] = useState('services');

  // Load the selected section from localStorage on component mount
  useEffect(() => {
    try {
      // Retrieve the selected section from localStorage
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

  // Function to handle user logout
  const logOut = () => {
    // Remove user information and selected section from localStorage
    localStorage.removeItem('userInfo');
    localStorage.removeItem('selectedSection');
    // Clear any other session-related data
    window.location.href = '/login'; // Redirect to login page
  };

  // Render the owner page
  return (
    <div>
      {/* Navigation section */}
      <section className="bg-gray-50 text-black p-5">
        <div className="sm:flex justify-around sm:ml-0 ml-10">
          {/* Bike service logo */}
          <BikeServiceLogo />
          {/* Navigation links */}
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
      {/* Horizontal line separator */}
      <div className="h-1 bg-black">
        <hr />
      </div>
      {/* Content section */}
      <div>
        {/* Render the appropriate section based on the selected section */}
        {selectedSection === 'services' && <Services />}
        {selectedSection === 'bookings' && <Booking />}
        {selectedSection === 'profile' && <OwnerProfile />}
      </div>
    </div>
  );
};

export default OwnerPage;
