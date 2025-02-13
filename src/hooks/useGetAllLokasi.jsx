import { setLoading } from '@/redux/authSlice'
import { setLokasi } from '@/redux/lokasiSlice'
import { BACKEND_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllLokasi = () => {
    const dispatch = useDispatch()
    const {lokasi} = useSelector((store)=>store.lokasi)
    const isFetched = useRef(false); // Gunakan ref untuk mencegah pemanggilan ulang
    useEffect(() => {
        const fetchAlllokasi = async () => {
            try {
                const res = await axios.get(`${BACKEND_API_END_POINT}/get/lokasi`, {withCredentials: true});
                if (res.data.success) {
                    dispatch(setLokasi(res.data.data))
                }
            } catch (error) {
                console.log(error)
            }
        }
         // Cegah pemanggilan ulang dengan useRef
    if (!isFetched.current) {
        fetchAlllokasi()
        isFetched.current = true; // Tandai sudah dipanggil
      }
    })
}

export default useGetAllLokasi
