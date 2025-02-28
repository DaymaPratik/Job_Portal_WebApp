import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import { AdminAuthContext } from '../context/AdminAuthContextProvider'
function Sidebar() {
  const {isAdminLoggedIn,setIsAdminLoggedIn}=useContext(AdminAuthContext)
  return (
    <ul className='flex flex-col justify-center items-center px-5 py-3 z-100 bg-[#ff1b1b96] rounded-[10px] 
    w-fit gap-5 text-[20px] font-semibold h-fit fixed right-2 top-20 md:hidden'>
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
        <Link to={"/"} className='w-full h-full block px-3 py-1'
        onClick={()=>{
          console.log("Logout Clicked");
          setIsAdminLoggedIn(false);
          sessionStorage.setItem('isAdminLoggedIn',JSON.stringify(false));
        }}>Logout</Link>
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
  )
}

export default Sidebar