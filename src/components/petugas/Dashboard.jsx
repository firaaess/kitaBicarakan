import React from "react";
import { LucideCheckCircle, LucideAlertCircle, LucideInfo } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex-1 p-6 text-center bg-gradient-to-r from-blue-500 to-indigo-600 min-h-screen flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-extrabold drop-shadow-lg">Selamat Datang, Petugas!</h1>
      <p className="text-lg mt-2 max-w-2xl">Anda telah masuk ke dashboard petugas aplikasi pengaduan masyarakat. Gunakan menu navigasi di sebelah kiri untuk mengelola dan menanggapi pengaduan yang telah diterima.</p>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
        <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg flex flex-col items-center">
          <LucideCheckCircle className="text-green-500 w-12 h-12" />
          <h2 className="text-xl font-semibold mt-4">Pengaduan Selesai</h2>
          <p className="text-gray-600 mt-2">Lihat daftar pengaduan yang telah ditangani dengan baik.</p>
        </div>
        <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg flex flex-col items-center">
          <LucideAlertCircle className="text-yellow-500 w-12 h-12" />
          <h2 className="text-xl font-semibold mt-4">Pengaduan Diproses</h2>
          <p className="text-gray-600 mt-2">Pantau pengaduan yang sedang dalam proses penanganan.</p>
        </div>
        <div className="p-6 bg-white text-gray-800 rounded-lg shadow-lg flex flex-col items-center">
          <LucideInfo className="text-blue-500 w-12 h-12" />
          <h2 className="text-xl font-semibold mt-4">Informasi</h2>
          <p className="text-gray-600 mt-2">Dapatkan panduan dan informasi penting lainnya di sini.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
