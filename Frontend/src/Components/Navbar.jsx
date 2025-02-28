import React, { useContext } from 'react'
import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { SideBarContext } from '../context/SideBarContextProvider';
import { GiCrossMark } from "react-icons/gi";
import { AdminAuthContext } from '../context/AdminAuthContextProvider';
import { toast } from 'react-toastify';

function Navbar() {
    const {showSidebar,changeVisibility}=useContext(SideBarContext);
     const {isAdminLoggedIn,setIsAdminLoggedIn}=useContext(AdminAuthContext);
  return (
   <nav className='flex justify-between items-center px-3 md:px-10 py-2 text-white bg-[#000000bf] fixed w-full z-10'>
    <h1 className='text-[30px] sm:text-[35px] fon-semibold  px-3 py-1'>
        <Link to={"/"}>
       <span className='max-sm:hidden'>Jobs Portal</span>
        <img src="https://t3.ftcdn.net/jpg/03/23/01/48/360_F_323014857_sWaSVguUkKCSs7HFlzL558U2yjHMGFwy.jpg" alt="" className='h-[50px] sm:hidden'/>
        </Link>
    </h1>

    <ul className='flex justify-center items-center px-2 md:px-5 py-1  w-fit gap-5 text-[17px] sm:text-[23px]
     text-black font-semibold max-md:hidden'>
        <li className='bg-[#7cdaf9]  transition ease-in duration-150  
                  hover:bg-[#00BCFF] rounded-[5px]'>
                        <Link to={"/"} className='w-full h-full block px-3 py-1'>Home</Link>
        </li>
        {
            isAdminLoggedIn
        ?
        
        <>
        <li className='transition ease-in duration-150 
                    hover:bg-[#00b602] bg-[#78e779] rounded-[5px]'>
                        <Link to={"/"}
                          onClick={()=>{
                            console.log("Logout Clicked");
                            setIsAdminLoggedIn(false);
                            sessionStorage.setItem('isAdminLoggedIn',JSON.stringify(false));
                            toast.success('Admin Logged Out Successfully!', {
                                              position: "top-center",
                                              autoClose: 5000,
                                              hideProgressBar: false,
                                              closeOnClick: false,
                                              pauseOnHover: true,
                                              draggable: true,
                                              progress: undefined,
                                              theme: "dark",
                                              });
                          }}
                         className='w-full h-full block px-3 py-1' >Logout</Link>
        </li>
         <li className='bg-[#7cdaf9]  transition ease-in duration-150  
         hover:bg-[#00BCFF] rounded-[5px]'>
               <Link to={"/adminDashboard"} className='w-full h-full block px-3 py-1'>Admin Dashboard</Link>
        </li>
        </>
        :
        <li className='transition ease-in duration-150 
                    hover:bg-[#00b602] bg-[#78e779] rounded-[5px]'>
                        <Link to={"/adminLogin"} className='w-full h-full block px-3 py-1'>Admin Login</Link>
        </li>
        
        }
        
       
    </ul>
    {
        showSidebar
        ?
      <GiCrossMark className='md:hidden text-[35px] cursor-pointer' 
     onClick={()=>{
      changeVisibility();
      console.log("Clicked",showSidebar);
     }}/> 
        :
        <TiThMenu className='md:hidden text-[35px] cursor-pointer' 
    onClick={()=>{
        changeVisibility();
        console.log("Clicked",showSidebar);
    }}
    />
    }
   </nav>
  )
}

export default Navbar