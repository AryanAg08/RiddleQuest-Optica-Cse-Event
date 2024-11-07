import React from 'react'

const RiddleComponent = () => {
  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='bg-gray-600 w-8/12 mt-4 mx-auto rounded-lg justify-center items-center text-3xl py-4 break-words px-4'> 
            <h1 className='text-white align-middle text-center'>Riddle:</h1>
        </div>
        <div className='py-4'>
            <input type='text' placeholder='Enter your Answer' className='rounded-lg px-4 py-2'/>
        </div>
        <div className=' py-1 justify-center items-center'>
            <button className='text-white bg-yellow-500 rounded-lg px-4 py-1 text-lg'>Submit</button>
        </div>
    </div>
  )
}

export default RiddleComponent