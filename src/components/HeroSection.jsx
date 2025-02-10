import React from 'react';
import { Button } from './ui/button';
import heroBg from '@/assets/herobg.jpg';
import { motion } from 'framer-motion';

const HeroSection = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      className="text-center h-[500px] bg-cover bg-center flex flex-col justify-center items-center relative"
      style={{ backgroundImage: `url(${heroBg})` }}
    >
      {/* Konten */}
      <div className="relative z-10 flex flex-col gap-5 px-4">
        <motion.span
          className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Kita Bicarakan untuk Perubahan
        </motion.span>
        <motion.h1
          className="text-5xl font-bold text-black"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Sampaikan Masalah Anda,<br /> Wujudkan <span className="text-[#231563]">Solusi Bersama!</span>
        </motion.h1>
        <motion.p
          className="text-sm"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Lewat Kita Bicarakan, aspirasi Anda didengar dan ditindaklanjuti. Bersama, mari menciptakan perubahan nyata.
        </motion.p>
      </div>
    </div>
  );
};

export default HeroSection;
