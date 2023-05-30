import React from 'react'

const Sharescard = (props) => {
  return (
    <div className="w-[8rem] h-[10rem] bg-gray-300 rounded-md ml-2 flex-shrink-0 overflow-hidden">
      <div className="w-full h-3/5 flex justify-center items-center flex-col">
        <p className="font-bold text-[19px]">{props.share}% S</p>
        <p className=" text-[14px]">{props.price} XDC</p>
      </div>
      <div className="w-full h-2/5 flex justify-end items-center flex-col">
        <p className="text-[12px] p-[10px]">{props.owner}</p>
        <button className="w-full font-bold text-white text-sm bg-blue-500 p-1 py-2">
          Buy
        </button>
      </div>
    </div>
  );
}

export default Sharescard;