import React, { useEffect } from 'react'
import Navbar from './Navbar'
import HeroSection from './HeroSection'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const {user} = useSelector((store)=>store.auth)
  const navigate = useNavigate()
  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      if (user.role === 'masyarakat') {
        navigate('/');
      } else if (user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'petugas') {
        navigate('/admin');
      }
    }
  }, [user, navigate]); // Ensure to include dependencies

  return (
    <div>
      <Navbar/>
      <HeroSection/>
    </div>
  )
}

export default Home
