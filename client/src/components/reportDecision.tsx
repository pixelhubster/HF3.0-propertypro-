import React from 'react'

const Reportdecision = () => {
  return (
    <div className="w-[20rem] bg-white flex flex-col rounded-md overflow-hidden mt-2">
      <div className="flex justify-between px-4 items-center">
        <p className="text-[14px] font-bold text-gray-600">Report Desicion </p>
        <p className="text-[12px] font-bold p-2">20 S</p>
      </div>
      <p className="p-2 px-4 font-bold">Decision to make report</p>
      <p className="px-4 text-sm text-gray-700">By : xdc030...302fs</p>
      <div className="mt-5 w-full flex justify-between">
        <button className="w-full bg-green-500 p-[0.3rem]">Support</button>
        <button className="w-full bg-red-400 p-[0.3rem]">Decline</button>
      </div>
    </div>
  );
}

export default Reportdecision