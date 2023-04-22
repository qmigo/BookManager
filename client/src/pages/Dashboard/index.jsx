import React, { useEffect, useState } from 'react'
// import '@/component/Navbar/style.css'
import './style.css'


import {AiOutlineDelete} from 'react-icons/ai'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import {  toast } from 'react-toastify'


const Dashboard = () => {
  const location = useLocation()
  const headers = { 'Authorization': `Bearer ${localStorage.getItem('book_manager_token')}` };
  const [authorized, setAuthorized] = useState(false)
  const [books, setBooks] = useState(null)
  const [refresh, setRefresh] = useState(null)

  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [price, setPrice] = useState(null)
  const [description, setDescription] = useState(null)

  let userId = location.pathname.split('/')
  userId = userId[userId.length-1]

  const handleDelete = async(bookId)=>{
      try {
        await axios.delete(`${process.env.URL}/book/${bookId}?userId=${userId}`,{
          headers
        })
        setRefresh("Book deleted")
      } catch (error) {
        toast(error.response.data.msg)
      }
  }

  const handleAddBook = async(e)=>{
    if(!title || !author || !price)
    {
      alert("Fields are left empty")
      return
    }
    try {
      const body = {title, price, authorName: author, description, createdBy: userId}
      const {data} = await axios.post(`${process.env.URL}/book`,body,{
        headers
      })
      
      setRefresh("book added")
    } catch (error) {
      toast(error.response.data.msg)
    }
  }

  useEffect(()=>{
    async function getData(){
      try {
        const {data} = await axios.get(`${process.env.URL}/user?userId=${userId}`,{
        headers
        })
        setAuthorized(true)
        setBooks(data.books)
      } catch (error) {
        toast(error.response.data.msg)
      }
    }
    getData()
  },[location, refresh])

  return (
    <>
    {
      authorized ? 
    <div className='dashboard my-2'>
      <div className="db-addbook">
        <h2>Add a new book</h2>
        <div className="ab ab-book-title">
          <label htmlFor="">Book Title</label>
          <input type="text" placeholder='Ex John Wick' onChange={(e)=>{setTitle(e.target.value)}}/>
        </div>
        <div className="ab ab-book-author">
          <label htmlFor="Author">Author</label>
          <input type="text" placeholder='Ex Ankur Mishra' onChange={(e)=>{setAuthor(e.target.value)}}/>
        </div>
        <div className="ab ab-book-desc">
          <label htmlFor="description">Description</label>
          <textarea className='scroll' placeholder='A brief introduction ...' rows={5} style={{resize:"none"}} onChange={(e)=>{setDescription(e.target.value)}}/>
        </div>
        <div className="ab ab-book-price">
          <label htmlFor="price">Price</label>
          <input type="number" inputMode="numeric" placeholder='Ex 5000' onChange={(e)=>{setPrice(e.target.value)}}/>
        </div>

        <button className='btn btn-success' onClick={handleAddBook}>Add Book</button>
      </div>
      <div className="db-listbooks">
        <h2 className='mx-auto'>All your books</h2>
        <div className="listbooks-container">
          
          {
            books?.map((book, index)=>(
            <span className="list-items" key={index}>
              <span className='book-title mx-3'>{book.title}</span>
              <span className='del-book mx-3' onClick={()=>{handleDelete(book._id)}}><AiOutlineDelete size={"1.4rem"}/></span>
            </span>
            ))
          }
        </div>
      </div>
    </div>
    : <h1>Login To access Dashboard</h1>
    }
    </>
  )
}

export default Dashboard
