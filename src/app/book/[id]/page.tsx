"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { FaEdit, FaTrash } from "react-icons/fa";
import Link from "next/link";
import { userAxiosInstance } from "@/app/api/axiosInstance";

interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    publishedYear: string;
    isbn: string;
    image: string;
}

const BookDetails = () => {
    const { id } = useParams();
    const router = useRouter();
    const [book, setBook] = useState<Book | null>(null);
    const [isExpanded, setIsExpanded] = useState(false);
    const [bookId, setBookId] = useState("");
    useEffect(() => {
        if (id) fetchBook(id as string);
    }, [id]);

    const fetchBook = async (bookId: string) => {
        try {
            const response = await userAxiosInstance.get(`/book/${id}`
            );
            setBookId(response.data.book._source.bookId);
            setBook(response.data.book._source);
        } catch (error: any) {
            toast.error("Failed to fetch book details.");
        }
    };

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };
    const handleDelete = async () => {
        const response = await userAxiosInstance.post(`/book/delete/${id}/${bookId}`
        );
        router.push("/books");
    };

    if (!book) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading book details...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 mt-20">
            <div className="w-100 h-full p-2 flex flex-col md:flex-row justify-center space-y-1 md:space-y-0 md:space-x-5 border-2">
                <div className="w-80 h-96 flex justify-center items-center">
                    <img
                        src={
                            book.image
                                ? `/books/${book.image}`
                                : "/placeholder.png"
                        }
                        alt={book.title}
                        className="w-72 h-96 object-cover shadow-md"
                    />
                </div>

                <div className="md:w-1/2 w-full mx-auto p-6 rounded-lg space-y-5">
                    <h1 className="text-lg md:text-xl font-bold mb-4">
                        {book.title}
                    </h1>

                    <p className="mb-2 flex items-center">
                        <span className="font-semibold w-40 text-sm">
                            AUTHOR
                        </span>{" "}
                        <span>{book.author}</span>
                    </p>
                    <p className="mb-2 flex items-center">
                        <span className="font-semibold w-40 text-sm">
                            PUBLISHED YEAR
                        </span>{" "}
                        <span>{book.publishedYear}</span>
                    </p>
                    <p className="mb-2 flex items-center">
                        <span className="font-semibold text-sm w-40">ISBN</span>
                        <span>{book.isbn}</span>
                    </p>

                    <p className="mb-2 flex items-center">
                        <span className="font-semibold w-40 text-sm">EDIT</span>
                        <Link href={`/bookEdit/${id}`}>
                            <FaEdit className="text-blue-600 text-2xl hover:text-blue-500 transition duration-150" />
                        </Link>
                    </p>
                    <p className="mb-2 flex items-center">
                        <span className="font-semibold w-40 text-sm">
                            DELETE
                        </span>

                        <FaTrash
                            onClick={() => handleDelete()}
                            className="text-red-600 cursor-pointer text-2xl hover:text-red-500 transition duration-150"
                        />
                    </p>

                    <p className="mb-5 text-sm">
                        <span className="font-semibold">ABOUT</span>
                        <div className="flex items-center w-3/4 sm:w-1/2">
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>
                        <span
                            className={`${
                                isExpanded ? "" : "line-clamp-2"
                            } transition-all duration-300 ease-in-out text-gray-300`}>
                            {book.description}
                        </span>
                        {book.description.length > 100 && (
                            <button
                                onClick={toggleReadMore}
                                className="text-blue-600 cursor-pointer hover:underline px-2">
                                {isExpanded ? "Read less" : "Read more"}
                            </button>
                        )}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
