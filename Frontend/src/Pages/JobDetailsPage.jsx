

/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import  { Link,useParams } from 'react-router-dom'
import { SideBarContext } from '../context/SideBarContextProvider';
import Sidebar from '../Components/Sidebar';
import LoaderPage from './LoaderPage';
import { AdminAuthContext } from '../context/AdminAuthContextProvider';

function JobDetailsPage() {
  const {jobid}=useParams();
  const {isAdminLoggedIn}=useContext(AdminAuthContext)
  const [jobObject,setJobObject]=useState({
    job_id: "",
    job_tittle: "",
    company: "",
    location: "",
    remote: false,
    payscale: "",
    last_registration_date: "",
    required_stream: "",
    description:""
  })
  const {showSidebar,setShowSidebar,
    showSpinner,setShowSpinner}=useContext(SideBarContext);
  useEffect(()=>{
    setShowSidebar(false);
    setShowSpinner(true)
    const getJobDetailsFunction=async()=>{
      try {
          const response=await fetch(`https://job-portal-webapp-5wai.onrender.com/api/getJobDetails/${jobid}`,{
            method:"GET",
            credentials:"include"
          })
          const data=await response.json();
          setTimeout(()=>{
            setShowSpinner(false);
          },1000)
          // console.log(data.JobDetailsObject);
          setJobObject(data.JobDetailsObject)
          
      } catch (error) {
        setTimeout(()=>{
          setShowSpinner(false);
        },1000)
        
        console.log("Error in getting job details frontend",error);
        
      }
    }
    getJobDetailsFunction();
  },[])
  

  return (
    showSpinner
    ?
    <LoaderPage/>
    :
    <main className=''>
      {showSidebar && <Sidebar/>}
      <main className='w-full   relative'>
         <section className='h-fit  min-h-[50vh] w-full bg-center bg-cover bg-no-repeat flex justify-center items-center  gap-5 sm:pl-10 
         bg-[url("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
           <h1 className='text-[25px] max-sm:text-center xs:text-[30px] sm:text-[35px] md:text-[40px] font-bold '>
             "Job Full Details"
           </h1>
         </section>
         <section className='absolute w-full h-full bg-[#7f419457] top-0 left-0'></section>
        </main>

      <section className="h-fit min-h-screen w-full flex items-center justify-center bg-gray-100 p-2 sm:p-6">
      <div className=" shadow-[0px_0px_10px_5px_#00000099] bg-[#3818548c] text-[17px] min-[480px]:text-[20px] md:text-[25px] text-white  rounded-[20px] p-3 sm:p-6 w-[95%] sm:w-[90%] md:w-[75%] ">
        <h1 className="text-[25px] min-[480px]:text-[30px] font-bold  mb-4">{jobObject.tittle}</h1>
        <p className="mb-2"><strong>Company:</strong> {jobObject.company}</p>
        <p className=" mb-2"><strong>Location:</strong> {jobObject.location}</p>
        <p className=" mb-2"><strong>Salary:</strong> {jobObject.payscale}</p>
        <p className=" mb-2"><strong>Working Loaction:</strong>{jobObject.remote ? "WFH" : "On-Site" }</p>
        <p className="mb-2"><strong>Last Registration Date:</strong>{jobObject.last_registration_date}</p>
        <p className=" mb-2"><strong>Required Stream:</strong> {jobObject.required_stream}</p>
        <h2 className="text-[20px] md:text-[25px] font-semibold  mb-2">Job Description</h2>
        <p className=" mb-4 md:mb-8 text-[14px] min-[480px]:text-[17px] sm:text-[20px] md:text-[25px]">{jobObject.description}</p>
        <button className='block mx-auto '>
          {
            isAdminLoggedIn
            ?
            <Link
            to={`/adminDashboard`}
              className="mt-4 px-6 py-2  bg-blue-600 text-white rounded-lg hover:bg-blue-700">
             Back to Admin DashBoard
            </Link>
            :
            <Link
            to={`/userContactForm/${jobObject._id}`}
           className="mt-4  px-6  py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
               Apply Now
        </Link>
          }
        </button>
      </div> 
    </section>
    </main>
  )
}

export default JobDetailsPage
