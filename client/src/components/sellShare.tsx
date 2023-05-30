import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AppContext from "./contract";
const Sellshare = (props) => {
  const { contract, currentAccount } = useContext(AppContext);
  const [propert, setPropert] = useState([
    [null, null, null,null, null]
  ]);
  async function getProperty() {
    let property = [];
    await contract.methods.getProperty(props.shareid).call((error, result) => {
      if (error) {
        console.log(error);
      } else {
        property.push(result);
      }
    });
    setPropert(property);
  }
  // getProperty();
  // console.log(propert)
  useEffect(() => {
    getProperty();
  }, []);
  async function buyShare() {
    await contract.methods.buyShare(props.shareindex).send({from : currentAccount}).then((result) => {
      console.log(result);
    })
    getProperty();
  }
  return (
    <div className="w-[13rem] h-[15rem] ml-3 flex-shrink-0 overflow-hidden bg-gray-300 rounded-md mb-2 flex flex-col">
      <div className="w-full h-2/5 bg-gray-300 flex justify-center items-center font-bold text-xl">
        {props.share}%
      </div>
      <div className="w-full h-3/5 bg-gray-400">
        <div className="h-3/4 p-2 pl-3">
          <Link to="/product" className="font-bold cursor-pointer">
            {propert[0][0]}
          </Link>
          <p className="text-[13px]">XDC: {propert[0][4] * (props.share / 100)}</p>
          <p className="text-[13px]">Shares: {props.share}%</p>
        </div>
        <button className="h-1/4 w-full bg-blue-500 flex justify-center items-center font-bold" onClick={() => {buyShare()}}>
          Buy
        </button>
      </div>
    </div>
  );
};

export default Sellshare;
