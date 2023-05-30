import React, { useContext } from 'react'
import AppContext from './contract'

const Terminate = (props) => {
  const { formatAddress , contract, currentAccount} = useContext(AppContext);
  async function handleVote() {
    await contract.methods.votePunishment(props.id,props.index).send({from : currentAccount}).then((result)=> {
      console.log(result);
    })
  }
  return (
    <div className="w-[20rem] bg-white flex flex-col rounded-md overflow-hidden mt-2">
      <div className="flex justify-between px-4 items-center">
        <p className="text-[14px] font-bold text-gray-600">Punish</p>
        <p className="text-[12px] font-bold p-2">{props.support} S</p>
      </div>
      <p className="p-2 px-4 font-bold">{props.purpose}</p>
      <p className="px-4 text-sm text-gray-700">Punish : {formatAddress(props.who)}</p>
      <p className="px-4 py-1 text-sm text-gray-700">Why: {props.reason}</p>
      <div className="mt-5 w-full flex justify-between font-bold text-white">
        <button className="w-full bg-red-400 p-[0.3rem]" onClick={() => handleVote()}>Terminate {formatAddress(props.who)}</button>
      </div>
    </div>
  )
}

export default Terminate