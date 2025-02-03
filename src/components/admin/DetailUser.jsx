import { setUserById } from '@/redux/authSlice';
import { BACKEND_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { ArrowLeft, EllipsisVertical, IdCard, Mail, PhoneCall } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

const DetailUser = () => {
  // useGetUserById()
  const {userById} = useSelector((store)=>store.auth)
  // const user = userById
  const params = useParams();
  const userId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate()
    useEffect(() => {
            const fetchUserById = async () => {
              try {
                const token = localStorage.getItem('token');
                if (!token) {
                  console.error('Token tidak ditemukan!');
                  return;
                }
        
                const response = await axios.get(
                  `${BACKEND_API_END_POINT}/get/user/${userId}`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                console.log(response.data.data)
                if (response.data.success) {
                  dispatch(setUserById(response.data.data));
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
        
            fetchUserById();
    }, [dispatch, userById]);
      const handleUpdateRole = async (newRole) => {
        try {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('Token tidak ditemukan!');
            return;
          }
    
          const response = await axios.post(
            `${BACKEND_API_END_POINT}/update/user/${userId}`,
            { role: newRole },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
    
          if (response.data.success) {
            console.log('Peran berhasil diperbarui:', response.data);
            // Perbarui data user di redux
            dispatch(setUserById(response.data.data));
          } else {
            console.error('Gagal memperbarui peran:', response.data.message);
          }
        } catch (err) {
          console.error('Error saat memperbarui peran:', err.message);
        }
      };

      const HandleBack = () => {
        navigate('/admin/pengguna');
        setUserById(null);
      }
      // console.log(user)
  return (
  <div className="flex justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
        <Button variant='link' onClick={HandleBack}><ArrowLeft/> Kembali</Button>
        {!userById ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 text-center mb-8 md:mb-0">
            <img
              src={userById.profile_picture}
              alt="Profile Picture"
              className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105"
            />
            <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">
              {userById.nama}
            </h1>
            <div className="flex gap-4 justify-center">
              <p className="text-gray-600 dark:text-gray-300">{userById.role}</p>
              <Popover>
                <PopoverTrigger>
                  <EllipsisVertical />
                </PopoverTrigger>
                <PopoverContent className="w-32">
                  <Button
                    variant="link"
                    onClick={() => handleUpdateRole('masyarakat')}
                    className="justify-start text-sm text-gray-700"
                  >
                    Masyarakat
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => handleUpdateRole('petugas')}
                    className="justify-start text-sm text-gray-700"
                  >
                    Petugas
                  </Button>
                  <Button
                    variant="link"
                    onClick={() => handleUpdateRole('admin')}
                    className="justify-start text-sm text-gray-700"
                  >
                    Admin
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className=" md:w-2/3 md:pl-8">
            <h2 className="text-xl font-semibold text-indigo-800 dark:text-white mb-4">
              Contact Information
            </h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-4">
                <IdCard />
                {userById.nik}
              </li>
              <li className="flex items-center gap-4">
                <PhoneCall />
                {userById.no_telepon}
              </li>
              <li className="flex items-center gap-4">
                <Mail />
                {userById.email}
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

export default DetailUser
