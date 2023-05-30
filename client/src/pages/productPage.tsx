import { useState } from 'react'
import Sharescard from '../components/sharesCard';
import { AiOutlineLeftCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';
const Productpage = () => {
    const [isSelected, setIsSelected] = useState([false, false, false, false]);
  return (
    <div className='w-full flex justify-center items-center'>
      <div className="flex w-full lg:w-10/12 h-[50rem] bg-white p-2 rounded-md flex-col overflow-hidden">
        <div className="flex justify-between">
          <p className="text-2xl font-bold p-4 flex"><Link to="" className='px-2 mr-3'> <AiOutlineLeftCircle /> </Link>Home FOr sale</p>
          <p className="text-2xl font-bold p-4">$300000</p>
        </div>
        <div className="w-full h-[60rem] overflow-y-auto">
          <div className="w-full h-[25rem] flex p-2">
            <div className="w-2/3 h-full bg-gray-400 rounded-md overflow-hidden">
              <img src="" alt="" className="w-full h-full" />
              <div className="bg-gray-100 w-full h-[2rem] relative bottom-8 flex items-center justify-center">
                <span
                  className={`w-[10px] h-[10px] rounded-full bg-green-800 cursor-pointer ml-2 ${
                    isSelected[0] ? "w-[15px] h-[15px]" : ""
                  }`}
                  onClick={() => {
                    setIsSelected([true, false, false, false]);
                  }}
                ></span>
                <span
                  className={`w-[10px] h-[10px] rounded-full bg-green-800 cursor-pointer ml-2 ${
                    isSelected[1] ? "w-[15px] h-[15px]" : ""
                  }`}
                  onClick={() => {
                    setIsSelected([false, true, false, false]);
                  }}
                ></span>
                <span
                  className={`w-[10px] h-[10px] rounded-full bg-green-800 cursor-pointer ml-2 ${
                    isSelected[2] ? "w-[15px] h-[15px]" : ""
                  }`}
                  onClick={() => {
                    setIsSelected([false, false, true, false]);
                  }}
                ></span>
                <span
                  className={`w-[10px] h-[10px] rounded-full bg-green-800 cursor-pointer ml-2 ${
                    isSelected[3] ? "w-[15px] h-[15px]" : ""
                  }`}
                  onClick={() => {
                    setIsSelected([false, false, false, true]);
                  }}
                ></span>
              </div>
            </div>
            <div className="w-1/3 h-full bg-gray-400 ml-2">dets</div>
          </div>
          <div className="p-4">
            <p className="text-xl font-bold">Description</p>
            <p className="mt-2">
              Product description, is to provide more info about the property
            </p>
          </div>
          <p className="text-xl p-4 font-bold">Shares For sale</p>
          <div className="p-4 flex flex-row overflow-x-auto">
            <Sharescard owner="0x32...fgd" price="400" share="10" />
            <Sharescard owner="0x32...fgd" price="400" share="90" />
            <Sharescard owner="0x32...fgd" price="400" share="65" />
            <Sharescard owner="0x32...fgd" price="400" share="11" />
            <Sharescard owner="0x32...fgd" price="400" share="50" />
            <Sharescard owner="0x32...fgd" price="400" share="20" />
          </div>
        </div>
        <div className="h-[5rem] w-full px-6 flex justify-end items-center">
          <button className="bg-blue-500 h-11/12 w-[7rem] text-white rounded-md py-2 font-bold">
            Invest
          </button>
        </div>
      </div>
    </div>
  );
}

export default Productpage