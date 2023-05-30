import React, { useContext } from 'react'
import AppContext from './contract'

const Transact = (props) => {
  const { contract, formatAddress, currentAccount } = useContext(AppContext)
  async function handleBuy() {
    await contract.methods.buyProperty(props.id).send({from : currentAccount}).then((result) =>{
      console.log(result)
    })
  }
  return (
    <div className="w-[20rem] bg-white flex flex-col rounded-md overflow-hidden mt-2">
    <div className='flex justify-between px-4 items-center'>
      <p className="text-[14px] font-bold text-gray-600">Property For sale</p>
      <p className="text-[12px] font-bold p-2">{props.share} S</p>
    </div>
    <p className="p-2 px-4 font-bold">{props.price} XDC</p>
    <p className="p-2 px-4 font-bold text-gray-700">{formatAddress(props.owner)}</p>
    <div className="w-full flex justify-between mt-5">
      <button className="w-full bg-blue-500 p-[0.3rem]" onClick={()=> {handleBuy()}}>
        Buy
      </button>
    </div>
  </div>
  )
}

export default Transact