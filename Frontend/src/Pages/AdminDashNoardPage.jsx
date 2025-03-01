/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { AdminAuthContext } from '../context/AdminAuthContextProvider'
import { useNavigate } from 'react-router-dom';
import { SideBarContext } from '../context/SideBarContextProvider';
import { toast } from 'react-toastify';
import LoaderPage from './LoaderPage';
import Sidebar from '../Components/Sidebar';
import { Link } from "react-router-dom";
import ErrorBox from '../Components/ErrorBox';

function AdminDashNoardPage() {
    const [jobsArray,setJobsArray]=useState([]);
    const [jobRequestArray,setJobRequestArray]=useState([]);
    const {isAdminLoggedIn}=useContext(AdminAuthContext);
    const {showSidebar,setShowSidebar,showSpinner,setShowSpinner}=useContext(SideBarContext);
    const [emptyCredentials,setEmptyCredentials]=useState(false);
    const navigate=useNavigate();
    useEffect(()=>{
        setShowSidebar(false);
        console.log(isAdminLoggedIn);
        if(!isAdminLoggedIn){
            navigate("/");
        }

        const getJobListArrayFunction=async()=>{
          setShowSpinner(true)
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
            // console.log(data);
            
          } catch (error) {
            setTimeout(()=>{
              setShowSpinner(false);
            },1000)
            console.log("Error in getting list of jobs frontend",error)
          }
        }

        const getAllJobsRequestObejctsFunction=async()=>{
          setShowSpinner(true);
          try {
            const response=await fetch("https://job-portal-webapp-5wai.onrender.com/api/contactUsFromList",{
              method:"GET",
              credentials:"include"
            })
            const data=await response.json();
            // console.log(data);
            
            setJobRequestArray(data.arrayOfAllJobRequests);
            setTimeout(()=>{
              setShowSpinner(false);
            },1000)
            // console.log(data);
            
          } catch (error) {
            setTimeout(()=>{
              setShowSpinner(false);
            },1000)
            console.log("Error in getting list of jobs frontend",error)
          }
        }
        getJobListArrayFunction();
        getAllJobsRequestObejctsFunction();
    },[])
    const [formData, setFormData] = useState({
        job_id: "",
        job_tittle: "",
        company: "",
        location: "",
        remote: false,
        payscale: "",
        last_registration_date: "",
        required_stream: "",
        description:""
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === "checkbox" ? checked : value,
        });
      };

    const createANewJobOpeningFunction =async (e) => {
        e.preventDefault();
        if( formData.job_id=="" || formData.tittle=="" || formData.company=="" || formData.location==""  || formData.payscale=="" || formData.description=="" || formData.last_registration_date=="" || formData.required_stream=="" ){
          setEmptyCredentials(true);
        }
        // console.log("Job Posted:", formData);
        try {
            const response=await fetch("https://job-portal-webapp-5wai.onrender.com/api/admin/creatNewJob",{
                method:"POST",
                credentials:"include",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(formData)
            })
            const data=await response.json();
            console.log(data);
            
            if(data.success){
              window.location.reload();
            toast.success('Job Post Added Successfully!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
            // console.log(data);
            setFormData({
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
            }
            
        } catch (error) {
            console.log("Error in frontend while postng new job",error);
            
        }
      };




      const deleteJobPostFunction=async(id)=>{
           try {
            const response=await fetch(`https://job-portal-webapp-5wai.onrender.com/api/deleteJobPost/${id}`,{
                method:"GET",
                credentials:"include",
            })
            const data=await response.json();
            const filteredArray=jobsArray.filter((item)=>{
              return item._id!=id;
            })
            setJobsArray(filteredArray);
            toast.success('Job Post Deleted Successfully!', {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
              });
            // console.log(data);
           } catch (error) {
            console.log("Error while deleting job frontend",error);
            
           }
      }

      const deleteAppicantsDetailsFunction=async(id)=>{
        try {
          const response=await fetch(`https://job-portal-webapp-5wai.onrender.com/api/deleteFromContactUsFromList/${id}`,{
              method:"GET",
              credentials:"include",
          })
          const data=await response.json();
          const filteredArray=jobRequestArray.filter((item)=>{
            return item._id!=id;
          })
          setJobRequestArray(filteredArray);
          toast.success('Job Applicant"s Details Deleted Successfully!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          console.log(data);
         } catch (error) {
          console.log("Error while deleting job applicants details frontend",error);
          
         }
      }
  return (
        showSpinner
        ?
        <LoaderPage/>
        :
        <main>
        {showSidebar &&  <Sidebar/>}
  
  
  
      {/* ADMIN DASHOBOARD COVER */}
       <main className='w-full   relative'>
         <section className='h-fit  min-h-[50vh] w-full bg-center bg-cover bg-no-repeat flex  items-center justify-center gap-5 sm:pl-10 
         bg-[url("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
           <h1 className='text-[25px] max-sm:text-center xs:text-[30px] sm:text-[35px] md:text-[40px] font-bold '>
             "Welcome To Admin Dashboard"
           </h1>
         </section>
         <section className='absolute w-full h-full bg-[#7f419457] top-0 left-0'></section>
        </main>
  
  
        <h2 className='text-[25px] xs:text-[30px] sm:text-[35px] text-center font-bold py-3 my-2' >
         -- Add A Job Opening --
        </h2>
  
  
        <main className='min-h-screen h-fit py-5 text-[15px] sm:text-[20px] lg:text-[25px] flex justify-center items-center my-5 
        bg-cover bg-center bg-no-repeat bg-[url("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
         <section className='bg-[#00000099] w-[95%] sm:w-[90%]  rounded-[15px] p-2 sm:p-5 shadow-[0px_0px_10px_5px_#00000099] text-white'>
         <form  
          className="grid grid-cols-1 min-[480px]:grid-cols-2 items-center justify-center p-2 sm:p-4 gap-2 sm:gap-5 ">
  
          <label className="block font-semibold">Job ID:
            <input type="text" name="job_id" placeholder="Enter Job ID" 
            value={formData.job_id || ""} onChange={handleChange} className="w-full p-2 border rounded" required />
          </label>
  
          <label className="block font-semibold">Job Title:
            <input type="text" name="tittle" placeholder="Enter Job Title" 
            value={formData.tittle || ""} onChange={handleChange} className="w-full p-2 border rounded" required />
          </label>
  
          <label className="block font-semibold">Company Name:
            <input type="text" name="company" placeholder="Enter Company Name" 
            value={formData.company || ""} onChange={handleChange} className="w-full p-2 border rounded" required />
          </label>
  
          <label className="block font-semibold">Salary:
            <input type="text" name="payscale" placeholder="Enter Salary" 
            value={formData.payscale || ""} onChange={handleChange} className="w-full p-2 border rounded" required />
          </label>
  
          <label className="block font-semibold">Enter Last Registration Date:
            <input type="date" name="last_registration_date" value={formData.last_registration_date}
             onChange={handleChange || ""} className="w-full p-2 border rounded" required />
          </label>
  
          <div className="flex items-center px-5 gap-2">
            <input type="checkbox" name="remote" checked={formData.remote} 
            onChange={handleChange} className="w-6 h-6" />
            <label className='font-semibold'>Is Remote Job</label>
          </div>
  
          <label className="block font-semibold">Enter Job Location:
            <input type="text" name="location" placeholder="Job Location"
             value={formData.location || ""} onChange={handleChange} className="w-full p-2 border rounded"
              />
          </label>
  
          <label className="block font-semibold">Enter Required Education:
            <input type="text" name="required_stream" placeholder="Required Education"
             value={formData.required_stream || ""} onChange={handleChange} className="w-full p-2 border rounded" required />
          </label>
  
          <label className="block">Job Description:
            <textarea name="description" 
            placeholder="Job Description" 
            value={formData.description || ""}
             onChange={handleChange} className="w-full p-2 border rounded" required></textarea>
          </label>
              
        </form>
             
        {
            emptyCredentials
            &&
            <h5 className='font-semibold text-center w-[50%] mx-auto text-[17px] min-[400px]:text-[20px]   min-[480px]:text-[25px] bg-[#ff000099] p-2 rounded-[10px] mb-5 my-2'>All Fields Required</h5>
        }
    
          

           <button className=" bg-blue-500 w-[40%] block my-2 mx-auto text-white p-2 rounded hover:bg-blue-600"
            onClick={createANewJobOpeningFunction}>Enter Post Job</button>
         </section>
        </main>
  
   
        <h2 className='text-[25px] xs:text-[30px] sm:text-[35px] text-center font-bold py-3 my-2' >
         -- List of all Openings --
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
                    <p>{item.last_registration_date}</p>
                    <div className='flex w-[100%] items-center text-[15px] sm:text-[18px] font-semibold'>
                      <button className=' mx-1 w-[50%] '>
                      <Link to={`/jobDetails/${item._id}`} className='py-2  transition ease-in duration-150 
                         hover:bg-[#00b602] bg-[#78e779] rounded-[5px] w-full h-full block px-1 sm:px-2'>
                             Get Details
                       </Link>
                   </button>
                    <button className='bg-[#ff000087]  transition ease-in duration-150  
                    hover:bg-[#ff0000] py-2  w-[50%] block mx-auto rounded-[5px] cursor-pointer px-1 sm:px-2'
                    onClick={()=>{deleteJobPostFunction(item._id)}} >
                      Delete
                    </button>
                    </div>
                </div>
              )
            })
            :
            <ErrorBox message="Sorry, Currently there are no jobs available .Please try after some time"/>
           }
        </section>
  
        <h2 className='text-[25px] xs:text-[30px] sm:text-[35px] text-center font-bold py-3 my-2' >
         -- Job Applicant's Details --
        </h2>
        

        <section className='w-[95%] mx-auto h-fit grid grid-cols-1 min-[480px]:grid-cols-2 lg:grid-cols-3
         py-5 gap-5 md:gap-10 '>
           {
            jobRequestArray?.length>0 
            ?
            jobRequestArray?.map((item,idx)=>{
              return (
                <div key={idx} className='shadow-[0px_0px_10px_1px_#00000073] hover:scale-[103%]
                 transition ease-in duration-150 rounded-[10px] p-2 min-[480px]:p-5  text-[12px] min-[480px]:text-[15px] 
                flex flex-col gap-1 justify-evenly hover:shadow-[0px_0px_10px_5px_#aca3ff]'>
                    <h4 className='text-[18px] sm:text-[20px] md:text-[25px] font-semibold'>Name: {item.name}</h4>
                    <p ><strong>Email: </strong> {item.email}</p>
                    <p><strong>Mobile :</strong>{item.phone}</p>
                    <p><strong>Education: </strong> {item.education}</p>
                    <p><strong>Skills: </strong>{item.skills}</p>
                    <div className='flex w-[100%] items-center text-[15px] sm:text-[18px] font-semibold'>
                    <button className=' mx-1 w-[50%] h-full'>
                      <Link to={`/jobDetails/${item.jobid}`} className='py-2  transition ease-in duration-150 
                         hover:bg-[#00b602] bg-[#78e779] rounded-[5px] w-full h-full block px-1 sm:px-2'>
                             Get Applied Job Details
                       </Link>
                   </button>
                  <button className='bg-[#ff000087]  transition ease-in duration-150  
                    hover:bg-[#ff0000] py-2  w-[50%] block mx-auto rounded-[5px] h-full cursor-pointer px-1 sm:px-2'
                    onClick={()=>{deleteAppicantsDetailsFunction(item._id)}} >
                      Delete
                  </button>
                    </div>
                </div>
              )
            })
            :
            <ErrorBox message="Sorry, Currently there are no jobs applicant's details available ."/>
           }
        </section>
  
  
       
  
     </main>
   
  )
}

export default AdminDashNoardPage