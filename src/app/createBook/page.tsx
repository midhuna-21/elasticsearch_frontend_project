"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FaCamera } from "react-icons/fa";
import { validateBook } from "@/utils/validations/book";
import { userAxiosInstanceWithFile } from "../api/axiosInstance";

const CreateBookForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [publishedYear, setPublishedYear] = useState<number>(0);
    const [isbn, setIsbn] = useState<number>(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const router = useRouter();
    const [isChanged, setIsChanged] = useState(false);
    const initialValues = {
        title,
        author,
        publishedYear,
        isbn,
        description,
        image,
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validaionResult = await validateBook(
            title,
            description,
            author,
            isbn,
            publishedYear,
            
        );
        if (validaionResult !== true) {
            toast.error(validaionResult);
            return;
        }

        if(!image){
            toast.error('upload image')
            return;
        }
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("author", author);
            formData.append("isbn", isbn.toString());
            formData.append("publishedYear", publishedYear.toString());

            if (image) {
                formData.append("image", image);
            }

            const response = await userAxiosInstanceWithFile.post("/create",
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

    const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files[0]) {
            setImage(files[0]);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center mt-12">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-20 flex flex-col md:flex-row items-center">
                <div className="w-full md:w-1/2 mb-6 md:mb-0">
                    <h2 className="text-3xl font-bold text-center mb-6 text-gray-400">
                        Create a New Book
                    </h2>

                    <form>
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
                                onChange={(e) => handlePublishedYearChange(e)}
                                name="publishedYear"
                                id="publishedYear"
                                className="w-full p-3 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                placeholder="Enter publication year"
                            />
                        </div>

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
                                id="description"
                                onChange={handleDescriptionChange}
                                name="description"
                                className="w-full p-3 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                placeholder="Write about this book..."
                                rows={4}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer">
                                <FaCamera className="text-gray-500 text-2xl" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="mb-4">
                            {image && (
                                <div className="flex">
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Book Preview"
                                        className="w-32 h-32 object-cover rounded-lg border"
                                    />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleSubmit}
                            type="submit"
                            disabled={!isChanged}
                            className={`w-full py-2 rounded-md transition ${
                                isChanged
                                    ? "bg-[#A8A8A8] hover:bg-[#787878]"
                                    : "bg-gray-300 cursor-not-allowed"
                            }`}>
                            {" "}
                            Submit
                        </button>
                    </form>
                </div>

                <div className="md:w-1/2 md:ml-8 hidden md:block">
                    <img
                        style={{ height: "100vh" }}
                        src="/books_images/createbook.jpg"
                        alt="Person reading a book"
                        className="w-full rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateBookForm;
