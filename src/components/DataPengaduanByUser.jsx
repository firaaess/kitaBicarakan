import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from './Navbar';
import { Button } from './ui/button';
import useGetPengaduanByUser from '@/hooks/useGetPengaduanByUser';

const DataPengaduanByUser = () => {
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const { pengaduanUser } = useSelector(store => store.pengaduan);
  
  // State untuk mengatur modal gambar yang ditampilkan
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  console.log(pengaduanUser)
  useGetPengaduanByUser();

  // Fungsi untuk membuka modal foto
  const handleViewImage = (foto) => {
    setSelectedImage(foto); // Set URL gambar yang dipilih
    setIsModalOpen(true); // Membuka modal
  };

  // Fungsi untuk menutup modal foto
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        {/* Tombol Kembali */}
        <Button onClick={() => navigate(-1)}>Kembali</Button>

        <h1 className="text-2xl font-bold mb-4">Data Pengaduan Saya</h1>
        {pengaduanUser.length === 0 ? (
          <p className="text-gray-600">Tidak ada data pengaduan.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300 bg-white rounded-lg">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Judul</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Isi Pengaduan</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pengaduanUser.map((item, index) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.judul}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.isi_pengaduan}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{item.status}</td>
                    <td className="flex px-6 py-4 items-center justify-center gap-4">
                      <div>
                        {/* Tombol Lihat Foto */}
                      {item.foto ? (
                        <Button onClick={() => handleViewImage(item.foto)}>Lihat Foto</Button>
                      ) : (
                        <span className="text-gray-500">Tidak ada foto</span>
                      )}
                      </div>
                      <div>
                      <Button  onClick={() => navigate(`/tanggapan/${item.id}`)}>Tanggapan</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal untuk melihat gambar */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg">
            <button onClick={closeModal} className="absolute top-2 right-2 text-white bg-red-500 p-1 rounded-full">
              X
            </button>
            <img src={selectedImage} alt="Foto Pengaduan" className="max-w-lg max-h-[80vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default DataPengaduanByUser;
