import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from './ui/button';
import { BACKEND_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { Input } from './ui/input';
import { toast } from 'sonner';

const Pengaturan = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalPasswordOpen, setIsModalPasswordOpen] = useState(false);
  const [formData, setFormData] = useState({
    nama: user?.nama || '',
    email: user?.email || '',
    no_telepon: user?.no_telepon || '',
    profile_picture: null,
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  // Fungsi kembali ke halaman sebelumnya
  const handleBack = () => {
    navigate('/');
  };

  // Fungsi menangani perubahan input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fungsi menangani perubahan gambar profil
  const handleFileChange = (e) => {
    setFormData({ ...formData, profile_picture: e.target.files[0] });
  };

  // Fungsi menyimpan perubahan profil
  const handleSave = async (id) => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('nama', formData.nama);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('no_telepon', formData.no_telepon);
      if (formData.profile_picture) {
        formDataToSend.append('profile_picture', formData.profile_picture);
      }
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token tidak ditemukan!');
        return;
      }
      const response = await axios.post(`${BACKEND_API_END_POINT}/update/user/${id}`, formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      dispatch(setUser(response.data.user));
      toast.success(response.data.message);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Gagal memperbarui profil:', error);
    }
  };

  // Fungsi mengupdate password
  const handleUpdatePassword = async (id) => {
    try {
      if (!formData.current_password || !formData.password) {
        toast.message("Harap isi semua kolom password!");
        return;
      }

      const requestData = {
        current_password: formData.current_password,
        password: formData.password,
        password_confirmation: formData.password_confirmation,
      };

      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token tidak ditemukan!');
        return;
      }

      const response = await axios.post(`${BACKEND_API_END_POINT}/update/user/${id}`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        toast.success(response.data.message);
        setIsModalPasswordOpen(false);
      } 
    } catch (error) {
      console.error('Gagal mengganti password:', error.response?.data || error.message);
      toast.message('Terjadi kesalahan saat mengganti password');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <Button onClick={handleBack}>Kembali</Button>
        <h1 className="text-2xl font-bold">Pengaturan Profil</h1>
      </div>

        {/* Profile Picture */}
        <div className="flex items-center gap-4 mb-6">
        <img 
          src={user?.profile_picture || 'https://via.placeholder.com/150'} 
          alt="Profile" 
          className="w-24 h-24 rounded-full object-cover" 
        />
        <div>
          <h2 className="text-xl font-semibold">{user?.nama || 'Nama Anda'}</h2>
          <p className="text-gray-600">{user?.email || 'Email tidak tersedia'}</p>
          <p className="text-gray-600">{user?.no_telepon || 'Nomor Telepon tidak tersedia'}</p>
        </div>
      </div>

      {/* Data Profil */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Informasi Akun</h3>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium">Nama</span>
            <span>{user?.nama || 'Tidak ada data'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Email</span>
            <span>{user?.email || 'Tidak ada data'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Nomor Telepon</span>
            <span>{user?.no_telepon || 'Tidak ada data'}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-4">
          <Button onClick={() => setIsModalOpen(true)}>Edit Profil</Button>
          <Button onClick={() => setIsModalPasswordOpen(true)} variant="outline">Ganti Password</Button>
        </div>
      </div>

      {/* Modal Edit Profil */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Edit Profil</h2>
            <Input type="text" name="nama" value={formData.nama} onChange={handleChange} placeholder="Nama" className="w-full mb-2" />
            <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full mb-2" />
            <Input type="text" name="no_telepon" value={formData.no_telepon} onChange={handleChange} placeholder="Nomor Telepon" className="w-full mb-2" />
            <Input type="file" name="profile_picture" onChange={handleFileChange} className="w-full mb-2" />
            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsModalOpen(false)} variant="outline">Batal</Button>
              <Button onClick={() => handleSave(user.id)}>Simpan</Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Ganti Password */}
      {isModalPasswordOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Ganti Password</h2>
            <Input type="password" name="current_password" value={formData.current_password} onChange={handleChange} placeholder="Password Lama" className="w-full mb-2" />
            <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password Baru" className="w-full mb-2" />
            <Input type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange} placeholder="Konfirmasi Password" className="w-full mb-2" />
            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsModalPasswordOpen(false)} variant="outline">Batal</Button>
              <Button onClick={() => handleUpdatePassword(user.id)}>Simpan</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Pengaturan;
