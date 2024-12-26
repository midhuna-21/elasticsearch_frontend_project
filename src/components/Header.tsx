"use client"
import { clearUser } from "@/reduxStore/slice/userSlice";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/reduxStore/store";

const Header = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const user = useSelector((state:RootState)=>state?.user?.userInfo?.user)
    const name = user?.name
    const dispatch = useDispatch()
    const router = useRouter()  
    useEffect(() => {
        const token = localStorage.getItem("useraccessToken");
        if (token) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);


    const handleLogout = async()=>{
      try{
        dispatch(clearUser())
        router.push('/login')
      }catch(error:any){
        console.error('error occurred while logout')
        toast.error(error)
      }
    }
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
                <button className=" px-4 py-2 rounded-md hover:border transition">
                    Login
                </button>
            ) : (
                <button
                    onClick={handleLogout}
                    className="ml-4 px-4 py-2  hover:border">
                    Logout
                </button>
            )}
        </header>
    );
};

export default Header;
