import React, { useContext } from 'react'
import AppContext from './contract'

const Requestfunds = (props) => {
  const { contract, formatAddress, currentAccount} = useContext(AppContext);
  async function handleVote(v) {
    await contract.methods.voteRequest(props.id,props.index, v).send({from : currentAccount}).then((result)=> {
      console.log(result);
    })
  }
  return (
    <div className="w-[20rem] bg-white flex flex-col rounded-md overflow-hidden mt-2">
      <div className="flex justify-between px-4 items-center">
        <p className="text-[14px] font-bold text-gray-600">Funds Request</p>
        <p className="text-[12px] font-bold p-2">{props.support} S</p>
      </div>
      <p className="p-2 px-4 font-bold">{props.amount} XDC</p>
      <p className="p-2 px-4 font-bold">{props.details}</p>
      <p className="px-4 text-sm text-gray-700">From : contract</p>
      <p className="px-4 text-sm text-gray-700">To : {formatAddress(props.to)}</p>
      <div className="mt-5 w-full flex justify-between font-bold text-white">
        <button className="w-full bg-green-500 p-[0.3rem]" onClick={() => {handleVote(true)}}>Support {props.support}</button>
        <button className="w-full bg-red-400 p-[0.3rem]" onClick={() => {handleVote(false)}}>Decline {props.decline}</button>
      </div>
    </div>
  )
}

export default Requestfunds