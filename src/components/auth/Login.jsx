import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import store from '@/redux/store'
import { Loader2 } from 'lucide-react'
import axios from 'axios'
import { BACKEND_API_END_POINT } from '@/utils/constant'

const Login = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState({
    email:"",
    password:"",
  })
  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]: e.target.value })
  }
  const dispatch = useDispatch()
  const {loading} = useSelector(store=>store.auth)
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Code to handle form submission
    try {
      dispatch(setLoading(true))
        const res = await axios.post(`${BACKEND_API_END_POINT}/login`, input,{
          headers:{
            'Content-Type': 'application/json'
          },
          withCredentials: true,
          
        })
        if (res.data.success) {
          localStorage.setItem('token', res.data.token);
          dispatch(setUser(res.data.user));
          if(res.data.user.role === 'masyarakat') {
            navigate('/')
          }
          if(res.data.user.role === 'petugas') {
            navigate('/petugas')
          }
          if(res.data.user.role === 'admin') {
            navigate('/admin')
          }
        
          toast.success(res.data.message)
        }
    } catch (error) {
      console.log(error);
      // Periksa apakah ada respons error dari server
      if (error.response) {
        const { message, error: errorData } = error.response.data;
        // Tampilkan pesan error dari server jika ada
        if (message) {
          toast.error(message);
        }
        // Jika ada error dalam bentuk objek (contoh validasi laravel)
        if (errorData) {
          Object.keys(errorData).forEach((key) => {
            const errorMessages = errorData[key];
            if (Array.isArray(errorMessages)) {
              errorMessages.forEach((msg) => toast.error(msg));
            } else {
              toast.error(errorMessages);
            }
          });
        }
      } else {
        // Jika tidak ada respons dari server
        toast.error("Terjadi kesalahan saat mengirim data.");
      }
    } finally {
      dispatch(setLoading(false))
    }
  }
  return (
    <div>
      <div className='flex items-center justify-center h-screen mx-auto max-w-7xl'>
          <form onSubmit={handleSubmit} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
              <h1 className='font-bold text-xl mb-5'>Daftar Akun</h1>
              <div className='my-2'>
                <Label>Email</Label>
                <Input type='email' value={input.email} name='email' onChange={changeEventHandler} placeholder='Masukan email anda'/>
              </div>
              <div className='my-2'>
                <Label>Password</Label>
                <Input type='password' value={input.password} name='password' onChange={changeEventHandler} placeholder='Masukan password anda'/>
              </div>
              {
               loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4'/>Tunggu sebentar...</Button> : <Button type='submit' className='w-full my-4'>Masuk</Button>
              }
              <span>Belum punya akun ? <Link to='/register' className='text-blue-600'>Daftar</Link></span>
          </form>
      </div>
    </div>
  )
}

export default Login
