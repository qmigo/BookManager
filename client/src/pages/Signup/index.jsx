import React, { useState } from 'react'
// import '@/component/Navbar/style.css'
import './style.css'


import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const Signup = () => {
  const navigate = useNavigate()

  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)

  const handleSubmit = async()=>{
    if(!firstName || !lastName || !email || !password || !confirmPassword)
    {
      toast("All fields are mandatory")
      return
    }

    if(password!==confirmPassword)
    {
      toast("Password and confirm password are not same")
      return
    }

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
    const body = {firstName, lastName, email, password}
    try {
      await axios.post(`${process.env.URL}/auth/register`,body)
      navigate('/login')
    } catch (error) {
      toast(error.response.data.msg)
    }
  }

  return (
    <div className='signup'>
      <h1>Signup</h1>
      <div className="signup-options">
        <div className="signup-block user-first-name">
          <label htmlFor="firstName">First Name</label>
          <input type="text" name='firstName' placeholder='Ex Ankur' onChange={(e)=>{setFirstName(e.target.value)}}/>
        </div>

        <div className="signup-block user-last-name">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" name='lastName' placeholder='Ex Mishra' onChange={(e)=>{setLastName(e.target.value)}}/>
        </div>
        
        <div className="signup-block user-email">
          <label htmlFor="email">Email</label>
          <input type="text" name='email' placeholder='Ex ankur@mishra.com' onChange={(e)=>{setEmail(e.target.value)}}/>
        </div>
        
        <div className="signup-block user-password">
          <label htmlFor="password">Password</label>
          <input type="password" name='password' placeholder='Ex not 12345678' onChange={(e)=>{setPassword(e.target.value)}} />
        </div>
        
        <div className="signup-block user-confirm-password">
          <label htmlFor="confirm-password">Confirm Password</label>
          <input type="password" name='confirmPassword' onChange={(e)=>{setConfirmPassword(e.target.value)}}/>
        </div>

        <button className='btn btn-outline-dark' onClick={handleSubmit}>Register</button>
        <Link className='text-center' to='/login'>Already Registered , then Sign In</Link>
      </div>
    </div>
  )
}

export default Signup
