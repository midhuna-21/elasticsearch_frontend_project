"use client";
import { clearUser } from "@/reduxStore/slice/userSlice";
import Link from "next/link";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/reduxStore/store";
import { useEffect, useState } from "react";
import { AxiosError } from 'axios';
import { userAxiosInstance } from "@/app/api/axiosInstance";

const Header = () => {
    const [isHydrated, setIsHydrated] = useState(false);
    const user = useSelector((state: RootState) => state?.user?.userInfo?.user);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        setIsHydrated(true); 
    }, []);

    const handleLogout = async () => {
        try {
            dispatch(clearUser());
            await userAxiosInstance.post('/logout',{},{
                withCredentials: true  ,
                headers: {
                   "Content-Type": "application/json",
               }})
            router.push("/login");
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

    if (!isHydrated) return null;

    return (
        <header className="absolute top-0 left-0 w-full flex items-center justify-between p-6 bg-transparent text-white z-20">
            <div className="flex items-center gap-4">
                <h1 className="text-lg font-bold">THE BOOKTOWN</h1>
            </div>
            <nav className="hidden md:flex gap-6">
                <Link href="/" className="hover:underline">
                    Home
                </Link>
                <Link href="/books" className="hover:underline">
                    Books
                </Link>
                <Link href="/createBook" className="hover:underline">
                    Create Book
                </Link>
            </nav>
            {!user ? (
                <Link href="/login" 
                onClick={handleLogout}
                className="px-4 py-2 rounded-md hover:border transition">
                    Login
                </Link>
            ) : (
                <button
                    onClick={handleLogout}
                    className="ml-4 px-4 py-2 hover:border"
                >
                    Logout
                </button>
            )}
        </header>
    );
};

export default Header;
