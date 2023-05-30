import React, { useContext, useState } from "react";
import AppContext from "./contract";

const Participants = (props) => {
  const { formatAddress } = useContext(AppContext);
  return (
    <div className="w-full bg-gray-300 rounded-md p-2 mt-2 ">
      <div className="flex flex-row justify-between text-sm">
        <p>{formatAddress(props.address)}</p>
        <p>{props.share}% S</p>
      </div>
      <div className="flex flex-row font-bold">
        <p>{props.balance} XDC</p>
      </div>
    </div>
  );
};

export default Participants;
