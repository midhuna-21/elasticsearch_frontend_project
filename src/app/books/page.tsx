"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import debounce from "lodash.debounce";
import Link from "next/link";
import { userAxiosInstance } from "../api/axiosInstance";

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
const Books = () => {
    const [books, setBooks] = useState<AllBooks[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchBooks(searchTerm, page);
    }, [page]);

    useEffect(() => {
        const debouncedSearch = debounce(() => fetchBooks(searchTerm, 1), 300);
        debouncedSearch();
        return () => debouncedSearch.cancel();
    }, [searchTerm]);

    const fetchBooks = async (search: string = "", page: number = 1) => {
        try {
            setLoading(true);
            const searchQuery = search.trim();
            // const response = await axios.get(
            //     `http://localhost:8000/api/user/books`,
            //     { params: { page, search: searchQuery } }
            // );
            const response = await userAxiosInstance.get("/books", {
                params: { page, search: searchQuery },
            });
            setBooks(response.data.books);
            setTotalPages(response.data.totalPages);
            setLoading(false);
        } catch (error: any) {
            console.error("error occurred");
            toast.error(error.message);
        }
    };
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setPage(1);
    };
    const handlePagination = (pageNumber: number) => {
        setPage(pageNumber);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 mt-20">
                <div className="mb-8 w-full max-w-md ">
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full p-2 border bg-gray-100 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {[...Array(8)].map((_, index) => (
                        <div
                            key={index}
                            className="animate-pulse bg-gray-500 shadow-md w-72 h-80 mx-auto rounded"></div>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <>
            <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 mt-20 ">
                <div className="mb-8 w-full max-w-md ">
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full p-2 border bg-gray-100 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-7xl">
                    {books.length === 0 ? (
                        <div className="col-span-full text-center mt-32 text-2xl justify-center text-gray-400">
                            Currently books are not available!
                        </div>
                    ) : (
                        books.map((book, index) => (
                            <Link href={`/book/${book._id}`}>
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
                        ))
                    )}
                </div>
            </div>
            <div className="mt-8 flex justify-center">
                {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((pageNumber) => (
                    <button
                        key={pageNumber}
                        onClick={() => handlePagination(pageNumber)}
                        className={`w-10 h-10 mx-1 text-white rounded-full flex items-center justify-center border-2 border-white ${
                            page === pageNumber
                                ? "bg-gray-500"
                                : " hover:bg-gray-600"
                        }`}>
                        {pageNumber}
                    </button>
                ))}
            </div>
        </>
    );
};

export default Books;
