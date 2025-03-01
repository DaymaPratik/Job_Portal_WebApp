/* eslint-disable no-unused-vars */
import React, { useContext,useEffect, useState } from 'react'
import { SideBarContext } from '../context/SideBarContextProvider';
import Sidebar from '../Components/Sidebar';
import { AdminAuthContext } from '../context/AdminAuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";


function AuthPage() {
   const {showSidebar,setShowSidebar,}=useContext(SideBarContext);
   const {adminAuthObject,setAdminAuthObject,
    setIsAdminLoggedIn}=useContext(AdminAuthContext);
    const [invalidCredentials,setInvalidCredentials]=useState(false);
    const [emptyCredentials,setEmptyCredentials]=useState(false);
    const [showPassword,setShowPasword]=useState(false);
    const navigate=useNavigate();



   const loginUserFunction=async(e)=>{
    e.preventDefault();
    // console.log(adminAuthObject);
    if(adminAuthObject.username=="" || adminAuthObject.password==""){
      setInvalidCredentials(false);
      setEmptyCredentials(true);
    }
    try {
      const response=await fetch('https://job-portal-webapp-5wai.onrender.com/api/loginUser',{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
      },
        credentials:"include",
        body:JSON.stringify(adminAuthObject),
        
      })
      const data=await response.json();
      if(!(response.ok)){
        setEmptyCredentials(false);
        setInvalidCredentials(true);
      }
      // console.log(data);
      if(data.success){
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('isAdminLoggedIn',JSON.stringify(true));
      setAdminAuthObject({
        username:'',
        password:''
      })
      toast.success('Admin Logged In Successfully!', {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: false,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
      navigate('/adminDashboard')
      }
      
    } catch (error) {
      console.log("Error in frontend while siging in user",error);
      
    }
   }
    

   const handleChange=(e)=>{
    const {name,value}=e.target;
    setAdminAuthObject({
      ...adminAuthObject,
      [name]:value
    })
   }


   useEffect(()=>{ 
    setShowSidebar(false);
},[])
  return (
    <main className='flex justify-center items-center bg-no-repeat bg-cover bg-center w-full min-h-screen h-fit
    bg-[url("https://images.unsplash.com/photo-1566410824233-a8011929225c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
    
    {showSidebar &&  <Sidebar/>}
     <section className='w-[90%] min-[480px]:w-[400px] rounded-[20px] shadow-[0px_0px_10px_1px_white] text-white py-5 bg-[#03111d80]'>
      <h4 className='text-[25px] min-[480px]:text-[30px] font-semibold text-center py-3'>Admin Login Form</h4>
     <form action="" className=' flex flex-col justify-center items-center w-full gap-2 min-[480px]:gap-5 text-[20px] min-[480px]:text-[25px] text-center' >
        <div className=' flex flex-col w-full px-5'>
        <label htmlFor="username" className='py-3 font-semibold'>Enter Username</label>
        <input type="text" id='username' className=' bg-[#abbff8b3] focus:outline-none rounded-[5px] 
        py-1 px-2 ' placeholder='Username....' 
        value={adminAuthObject.username}
        onChange={handleChange}
        name="username"
        />
        </div>



        <div className='flex flex-col w-full px-5'>
        <label htmlFor="password" className='py-3 font-semibold'>Enter Password</label>
         <div className='flex justify-center items-center bg-[#abbff8b3] rounded-[5px] py-1 px-2'>
         <input
         type={showPassword ? "text" : "password"}
         id='password'className=' focus:outline-none w-[90%]' placeholder='Password....' 
        value={adminAuthObject.password}
        onChange={handleChange}
        name="password"
        />
        {
          showPassword
          ?
          <FaEyeSlash className='text-[30px] hover:text-[#ff0000] cursor-pointer duration-150 ease-in-out transition text-[#3a2020]' onClick={()=>{setShowPasword(false)}}/>
          :
          <FaEye className='text-[35px] hover:text-[#ff0000] cursor-pointer duration-150 ease-in-out transition  text-[#3a2020] ' onClick={()=>{setShowPasword(true)}}/>
        }
         </div>
        </div>

          {
            invalidCredentials
            &&
            <h5 className='font-semibold w-[90%] text-[17px] min-[400px]:text-[20px] min-[480px]:text-[25px]  bg-[#ff000099] p-2 rounded-[10px] my-2'>Invalid Email or Password</h5>
          }

          {
            emptyCredentials
            &&
            <h5 className='font-semibold w-[90%] text-[17px] min-[400px]:text-[20px] min-[480px]:text-[25px] bg-[#ff000099] p-2 rounded-[10px] my-2'>All Fields Required</h5>
          }


        <button className='text-[25px] min-[480px]:text-[30px] font-semibold w-[90%] py-1 min-[480px]:py-2 my-1 min-[480px]:my-3 bg-[red] rounded-[5px] ' 
        onClick={(e)=>{loginUserFunction(e)}}>
          Login
        </button>
      </form>
     </section>
    </main>
  )
}

export default AuthPage