import React, { useState } from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
const AddPengguna = () => {
  const [input, setInput] = useState({
    nama: "",
    nik: "",
    email: "",
    no_telepon: "",
    password: "",
    role: "masyarakat", // Default role
    profile_picture: ""
  })
  const navigate = useNavigate()
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }
  const changeFileHandler = (e) => {
    setInput({ ...input, profile_picture: e.target.files?.[0] })
  }
  const { loading } = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('nama', input.nama)
    formData.append('nik', input.nik)
    formData.append('email', input.email)
    formData.append('no_telepon', input.no_telepon)
    formData.append('password', input.password)
    formData.append('role', input.role) // Append role to formData
    if (input.profile_picture) {
      formData.append('profile_picture', input.profile_picture)
    }
    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${BACKEND_API_END_POINT}/register`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
      })
      if (res.data.success) {
        navigate('/admin/pengguna')
        toast.success(res.data.message)
      }
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data.error) {
        const errors = error.response.data.error
        Object.keys(errors).forEach((key) => {
          const errorMessages = errors[key]
          if (Array.isArray(errorMessages)) {
            errorMessages.forEach((msg) => toast.error(msg))
          } else {
            toast.error(errorMessages)
          }
        })
      } else {
        toast.error('Terjadi kesalahan saat mengirim data.')
      }
    } finally {
      dispatch(setLoading(false))
    }
  }
  return (
    <div className=' mx-auto max-w-7xl'>
    <Link to='/admin/pengguna'><Button variant='link'><ArrowLeft/>Kembali</Button></Link>
     <div className='w-full border border-gray-200 rounded-md p-4 my-5'>
     <form onSubmit={handleSubmit}>
        <h1 className='font-bold text-xl mb-5 text-center'>Tambah Akun</h1>
        <div className='my-2'>
          <Label>Nama</Label>
          <Input type='text' value={input.nama} name='nama' onChange={changeEventHandler} placeholder='Masukan nama anda' />
        </div>
        <div className='my-2'>
          <Label>Nik</Label>
          <Input type='text' value={input.nik} name='nik' onChange={changeEventHandler} placeholder='Masukan nik anda' />
        </div>
        <div className='my-2'>
          <Label>Email</Label>
          <Input type='email' value={input.email} name='email' onChange={changeEventHandler} placeholder='Masukan email anda' />
        </div>
        <div className='my-2'>
          <Label>No telepon</Label>
          <Input type='text' pattern='[0-9]*' value={input.no_telepon} name='no_telepon' onChange={changeEventHandler} placeholder='Masukan no telp anda' />
        </div>
        <div className='my-2'>
          <Label>Password</Label>
          <Input type='password' value={input.password} name='password' onChange={changeEventHandler} placeholder='Masukan password anda' />
        </div>
        <div className='my-2'>
          <Label>Peran</Label>
          <Select onValueChange={(value) => setInput({ ...input, role: value })} value={input.role}>
            <SelectTrigger>
                <SelectValue placeholder='Masukan Sebagai Peran'/>
            </SelectTrigger>
            <SelectContent>
                <SelectItem value='masyarakat'>Masyarakat</SelectItem>
                <SelectItem value='petugas'>Petugas</SelectItem>
                <SelectItem value='admin'>Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='my-2'>
          <Label>Profile</Label>
          <Input accept='image/*' type='file' onChange={changeFileHandler} className='cursor-pointer' />
        </div>
        {
          loading ? <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4' />Tunggu sebentar...</Button> : <Button type='submit' className='w-full my-4'>Tambah</Button>
        }
      </form>
     </div>
    </div>
  )
}

export default AddPengguna
