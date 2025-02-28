import React from 'react'
import BounceLoader from "react-spinners/BounceLoader";

function LoaderPage() {
    const color="#ff0000"
  return (
    <main className='h-screen w-full flex justify-center items-center bg-[#00000099]'>
        <BounceLoader
        color={color}  
        />
    </main>
  )
}

export default LoaderPage