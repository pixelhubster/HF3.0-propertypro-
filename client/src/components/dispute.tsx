import React from 'react'

const Dispute = () => {
  return (
    <div className="w-[20rem] bg-white flex flex-col rounded-md overflow-hidden mt-2">
      <div className="flex justify-between px-4 items-center">
        <p className="text-[14px] font-bold text-gray-600">Despute</p>
        <p className="text-[12px] font-bold p-2">20 S</p>
      </div>
      <p className="p-2 px-4 font-bold">I am not in support of the transaction</p>
      <p className="px-4 text-sm text-gray-700">By : xdc030...302fs</p>
      <p className="px-4 py-1 text-sm text-gray-700">Why: Because it wont help earn fund</p>
      <div className="mt-5 w-full flex justify-between">
        <button className="w-full bg-green-500 p-[0.3rem]">Support</button>
        <button className="w-full bg-red-400 p-[0.3rem]">Decline</button>
      </div>
    </div>
  );
}

export default Dispute