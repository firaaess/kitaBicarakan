import React from "react";
import { LucideUserCheck, LucideClipboardList, LucideSend, LucideCheckCircle } from "lucide-react";

const TataCaraPengaduan = () => {
  return (
    <div className="flex flex-col items-center p-6 md:p-10 bg-white min-h-screen text-gray-900">
      <h1 className="text-2xl md:text-3xl font-extrabold text-indigo-700 drop-shadow-lg text-center">Tata Cara Membuat Pengaduan</h1>
      <p className="text-base md:text-lg mt-4 max-w-2xl text-center text-gray-600">
        Ikuti langkah-langkah berikut untuk mengajukan pengaduan dengan mudah dan cepat.
      </p>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full max-w-6xl">
        <div className="p-6 md:p-8 bg-gray-100 rounded-xl shadow-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <LucideUserCheck className="text-purple-600 w-12 md:w-16 h-12 md:h-16" />
          <h2 className="text-lg md:text-xl font-bold mt-4 text-center">1. Daftar atau Masuk</h2>
          <p className="text-gray-700 mt-2 text-center text-sm md:text-base">
            Buat akun baru atau masuk untuk mulai mengajukan pengaduan.
          </p>
        </div>
        <div className="p-6 md:p-8 bg-gray-100 rounded-xl shadow-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <LucideClipboardList className="text-blue-600 w-12 md:w-16 h-12 md:h-16" />
          <h2 className="text-lg md:text-xl font-bold mt-4 text-center">2. Isi Form Pengaduan</h2>
          <p className="text-gray-700 mt-2 text-center text-sm md:text-base">
            Masukkan informasi pengaduan dengan jelas, termasuk lokasi dan deskripsi masalah.
          </p>
        </div>
        <div className="p-6 md:p-8 bg-gray-100 rounded-xl shadow-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <LucideSend className="text-yellow-600 w-12 md:w-16 h-12 md:h-16" />
          <h2 className="text-lg md:text-xl font-bold mt-4 text-center">3. Kirim Pengaduan</h2>
          <p className="text-gray-700 mt-2 text-center text-sm md:text-base">
            Setelah mengisi form, kirim pengaduan Anda untuk diproses oleh petugas terkait.
          </p>
        </div>
        <div className="p-6 md:p-8 bg-gray-100 rounded-xl shadow-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <LucideCheckCircle className="text-green-600 w-12 md:w-16 h-12 md:h-16" />
          <h2 className="text-lg md:text-xl font-bold mt-4 text-center">4. Tunggu Penanganan</h2>
          <p className="text-gray-700 mt-2 text-center text-sm md:text-base">
            Pengaduan akan ditinjau dan Anda akan menerima pemberitahuan setelah ada tindak lanjut.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TataCaraPengaduan;
