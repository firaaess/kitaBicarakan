import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { EllipsisVertical, Plus } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { BACKEND_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import useGetAllLokasi from '@/hooks/useGetAllLokasi'
import { setLokasi } from '@/redux/lokasiSlice'

const LokasiAdmin = () => {
  useGetAllLokasi()
  const {lokasi} = useSelector((store)=>store.lokasi)
  // const navigate = useNavigate();
  const dispatch = useDispatch()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLokasi, setNewLokasi] = useState('');

  const handleDeleteLokasi = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Token dari localStorage
      const res = await axios.delete(`${BACKEND_API_END_POINT}/delete/lokasi/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setLokasi(res.data.lokasi))
      }
    } catch (error) {
      console.log(error)
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
      } 
    }
  };

  const handleAddLokasi = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${BACKEND_API_END_POINT}/add/lokasi`,
        { nama: newLokasi },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setIsModalOpen(false);
        dispatch(setLokasi(res.data.lokasi))
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
      } 
    }
  };

  return (
    <div>
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold">Data Lokasi</h1>
      <Button onClick={() => setIsModalOpen(true)}>
          <Plus /> Tambah Lokasi
        </Button>
    </div>
    {!lokasi ? (
      <p>Loading</p>
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
          {lokasi.length > 0 ? (
            lokasi.map((item, index) => (
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
                          onClick={ () => handleDeleteLokasi(item.id)}
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
            <h2 className="text-lg font-bold mb-4">Tambah Lokasi</h2>
            <input
              type="text"
              placeholder="Nama Lokasi"
              value={newLokasi}
              onChange={(e) => setNewLokasi(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsModalOpen(false)} variant="secondary">
                Batal
              </Button>
              <Button onClick={handleAddLokasi}>Simpan</Button>
            </div>
          </div>
        </div>
      )}
  </div>
  )
}

export default LokasiAdmin
