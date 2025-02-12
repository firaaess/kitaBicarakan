import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Pengaduan from './components/Pengaduan'
import Pengaturan from './components/Pengaturan'
import DataPengaduanByUser from './components/DataPengaduanByUser'
import Layout from './components/petugas/Layout'
import Dashboard from './components/petugas/Dashboard'
import PengaduanPetugas from './components/petugas/PengaduanPetugas'
import TentangKami from './components/TentangKami'
import DetailPengaduan from './components/petugas/DetailPengaduan'
import FormTanggapan from './components/petugas/FormTanggapan'
import DataTanggapanByUser from './components/DataTanggapanByUser'
import Tanggapan from './components/petugas/Tanggapan'
import DashboardAdmin from './components/admin/DashboardAdmin'
import PenggunaAdmin from './components/admin/PenggunaAdmin'
import DetailUser from './components/admin/DetailUser'
import AddPengguna from './components/admin/AddPengguna'
import KategoriAdmin from './components/admin/KategoriAdmin'
import LokasiAdmin from './components/admin/LokasiAdmin'
import GenerateLaporan from './components/admin/GenerateLaporan'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/login',
    element: <Login/>
  },
  {
    path: '/register',
    element: <Register/>
  },
  {
    path: '/ajukanpengaduan',
    element: <Pengaduan/>
  },
  {
    path: '/tentangkami',
    element: <TentangKami/>
  },
  {
    path: '/pengaturan',
    element: <Pengaturan/>
  },
  {
    path: '/pengaduansaya',
    element: <DataPengaduanByUser/>
  },
  {
    path: '/tanggapan/:id',
    element: <DataTanggapanByUser/>
  },
  {
    path: '/petugas', // Route untuk petugas yang memiliki layout
    element: <Layout />, // Gunakan Layout untuk petugas
    children: [
      {
        path: '/petugas', // Halaman default untuk petugas
        element: <Dashboard/>,
      },
      {
        path: 'pengaduan', 
        element: <PengaduanPetugas/>,
      },
      {
        path: 'pengaduan/:id',
        element: <DetailPengaduan/>
      },
      {
        path: 'tanggapan/:id',
        element: <Tanggapan/>
      },
      {
        path: 'addtanggapan/:id',
        element: <FormTanggapan/>
      },
    ],
  },
  {
    path: '/admin', // Route untuk petugas yang memiliki layout
    element: <Layout />, // Gunakan Layout untuk petugas
    children: [
      {
        path: '/admin', // Halaman default untuk petugas
        element: <DashboardAdmin/>,
      },
      {
        path: 'pengguna', // Halaman default untuk petugas
        element: <PenggunaAdmin/>,
      },
      {
        path: 'tambah/pengguna', // Halaman default untuk petugas
        element: <AddPengguna/>,
      },
      {
        path: 'detail/pengguna/:id', // Halaman default untuk petugas
        element: <DetailUser/>,
      },
      {
        path: 'kategori', // Halaman default untuk petugas
        element: <KategoriAdmin/>,
      },
      {
        path: 'lokasi', // Halaman default untuk petugas
        element: <LokasiAdmin/>,
      },
      {
        path: 'laporan', // Halaman default untuk petugas
        element: <GenerateLaporan/>,
      },
    ],
  },
])
function App () {
  return (
      <RouterProvider router={appRouter}/>
  )
}

export default App
