import { setAllUsers } from '@/redux/authSlice';
import { BACKEND_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useGetAllUser= () => {
  const dispatch = useDispatch();
  const {allUsers} = useSelector((store)=>store.auth) 
  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_END_POINT}/get/users`);
        console.log(response)
        if (response.data.success) {
          dispatch(setAllUsers(response.data.data));
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

    fetchAllUser();
  }, [dispatch, allUsers]); // Menambahkan dispatch dalam array dependensi

};

export default useGetAllUser;
