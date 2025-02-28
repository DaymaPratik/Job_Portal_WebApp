/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { TiLocation } from "react-icons/ti";
import { FaDollarSign } from "react-icons/fa6";
import { SideBarContext } from '../context/SideBarContextProvider';
import Sidebar from '../Components/Sidebar';
import { AdminAuthContext } from '../context/AdminAuthContextProvider';
import LoaderPage from './LoaderPage';
import ErrorBox from '../Components/ErrorBox';

function HomePage() {
 
const [jobsArray,setJobsArray]=useState([]);
const {showSidebar,setShowSidebar,showSpinner,setShowSpinner}=useContext(SideBarContext);
const {isAdminLoggedIn}=useContext(AdminAuthContext);

useEffect(()=>{
  setShowSidebar(false);
  console.log(isAdminLoggedIn);
  
  const getJobListArrayFunction=async()=>{
    setShowSpinner(true);
    try {
      const response=await fetch("https://job-portal-webapp-5wai.onrender.com/api/getJobList",{
        method:"GET",
        credentials:"include"
      })
      const data=await response.json();
      setJobsArray(data.jobsListArray);
      setTimeout(()=>{
        setShowSpinner(false);
      },1000)
      console.log(data);
      
    } catch (error) {
      console.log("Error in getting list of jobs frontend",error)
      setTimeout(()=>{
        setShowSpinner(false);
      },1000)
    }
  }
  getJobListArrayFunction();
},[])
 
  return (
     
      showSpinner
      ?
      <LoaderPage/>
      :
      <main className='w-full h-fit '>
      {showSidebar &&  <Sidebar/>}
        {/* HOME PAGE COVER */}
      <main className='w-full   relative'>
      
       <section className='h-fit pt-10 min-h-[60vh] min-[480px]:min-h-[80vh] w-full bg-center bg-cover bg-no-repeat flex justify-center flex-col gap-5 sm:pl-10 
       bg-[url("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
         <h1 className='text-[25px] max-sm:text-center xs:text-[30px] sm:text-[35px] md:text-[40px] font-bold '>
           "Your Dream Job, Just a Click Away!"
         </h1>
         <h3 className='text-[20px] max-sm:text-center xs:text-[25px] sm:text-[30px] lg:text-[35px] font-semibold '>Discover top opportunities from leading companies. <br className='max-md:hidden'/>
          Apply with ease and take the next step in your career today!
          </h3>
       </section>
       <section className='absolute w-full h-full bg-[#7f419457] top-0 left-0'></section>
      </main>


     <h2 className='text-[25px] xs:text-[30px] sm:text-[35px] text-center font-bold py-3 my-2' >
       Get Your All Jobs in One Place
     </h2>


     <section className='w-[95%] mx-auto h-fit grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3
      py-5 gap-5 md:gap-10 '>
        {
         jobsArray.length>0 
         ?
         jobsArray?.map((item,idx)=>{
          return (
            <div key={idx} className='shadow-[0px_0px_10px_1px_#00000073] hover:scale-[103%]
             transition ease-in duration-150 rounded-[10px] p-2 min-[480px]:p-5  text-[15px] min-[480px]:text-[18px] 
            flex flex-col gap-1 justify-evenly hover:shadow-[0px_0px_10px_5px_#aca3ff]'>
                <h4 className='text-[20px] sm:text-[25px] font-semibold'>{item.tittle}</h4>
                <h5 className='text-[17px] sm:text-[20px] font-bold'>{item.company}</h5>
                <p className='flex items-center gap-1'>
                 <FaDollarSign className='text-red-500'/>  {item.payscale}
                </p>
                <p className='flex items-center gap-1'>
                  <TiLocation className='text-red-500'/>  {item.location}
                </p>
                <p>{item.remote}</p>
                <div className='flex w-[100%] text-[15px] sm:text-[18px] font-semibold'>
                <button className='bg-[#00bcff87]  transition ease-in duration-150  
                hover:bg-[#00BCFF] py-2 mx-1 w-[50%] rounded-[5px] cursor-pointer px-1 sm:px-2'>
                 <Link to={`/userContactForm/${item._id}`}>
                 Apply Now
                 </Link>
                </button>
                 <button className=' mx-1 w-[50%] '>
                 <Link to={`/jobDetails/${item._id}`} className='py-2  transition ease-in duration-150 
                  hover:bg-[#00b602] bg-[#78e779] rounded-[5px] w-full h-full block px-1 sm:px-2'>
                  Get Details
                  </Link>
                  </button>
                </div>
            </div>
          )
        })
         :
        
         <ErrorBox message="Sorry, Currently there are no jobs available .Please try after some time"/>
        }
     </section>

    
   </main>
     
  )
}

export default HomePage