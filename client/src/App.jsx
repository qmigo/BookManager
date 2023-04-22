import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '@/pages/Home'
import Signup from '@/pages/Signup'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import Navbar from '@/component/Navbar'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <div className='app'>
      <ToastContainer autoClose={5000}
      position="top-right"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={true}
      theme="light"
      />
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/user/:userId' element={<Dashboard/>}/>
      </Routes>
    </div>
  )
}

export default App
