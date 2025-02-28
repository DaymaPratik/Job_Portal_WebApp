/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import JobDetailsPage from "./Pages/JobDetailsPage";
import AuthPage from "./Pages/AuthPage";
import Navbar from "./Components/Navbar";
import SideBarContextProvider from "./context/SideBarContextProvider";
import AdminAuthContextProvider from "./context/AdminAuthContextProvider";
import AdminDashNoardPage from "./Pages/AdminDashNoardPage";
import UserContactForm from "./Pages/UserContactForm";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <AdminAuthContextProvider>
        <SideBarContextProvider>
          <Navbar />
          <ToastContainer
            position="top-center"
            autoClose={2999}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/jobDetails/:jobid" element={<JobDetailsPage />} />
            <Route path="/adminLogin" element={<AuthPage />} />
            <Route path="/adminDashboard" element={<AdminDashNoardPage />} />
            <Route path="/userContactForm/:id" element={<UserContactForm />} />
          </Routes>
        </SideBarContextProvider>
      </AdminAuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
