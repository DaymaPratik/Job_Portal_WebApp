/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState } from 'react'
export const AdminAuthContext=createContext({});

function AdminAuthContextProvider({children}) {
    const [adminAuthObject,setAdminAuthObject]=useState({
        username:'',
        password:''
    });
    const [isAdminLoggedIn,setIsAdminLoggedIn]=useState(()=>{
      return JSON.parse(sessionStorage.getItem('isAdminLoggedIn')) || false;
    });
  return (
    <AdminAuthContext.Provider value={{adminAuthObject,setAdminAuthObject,isAdminLoggedIn,setIsAdminLoggedIn}}>
        {children}
    </AdminAuthContext.Provider>
  )
}

export default AdminAuthContextProvider