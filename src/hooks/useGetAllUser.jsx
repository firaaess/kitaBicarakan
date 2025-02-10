import { setAllUsers } from '@/redux/authSlice';
import { BACKEND_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetAllUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_END_POINT}/get/users`);
        
        if (response.data.success) {
          dispatch(setAllUsers(response.data.data));
        } else {
          console.log('Tidak ada pengguna ditemukan');
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

    fetchAllUser();
  }, [dispatch]); // Menambahkan dispatch dalam dependensi useEffect

  return null; // Hook ini hanya mengambil data, jadi tidak perlu mengembalikan apapun
};

export default useGetAllUser;
