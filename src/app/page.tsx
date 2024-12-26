"use client";
import Link from "next/link";
import React,{useState,useEffect} from "react";
import toast from "react-hot-toast";
import { axiosUser } from "./api/axios";

interface Book{
  _id:string,
  title:string,
  author:string,
  description:string,
  isbn:string,
  image:string
}
export default function Home() {

  const [searchQuery, setSearchQuery] = useState("");
  const [books,setBooks] = useState<Book[]>([]); 
   
  useEffect(()=>{
    const fetchBooks=async()=>{
      try{
        const response = await axiosUser.get('/books')
        setBooks(response.data.books)
        console.log(books)
      }catch(error:any){
        console.error('error occurred')
        toast.error(error.message)
      }
     } 
     fetchBooks()
  },[])


  return (
    <div className="text-white min-h-screen">
  <section className="relative bg-gray-800 text-white h-[90vh] flex items-center justify-center">
    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url("/books_images/Home.jpg")' }} />
    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
    <div className="relative z-10 w-full p-6">
      <div className="text-center mt-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Discover Your Next Favorite Book</h1>
        <p className="text-lg md:text-xl mb-6">Explore our vast collection of books from all genres and authors.</p>
        <Link href='/bookList'>
        <button className="bg-[#bfa27a] px-6 py-3 rounded-md hover:bg-[#bfa77e]-700">
          Find Books
        </button>
        </Link>
      </div>
    </div>
  </section>
<section className="py-12 px-6">
  <div className="text-center mb-8 flex flex-col">
  <h2 className="text-3xl font-semibold text-gray-100 tracking-wide uppercase relative inline-block">
  <span>BOOKS FOR YOU</span>
  <div className="flex justify-center items-center mt-2"></div>
</h2>
<p className="text-lg text-gray-300 mt-2">Read your favourites</p>

  </div>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
    {books.map((book) => (
      <div
        key={book._id}
        className="bg-white rounded-lg shadow-lg overflow-hidden p-4 flex flex-col justify-between"
      >
        <img
          src={`/books/${book.image}`} 
          alt={book.title}
          className="object-cover w-full h-64 border-2 border-gray-800 rounded-md"
        />
        <div className="p-4 flex flex-col justify-center text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{book.title}</h3>
          <p className="text-sm text-gray-700 mb-4">Written by  {book.author}</p>
          <p className="text-sm text-gray-500">{book.description}</p>
        </div>
      </div>
    ))}
  </div>

</section>
   
    </div>
  );
}
