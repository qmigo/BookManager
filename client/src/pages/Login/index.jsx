import React, { useState } from 'react'
// import '@/component/Navbar/style.css'
import './style.css'


import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {

  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async()=>{
    const emailValid = (email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,email))
    const passwordValid = password.length>5
    
    if(!emailValid)
    {
      toast("Use Valid email")
      return
    }
    
    if(!passwordValid)
    {
      toast("Password should be greater than 5 chars")
      return
    }
    
    try {
      const {data} = await axios.post(`${process.env.URL}/auth/login`,{
        email, password
      })
      localStorage.setItem('book_manager_token', data.token)
      localStorage.setItem('book_manager_id', data.id)
      navigate(`/user/${data.id}`)
      window.location.reload(false)
      
    } catch (error) {
      toast(error.response.data.msg)
    }

  }

  return (
    <div className='signin'>
      <h1>Welcome</h1>
      <div className="signin-options">
        
        <div className="signin-block user-email">
          <label htmlFor="email">Email</label>
          <input type="text" name='email' onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        
        <div className="signin-block user-password">
          <label htmlFor="password">Password</label>
          <input type="password" name='password' onChange={(e)=>{setPassword(e.target.value)}}/>
        </div>
        
        <button className='btn btn-outline-dark' onClick={handleSubmit}>Login</button>
        <Link className='text-center' to='/signup'>Not Registered , then Sign Up now...</Link>
      </div>
    </div>
  )
}

export default Login
