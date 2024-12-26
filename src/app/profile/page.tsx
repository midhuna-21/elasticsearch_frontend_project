"use client";
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ProfilePage(){
   const router = useRouter()
   const [data,setData] = useState("nothing")
   const onLogout = async()=>{
      try{
         await axios.get('/api/users/logout')
         toast.success("Logout successfully")
         router.push('/login')
      }catch(error:any){
         console.log(error.message)
         toast.error(error.message)
      }
   }

   const getUserDetails = async()=>{
     try{
      const res = await axios.get('/api/users/me')
      setData(res.data.data._id)
     }catch(error:any){
      toast.error(error.message)
     }
   }
   return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
         <h1>Profile</h1>
         <hr/>
         <h2>{data==='nothing'?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
         <p>Profile page</p>
         <hr />
         <button onClick={getUserDetails} className=" bg-green-800">
            GetUser Details
         </button>
         <button onClick={onLogout} className=" bg-pruple-900">
            Logout
         </button>
      </div>
   )
}