import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
//rafce
const Books = () => {

const [books, setBooks] = useState([])

useEffect(()=>{
const fetchAllBooks = async ()=>{
    try {
      const res = await axios.get("http://localhost:8800/books")  
      setBooks(res.data)
      console.log(res)
    }catch(err){
        console.log(err)
    }
}
fetchAllBooks()
},[])


const handleDelete = async (id)=>{
    try{
    await axios.delete("http://localhost:8800/books/"+id)
    window.location.reload()
    }catch(err){
        console.log(err)
    }
}

  return (
    <div>
  <h1>Lama Book Shop</h1>
  <div className="books">
    {books.map(book=>(
    <div className="book" key={book.id}>
      {book.cover &&  <img src={book.cover} alt="" />}
      <h2>{book.title}</h2>
      <p><strong>{book.description}</strong></p>
     <span>${book.price}</span>
     <button className="delete" onClick={()=>handleDelete(book.id)}>
        Delete
     </button>
     <button className="update">
       <Link to={`/update/${book.id}`}>Update</Link>
     </button>
    </div>
    ))}
  </div>
  <button className='addBookButton'>
   <Link to="/add">Add new Book</Link>
  </button>
    </div>
  )
}

export default Books
