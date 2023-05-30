import React, { useContext } from "react";
import AppContext from "./contract";

const Decide = (props) => {
  const { contract, currentAccount } = useContext(AppContext);
  //handle support
  const handleSupport = async () => {
    await contract.methods.vote(0).call((error, result) => {
      if (error) {
        console.log(error);
      } else {
        console.log(result);
      }
    });
  };

  async function handleVote(v) {
    await contract.methods
      .vote(props.id, props.index, v)
      .send({ from: currentAccount })
      .then((result) => {
        console.log(result);
      });
  }
  return (
    <div className="w-[20rem] bg-white flex flex-col rounded-md overflow-hidden mt-2">
      <div className="flex justify-between px-4 items-center">
        <p className="text-[14px] font-bold text-gray-600">Desicion </p>
        <p className="text-[12px] font-bold p-2">{props.support} S</p>
      </div>
      <p className="p-2 px-4 font-bold">{props.reason.split(":")[0]}</p>
      <p className="p-2 mt-1 px-4 text-[13px]">
        {props.reason.split(":")[1]}
      </p>
      <div className="w-full flex justify-between">
        <button 
          className="w-full bg-green-400 p-[0.3rem] font-bold text-white"
          onClick={() => {
            handleVote(true);
          }}
        >
          Support {props.support}
        </button>
        <button
          className="w-full bg-red-400 p-[0.3rem] text-white font-bold"
          onClick={() => {
            handleVote(false);
          }}
        >
          Decline {props.decline}
        </button>
      </div>
    </div>
  );
};

export default Decide;
