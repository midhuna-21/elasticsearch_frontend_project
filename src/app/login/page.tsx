"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { HiEye, HiEyeOff } from "react-icons/hi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "@/reduxStore/slice/userSlice";
import { validateLogin } from "@/utils/validations/login";
import { axiosUser } from "../api/axios";

export default function LoginPage() {
    const dispatch = useDispatch()
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const router = useRouter()
  
    const [isPasswordVisible,setIsPasswordVisible]=useState(true);
    const togglePasswordVisibility=()=>{
        setIsPasswordVisible(!isPasswordVisible)
    }
    const onLogin = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) =>{
        e.preventDefault();
        try{
            const validationResult = validateLogin(email,password)
            if(validationResult!==true){
                toast.error(validationResult);
                return;
            }
            // const response = await axios.post('http://localhost:8000/api/user/login',{email,password},{
            //      withCredentials: true  ,
            //      headers: {
            //         "Content-Type": "application/json",
            //     },
            // })
            const response = await axiosUser.post('/login',{email,password},{
                withCredentials: true  ,
                headers: {
                   "Content-Type": "application/json",
               },
           })
          
            if(response.status==200){
                dispatch(addUser(response.data))
                 toast.success("signup is successfull");
                 router.replace("/"); 
            }
        }catch(error:any){
            if (error.response && error.response.status === 401) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An error occured try again later");
            }
        }
    };

    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 ">
            <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-600">
                    Signin
                </h1>
                <form>
                    <div className="mb-4">
                    <input
                            className="w-full p-3 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-6 relative">
                        <input
                            className="w-full p-3 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                            id="password"
                            type={isPasswordVisible ? 'password':'text'}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                        />
                        <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
                                onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? <HiEyeOff /> : <HiEye />}
                            </button>
                    </div>

                    <button
                        type="button"
                        onClick={onLogin}
                        className="w-1/2 px-4 py-2 justify-centert bg-gradient-to-r from-yellow-500 via-red-500 to-orange-500 font-bold cursor-pointer rounded-lg hover:from-orange-600 hover:via-orange-600 hover:to-orange-700"
                        
                        >
                        Signin
                    </button>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600">
                        Don't have an account?{" "}
                            <Link
                                href="/signup"
                                className="text-blue-500 hover:underline">
                                Signup here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
