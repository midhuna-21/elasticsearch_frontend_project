"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { FaCamera, FaTimes } from "react-icons/fa";
import { validateBook } from "@/utils/validations/book";
import {
    userAxiosInstance,
    userAxiosInstanceWithFile,
} from "@/app/api/axiosInstance";

interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    publishedYear: string;
    isbn: string;
    image: string;
}

const EditBook = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishedYear, setPublishedYear] = useState<number>(0);
    const [isbn, setIsbn] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [bookid, setBookid] = useState("");
    const [isChanged, setIsChanged] = useState(false);

    const router = useRouter();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validaionResult = await validateBook(
            title,
            description,
            author,
            isbn,
            publishedYear
        );
        if (validaionResult !== true) {
            toast.error(validaionResult);
            return;
        }

        if (!image && !imageUrl) {
            toast.error("Upload image");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("author", author);
            formData.append("isbn", isbn.toString());
            formData.append("publishedYear", publishedYear.toString());
            formData.append("bookid", bookid);
            if (image) {
                formData.append("image", image);
            }

            const response = await userAxiosInstance.post(
                `/update/${id}`,
                formData,
                {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            router.push("/books");
        } catch (error: any) {
            console.error("Signup failed", error.message);
            toast.error(error.message);
        }
    };

    const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setImage(file);
            setImageUrl(null);
            setIsChanged(true);
        }
    };

    const fetchBook = async (bookId: string) => {
        try {
            const response = await userAxiosInstanceWithFile.get(
                `/book/${bookId}`
            );
            const resBook = response.data.book._source;

            setTitle(resBook.title);
            setAuthor(resBook.author);
            setPublishedYear(resBook.publishedYear);
            setIsbn(resBook.isbn);
            setDescription(resBook.description);
            setBookid(resBook.bookId);
            setImageUrl(resBook.image);
        } catch (error: any) {
            toast.error("Error occurred while fetching book details");
        }
    };

    const removeImage = () => {
        setImage(null);
        setImageUrl(null);
    };
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        setIsChanged(true);
    };
    const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
        setIsChanged(true);
    };
    const handleIsbnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsbn(Number(e.target.value));
        setIsChanged(true);
    };
    const handlePublishedYearChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPublishedYear(Number(e.target.value));
        setIsChanged(true);
    };
    const handleDescriptionChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setDescription(e.target.value);
        setIsChanged(true);
    };

    useEffect(() => {
        fetchBook(id as string);
    }, [id]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-20 flex flex-col md:flex-row items-center">
                <div className="w-full  mb-6 md:mb-0">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-500">
                        Update Book <span className="text-gray-800">{title}</span>
                    </h2>

                    <form>
                        <div className="flex flex-row gap-4">
                            <div className="mb-4">
                                <label
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700">
                                    Book Title
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => handleTitleChange(e)}
                                    name="title"
                                    id="title"
                                    value={title}
                                    className="w-full p-3 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                    placeholder="Enter book title"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="author"
                                    className="block text-sm font-medium text-gray-700">
                                    Author
                                </label>
                                <input
                                    type="text"
                                    id="author"
                                    name="author"
                                    value={author}
                                    onChange={(e) => handleAuthorChange(e)}
                                    className="w-full p-3 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                    placeholder="Enter author name"
                                />
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="publishedYear"
                                    className="block text-sm font-medium text-gray-700">
                                    Publication Year
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) =>
                                        handlePublishedYearChange(e)
                                    }
                                    name="publishedYear"
                                    id="publishedYear"
                                    value={publishedYear}
                                    className="w-full p-3 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                    placeholder="Enter publication year"
                                />
                            </div>

                        </div>

                        <div className="flex flex-row gap-10">
                           <div className="flex flex-col">
                           <div className="mb-4">
                                <label
                                    htmlFor="isbn"
                                    className="block text-sm font-medium text-gray-700">
                                    ISBN
                                </label>
                                <input
                                    type="text"
                                    onChange={(e) => handleIsbnChange(e)}
                                    id="isbn"
                                    name="isbn"
                                    value={isbn}
                                    className="w-full p-3 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                    placeholder="Enter ISBN"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700">
                                    Description
                                </label>
                                <textarea
                                    style={{ width: "60vh", height: "25vh" }}
                                    id="description"
                                    onChange={(e) => handleDescriptionChange(e)}
                                    name="description"
                                    value={description}
                                    className="w-full p-3 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                    placeholder="Write about this book..."
                                    rows={4}
                                />
                            </div>
                           </div>

                            <div className="mb-4">
                                <div className="flex relative">
                                    {!image && !imageUrl && (
                                        <label 
                                        style={{height:"40vh",width:"30vh"}}
                                        className="flex items-center justify-center w-full mt-7 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                                            <FaCamera className="text-gray-500 text-2xl" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImage}
                                                className="hidden"
                                            />
                                        </label>
                                    )}

                                    {(image || imageUrl) && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute top-2 right-0 bg-red-500 text-white p-1 mt-4 rounded-full">
                                                <FaTimes />
                                            </button>
                                            <img
                                            style={{height:"40vh",width:"30vh"}}
                                                src={
                                                    image
                                                        ? URL.createObjectURL(
                                                              image
                                                          )
                                                        : imageUrl
                                                        ? `/books/${imageUrl}`
                                                        : undefined
                                                }
                                                alt="book"
                                                className=" mt-7 object-cover rounded-lg"
                                            />
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-4">
        <button
            style={{ width: "40vh" }}
            onClick={handleSubmit}
            type="submit"
            disabled={!isChanged}
            className={`w-full py-2 rounded-md transition ${
                isChanged
                    ? "bg-[#A8A8A8] hover:bg-[#787878]"
                    : "bg-gray-300 cursor-not-allowed"
            }`}>
            Submit
        </button>
    </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditBook;
