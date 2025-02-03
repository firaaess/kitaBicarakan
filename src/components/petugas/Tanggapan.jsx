import { BACKEND_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { ArrowLeft } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';

const Tanggapan = () => {
    const { id } = useParams();
    const {user } = useSelector((store)=>store.auth)
    const [tanggapan, setTanggapan] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
      const fetchTanggapanById = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            console.error("Token tidak ditemukan!");
            return;
          }
  
          const response = await axios.get(`${BACKEND_API_END_POINT}/get/${id}/tanggapan`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (response.data.success) {
            setTanggapan(response.data.data);
          } else {
            console.log('Tidak ada tanggapan ditemukan');
          }
        } catch (err) {
          if (err.response) {
            console.error("API Error:", err.response.data.message);
          } else if (err.request) {
            console.error("No response received from server:", err.request);
          } else {
            console.error("Error in setting up request:", err.message);
          }
        }
      };
  
      fetchTanggapanById();
    }, [id]);
    const handleOut = () => {
        navigate('/petugas/pengaduan')
        setTanggapan([])
    }
    console.log(tanggapan)
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Button variant='link' onClick={handleOut}>
        <ArrowLeft className="mr-2" />
        Kembali
      </Button>
    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-center mb-6">Detail Tanggapan</h1>
      {tanggapan.length > 0 ? (
        <div className="grid grid-cols-1 gap-6">
          {tanggapan.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-center items-center rounded mb-4 overflow-hidden bg-gray-300">
                {item.foto ? (
                  <img
                    src={item.foto}
                    alt="Foto Tanggapan"
                    className="max-w-full max-h-96 object-contain"
                  />
                ) : (
                  <span className="text-gray-500">Foto tidak tersedia</span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <p className="font-semibold">Tanggapan</p>
                  <p>{item.tanggapan || 'Tanggapan tidak tersedia'}</p>
                </div>
                <div>
                  <p className="font-semibold">Dibuat pada</p>
                  <p>{new Date(item.created_at).toLocaleString() || 'Tanggal tidak diketahui'}</p>
                </div>
                <div>
                  <p className="font-semibold">Ditanggapi oleh :</p>
                  <p>{item.user.nama|| 'ID tidak tersedia'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Tidak ada tanggapan untuk pengaduan ini.</p>
      )}
    </div>
  </div>
  )
}

export default Tanggapan
