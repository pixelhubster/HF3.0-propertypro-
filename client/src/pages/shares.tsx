import React, { useContext, useEffect, useState } from 'react'
import Sellshare from '../components/sellShare'
import AppContext from '../components/contract'

const Shares = () => {
  const { contract, connectWallet } = useContext(AppContext)
  const [ openshares, setOpenshares] = useState([])
  connectWallet;
  const getpenShare = async () => {
    let propertyCount = 0;
    await contract.methods.getOpenShareCount().call((error, result) => {
      if (error) {
        console.log(error)
      } else {
        console.log(result)
        propertyCount = result;
      }
    });
    
    const shares = [];
    for (let i = 0; i < propertyCount; i++) {
      await contract.methods.getOpenShares(i).call((error,result) => {
      if (error) {
        console.log(error)
      } else {
        shares.push(result)
      }
  });
    }
    
  setOpenshares(shares);
  }
  useEffect(() => {
    getpenShare();
  },[])
  return (
    <>
      <div className='top-20 w-full h-full flex justify-center'>
        <div className='w-full lg:w-10/12 h-full bg-white p-4'>
        <p className="p-4 pt-6 text-xl font-bold w-full">Shares for Sale <button className='text-[12px]' onClick={getpenShare}> refresh </button></p>
        <div className='flex w-full overflow-hidden flex-wrap py-3'>
          {openshares.map((item, index) => (
            <Sellshare key={index} share={item[3]} owner={item[2]} shareid={item[0]} shareindex={item[1]} />
          ))}
        </div>
        </div>
      </div>
    </>
  )
}

export default Shares