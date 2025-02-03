import { setKategori } from '@/redux/kategoriSlice'
import { BACKEND_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useGetAllKategori = () => {
    const dispatch = useDispatch()
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
    return fetchAllKategori
}

export default useGetAllKategori
