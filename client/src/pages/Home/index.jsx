import React, { useEffect, useState } from 'react'
// import '@/component/Navbar/style.css'
import './style.css'


import {AiOutlineSearch} from 'react-icons/ai'
import axios from 'axios'
import { toast } from 'react-toastify'

const Home = () => {

  const [books, setBooks] = useState(null)
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)

  useEffect(()=>{
    async function fetchData(){
      try {
        
        const {data} = await axios.get(`${process.env.URL}/book?title=${title}&author=${author}`)
        setBooks(data.books)
      } catch (error) {
        toast(error.response.data.msg)
      }
    }
    const getData = setTimeout(fetchData, 800)
    return ()=> clearTimeout(getData)
  }, [title, author])

  
  return (
    <div className='home'>
      <div className="search-container">
        <div className="book-title-filter">
        <input type="text" placeholder='Search for Book Title' onChange={(e)=>{setTitle(e.target.value)}}/>
        <AiOutlineSearch/>
        </div>
        <div className="author-filter">
        <input type="text" placeholder='Search for Author' onChange={(e)=> {setAuthor(e.target.value)}}/>
        <AiOutlineSearch/>
        </div>
      </div>
      <div className="result-container">
        <table className="table">
          <thead>
            <th scope='col'>#</th>
            <th scope='col'>Author</th>
            <th scope='col'>Title</th>
            <th scope='col'>Price</th>
          </thead>
          <tbody>
            {
              books? 
              books.map((book, index)=>(
                <tr key={index}>
                <th scope='row'>{index+1}</th>
                <td>{book.authorName}</td>
                <td>{book.title}</td>
                <td>Rs. {book.price}</td>
                </tr>
              ))
              :<tr><td>No books rightnow</td></tr> 
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
