import { ReactComponentElement, useState, useContext, useRef } from "react";
import Sharescard from "./sharesCard";
import AppContext from "./contract";
import Decisionpopup from "./decisionPopup";
import { Link } from "react-router-dom";
const Product = (props) => {
  const [isSelected, setIsSelected] = useState([false, false, false, false]);
  const { web3, contract, selected, properties, formatAddress, currentAccount } = useContext(AppContext);
  const [propert, setPropert] = useState(properties);
  const [image, setImage] = useState(selected[3][0]);
  const [pop, setPop] = useState(false);
  const shareRef = useRef(null);
  const shares = [];
  async function getShares(id) {
    await contract.methods.getShares(id).call((error, result) => {
      if (error) {
        console.log(error);
      } else {
        shares.push(result);
      }
    });
  }
  const [hasShare, setHasShare] = useState(false);
  async function hasShares() {
    await contract.methods.hasShare(selected[7]).call((error, result) => {
    if (error) {
      console.log(error);
    } else {
      // setHasShare(result);
    }
    console.log(result[0]);
    setHasShare(result[0]);
  });
  }
  hasShares();
  //handle submit
  const handleSubmit = async () => {
    await contract.methods.invest(selected[7], shareRef.current.value).send({ from : currentAccount}).then((result) => {
      console.log("result", result)
      setPop(false);
    })
  };
  getShares(0);
  return (
    <div className="flex w-full h-[50rem] bg-white p-2 rounded-md flex-col overflow-hidden">
      {pop ? (
        <Decisionpopup>
          <label className="font-bold mt-2 text-[16px] w-full p-2">
            Shares <i className="font-normal not-italic text-gray-500">*</i>
          </label>
          <input
            className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
            placeholder="40%"
            ref={shareRef}
            required
          />
          {/* <label className="font-bold mt-2 text-[16px] w-full p-2">
          Price{" "}
          <i className="font-normal not-italic text-gray-500">*</i>
        </label>
        <input
          className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
          placeholder="00 XDC"
          required
        /> */}
          <button
            className="bg-blue-500 m-4 w-full rounded-md p-2"
            onClick={handleSubmit}
          >
            {" "}
            Invest{" "}
          </button>
        </Decisionpopup>
      ) : null}
      <div className="flex justify-between">
        <p className="text-2xl font-bold p-4">{selected[0]}</p>
        <p className="text-2xl font-bold p-4">${selected[1]}</p>
      </div>
      <div className="w-full h-[60rem] overflow-y-auto">
        <div className="w-full h-[25rem] flex p-2">
          <div className="w-full h-full bg-gray-400 rounded-md overflow-hidden">
            <img src={image} alt="" className="w-full h-full" />
            <div className="bg-gray-100 w-full h-[2rem] relative bottom-8 flex items-center justify-center">
              <span
                className={`w-[10px] h-[10px] rounded-full bg-green-800 cursor-pointer ml-2 ${
                  isSelected[0] ? "w-[15px] h-[15px]" : ""
                }`}
                onClick={() => {
                  setIsSelected([true, false, false, false]);
                  setImage(selected[3][0]);
                }}
              ></span>
              <span
                className={`w-[10px] h-[10px] rounded-full bg-green-800 cursor-pointer ml-2 ${
                  isSelected[1] ? "w-[15px] h-[15px]" : ""
                }`}
                onClick={() => {
                  setIsSelected([false, true, false, false]);
                  setImage(selected[3][1]);
                }}
              ></span>
              <span
                className={`w-[10px] h-[10px] rounded-full bg-green-800 cursor-pointer ml-2 ${
                  isSelected[2] ? "w-[15px] h-[15px]" : ""
                }`}
                onClick={() => {
                  setIsSelected([false, false, true, false]);
                  setImage(selected[3][2]);
                }}
              ></span>
              {/* <span
                className={`w-[10px] h-[10px] rounded-full bg-green-800 cursor-pointer ml-2 ${
                  isSelected[3] ? "w-[15px] h-[15px]" : ""
                }`}
                onClick={() => {
                  setIsSelected([false, false, false, true]);
                }}
              ></span> */}
            </div>
          </div>
          {/* <div className="w-1/3 h-full bg-gray-400 ml-2">dets</div> */}
        </div>
        <div className="p-4">
          <p className="mt-2">{selected[6]}</p>
          <p className="text-xl font-bold">Description</p>
          <p className="mt-2">{selected[2]}</p>
        </div>
        <p className="text-xl p-4 font-bold">Shares For sale</p>
        <div className="p-4 flex flex-row overflow-x-auto">
          {shares.map((item, index) => (
            <Sharescard
              owner={formatAddress(item[0])}
              price="400"
              share={item[0]}
            />
          ))}
        </div>
      </div>
      <div className="h-[5rem] w-full px-6 flex justify-end items-center">
        { hasShare ? 
        <Link to={`/property/${selected[7]}`}>
          <button className="w-[6rem] h-[2.5rem] bg-blue-500 font-bold text-white rounded-md">
          contribute
          </button>
        </Link> :
        <button
          className="bg-blue-500 h-11/12 w-[7rem] text-white rounded-md py-2 font-bold"
          onClick={() => {
            setPop(!pop);
          }}
        >
          Invest
        </button>
      }
        
      </div>
    </div>
  );
};

export default Product;
