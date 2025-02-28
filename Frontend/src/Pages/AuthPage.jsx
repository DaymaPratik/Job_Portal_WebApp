/* eslint-disable no-unused-vars */
import React, { useContext,useEffect } from 'react'
import { SideBarContext } from '../context/SideBarContextProvider';
import Sidebar from '../Components/Sidebar';
import { AdminAuthContext } from '../context/AdminAuthContextProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function AuthPage() {
   const {showSidebar,setShowSidebar,}=useContext(SideBarContext);
   const {adminAuthObject,setAdminAuthObject,
    setIsAdminLoggedIn}=useContext(AdminAuthContext);
    const navigate=useNavigate();
   const loginUserFunction=async(e)=>{
    e.preventDefault();
    console.log(adminAuthObject);
    try {
      const response=await fetch('https://job-portal-webapp-5wai.onrender.com/api/registerUser',{
        method:"POST",
        headers: {
          "Content-Type": "application/json",
      },
        credentials:"include",
        body:JSON.stringify(adminAuthObject)
        
      })
      const data=await response.json();
      setIsAdminLoggedIn(true);
      sessionStorage.setItem('isAdminLoggedIn',JSON.stringify(true));
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
      console.log(data);
    } catch (error) {
      console.log("Error in frontend while siging in user",error);
      
    }
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
        onChange={(e)=>{setAdminAuthObject({
          ...adminAuthObject,
          username:e.target.value
        })}}
        />
        </div>
        <div className='flex flex-col w-full px-5'>
        <label htmlFor="password" className='py-3 font-semibold'>Enter Password</label>
        <input type="text" id='password'className=' bg-[#abbff8b3] focus:outline-none 
        rounded-[5px] py-1 px-2 ' placeholder='Password....' 
        value={adminAuthObject.password}
        onChange={(e)=>{
          setAdminAuthObject({
            ...adminAuthObject,
            password:e.target.value
          })
        }}
        />
        </div>
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