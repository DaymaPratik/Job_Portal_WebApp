import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from "../Components/Sidebar";
import { SideBarContext } from '../context/SideBarContextProvider';
import { toast } from 'react-toastify';
function UserContactForm() {
    const {showSidebar,setShowSidebar}=useContext(SideBarContext)
    const navigate=useNavigate();
    const {id}=useParams();
    useEffect(()=>{
        setShowSidebar(false);
    },[])
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        education: "",
        skills: "",
      });
     
      const handleChange = async (e) => {
       const {name,value}=e.target;
       setFormData({
        ...formData,
        [name]:value,
       })
      };
    
      const applyForThisJobFunction =async (e) => {
        e.preventDefault();
        try {
            const response=await fetch(`https://job-portal-webapp-5wai.onrender.com/api/applyForJob/${id}`,{
              method:"POST",
              headers: {
                "Content-Type": "application/json",
            },
              credentials:"include",
              body:JSON.stringify(formData)
          })
          const data=await response.json();
          toast.success("Applicant's Details Submited Successfully!", {
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
          navigate("/");
          }catch (error) {
            console.log("Error while applying for a job Frontend",error);
            
          }
      };
  return (
    <main className="h-fit w-full flex items-center flex-col justify-center">
        {showSidebar && <Sidebar/>}


        <main className='w-full   relative mb-5'>
         <section className='h-fit  min-h-[50vh] w-full bg-center bg-cover bg-no-repeat flex text-center items-center justify-center gap-5 sm:pl-10 
         bg-[url("https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")]'>
           <h1 className='text-[25px] max-sm:text-center xs:text-[30px] sm:text-[35px] md:text-[40px] font-bold '>
             "Registration Contact Form For Job Applicant's"
           </h1>
         </section>
         <section className='absolute w-full h-full bg-[#7f419457] top-0 left-0'></section>
        </main>
       
      <div className="bg-[#000000a2] text-white shadow-[0px_0px_10px_5px_#00000099]
       rounded-[20px] p-6  w-[90%] min-[480px]:w-[400px] my-5">
        <h1 className="text-[25px] sm:text-[30px] text-center font-bold  mb-4">Please Enter Your Details</h1>
        <form onSubmit={applyForThisJobFunction} className="p-2 min-[480px]:p-5">
          <div>
            <label className="block ">Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              className="w-full p-2 border rounded" 
            />
          </div>
          <div>
            <label className="block ">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              className="w-full p-2 border rounded" 
            />
          </div>
          <div>
            <label className="block ">Phone No</label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              className="w-full p-2 border rounded" 
            />
          </div>
          <div>
            <label className="block ">Education</label>
            <input 
              type="text" 
              name="education" 
              value={formData.education} 
              onChange={handleChange} 
              className="w-full p-2 border rounded" 
            />
          </div>
          <div>
            <label className="block ">Skills</label>
            <input 
              type="text" 
              name="skills" 
              value={formData.skills} 
              onChange={handleChange} 
              className="w-full p-2 border rounded" 
            />
          </div>
          <button type="submit" className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg
           hover:bg-blue-700 w-full">
            Submit
          </button>
        </form>
      </div>
    </main>
  )
}

export default UserContactForm