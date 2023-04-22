import React, { useEffect } from 'react'
import './style.css'
import {Link, useNavigate} from 'react-router-dom'

const Navbar = () => {
  
  const navigate = useNavigate()

  const token = localStorage.getItem('book_manager_token')
  const id = localStorage.getItem('book_manager_id')
  
  return (
    <div className='navbar'>
      <div className="navbar-logo">
        <span><Link to='/'>Books-Manager</Link></span>
      </div>
      <div className="navbar-btns">
        {
          !token?
          <Link className='btn btn-dark' to='/login'>Login</Link>
          :
          <>
          <Link className='btn btn-outline-dark mx-3' to={`/user/${id}`}>Dashboard</Link>
          <button className='btn btn-dark'
            onClick={()=>{
            localStorage.clear('book_manager_token'); 
            navigate('/')
          }}>Logout</button>
          </>
        }
      </div>
    </div>
  ) 
}

export default Navbar
