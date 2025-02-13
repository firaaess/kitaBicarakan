import React, { useState } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from './ui/button'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import store from '@/redux/store'
import Navbar from './Navbar'
import { toast } from 'sonner'
import { BACKEND_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import useGetAllLokasi from '@/hooks/useGetAllLokasi'
import useGetAllKategori from '@/hooks/useGetAllKategori'
import Footer from './Footer'

const Pengaduan = () => {
  useGetAllLokasi()
  useGetAllKategori()
  const {user} = useSelector(store=>store.auth)
  const {kategori }= useSelector(store=>store.kategori)
  const {lokasi }= useSelector(store=>store.lokasi)
    const [input, setInput] = useState({
        judul:"",
        isi_pengaduan:"",
        foto:"",
        lokasi_id:"",
        kategori_id:""
      })
      const navigate = useNavigate()
      const changeEventHandler = (e) => {
        setInput({...input, [e.target.name]: e.target.value })
      }
      const changeFileHandler = (e) => {
        setInput({...input, foto: e.target.files?.[0] })
      }
      const selectChangeHandler = (value, type) => {
        setInput({ ...input, [type]: value }); // Simpan nilai berdasarkan tipe
    };    
      const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
      const handleSubmit = async (e) => {
          e.preventDefault()
          if(!user){
            navigate('/login')
          }
          const formData = new FormData()
          formData.append('judul', input.judul)
          formData.append('isi_pengaduan', input.isi_pengaduan)
          formData.append('lokasi_id', input.lokasi_id)
          formData.append('kategori_id', input.kategori_id)
          if (input.foto) {
            formData.append('foto', input.foto);
        }      

        try {
          const token = localStorage.getItem('token'); // Get token from localStorage
      
          if (!token) {
            toast.error('You must be logged in to create a pengaduan.');
            return;
          }
          setLoading(true)
            const res = await axios.post(`${BACKEND_API_END_POINT}/add/pengaduan`, formData,{
              headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,})
            if (res.data.success) {
              navigate('/')
              toast.success(res.data.message)
            }
        } catch (error) {
          console.log(error)
          if (error.response && error.response.data.error) {
            const errors = error.response.data.error
            Object.keys(errors).forEach((key) => {
              const errorMessages = errors[key]
              if (Array.isArray(errorMessages)) {
                // If errorMessages is an array, loop through and display each message
                errorMessages.forEach((msg) => toast.error(msg))
              } else {
                // If errorMessages is a string, directly display it
                toast.error(errorMessages)
              }
            })
          } else {
            toast.error('Terjadi kesalahan saat mengirim data.')
          }
        } finally{
          setLoading(false)
        }
        }
  return (
    <div>
      <Navbar/>
    <div className='flex items-center justify-center mx-auto max-w-7xl'>
        <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5'>Ajukan Pengaduan</h1>
            <div className='my-2'>
              <Label>Judul</Label>
              <Input type='text' value={input.judul} name='judul' onChange={changeEventHandler} placeholder='Masukan judul pengaduan'/>
            </div>
            <div className='my-2'>
              <Label>Isi Pengaduan</Label>
              <Input type='text' value={input.isi_pengaduan} name='isi_pengaduan' onChange={changeEventHandler} placeholder='Masukan isi pengaduan'/>
            </div>
            <div className="my-2">
                <Label>Kategori</Label>
                <Select onValueChange={(value) => selectChangeHandler(value, 'kategori_id')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {kategori.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>{item.nama}</SelectItem> // Tampilkan nama kategori
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="my-2">
                <Label>Lokasi</Label>
                <Select onValueChange={(value) => selectChangeHandler(value, 'lokasi_id')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih lokasi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {lokasi.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>{item.nama}</SelectItem> // Tampilkan nama lokasi
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            <div className='my-2'>
              <Label>Foto</Label>
              <Input accept='image/*' type='file' onChange={changeFileHandler} className='cursor-pointer'/>
            </div>
            {
             loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4'/>Tunggu sebentar...</Button> : <Button type='submit' className='w-full my-4'>Kirim</Button>
            }
        </form>
    </div>
    <Footer/>
  </div>
  )
}

export default Pengaduan
