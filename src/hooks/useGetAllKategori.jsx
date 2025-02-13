import { setKategori } from '@/redux/kategoriSlice'
import { BACKEND_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllKategori = () => {
    const dispatch = useDispatch()
    const isFetched = useRef(false); // Gunakan ref untuk mencegah pemanggilan ulang
    // const {kategori} = useSelector((store)=>store.kategori)
    const fetchAllKategori = async () => {
        try {
            const res = await axios.get(`${BACKEND_API_END_POINT}/get/kategori`, {withCredentials: true});
            if (res.data.success) {
                dispatch(setKategori(res.data.data))
            }
        } catch (error) {
            console.log(error)
        }
    }
     // Cegah pemanggilan ulang dengan useRef
     if (!isFetched.current) {
        fetchAllKategori(); // Panggil fungsi fetch data kategori()
        isFetched.current = true; // Tandai sudah dipanggil
      }
}

export default useGetAllKategori
