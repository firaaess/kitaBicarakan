import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { setPengaduanById } from '@/redux/pengaduanSlice';
import { BACKEND_API_END_POINT } from '@/utils/constant';
import { Button } from '../ui/button';
import { ArrowLeft } from 'lucide-react';

const DetailPengaduan = () => {
  const { pengaduanById } = useSelector((store) => store.pengaduan);
  const params = useParams();
  const pengaduanId = params.id;
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPengaduanById = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token tidak ditemukan!');
          return;
        }

        const response = await axios.get(
          `${BACKEND_API_END_POINT}/get/pengaduan/${pengaduanId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.success) {
          dispatch(setPengaduanById(response.data.data));
        } else {
          console.log('Tidak ada pengaduan ditemukan');
        }
      } catch (err) {
        if (err.response) {
          console.error('API Error:', err.response.data.message);
        } else if (err.request) {
          console.error('No response received from server:', err.request);
        } else {
          console.error('Error in setting up request:', err.message);
        }
      }
    };

    fetchPengaduanById();
  }, [dispatch, pengaduanId]);
  return (
    <div className="max-w-4xl mx-auto p-6">
       <Link to='/petugas/pengaduan'><Button variant='link'><ArrowLeft/> Kembali</Button></Link>
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <h1 className="text-xl font-bold text-center mb-4">Detail Pengaduan</h1>
        <div className="flex justify-center items-center rounded mb-6 overflow-hidden bg-gray-300">
          {pengaduanById.foto ? (
            <img
              src={pengaduanById.foto}
              alt="Foto Pengaduan"
              className="max-w-full max-h-96 object-contain"
            />
          ) : (
            <span className="text-gray-500">Foto tidak tersedia</span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-semibold">Judul</p>
            <p>{pengaduanById.judul || 'Judul tidak tersedia'}</p>
          </div>
          <div>
            <p className="font-semibold">Dibuat oleh</p>
            <p>{pengaduanById.user?.nama || 'Pengguna tidak diketahui'}</p>
          </div>
          <div className="col-span-2">
            <p className="font-semibold">Isi Pengaduan</p>
            <p>{pengaduanById.isi_pengaduan || 'Isi pengaduan tidak tersedia'}</p>
          </div>
          <div>
            <p className="font-semibold">Lokasi</p>
            <p>{pengaduanById.lokasi?.nama || 'Lokasi tidak diketahui'}</p>
          </div>
          <div>
            <p className="font-semibold">Kategori</p>
            <p>{pengaduanById.kategory?.nama || 'Kategori tidak tersedia'}</p>
          </div>
          <div>
            <p className="font-semibold">Status</p>
            <p>{pengaduanById.status || 'Status tidak diketahui'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPengaduan;
