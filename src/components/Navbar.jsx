import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Avatar, AvatarImage } from './ui/avatar'
import { LogOut, NotebookText, Settings } from 'lucide-react'
import { Button } from './ui/button'
import { Link, useLocation } from 'react-router-dom' // Pastikan impor dari 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BACKEND_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import { resetPengaduanUser } from '@/redux/pengaduanSlice'

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation(); // Gunakan useLocation untuk mengetahui path saat ini

    const logoutHandler = async () => {
        try {
          const token = localStorage.getItem("token");
          const res = await axios.post(`${BACKEND_API_END_POINT}/logout`, {}, {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          });
          if (res.data.success) {
            localStorage.removeItem("token");
            dispatch(setUser(null)); 
            dispatch(resetPengaduanUser());
            navigate("/");
            toast.success(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response?.data?.message || "Logout failed");
        }
    };

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                    <h1 className="text-2xl font-bold">Kita<span className="text-green-700">Bicarakan</span></h1>
                </div>
                <div className="flex items-center gap-3">
                    <ul className="flex font-medium items-center gap-5">
                        {/* Tambahkan class "text-green-700 font-semibold" jika active */}
                        <li>
                            <Link 
                                to='/' 
                                className={`hover:text-green-700 transition ${location.pathname === '/' ? 'text-green-700 font-semibold underline' : ''}`}
                            >
                                Beranda
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/tentangkami' 
                                className={`hover:text-green-700 transition ${location.pathname === '/tentangkami' ? 'text-green-700 font-semibold underline' : ''}`}
                            >
                                Tentang Kami
                            </Link>
                        </li>
                        <li>
                            <Link 
                                to='/ajukanpengaduan' 
                                className={`hover:text-green-700 transition ${location.pathname === '/ajukanpengaduan' ? 'text-green-700 font-semibold underline' : ''}`}
                            >
                                Ajukan Pengaduan
                            </Link>
                        </li>
                    </ul>
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to="/login"><Button variant="outline">Masuk</Button></Link>
                            <Link to="/register"><Button className="bg-blue-600 hover:bg-blue-700">Daftar</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger>
                                <Avatar>
                                    <AvatarImage src={user.profile_picture} alt="Profile" className="object-cover" />
                                </Avatar>
                            </PopoverTrigger>
                            <PopoverContent className="w-80">
                                <div>
                                    <div className="flex gap-2 space-y-2">
                                        <Avatar>
                                            <AvatarImage src={user.profile_picture} alt="Profile" className="object-cover" />
                                        </Avatar>
                                        <h1 className="font-medium">{user.nama}</h1>
                                    </div>
                                    <div className="flex flex-col my-2 text-gray-600">
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <Settings />
                                            <Link to='/pengaturan'>
                                                <Button variant="link">Pengaturan</Button>
                                            </Link>
                                        </div>
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <NotebookText />
                                            <Link to='/pengaduansaya'>
                                                <Button variant="link">Data Pengaduan</Button>
                                            </Link>
                                        </div>
                                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                                            <LogOut />
                                            <Button variant="link" onClick={logoutHandler}>Keluar</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Navbar
