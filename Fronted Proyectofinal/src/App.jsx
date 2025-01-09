import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header/Header'
import Filter from './components/filter/filter'
import Footer from './components/footer/footer'
import AddAlojamientoForm from './pages/accommodationReg/accommodationReg'
import ContactUs from './pages/contactUs/contactUs'
import FilterHome from './pages/filterHome/filterHome'
import HelpComponent from './pages/help/help'
import Heroe from './pages/heroe/heroe'
import HostingCard from './pages/hostingView/hostingView'
import LoginUser from './pages/login/login'
import RegisterUser from './pages/register/register'
function App() {
  const location = useLocation()

  // Rutas donde NO quieres que aparezca el filtro
  const noFilterRoutes = [
    '/help',
    '/contactUs',
    '/login',
    '/register',
    '/add-house'
  ]
  const isDetailPage = location.pathname.startsWith('/detail/')

  return (
    <div className='app-container'>
      <>
        <Header />
        {/* Renderiza el filtro solo si la ruta actual no está en la lista y no es la página de detalles */}
        {!noFilterRoutes.includes(location.pathname) && !isDetailPage && (
          <Filter />
        )}
        <Routes>
          <Route path='/' element={<Heroe />} />
          <Route path='/help' element={<HelpComponent />} />
          <Route path='/contactUs' element={<ContactUs />} />
          <Route path='/filterhome' element={<FilterHome />} />
          <Route path='/detail/:id' element={<HostingCard />} />
          <Route path='/login' element={<LoginUser />} />
          <Route path='/register' element={<RegisterUser />} />
          <Route path='/add-house' element={<AddAlojamientoForm />} />
        </Routes>
      </>
      <Footer />
    </div>
  )
}

export default App
