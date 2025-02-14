import { setUser } from "@/redux/authSlice";
import store from "@/redux/store";
import { BACKEND_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const SideBar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Fungsi untuk menentukan kelas aktif
  const isActive = (path) =>
    location.pathname === path
      ? "bg-white text-[#CB198A] font-bold rounded-lg"
      : "hover:bg-[#A91573] hover:text-white";

  const logoutHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BACKEND_API_END_POINT}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        localStorage.removeItem("token");
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between border-e bg-[#CB198A] shadow-lg">
      {/* Header Sidebar */}
      <div className="px-6 py-8">
        <h1 className="text-3xl font-extrabold text-white">KitaBicarakan</h1>

        {/* Menu Navigation */}
        <ul className="mt-8 space-y-3 text-white">
          {user.role === "petugas" ? (
            <>
              <li>
                <Link to="/petugas" className={`block px-4 py-2 ${isActive("/petugas")}`}>
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/petugas/pengaduan" className={`block px-4 py-2 ${isActive("/petugas/pengaduan")}`}>
                  Pengaduan
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/admin" className={`block px-4 py-2 ${isActive("/admin")}`}>
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/petugas/pengaduan" className={`block px-4 py-2 ${isActive("/petugas/pengaduan")}`}>
                  Pengaduan
                </Link>
              </li>
              <li>
                <Link to="/admin/pengguna" className={`block px-4 py-2 ${isActive("/admin/pengguna")}`}>
                  Pengguna
                </Link>
              </li>
              <li>
                <Link to="/admin/kategori" className={`block px-4 py-2 ${isActive("/admin/kategori")}`}>
                  Kategori
                </Link>
              </li>
              <li>
                <Link to="/admin/lokasi" className={`block px-4 py-2 ${isActive("/admin/lokasi")}`}>
                  Lokasi
                </Link>
              </li>
              <li>
                <Link to="/admin/laporan" className={`block px-4 py-2 ${isActive("/admin/laporan")}`}>
                  Generate Laporan
                </Link>
              </li>
            </>
          )}
          <li>
            <button onClick={logoutHandler} className="block px-4 py-2 w-full text-left hover:bg-[#A91573]">
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Profile Section */}
      <div className="sticky bottom-0 w-full border-t border-gray-100">
        <a href="#" className="flex items-center gap-3 bg-[#911262] p-4 transition-all duration-200">
          <img alt="User Avatar" src={user.profile_picture} className="h-12 w-12 rounded-full object-cover border-2 border-gray-300" />
          <div>
            <p className="text-sm text-white">
              <strong className="block font-medium">{user.nama}</strong>
              <span className=" text-xs">{user.email}</span>
            </p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default SideBar;
