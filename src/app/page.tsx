"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { userAxiosInstance } from "./api/axiosInstance";
import { AxiosError } from 'axios';

interface AllBooks {
    _id: string;
    _source: Book;
}
interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    isbn: string;
    image: string;
}
export default function Home() {
    const [books, setBooks] = useState<AllBooks[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await userAxiosInstance.get("/books");
                setBooks(response.data.books);
            } catch (error) {
                if (error instanceof AxiosError) {
                    if (error.response && error.response.status === 400) {
                        toast.error(error.response.data.message);
                    } else {
                        toast.error("An error occurred. Try again later.");
                    }
                } else {
                    toast.error("An unexpected error occurred.");
                }
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="text-white min-h-screen">
            <section className="relative bg-gray-800 text-white h-[90vh] flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: 'url("/books_images/Home.jpg")' }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="relative z-10 w-full p-6">
                    <div className="text-center mt-20">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4">
                            Discover Your Next Favorite Book
                        </h1>
                        <p className="text-lg md:text-xl mb-6">
                            Explore our vast collection of books from all genres
                            and authors.
                        </p>
                        <Link href="/books">
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
                    <p className="text-lg text-gray-300 mt-2">
                        Read your favourites
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl">
                {books.map((book, index) => (
                            <Link href={`/book/${book._id}`} key={book._id || index}>
                                <div
                                    key={index}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden p-4 flex flex-col justify-between h-80 w-60">
                                    <img
                                        src={`/books/${book._source.image}`}
                                        alt={book._source.title}
                                        className="object-cover w-full h-64 border-2 border-gray-800 rounded-md"
                                    />
                                    <div className="p-4 flex flex-col justify-center text-center">
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                            {book._source.title.length > 17
                                                ? `${book._source.title.substring(
                                                      0,
                                                      10
                                                  )}..`
                                                : book._source.title}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </section>
        </div>
    );
}
