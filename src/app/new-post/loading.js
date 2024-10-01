import React from 'react';

const PremiumLoadingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="relative w-24 h-24 mb-8">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-indigo-200 rounded-full animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full border-t-4 border-indigo-500 rounded-full animate-spin"></div>
      </div>
      <h2 className="text-2xl font-bold mb-4">Loading Your Experience</h2>
      <p className="text-indigo-300 text-center max-w-md">
        Please wait while we prepare your premium content...
      </p>
    </div>
  );
};

export default PremiumLoadingPage;