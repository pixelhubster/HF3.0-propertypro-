import React, { useState, useContext } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import AppContext from "./contract";
import { Link } from "react-router-dom";
const Property = (props) => {
  const [isStar, setIsStar] = useState(true);
  const { contract, setSelected, selected } = useContext(AppContext);
  return (
    <div
      className="h-[20rem] w-[25rem] flex-shrink-0 scale-[0.98] px-2 overflow-hidden flex flex-col justify-evenly items-center rounded-md bg-white border-2 hover:border-2 hover:border-gray-500 hover:animate-[duration:10s]"
      onClick={() => {
        setSelected([
          props.name,
          props.price,
          props.description,
          props.image,
          props.rate,
          props.share,
          props.owner,
          props.index + 1,
        ]);
      }}
    >
      <div className="h-3/6 w-full rounded-md bg-green-500">
        <img src={props.image[0]} alt="" className="w-full h-full" />
        <button
          className="w-[2rem] h-[2rem] rounded-full bg-gray-100 absolute right-5 top-5 flex justify-center items-center"
          onClick={() => {
            isStar ? setIsStar(false) : setIsStar(true);
          }}
        >
          {isStar ? (
            <AiOutlineStar />
          ) : (
            <AiFillStar className="text-blue-500" />
          )}
        </button>
      </div>
      <div className="h-2/5 w-full bg-white">
        <div className="w-full h-2/3 flex justify-between">
          <div className="scale-[0.9]">
            <p className="text-xl font-bold">{props.name}</p>
            <p>{props.location}</p>
            <p>{props.owner}</p>
          </div>
          <div className="flex flex-col items-end justify-between p-2 pr-4">
            <p className="font-bold">{props.share}% S</p>
            <p>{props.rate}</p>
          </div>
        </div>
        <div className="w-full h-1/3 bg-gray-200 rounded-md p-2 flex justify-between items-center">
          <p className="text-xl font-bold">${props.price}</p>
        </div>
      </div>
    </div>
  );
};

export default Property;
