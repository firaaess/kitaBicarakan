import { setPengaduanUser } from '@/redux/pengaduanSlice';
import { BACKEND_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetPengaduanByUser = () => {
  const {pengaduanByUser} = useSelector((store)=>store.pengaduan)
  const dispatch = useDispatch();
  const isFetched = useRef(false); // Gunakan ref untuk mencegah pemanggilan ulang

  useEffect(() => {
    const fetchPengaduan = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token tidak ditemukan!");
          return;
        }
  
        const response = await axios.get(`${BACKEND_API_END_POINT}/pengaduan/user`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.data.success) {
          dispatch(setPengaduanUser(response.data.data));
        } else {
          console.log('Tidak ada pengaduan ditemukan');
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
    // Cegah pemanggilan ulang dengan useRef
    if (!isFetched.current) {
      fetchPengaduan();
      isFetched.current = true; // Tandai sudah dipanggil
    }
  }, [dispatch])
};

export default useGetPengaduanByUser;
