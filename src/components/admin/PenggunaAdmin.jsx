import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { EllipsisVertical, Plus } from 'lucide-react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import useGetAllUser from '@/hooks/useGetAllUser'
import axios from 'axios'
import { BACKEND_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { Avatar, AvatarImage } from '../ui/avatar'

const PenggunaAdmin = () => {
  useGetAllUser();
  const { allUsers } = useSelector((store) => store.auth)
  const navigate = useNavigate()
  const [filterRole, setFilterRole] = useState('') // State untuk filter role
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const usersPerPage = 10

  const filteredUsers = allUsers.filter(user =>
    (filterRole === 'all' || !filterRole || user.role === filterRole) &&
    (user.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage)
  const displayedUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Token dari localStorage
      const res = await axios.delete(`${BACKEND_API_END_POINT}/delete/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
    } 
  }
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Data Pengguna</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Cari nama atau email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded"
          />
          <Select onValueChange={setFilterRole} value={filterRole}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>Semua</SelectItem>
              <SelectItem value='masyarakat'>Masyarakat</SelectItem>
              <SelectItem value='petugas'>Petugas</SelectItem>
              <SelectItem value='admin'>Admin</SelectItem>
            </SelectContent>
          </Select>
          <Link to="/admin/tambah/pengguna">
            <Button>
              <Plus /> Pengguna
            </Button>
          </Link>
        </div>
      </div>
      {!displayedUsers ? (
        <p>Loading</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white rounded-lg my-3">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Avatar</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No Telepon</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Peran</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {displayedUsers.length > 0 ? (
              displayedUsers.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700"> 
                  <Avatar>
                      <AvatarImage src={item.profile_picture} alt="@shadcn" className="object-cover rounded-full" />
                  </Avatar></td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.no_telepon}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.role}</td>
                  <td className="flex px-6 py-4 items-center justify-center gap-4">
                    <Popover>
                      <PopoverTrigger>
                        <EllipsisVertical />
                      </PopoverTrigger>
                      <PopoverContent className="w-48">
                        <div className="flex flex-col gap-2">
                          <Button
                            variant="link"
                            onClick={() => navigate(`/admin/detail/pengguna/${item.id}`)}
                            className="justify-start text-sm text-gray-700"
                          >
                            Detail
                          </Button>
                          <Button
                            variant="link"
                            onClick={ () => handleDeleteUser(item.id)}
                            className="justify-start text-sm text-gray-700"
                          >
                            Hapus
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Tidak ada data pengguna
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
         <div className="flex justify-center gap-2 my-4">
         <Button disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>Sebelumnya</Button>
         <span>Halaman {currentPage} dari {totalPages}</span>
         <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>Selanjutnya</Button>
       </div>
    </div>
  )
}

export default PenggunaAdmin
