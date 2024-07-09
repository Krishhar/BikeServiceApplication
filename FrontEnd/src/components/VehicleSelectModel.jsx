// VehicleSelectModal.js

import React from 'react';

const VehicleSelectModal = ({ isOpen, onRequestClose, vehicles, onSelectVehicle }) => {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Select Vehicle</h2>
                <ul>
                    {vehicles.map((vehicle) => (
                        <li key={vehicle._id} className="mb-2">
                            <button
                                onClick={() => onSelectVehicle(vehicle._id)}
                                className="bg-blue-200 p-2 w-full text-left"
                            >
                                {vehicle.brand} {vehicle.model} ({vehicle.licensePlate})
                            </button>
                        </li>
                    ))}
                </ul>
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

export default VehicleSelectModal;
