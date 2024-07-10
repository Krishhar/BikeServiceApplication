// VehicleSelectModal.js

import React from 'react';

// VehicleSelectModal component
// This component renders a modal for selecting a vehicle
// It takes in the following props:
// - isOpen: a boolean indicating whether the modal should be open or not
// - onRequestClose: a function to close the modal
// - vehicles: an array of vehicle objects
// - onSelectVehicle: a function to handle the selection of a vehicle

const VehicleSelectModal = ({ isOpen, onRequestClose, vehicles, onSelectVehicle }) => {
    
    // If the modal is not open, don't render anything
    if (!isOpen) {
        return null;
    }

    // Render the vehicle selection modal
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            {/* Modal content */}
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                {/* Modal header */}
                <h2 className="text-xl font-bold mb-4">Select Vehicle</h2>

                {/* List of vehicles */}
                <ul>
                    {vehicles.map((vehicle) => (
                        <li key={vehicle._id} className="mb-2">
                            {/* Vehicle selection button */}
                            <button
                                onClick={() => onSelectVehicle(vehicle._id)}
                                className="bg-blue-200 p-2 w-full text-left"
                            >
                                {vehicle.brand} {vehicle.model} ({vehicle.licensePlate})
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Close button */}
                <button
                    onClick={onRequestClose}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default VehicleSelectModal