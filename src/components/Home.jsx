import React, { useEffect } from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LayananKami from './LayananKami'
import Footer from './Footer'
import TataCaraPengaduan from './TataCaraPengaduan'

const Home = () => {
  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      if (user.role === 'masyarakat') {
        navigate('/');
      } else if (user.role === 'admin' || user.role === 'petugas') {
        navigate('/admin');
      }
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <HeroSection />
      <LayananKami/>
      <TataCaraPengaduan/>
      <Footer/>
    </div>
  )
}

export default Home
