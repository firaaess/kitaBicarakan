import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import useGetAllPengaduan from '@/hooks/useGetAllPengaduan';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_API_END_POINT } from '@/utils/constant';
import { Ellipsis, EllipsisVertical } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { setPengaduan } from '@/redux/pengaduanSlice';

const PengaduanPetugas = () => {
  useGetAllPengaduan()
  const { pengaduan } = useSelector((store) => store.pengaduan);
  const { user } = useSelector((store) => store.auth);
  const { kategori } = useSelector((store) => store.kategori);
  const { lokasi } = useSelector((store) => store.lokasi);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filteredPengaduan, setFilteredPengaduan] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');

  console.log(pengaduan)
 
  // Set data awal untuk filteredPengaduan
  useEffect(() => {
    setFilteredPengaduan(pengaduan);
  }, [pengaduan]);

  // Fungsi untuk memfilter data pengaduan
  const handleFilter = () => {
    const filtered = pengaduan.filter(item => {
      const matchesCategory = selectedCategory ? item.kategori_id === parseInt(selectedCategory) : true;
      const matchesLocation = selectedLocation ? item.lokasi_id === parseInt(selectedLocation) : true;
      return matchesCategory && matchesLocation;
    });
    setFilteredPengaduan(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [selectedCategory, selectedLocation]);

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${BACKEND_API_END_POINT}/status/pengaduan/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (res.data.success) {
        toast.success(res.data.message);
  
        // Update Redux langsung tanpa fetch ulang
        dispatch(setPengaduan(pengaduan.map(item => 
          item.id === id ? { ...item, status: newStatus } : item
        )));
      }
    } catch (error) {
      console.error('Gagal update status:', error);
      toast.error('Gagal memperbarui status!');
    }
  };
  

  const handleDeletePengaduan = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.delete(`${BACKEND_API_END_POINT}/delete/pengaduan/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
  
      if (res.data.success) {
        toast.success(res.data.message);
  
        // Hapus langsung di Redux state
        dispatch(setPengaduan(pengaduan.filter(item => item.id !== id)));
      }
    } catch (error) {
      console.log(error);
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
      <div className="flex justify-between mb-2">
        <div className='py-4'>
      <h1 className='text-2xl font-bold pb-4'>Data Pengaduan</h1>
        </div>

   <div className='flex gap-3'>
       {/* Filter Options */}
       <div className='flex flex-col gap-2'>
      <Label>Berdasarkan kategori</Label>
        <select
          className="border rounded p-2"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">Semua Kategori</option>
          {kategori.map(category => (
            <option key={category.id} value={category.id}>{category.nama}</option>
          ))}
        </select>
      </div>

        {/* Filter by Location */}
      <div className='flex flex-col gap-2'>
          <Label>Berdasarkan lokasi</Label>
        <select
          className="border rounded p-2"
          onChange={(e) => setSelectedLocation(e.target.value)}
          value={selectedLocation}
        >
          <option value="">Semua Lokasi</option>
          {lokasi.map(location => (
            <option key={location.id} value={location.id}>{location.nama}</option>
          ))}
        </select>
      </div>
   </div>
        {/* Filter by Category */}

        {/* <Button variant="default" onClick={handleFilter}>Terapkan Filter</Button> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Judul</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Isi Pengaduan</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Kategori</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Lokasi</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
          {filteredPengaduan.length > 0 ? (
        filteredPengaduan.map((item, index) => (
          <tr key={item.id} className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{item.judul}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{item.isi_pengaduan}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{item.kategory.nama}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{item.lokasi.nama}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{item.status}</td>
            <td className="flex px-6 py-4 items-center justify-center gap-4">
              {user.role === 'petugas' ? (
                <Popover>
                  <PopoverTrigger>
                    <EllipsisVertical />
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="link"
                        onClick={() => navigate(`/petugas/pengaduan/${item.id}`)}
                        className="justify-start text-sm text-gray-700"
                      >
                        Detail
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => navigate(`/petugas/addtanggapan/${item.id}`)}
                        className="justify-start text-sm text-gray-700"
                      >
                        Beri Tanggapan
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => navigate(`/petugas/tanggapan/${item.id}`)}
                        className="justify-start text-sm text-gray-700"
                      >
                        Lihat Tanggapan
                      </Button>
                      <Button
                        variant="link"
                        onClick={ () => handleUpdateStatus(item.id, 'selesai')}
                        className="justify-start text-sm text-gray-700"
                      >
                        Selesai
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Popover>
                  <PopoverTrigger>
                    <EllipsisVertical />
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="link"
                        onClick={() => navigate(`/petugas/pengaduan/${item.id}`)}
                        className="justify-start text-sm text-gray-700"
                      >
                        Detail
                      </Button>
                      <Button
                        variant="link"
                        onClick={ () => handleUpdateStatus(item.id, 'diterima')}
                        className="justify-start text-sm text-gray-700"
                      >
                        Terima
                      </Button>
                      <Button
                        variant="link"
                        onClick={() => navigate(`/petugas/tanggapan/${item.id}`)}
                        className="justify-start text-sm text-gray-700"
                      >
                        Lihat Tanggapan
                      </Button>
                      <Button
                        variant="link"
                        onClick={ () => handleDeletePengaduan(item.id)}
                        className="justify-start text-sm text-gray-700"
                      >
                        Hapus
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="7"
            className="px-6 py-4 text-center text-sm text-gray-500"
          >
            Tidak ada data pengaduan
          </td>
        </tr>
      )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PengaduanPetugas;
