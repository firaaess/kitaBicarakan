import React, { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import store from '@/redux/store';
import useGetAllPengaduan from '@/hooks/useGetAllPengaduan';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_API_END_POINT } from '@/utils/constant';
import { Ellipsis, EllipsisVertical } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Label } from '../ui/label';
import { toast } from 'sonner';
import { setPengaduan } from '@/redux/pengaduanSlice';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const GenerateLaporan = () => {
  useGetAllPengaduan()
  const { pengaduan } = useSelector((store) => store.pengaduan);
  const { user } = useSelector((store) => store.auth);
  const { kategori } = useSelector((store) => store.kategori);
  const { lokasi } = useSelector((store) => store.lokasi);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filteredPengaduan, setFilteredPengaduan] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
 
  // Set data awal untuk filteredPengaduan
  useEffect(() => {
    setFilteredPengaduan(pengaduan);
  }, [pengaduan]);

  // Fungsi untuk memfilter data pengaduan
  const handleFilter = () => {
    const filtered = pengaduan.filter(item => {
      const formattedDate = item.created_at.split('T')[0]; // Ambil hanya bagian YYYY-MM-DD
      const matchesCategory = selectedCategory ? item.kategori_id === parseInt(selectedCategory) : true;
      const matchesLocation = selectedLocation ? item.lokasi_id === parseInt(selectedLocation) : true;
      const matchesStartDate = startDate ? new Date(formattedDate) >= new Date(startDate) : true;
      const matchesEndDate = endDate ? new Date(formattedDate) <= new Date(endDate) : true;
      return matchesCategory && matchesLocation && matchesStartDate && matchesEndDate;
    });
    setFilteredPengaduan(filtered);
  };

  useEffect(() => {
    handleFilter();
  }, [selectedCategory, selectedLocation, startDate, endDate]);

const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('Laporan Pengaduan', 14, 10);
    
    const tableColumn = ['No', 'Judul', 'Isi Pengaduan', 'Kategori', 'Lokasi', 'Status', 'Tanggal'];
    const tableRows = [];

    filteredPengaduan.forEach((item, index) => {
        const rowData = [
            index + 1,
            item.judul,
            item.isi_pengaduan,
            item.kategory.nama,
            item.lokasi.nama,
            item.status,
            item.created_at.split('T')[0] // Ubah format tanggal di PDF juga
        ];
        tableRows.push(rowData);
    });

    doc.autoTable({
        head: [tableColumn],
        body: tableRows,
        startY: 20,
    });

    doc.save('laporan_pengaduan.pdf');
};

  return (
    <div>
      <div className="flex justify-between mb-2">
        <div className='py-4'>
      <h1 className='text-2xl font-bold pb-4'>Data Pengaduan</h1>
        </div>

   <div className='flex gap-3'>
       {/* Filter Options */}
       <div className='flex flex-col gap-2'>
      <Label>Berdasarkan kategori</Label>
        <select
          className="border rounded p-2"
          onChange={(e) => setSelectedCategory(e.target.value)}
          value={selectedCategory}
        >
          <option value="">Semua Kategori</option>
          {kategori.map(category => (
            <option key={category.id} value={category.id}>{category.nama}</option>
          ))}
        </select>
      </div>

      <div className='flex flex-col gap-2'>
          <Label>Berdasarkan lokasi</Label>
        <select
          className="border rounded p-2"
          onChange={(e) => setSelectedLocation(e.target.value)}
          value={selectedLocation}
        >
          <option value="">Semua Lokasi</option>
          {lokasi.map(location => (
            <option key={location.id} value={location.id}>{location.nama}</option>
          ))}
        </select>
      </div>

      <div className='flex flex-col gap-2'>
        <Label>Tanggal Mulai</Label>
        <input type="date" className="border rounded p-2" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>

      <div className='flex flex-col gap-2'>
        <Label>Tanggal Akhir</Label>
        <input type="date" className="border rounded p-2" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
   </div>

        <Button onClick={generatePDF} variant="default">Download PDF</Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 bg-white rounded-lg">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">No</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Judul</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Isi Pengaduan</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Kategori</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Lokasi</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tanggal</th>
            </tr>
          </thead>
          <tbody>
          {filteredPengaduan.length > 0 ? (
        filteredPengaduan.map((item, index) => (
          <tr key={item.id} className="border-b hover:bg-gray-50">
            <td className="px-6 py-4 text-sm text-gray-700">{index + 1}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{item.judul}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{item.isi_pengaduan}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{item.kategory.nama}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{item.lokasi.nama}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{item.status}</td>
            <td className="px-6 py-4 text-sm text-gray-700">{item.created_at.split('T')[0]}</td>
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan="7"
            className="px-6 py-4 text-center text-sm text-gray-500"
          >
            Tidak ada data pengaduan
          </td>
        </tr>
      )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GenerateLaporan;
