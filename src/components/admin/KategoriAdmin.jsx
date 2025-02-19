import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { EllipsisVertical, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import useGetAllKategori from '@/hooks/useGetAllKategori';
import { setKategori } from '@/redux/kategoriSlice';

const KategoriAdmin = () => {
  useGetAllKategori(); // Inisialisasi fungsi fetch
  const { kategori = [] } = useSelector((store) => store.kategori);
  const dispatch = useDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKategori, setNewKategori] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

 // 🔍 Filter kategori berdasarkan search input
 const filteredKategori = kategori?.filter((item) =>
 item.nama.toLowerCase().includes(searchTerm.toLowerCase())
) || [];

 // 🛠️ Pagination
 const totalItems = filteredKategori.length;
 const totalPages = Math.ceil(totalItems / itemsPerPage);
 const startIndex = (currentPage - 1) * itemsPerPage;
 const paginatedKategori = filteredKategori.slice(startIndex, startIndex + itemsPerPage);


  const handleDeleteKategori = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Token dari localStorage
      const res = await axios.delete(`${BACKEND_API_END_POINT}/delete/kategori/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        // dispatch(setKategori(res.data.kategori))
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        const errors = error.response.data.error;
        Object.keys(errors).forEach((key) => {
          const errorMessages = errors[key];
          if (Array.isArray(errorMessages)) {
            errorMessages.forEach((msg) => toast.error(msg));
          } else {
            toast.error(errorMessages);
          }
        });
      } else {
        toast.error('Terjadi kesalahan saat mengirim data.');
      }
    }
  };

  const handleAddKategori = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${BACKEND_API_END_POINT}/add/kategori`,
        { nama: newKategori },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsModalOpen(false);
        setNewKategori('');
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        const errors = error.response.data.error;
        Object.keys(errors).forEach((key) => {
          const errorMessages = errors[key];
          if (Array.isArray(errorMessages)) {
            errorMessages.forEach((msg) => toast.error(msg));
          } else {
            toast.error(errorMessages);
          }
        });
      } else {
        toast.error('Terjadi kesalahan saat mengirim data.');
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Data Kategori</h1>
      <div className="flex gap-4">
      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Cari kategori..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
      />
       <Button onClick={() => setIsModalOpen(true)}>
          <Plus /> Tambah Kategori
        </Button>
      </div>
      </div>

      {!kategori ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white rounded-lg my-3">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedKategori.length > 0 ? (
              paginatedKategori.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.nama}</td>
                  <td className="flex px-6 py-4 items-center justify-center gap-4">
                    <Popover>
                      <PopoverTrigger>
                        <EllipsisVertical />
                      </PopoverTrigger>
                      <PopoverContent className="w-48">
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="link"
                            onClick={() => handleDeleteKategori(item.id)}
                            className="justify-start text-sm text-gray-700"
                          >
                            Hapus
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Tidak ada data kategori
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

       {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <span className="text-gray-700">
            Halaman {currentPage} dari {totalPages}
          </span>
          <Button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      {/* Modal for Add Kategori */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Tambah Kategori</h2>
            <input
              type="text"
              placeholder="Nama Kategori"
              value={newKategori}
              onChange={(e) => setNewKategori(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsModalOpen(false)} variant="secondary">
                Batal
              </Button>
              <Button onClick={handleAddKategori}>Simpan</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KategoriAdmin;
