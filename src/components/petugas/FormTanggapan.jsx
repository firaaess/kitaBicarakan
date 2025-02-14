import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import store from "@/redux/store";
import axios from "axios";
import { BACKEND_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const FormTanggapan = () => {
  const { id } = useParams(); // Mengambil ID dari params
  const { user } = useSelector((store) => store.auth);
  const [tanggapan, setTanggapan] = useState(""); // Untuk tanggapan
  const [foto, setFoto] = useState(null); // Untuk foto (file)
  const [loading, setLoading] = useState(false);
  const userId = user.id; // Simulasikan userId dari auth (gunakan auth logic aslinya)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi sederhana
    if (!tanggapan || !foto) {
      alert("Tanggapan dan foto harus diisi!");
      return;
    }

    // Siapkan data untuk dikirim
    const formData = new FormData();
    formData.append("tanggapan", tanggapan);
    formData.append("foto", foto);
    formData.append("userId", userId);
    formData.append("pengaduanId", id);

    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // Get token from localStorage
      const res = await axios.post(
        `${BACKEND_API_END_POINT}/add/${id}/tanggapan`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in Authorization header
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        navigate("/petugas/pengaduan");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);

      // Periksa apakah ada respons error dari server
      if (error.response) {
        const { message, error: errorData } = error.response.data;

        // Tampilkan pesan error dari server jika ada
        if (message) {
          toast.error(message); // Menampilkan pesan seperti "Tanggapan untuk pengaduan ini sudah ada"
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
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-6">
        <Link to="/petugas/pengaduan">
          <Button variant="link">
            <ArrowLeft /> Kembali
          </Button>
        </Link>
        <h2 className="flex-grow text-center text-xl font-semibold text-gray-800">
          Memberi Tanggapan
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Input Tanggapan */}
        <div className="mb-4">
          <Label
            htmlFor="tanggapan"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tanggapan
          </Label>
          <Textarea
            id="tanggapan"
            placeholder="Masukkan tanggapan..."
            className="resize-none h-52"
            value={tanggapan}
            onChange={(e) => setTanggapan(e.target.value)}
          />
        </div>

        {/* Input Foto */}
        <div className="my-10">
          <label
            htmlFor="foto"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Foto
          </label>
          <Input
            type="file"
            id="foto"
            accept="image/*"
            onChange={(e) => setFoto(e.target.files[0])}
          />
        </div>

        {/* Tombol Kirim */}
        <div className="mt-10">
        {loading ? (
            <Button className='w-full my-4'><Loader2 className='mr-2 h-4 w-4' />Tunggu sebentar...</Button>
          ) : (
            <Button type='submit' className='w-full my-4'>Kirim</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FormTanggapan;
