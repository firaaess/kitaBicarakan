import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 px-6 flex justify-between items-center">
      <h1 className="text-lg font-semibold">Kita<span className="text-green-500">Bicarakan</span></h1>
      <p className="text-sm text-gray-400">© {new Date().getFullYear()} KitaBicarakan. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
