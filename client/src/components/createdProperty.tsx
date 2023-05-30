import React from 'react'

const Createdproperty = () => {
  return (
    <div className='w-[13rem] h-[15rem] ml-3 flex-shrink-0 overflow-hidden bg-gray-300 rounded-md mb-2 flex flex-col'>
        <div className='w-full h-2/5 bg-gray-400'>
          <img src="" alt="" className='w-full h-full'/>
        </div>
        <div className='w-full h-3/5 bg-gray-600'>
          <div className='h-3/4 p-2 pl-3'>
          <p className='font-bold'>Property Name</p>
          <p className='text-[13px]'>Created On: 11/12/12</p>
          <p className='text-[13px]'>Shares: 40%</p>
          </div>
          <div className='h-1/4 bg-green-300 flex justify-center items-center font-bold'>
            Pending
          </div>
        </div>
    </div>
  )
}

export default Createdproperty