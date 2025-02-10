import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const TentangKami = () => {
  return (
   <div>
    <Navbar/>
     <div className="p-10 text-center h-screen">
      <h2 className="text-3xl font-bold text-blue-600">Tentang Kami</h2>
      <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
        Kita Bicarakan adalah platform pengaduan masyarakat yang bertujuan untuk memberikan
        kemudahan dalam menyampaikan aspirasi dan keluhan kepada pihak berwenang dengan
        transparan dan akuntabel.
      </p>
    </div>
    <Footer/>
   </div>
  );
};

export default TentangKami;
