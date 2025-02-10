import React from 'react';
import { FileText, MapPin, Users, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const LayananKami = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.5 });
  const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.5 });
  const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true, threshold: 0.5 });
  const { ref: ref4, inView: inView4 } = useInView({ triggerOnce: true, threshold: 0.5 });

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8">Layanan Kami</h2>
      <p className="text-center text-gray-600 mb-10">
        Kami menyediakan layanan terbaik untuk membantu pengaduan masyarakat dengan cepat dan transparan.
      </p>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Layanan 1 */}
        <motion.div
          ref={ref1}
          className="bg-white shadow-lg rounded-xl p-6 text-center transition-all transform hover:scale-105 hover:shadow-xl"
          variants={fadeInUp}
          initial="hidden"
          animate={inView1 ? 'visible' : 'hidden'}
          transition={{ duration: 0.5 }}
        >
          <FileText className="text-blue-500 w-10 h-10 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Pembuatan Pengaduan</h3>
          <p className="text-gray-600 mt-2">Laporkan masalah dengan mudah melalui sistem kami.</p>
        </motion.div>

        {/* Layanan 2 */}
        <motion.div
          ref={ref2}
          className="bg-white shadow-lg rounded-xl p-6 text-center transition-all transform hover:scale-105 hover:shadow-xl"
          variants={fadeInUp}
          initial="hidden"
          animate={inView2 ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MapPin className="text-purple-500 w-10 h-10 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Pelacakan Pengaduan</h3>
          <p className="text-gray-600 mt-2">Pantau status pengaduan Anda secara real-time.</p>
        </motion.div>

        {/* Layanan 3 */}
        <motion.div
          ref={ref3}
          className="bg-white shadow-lg rounded-xl p-6 text-center transition-all transform hover:scale-105 hover:shadow-xl"
          variants={fadeInUp}
          initial="hidden"
          animate={inView3 ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Users className="text-green-500 w-10 h-10 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Dukungan Masyarakat</h3>
          <p className="text-gray-600 mt-2">Bersama-sama membangun lingkungan yang lebih baik.</p>
        </motion.div>

        {/* Layanan 4 */}
        <motion.div
          ref={ref4}
          className="bg-white shadow-lg rounded-xl p-6 text-center transition-all transform hover:scale-105 hover:shadow-xl"
          variants={fadeInUp}
          initial="hidden"
          animate={inView4 ? 'visible' : 'hidden'}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Shield className="text-yellow-500 w-10 h-10 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Keamanan Data</h3>
          <p className="text-gray-600 mt-2">Data pengaduan Anda aman dengan sistem enkripsi kami.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LayananKami;
