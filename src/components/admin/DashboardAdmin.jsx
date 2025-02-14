import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MapPin, Newspaper, SquarePen, User2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import useGetAllPengaduan from '@/hooks/useGetAllPengaduan';
import useGetAllUser from '@/hooks/useGetAllUser';
import useGetAllKategori from '@/hooks/useGetAllKategori';
import useGetAllLokasi from '@/hooks/useGetAllLokasi';

const DashboardAdmin = () => {
  useGetAllPengaduan()
  useGetAllUser()
  useGetAllKategori()
  useGetAllLokasi()
  const { kategori } = useSelector((store) => store.kategori);
  const { lokasi } = useSelector((store) => store.lokasi);
  const { pengaduan } = useSelector((store) => store.pengaduan);
  const { allUsers } = useSelector((store) => store.auth);
  // State untuk paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  // Hitung data yang akan ditampilkan pada halaman aktif
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = pengaduan.slice(startIndex, endIndex);

  // Hitung jumlah halaman
  const totalPages = Math.ceil(pengaduan.length / itemsPerPage);

  // Fungsi untuk mengubah halaman
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  // State untuk paginasi kategori
  const [currentPageP, setCurrentPageP] = useState(1);

  // Hitung data yang akan ditampilkan pada halaman aktif
  const startIndexP = (currentPageP - 1) * itemsPerPage;
  const endIndexP = startIndexP + itemsPerPage;
  const currentDataP = allUsers.slice(startIndexP, endIndexP);

  // Hitung jumlah halaman
  const totalPagesP = Math.ceil(allUsers.length / itemsPerPage);

  // Fungsi untuk mengubah halaman
  const goToPageP = (page) => {
    if (page >= 1 && page <= totalPagesP) {
      setCurrentPageP(page);
    }
  };
  const [currentPageK, setCurrentPageK] = useState(1);

  // Hitung data yang akan ditampilkan pada halaman aktif
  const startIndexK = (currentPageK - 1) * itemsPerPage;
  const endIndexK = startIndexK + itemsPerPage;
  const currentDataK = kategori.slice(startIndexK, endIndexK);

  // Hitung jumlah halaman
  const totalPagesK = Math.ceil(kategori.length / itemsPerPage);

  // Fungsi untuk mengubah halaman
  const goToPageK = (page) => {
    if (page >= 1 && page <= totalPagesK) {
      setCurrentPageK(page);
    }
  };
  const [currentPageL, setCurrentPageL] = useState(1);

  // Hitung data yang akan ditampilkan pada halaman aktif
  const startIndexL = (currentPageL - 1) * itemsPerPage;
  const endIndexL = startIndexL + itemsPerPage;
  const currentDataL = lokasi.slice(startIndexL, endIndexL);

  // Hitung jumlah halaman
  const totalPagesL = Math.ceil(lokasi.length / itemsPerPage);

  // Fungsi untuk mengubah halaman
  const goToPageL = (page) => {
    if (page >= 1 && page <= totalPagesL) {
      setCurrentPageL(page);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold pb-4">Beranda</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <div className="flex justify-between h-28 bg-gray-200 rounded-md">
    <div className="bg-green-600 w-24 flex justify-center items-center rounded-s-md">
      <Link to='/admin/pengguna'><User2 className="w-16 h-16 text-white" /></Link>
    </div>
    <div className="mx-auto text-center">
      <h1 className="mt-2 font-medium">Pengguna</h1>
      <h1 className="text-6xl font-medium">{allUsers.length}</h1>
    </div>
  </div>
  <div className="flex justify-between h-28 bg-gray-200 rounded-md">
    <div className="bg-blue-600 w-24 flex justify-center items-center rounded-s-md">
      <Link to='/admin/kategori'><Newspaper className="w-16 h-16 text-white" /></Link>
    </div>
    <div className="mx-auto text-center">
      <h1 className="mt-2 font-medium">Kategori</h1>
      <h1 className="text-6xl font-medium">{kategori.length}</h1>
    </div>
  </div>
  <div className="flex justify-between h-28 bg-gray-200 rounded-md">
    <div className="bg-red-600 w-24 flex justify-center items-center rounded-s-md">
      <Link to='/admin/lokasi'><MapPin className="w-16 h-16 text-white" /></Link>
    </div>
    <div className="mx-auto text-center">
      <h1 className="mt-2 font-medium">Lokasi</h1>
      <h1 className="text-6xl font-medium">{lokasi.length}</h1>
    </div>
  </div>
  <div className="flex justify-between h-28 bg-gray-200 rounded-md">
    <div className="bg-cyan-400 w-24 flex justify-center items-center rounded-s-md">
      <Link to='/petugas/pengaduan'><SquarePen className="w-16 h-16 text-white" /></Link>
    </div>
    <div className="mx-auto text-center">
      <h1 className="mt-2 font-medium">Pengaduan</h1>
      <h1 className="text-6xl font-medium">{pengaduan.length}</h1>
    </div>
  </div>
</div>


      <h1 className="text-2xl font-bold py-4">Data Pengaduan</h1>
      <table className="min-w-full border border-gray-300 bg-white rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Judul</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Isi Pengaduan</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Kategori</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Lokasi</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4 text-sm text-gray-700">{startIndex + index + 1}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{item.judul}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{item.isi_pengaduan}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{item.kategory.nama}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{item.lokasi.nama}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Navigasi Halaman */}
        <div className="flex justify-end items-center gap-2 mt-4">
    <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-2 py-1 text-sm bg-gray-300 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
    >
        Previous
    </button>
    {Array.from({ length: totalPages }, (_, i) => (
        <button
        key={i}
        onClick={() => goToPage(i + 1)}
        className={`px-2 py-1 text-sm rounded-md ${
            currentPage === i + 1
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 hover:bg-gray-400'
        }`}
        >
        {i + 1}
        </button>
    ))}
    <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 text-sm bg-gray-300 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
    >
        Next
    </button>
    </div>
    <div>
        <h1 className="text-2xl font-bold">Data Pengguna</h1>
      {!currentDataP ? (
        <p>Loading</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white rounded-lg my-3">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Peran</th>
            </tr>
          </thead>
          <tbody>
            {currentDataP.length > 0 ? (
              currentDataP.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.nama}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.role}</td>
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
       {/* Navigasi Halaman */}
       <div className="flex justify-end items-center gap-2 mt-4">
    <button
        onClick={() => goToPageP(currentPageP - 1)}
        disabled={currentPageP === 1}
        className="px-2 py-1 text-sm bg-gray-300 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
    >
        Previous
    </button>
    {Array.from({ length: totalPagesP }, (_, i) => (
        <button
        key={i}
        onClick={() => goToPageP(i + 1)}
        className={`px-2 py-1 text-sm rounded-md ${
            currentPageP === i + 1
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 hover:bg-gray-400'
        }`}
        >
        {i + 1}
        </button>
    ))}
    <button
        onClick={() => goToPageP(currentPageP + 1)}
        disabled={currentPageP === totalPagesP}
        className="px-2 py-1 text-sm bg-gray-300 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
    >
        Next
    </button>
    </div>
    </div>
    <div className="flex gap-4"> 
    <div className='w-full'>
        <h1 className="text-2xl font-bold">Data Kategori</h1>
      {!currentDataK ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white rounded-lg my-3">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
            </tr>
          </thead>
          <tbody>
            {currentDataK.length > 0 ? (
              currentDataK.map((item, index) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{item.nama}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Tidak ada data kategori
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
        {/* Navigasi Halaman */}
        <div className="flex justify-end items-center gap-2 mt-4">
    <button
        onClick={() => goToPageK(currentPageK - 1)}
        disabled={currentPageK === 1}
        className="px-2 py-1 text-sm bg-gray-300 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
    >
        Previous
    </button>
    {Array.from({ length: totalPagesK }, (_, i) => (
        <button
        key={i}
        onClick={() => goToPageK(i + 1)}
        className={`px-2 py-1 text-sm rounded-md ${
            currentPageK === i + 1
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 hover:bg-gray-400'
        }`}
        >
        {i + 1}
        </button>
    ))}
    <button
        onClick={() => goToPageK(currentPageK + 1)}
        disabled={currentPageK === totalPagesK}
        className="px-2 py-1 text-sm bg-gray-300 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
    >
        Next
    </button>
    </div>
    </div>
    <div className='w-full'>
      <h1 className="text-2xl font-bold">Data Lokasi</h1>
    {!currentDataL ? (
      <p>Loading</p>
    ) : (
      <table className="min-w-full border border-gray-300 bg-white rounded-lg my-3">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
          </tr>
        </thead>
        <tbody>
          {currentDataL.length > 0 ? (
            currentDataL.map((item, index) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{item.nama}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                Tidak ada data lokasi
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )}
      {/* Navigasi Halaman */}
      <div className="flex justify-end items-center gap-2 mt-4">
    <button
        onClick={() => goToPageL(currentPageL - 1)}
        disabled={currentPageL === 1}
        className="px-2 py-1 text-sm bg-gray-300 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
    >
        Previous
    </button>
    {Array.from({ length: totalPagesL }, (_, i) => (
        <button
        key={i}
        onClick={() => goToPageL(i + 1)}
        className={`px-2 py-1 text-sm rounded-md ${
            currentPageL === i + 1
            ? 'bg-blue-500 text-white'
            : 'bg-gray-300 hover:bg-gray-400'
        }`}
        >
        {i + 1}
        </button>
    ))}
    <button
        onClick={() => goToPageL(currentPageL + 1)}
        disabled={currentPageL === totalPagesL}
        className="px-2 py-1 text-sm bg-gray-300 rounded-md hover:bg-gray-400 disabled:bg-gray-200"
    >
        Next
    </button>
    </div>
  </div>
    </div>
    </div>
  );
};

export default DashboardAdmin;
