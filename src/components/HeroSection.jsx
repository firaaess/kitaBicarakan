import React from 'react';
import { Button } from './ui/button';
import heroBg from '@/assets/herobg.jpg';

const HeroSection = () => {
  return (
    <div className="text-center h-[500px] bg-cover bg-center flex flex-col justify-center items-center relative"style={{ backgroundImage: `url(${heroBg})` }}>
      {/* Konten */}
      <div className="relative z-10 flex flex-col gap-5 px-4">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          Kita Bicarakan untuk Perubahan
        </span>
        <h1 className="text-5xl font-bold text-black">Sampaikan Masalah Anda,<br /> Wujudkan <span className="text-[#231563]">Solusi Bersama!</span></h1>
        <p className="text-sm">Lewat Kita Bicarakan, aspirasi Anda didengar dan ditindaklanjuti. Bersama, mari menciptakan perubahan nyata.</p>
      </div>
    </div>
  );
};

export default HeroSection;
