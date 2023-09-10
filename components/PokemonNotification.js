// PokemonNotification.js

import React from 'react';

const PokemonNotification = ({ showNotification, onClose }) => {
  if (!showNotification) {
    return null; // Don't render the notification if showNotification is false
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-red-500 rounded-lg p-8 max-w-md text-center text-white">
        <p className="text-3xl font-bold mb-2">Oops! Wrong Answer!</p>
        <p className="text-xl">Try again and catch 'em all!</p>
        <button
          onClick={onClose}
          className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-full text-sm font-semibold transition duration-300 ease-in-out"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PokemonNotification;
