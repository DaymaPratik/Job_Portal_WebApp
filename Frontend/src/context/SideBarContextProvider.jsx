/* eslint-disable react-refresh/only-export-components */
import React, { useState }  from 'react'
import {createContext } from "react";
export const SideBarContext=createContext(false);
function SideBarContextProvider({children}) {
    const [showSidebar,setShowSidebar]=useState(false);
    const [showSpinner,setShowSpinner]=useState(false);
    const changeVisibility=()=>{
        setShowSidebar(!showSidebar)
    }
  return (
    <SideBarContext.Provider value={{showSidebar,setShowSidebar,changeVisibility,
      showSpinner,setShowSpinner
    }}>
        {children}
    </SideBarContext.Provider>
  )
}

export default SideBarContextProvider