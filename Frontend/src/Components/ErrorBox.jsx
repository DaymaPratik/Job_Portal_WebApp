import React from 'react'

function ErrorBox({message}) {
  return (
    <main  className='h-fit w-[90vw] font-semibold text-white text-[25px] sm:text-[30px] 
     min-h-[50vh] flex justify-center items-center '>
    <div  className='mb-4 shadow-[0px_0px_10px_5px_#00000099] bg-[#00000099] mx-auto w-fit p-10 rounded-lg'>
     <span className="font-bold text-red-500">Oop!</span> {message}
    </div>
    </main>
  )
}


export default ErrorBox;