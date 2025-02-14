import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Avatar, AvatarImage } from './ui/avatar';
import { LogOut, NotebookText, Settings, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BACKEND_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { setUser } from '@/redux/authSlice';
import { resetPengaduanUser } from '@/redux/pengaduanSlice';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

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
        <div className="bg-white shadow-md sticky top-0 z-50 w-full">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
                <div>
                    <h1 className="text-2xl font-bold">Kita<span className="text-green-700">Bicarakan</span></h1>
                </div>
                
                <div className="hidden md:flex items-center gap-5">
                    <ul className="flex font-medium items-center gap-5">
                        <li>
                            <Link to='/' className={`hover:text-green-700 transition ${location.pathname === '/' ? 'text-green-700 font-semibold underline' : ''}`}>Beranda</Link>
                        </li>
                        <li>
                            <Link to='/tentangkami' className={`hover:text-green-700 transition ${location.pathname === '/tentangkami' ? 'text-green-700 font-semibold underline' : ''}`}>Tentang Kami</Link>
                        </li>
                        <li>
                            <Link to='/ajukanpengaduan' className={`hover:text-green-700 transition ${location.pathname === '/ajukanpengaduan' ? 'text-green-700 font-semibold underline' : ''}`}>Ajukan Pengaduan</Link>
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
                                        <Link to='/pengaturan' className="flex w-fit items-center gap-2 cursor-pointer">
                                            <Settings />
                                            <Button variant="link">Pengaturan</Button>
                                        </Link>
                                        <Link to='/pengaduansaya' className="flex w-fit items-center gap-2 cursor-pointer">
                                            <NotebookText />
                                            <Button variant="link">Data Pengaduan</Button>
                                        </Link>
                                        <div className="flex w-fit items-center gap-2 cursor-pointer" onClick={logoutHandler}>
                                            <LogOut />
                                            <Button variant="link">Keluar</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center">
                    <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
                        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
            
            {isOpen && (
                <div className="md:hidden flex flex-col gap-4 p-4 bg-white shadow-md border-t">
                    {user && (
                        <div className="flex items-center gap-3 border-b pb-3">
                            <Avatar>
                                <AvatarImage src={user.profile_picture} alt="Profile" className="object-cover" />
                            </Avatar>
                            <div>
                                <h1 className="font-medium">{user.nama}</h1>
                                <Link to='/pengaturan' onClick={() => setIsOpen(false)} className="text-sm text-green-700">Pengaturan</Link>
                            </div>
                        </div>
                    )}
                    <Link to='/' onClick={() => setIsOpen(false)} className={`hover:text-green-700 transition ${location.pathname === '/' ? 'text-green-700 font-semibold underline' : ''}`}>Beranda</Link>
                    <Link to='/tentangkami' onClick={() => setIsOpen(false)} className={`hover:text-green-700 transition ${location.pathname === '/tentangkami' ? 'text-green-700 font-semibold underline' : ''}`}>Tentang Kami</Link>
                    <Link to='/ajukanpengaduan' onClick={() => setIsOpen(false)} className={`hover:text-green-700 transition ${location.pathname === '/ajukanpengaduan' ? 'text-green-700 font-semibold underline' : ''}`}>Ajukan Pengaduan</Link>
                    {user && (
                        <Link to='/pengaduansaya' onClick={() => setIsOpen(false)} className="hover:text-green-700 transition">Data Pengaduan</Link>
                    )}
                    {!user ? (
                        <>
                            <Link to="/login" onClick={() => setIsOpen(false)}><Button variant="outline" className="w-full">Masuk</Button></Link>
                            <Link to="/register" onClick={() => setIsOpen(false)}><Button className="bg-blue-600 hover:bg-blue-700 w-full">Daftar</Button></Link>
                        </>
                    ) : (
                        <Button variant="outline" onClick={logoutHandler} className="w-full">Keluar</Button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
