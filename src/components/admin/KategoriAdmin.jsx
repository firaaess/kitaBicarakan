import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { EllipsisVertical, Plus } from 'lucide-react';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import useGetAllKategori from '@/hooks/useGetAllKategori';

const KategoriAdmin = () => {
  useGetAllKategori(); // Inisialisasi fungsi fetch
  const { kategori } = useSelector((store) => store.kategori);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKategori, setNewKategori] = useState('');

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
        <Button onClick={() => setIsModalOpen(true)}>
          <Plus /> Tambah Kategori
        </Button>
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
            {kategori.length > 0 ? (
              kategori.map((item, index) => (
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
