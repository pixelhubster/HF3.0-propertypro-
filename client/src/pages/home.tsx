import React, { useState, useContext, useEffect } from 'react'
import Property from '../components/property';
import Product from '../components/product';
import AppContext from '../components/contract';
import { BiRefresh } from 'react-icons/bi'
const Home = () => {
  const { contract, properties, selected, formatAddress, propertyCount, setPropertyCount} = useContext(AppContext)
  const [ productDetails, setProductDetails ] = useState()
  const [ propt, setPropt ] = useState([])
  // setPropert(properties)

  const propert = []
  async function getProperty() {
    contract.methods.getPropertyCount().call((error: String, result: String) => {
      if (error) {
        console.log(error);
      } else {
        setPropertyCount(parseInt(result.toString()));
      }
    });
    setPropt([])
    for (let i = 1; i < propertyCount; i++) {
      await contract.methods.getProperty(i).call((error, result) => {
        if (error) {
          console.log(error);
        } else {
          propert.push(result);
          // properties.push(result);
        }
      });
    }
    setPropt(propert)
    console.log(propt);
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     getProperty();
  //   }, 200);
  // },[selected])
  return (
    <>
      {/* <div className="h-[4rem] w-full">h</div> */}
      <div className="w-full h-full md:w-full flex flex-row justify-center  bg-gray-300 p-2">
        <div className="flex w-1/2 h-[50rem] bg-white p-2 rounded-md flex-col overflow-hidden scale-[0.9]">
          <div className="w-parent flex h-[4rem] p-2 items-center justify-between relative">
            <p className="text-2xl font-bold px-3">Properties</p>
            <div className="flex items-center">
              {/* <input
                type="text"
                className="border-2 w-[15rem] h-[2.5rem] rounded-md p-[1px] px-2 outline-gray-400 border-gray-300 mr-2"
                placeholder="Property 030"
              /> */}
              <button className=" bg-gray-100 hover:bg-gray-200 h-[2.5rem] flex items-center justify-center text-white p-1 px-2 rounded-md" onClick={getProperty}>
                <BiRefresh className="text-2xl text-black"/>
              </button>
            </div>
          </div>
          <div className="w-full mt-[1rem] p-2 bg-white overflow-hidden overflow-y-auto flex justify-center flex-wrap">
            {propt.map((item, index) => (
              <Property
                key={index}
                name={item[0]}
                rate={item[7] /10}
                share={item[8]}
                price={item[4]}
                description={item[5]}
                image={item[3]}
                owner={formatAddress(item[2])}
                location={item[1]}
                index={index}
              />
            ))}
          </div>
        </div>
        <div className="w-1/2 h-full md:w-1/2 flex flex-row justify-center  bg-gray-300 ml-2 scale-[0.96]">
          <Product />
        </div>
      </div>
    </>
  );
}

export default Home