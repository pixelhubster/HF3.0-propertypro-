import { Link } from "react-router-dom";
import {
  AiOutlineMenu,
  AiOutlineUser,
  AiOutlineHome,
  AiFillShop,
} from "react-icons/ai";
import { useContext, useState } from "react";
import { ethers } from "ethers";
import AppContext from "./contract";

const Navbar = () => {
  const { ethereum } = window;
  const { contract, web3, formatAddress, setCurrentAccount, currentAccount, connectWallet, isConnected } = useContext(AppContext)
  return (
      <div className="w-full h-[4rem] bg-white border-b-2 border-gray5300 p-3 px-4 flex justify-between items-center">
      <div className="w-1/4 h-full">
        <div className="w-[5rem] p-2 flex justify-center font-bold">
          {/* <AiOutlineMenu className="text-[2rem]" /> */}
          propertyPro
        </div>
      </div>
      <div className="h-full flex justify-evenly items-center uppercase bg-gray-100 overflow-hidden rounded-lg px-3 text-white">
        <Link to="/" className="bg-gray-100 p-2 rounded-md mr-4">
          <AiOutlineHome className="text-2xl text-gray-400"/>
        </Link>
        <Link to="/shares" className="bg-gray-100 p-2 rounded-md mr-4">
          <AiFillShop className="text-2xl text-gray-400" />
        </Link>
        <Link to="/profiles" className="bg-gray-100 p-2 rounded-md" >
          <AiOutlineUser className="text-2xl text-gray-400" />
        </Link>
      </div>
      <div className="w-1/4 h-full flex justify-end items-center">
        {isConnected ? (
          <>
            <div className="flex rounded-md p-[5px] items-center justify-center min-w-[10rem] bg-gray-100 mr-3 overflow-hidden">
              {formatAddress(currentAccount)}
            </div>
            {/* <button
            className="bg-blue-500 rounded-md p-[5px] px-3"
            onClick={()=>{disconnect}}
          >
            Logout
          </button> */}
          </>
        ) : (
          <button
            className="bg-blue-400 rounded-md p-[5px] px-5 text-white font-bold"
            onClick={connectWallet}
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};
export default Navbar;
