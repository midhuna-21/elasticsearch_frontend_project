"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { axiosUser } from "../api/axios";
import { toast } from "react-hot-toast";
import { validate } from "@/utils/validations/signup";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { AxiosError } from 'axios';

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
        useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    };

    const onSignup = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.preventDefault();
        const validationResult = validate(
            name,
            email,
            password,
            confirmPassword
        );
        if (validationResult !== true) {
            toast.error(validationResult);
            return;
        }
        try {
         
            const response = await axiosUser.post("/signup", {
                name,
                email,
                password,
            });
            if (response.status == 200) {
                toast.success("signup is successfull");
            }
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-8 ">
            <div className="bg-white p-6 rounded-lg shadow-md w-full sm:w-96">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-600">
                    Signup
                </h1>
                <form>
                    <input
                        className="w-full p-3 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                        id="username"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

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
                    <div className="relative">
                        <div className="mb-6">
                            <input
                                className="w-full p-3 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                id="password"
                                type={isPasswordVisible ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                                onClick={togglePasswordVisibility}>
                                {isPasswordVisible ? <HiEyeOff /> : <HiEye />}
                            </button>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="mb-6">
                            <input
                                className="w-full p-3 mt-2 border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                                id="confirmpassword"
                                type={
                                    isConfirmPasswordVisible
                                        ? "text"
                                        : "password"
                                }
                                placeholder="Enter confirmpassword"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                            />
                        </div>
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-700"
                            onClick={toggleConfirmPasswordVisibility}>
                            {isConfirmPasswordVisible ? (
                                <HiEyeOff />
                            ) : (
                                <HiEye />
                            )}
                        </button>
                    </div>
                    <button
                        type="button"
                        onClick={onSignup}
                        className="w-full md:w-32 h-10   bg-gradient-to-r from-orange-500 via-orange-700 to-orange-800 text-white font-bold cursor-pointer rounded-lg mt-4 flex items-center justify-center text-xs hover:from-orange-600 hover:via-orange-900 hover:to-orange-800">
                        Signup
                    </button>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="text-blue-500 hover:underline">
                                Login here
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
