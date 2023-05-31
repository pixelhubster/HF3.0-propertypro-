import React, { useContext, useEffect, useRef, useState } from "react";
import Participants from "../components/participants";
import { AiOutlineMenu } from "react-icons/ai";
import { MdCancel } from "react-icons/md";
import Createpopup from "../components/createpopup";
import Transact from "../components/transact";
import Decide from "../components/decide";
import Requestfunds from "../components/requestFunds";
import Terminate from "../components/terminate";
import Decisionpopup from "../components/decisionPopup";
import { CiMenuKebab } from "react-icons/ci";
import Notification from "../assets/notification";
import { useParams } from "react-router-dom";
import AppContext from "../components/contract";
import { BiRefresh } from "react-icons/bi";

const Contribution = () => {
  const [isMenuPopup, setIsMenuPopup] = useState([false, false]);
  const [menuPop, setMenuPop] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const { id } = useParams();
  const { contract, currentAccount, connectWallet } = useContext(AppContext);
  const decideonRef = useRef(null);
  const reasonRef = useRef(null);
  const amountRef = useRef(null);
  const toRef = useRef(null);
  const preasonRef = useRef(null);
  const pwhoRef = useRef(null);
  const pdetRef = useRef(null);
  const sshareRef = useRef(null);
  const tpurposeRef = useRef(null);
  const taddressRef = useRef(null);
  const tpriceRef = useRef(null);
  const decision = [];
  const [sdecide, setSdecide] = useState([]);
  const [sforsale, setSforsale] = useState([]);
  const [srequest, setSrequest] = useState([]);
  const [spunish, setSpunish] = useState([]);
  const [sbalance, setSbalance] = useState();
  const [isOwner, setIsOwner] = useState();
  const [sparticipants, setSparticipants] = useState([]);
  connectWallet();
  const getDetails = async () => {
    //get decision details
    await contract.methods.getDecision(id).call({from : currentAccount }).then((result) => {
        decision.push(result);
    });
    setSdecide(decision);

    // get the transact requests
    const forsale: React.SetStateAction<never[]> = [];
    await contract.methods.getOnSaleProperty(id).call({ from : currentAccount }).then((result) => {
        sforsale.push(result);
    });
    setSforsale(forsale);

    //get funds requests
    const request = [];
    await contract.methods.getRequestFunds(id).call({ from : currentAccount }).then((result) => {
      request.push(result);
    });
    setSrequest(request);

    //get punish request
    const punish = [];
    await contract.methods.getPunishment(id).call({ from : currentAccount }).then((result) => {
      punish.push(result);
    });
    setSpunish(punish);

    //get the shareholders
    const participants = [];
    await contract.methods.getParticipants(id).call((error, result) => {
      if (error) {
        console.log(error);
      } else {
        participants.push(result);
        console.log(result)
      }
    });
    setSparticipants(participants);

    await contract.methods.getBalance(id).call((error, result) => {
      if (error) {
        console.log(error);
      } else {
        setSbalance(result);
        console.log("B",result)
      }
    })
    //isOwner
    await contract.methods.isOwner(id).call({ from : currentAccount }).then((result) => {
        setIsOwner(result);
        console.log(result)
    })

  };
  // getDetails;
  // setSdecide(decision[0]);
  const proposeRef = useRef(null);

  const sellpshareRef = useRef()
  const sellppriceRef = useRef()
  //sell share
  const handleSellProperty = async () => {
    await contract.methods
      .sellProperty(id,sellppriceRef.current.value,sellpshareRef.current.value)
      .send({ from: currentAccount })
      .then((result) => {
        console.log(result);
        setIsOpen(false);
    })
  }
  //handle terminate property
  const handleTerminate = async () => {
    await contract.methods.terminateProperty(id).call((error, result) => {
      if (error) {
        console.log(error)
      } else {
        console.log(result)
      }
    })
  }

  //handle the decision popup done button
  const handleDecision = async () => {
    let details = decideonRef.current.value + ":" + proposeRef.current.value;
    await contract.methods
      .makeDecision(id, details)
      .send({ from: currentAccount })
      .then((result) => {
        console.log(result);
        setIsOpen(false);
      });
  };
  //handle the transact
  // const handleTransact = async () => {
  //   await contract.methods
  //     .makeTransact(
  //       id,
  //       tpriceRef.current.value,
  //       tpurposeRef.current.value,
  //       taddressRef.current.value
  //     )
  //     .send({ from: currentAccount })
  //     .then((result) => {
  //       console.log(result);
  //       setIsOpen(false);
  //     });
  // };

  //handle the request fund popup
  const handleRequest = async () => {
    await contract.methods
      .makeRequest(
        id,
        reasonRef.current.value,
        toRef.current.value,
        amountRef.current.value
      )
      .send({ from: currentAccount })
      .then((result) => {
        console.log(result);
        setIsOpen(false);
      });
  };
  //handle the punish popup
  const handlePunish = async () => {
    await contract.methods
      .requestPunishment(
        id,
        pwhoRef.current.value,
        preasonRef.current.value,
        pdetRef.current.value
      )
      .send({ from: currentAccount })
      .then((result) => {
        console.log(result);
        setIsOpen(false);
      });
  };
  //handle the sell share popup
  const handleSellShare = async () => {
    await contract.methods
      .sellShare(id, sshareRef.current.value)
      .send({ from: currentAccount})
      .then((result) => {
        console.log(result);
        setIsOpen(false);
      });
  };
  //handle deposit popup
  const damountRef = useRef()
  const handleDeposit = async () => {
    const amount =  damountRef.current.value;
    await contract.methods
      .depositFunds(id, amount)
      .send({ from: currentAccount, value: damountRef.current.value * 1000000000000000000 })
      .then((result) => {
        console.log(result);
        setIsOpen(false);
      });
  };
  const rprofitRef = useRef()
  const handleRedrawProfit = async () => {
    await contract.methods
      .depositFunds(id, rprofitRef.current.value)
      .send({ from: currentAccount })
      .then((result) => {
        console.log(result);
        setIsOpen(false);
      });
  };
  const renderMenuPop = (menuPop) => {
    switch (menuPop) {
      case 1:
        return (
          <Decisionpopup>
            <label className="font-bold mt-6 text-[16px] w-full p-2">
              Decide On{" "}
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={decideonRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="House Rental Price"
              required
            />
            <label className="font-bold mt-2 text-[16px] w-full p-2">
              What I am proposing is
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={proposeRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="House Rental Price"
              required
            />
            <button
              className="m-3 w-full p-1 px-5 text-white font-bold bg-blue-500 rounded-md"
              onClick={handleDecision}
            >
              Done
            </button>
          </Decisionpopup>
        );
      case 2:
        return (
          <Decisionpopup>
            <label className="font-bold mt-6 text-[16px] w-full p-2">
              Decision to report
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="House Rental Price"
              required
            />
            <label className="font-bold mt-2 text-[16px] w-full p-2">
              Why
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="House Rental Price"
              required
            />
          </Decisionpopup>
        );
      case 3:
        return (
          <Decisionpopup>
            <label className="font-bold mt-6 text-[16px] w-full p-2">
              Dispute On{" "}
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="The price of rental"
              required
            />
            <label className="font-bold mt-2 text-[16px] w-full p-2">
              I propose that we
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="Rent 3 per year"
              required
            />
          </Decisionpopup>
        );
      case 4:
        return (
          <Decisionpopup>
            <label className="font-bold mt-6 text-[16px] w-full p-2">
              Transact Purpose{" "}
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={tpurposeRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="House Rental Price"
              required
            />
            <label className="font-bold mt-2 text-[16px] w-full p-2">
              Address
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={taddressRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="House Rental Price"
              required
            />
            <label className="font-bold mt-2 text-[16px] w-full p-2">
              Price
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={tpriceRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="00 XDC"
              required
            />
            <button
              className="m-3 w-full p-1 px-5 text-white font-bold bg-blue-500 rounded-md"
              onClick={handleTransact}
            >
              Done
            </button>
          </Decisionpopup>
        );
      case 5:
        return (
          <Decisionpopup>
            <label className="font-bold mt-6 text-[16px] w-full p-2">
              Fund Request Purpose{" "}
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={reasonRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="Monthly Profit"
              required
            />
            <label className="font-bold mt-2 text-[16px] w-full p-2">
              To
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={toRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="Receiver Address"
              required
            />
            <label className="font-bold mt-2 text-[16px] w-full p-2">
              Price
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={amountRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="00 XDC"
              required
            />
            <button
              className="m-3 w-full p-1 px-5 text-white font-bold bg-blue-500 rounded-md"
              onClick={handleRequest}
            >
              Done
            </button>
          </Decisionpopup>
        );
      case 6:
        return (
          <Decisionpopup>
            <label className="font-bold mt-6 text-[16px] w-full p-2">
              Punish Purpose{" "}
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={preasonRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="Broke Rule #201"
              required
            />
            <label className="font-bold mt-2 text-[16px] w-full p-2">
              Address
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={pwhoRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="Address of person to punish"
              required
            />
            <label className="font-bold mt-2 text-[16px] w-full p-2">
              Why
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={pdetRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="He broke a vital rule"
              required
            />
            <button
              className="m-3 w-full p-1 px-5 text-white font-bold bg-blue-500 rounded-md"
              onClick={handlePunish}
            >
              Done
            </button>
          </Decisionpopup>
        );
      case 7:
        return (
          <Decisionpopup>
            <label className="font-bold mt-6 text-[16px] w-full p-2 flex justify-center">
              Are you sure you want to terminate property?
            </label>
            <button
              className="m-3 w-full p-1 px-5 text-white font-bold bg-blue-500 rounded-md"
              onClick={handleTerminate}
            >
              Terminate
            </button>
          </Decisionpopup>
        );
      case 8:
        return (
          <Decisionpopup>
            {/* <label className="font-bold mt-6 text-[16px] w-full p-2">
              Sell Ownership Purpose{" "}
              <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="House Rental Price"
              required
            /> */}
            <label className="font-bold mt-2 text-[16px] w-full p-2">
              Price <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={sellppriceRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="Price you want to share property"
              required
            />
            <label className="font-bold mt-2 text-[16px] w-full p-2">
              Share in XDC for participants <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={sellpshareRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="00 XDC"
              required
            />
            <button
              className="m-3 w-full p-1 px-5 text-white font-bold bg-blue-500 rounded-md"
              onClick={handleSellProperty}
            >
              Sell Property
            </button>
          </Decisionpopup>
        );
      case 9:
        return (
          <Decisionpopup>
            {/* <label className="font-bold mt-6 text-[16px] w-full p-2">
          Sell Share Purpose{" "}
          <i className="font-normal not-italic text-gray-500">*</i>
        </label>
        <input
          className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
          placeholder="Lack of funds"
          required
        /> */}
            <label className="font-bold mt-2 text-[16px] w-full p-2">
              Shares <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={sshareRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="40%"
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
              className="m-3 w-full p-1 px-5 text-white font-bold bg-blue-500 rounded-md"
              onClick={handleSellShare}
            >
              Submit
            </button>
          </Decisionpopup>
        );
      case 10:
        return (
          <Decisionpopup>
            <label className="font-bold mt-2 text-[16px] w-full p-2">
              Amount <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={damountRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="Amount to deposit"
              required
            />
            <button
              className="m-3 w-full p-1 px-5 text-white font-bold bg-blue-500 rounded-md"
              onClick={handleDeposit}
            >
              Confirm Deposit
            </button>
          </Decisionpopup>
        );
      case 11:
        return (
          <Decisionpopup>
            <label className="font-bold mt-2 text-[16px] w-full p-2">
              Amount <i className="font-normal not-italic text-gray-500">*</i>
            </label>
            <input
              ref={rprofitRef}
              className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
              placeholder="Amount to withdraw"
              required
            />
            <button
              className="m-3 w-full p-1 px-5 text-white font-bold bg-blue-500 rounded-md"
              onClick={handleRedrawProfit}
            >
              Confirm Withdrawal
            </button>
          </Decisionpopup>
        );
      default:
        return null;
    }
  };
  // getDetails();
  // useEffect(() => {
  //   getDetails();
  //   // setTimeout(() => {
  //   //   getDetails();
  //   // }, 100);
  // },[])

  return (
    <div className="bg-white flex h-full w-full justify-center p-3">
      <Notification />
      <Createpopup>
        {isOpen ? (
          <div className="fixed top-0 backdrop-blur-[1px] z-10 bg-white/2 w-full h-full flex justify-center items-center animate-[all] duration-[10s]">
            <div className="overflow-hidden w-[30rem] bg-white rounded-md">
              <div className="w-full h-[3rem] bg-gray-200 flex justify-between items-center px-5">
                <p className="font-bold">Menu</p>
                <button
                  className="w-[2rem] h-[2rem] rounded-full text-2xl text-gray-600 flex items-center justify-center overflow-hidden"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <MdCancel />
                </button>
              </div>
              <div className="relative w-full h-full flex flex-col items-center pb-10">
                {renderMenuPop(menuPop)}
                <br />
                <br />
                {/* <div className='h-[4rem] absolute bottom-0 w-full bg-white flex items-center justify-end p-2'><button className='p-1 px-5 text-white font-bold bg-blue-500 rounded-md'>Done</button></div> */}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </Createpopup>
      <div className="w-10/12 flex">
        <div className="w-2/3 relative h-[90%] overflow-hidden rounded-l-md">
          <div className="w-full bg-gray-200 h-[3rem] flex justify-between items-center px-4">
            <p className="font-bold text-xl">{sbalance / 1000000000000000000} XDC</p>
            <button onClick={getDetails}>
              <BiRefresh className="text-2xl text-black" />
            </button>
            <button
              className="text-xl text-black"
              onClick={() => {
                setIsMenuPopup([false, !isMenuPopup[1]]);
              }}
            >
              <CiMenuKebab />
            </button>
            <Createpopup>
              {isMenuPopup[1] ? (
                <div className="bg-gray-200 p-2 overflow-hidden rounded-md absolute w-[13rem] top-[3.5rem] right-2">
                  {isOwner && (
                    <>
                      <button
                        className="w-full rounded-sm bg-gray-300 hover:bg-blue-400 hover:text-white p-2 text-[14px] uppercase flex items-center justify-center mb-1"
                        onClick={() => {
                          setMenuPop(7);
                          setIsOpen(true);
                        }}
                      >
                        Terminate
                      </button>
                      <button
                        className="w-full rounded-sm bg-gray-300 hover:bg-blue-400 hover:text-white text-[14px] uppercase p-2 flex items-center justify-center mb-1"
                        onClick={() => {
                          setMenuPop(8);
                          setIsOpen(true);
                        }}
                      >
                        Sell Property
                      </button>
                    </>
                  )}

                  <button
                    className="w-full rounded-sm bg-gray-300 hover:bg-blue-400 hover:text-white text-[14px] uppercase p-2 flex items-center justify-center mb-1"
                    onClick={() => {
                      setMenuPop(9);
                      setIsOpen(true);
                    }}
                  >
                    Sell Share
                  </button>
                  {/* <button
                    className="w-full rounded-sm bg-gray-300 hover:bg-blue-400 hover:text-white text-[14px] uppercase p-2 flex items-center justify-center mb-1"
                    onClick={() => {
                      setMenuPop(10);
                      setIsOpen(true);
                    }}
                  >
                    Report Property
                  </button> */}
                </div>
              ) : (
                ""
              )}
            </Createpopup>
          </div>
          <div className="h-[90%] bg-gray-100 p-4 overflow-hidden overflow-y-auto pb-20">
            {sdecide.map((items, index) => (
              <div key={index}>
                {items.map((sub, indexx) => (
                  <Decide
                    key={indexx}
                    index={index}
                    support={sub[2]}
                    decline={sub[3]}
                    reason={sub[0]}
                    id={id}
                  />
                ))}
              </div>
            ))}
            {sforsale.map((items, index) => (
              <Transact
                key={index}
                owner={items[0]}
                share={items[2]}
                price={items[1]}
                id={id}
              />
            ))}
            {srequest.map((items, index) => (
              <div key={index}>
                {items.map((sub, indexx) => (
                  <Requestfunds
                    key={indexx}
                    index={indexx}
                    support={sub[3]}
                    decline={sub[4]}
                    details={sub[0]}
                    to={sub[1]}
                    amount={sub[2]}
                    id={id}
                  />
                ))}
              </div>
            ))}
            {spunish.map((items, index) => (
              <div key={index}>
                {items.map((sub, indexx) => (
                  <Terminate
                    key={indexx}
                    index={indexx}
                    support={sub[3]}
                    purpose={sub[1]}
                    why={sub[2]}
                    reason={sub[1]}
                    who={sub[0]}
                    id={id}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="h-[3rem] absolute bottom-0 w-full bg-gray-200 flex items-center justify-between px-4">
            <Createpopup>
              {isMenuPopup[0] ? (
                <div className="bg-gray-200 p-2 overflow-hidden rounded-md w-[13rem] absolute bottom-[3.5rem] right-2 pt-4">
                  <button
                    className="w-full rounded-sm bg-gray-300 hover:bg-blue-400 hover:text-white text-[14px] uppercase p-2 flex items-center justify-center mb-1"
                    onClick={() => {
                      setMenuPop(1);
                      setIsOpen(true);
                    }}
                  >
                    Decide
                  </button>
                  {isOwner && (
                    <button
                      className="w-full rounded-sm bg-gray-300 hover:bg-blue-400 hover:text-white text-[14px] uppercase p-2 flex items-center justify-center mb-1"
                      onClick={() => {
                        setMenuPop(5);
                        setIsOpen(true);
                      }}
                    >
                      Request Funds
                    </button>
                  )}
                  <button
                    className="w-full rounded-sm bg-gray-300 hover:bg-blue-400 hover:text-white text-[14px] uppercase p-2 flex items-center justify-center mb-1"
                    onClick={() => {
                      setMenuPop(6);
                      setIsOpen(true);
                    }}
                  >
                    Punish
                  </button>
                </div>
              ) : (
                ""
              )}
            </Createpopup>
            <p className="uppercase text-[13px]">Chat feature unavailable</p>
            <button
              className="p-2 font-bold"
              onClick={() => {
                setIsMenuPopup([!isMenuPopup[0], false]);
              }}
            >
              <AiOutlineMenu />
            </button>
          </div>
        </div>
        <div className="w-[15rem] h-[90%] bg-gray-200 border-l-2 border-black overflow-hidden rounded-r-md">
          <div className="w-full bg-gray-200 flex flex-col justify-center p-2 px-4">
            <p className="font-bold text-xl py-2">About</p>
            <div className="w-full p-2 flex justify-evenly item-center">
              <button
                className="w-1/4 rounded-md bg-gray-300 hover:bg-blue-400 hover:text-white text-[14px] uppercase p-2 flex items-center justify-center mb-1"
                onClick={() => {
                  setMenuPop(11);
                  setIsOpen(true);
                }}
              >
                RP
              </button>
              <button
                className="w-1/4 rounded-md bg-gray-300 hover:bg-blue-400 hover:text-white text-[14px] uppercase p-2 flex items-center justify-center mb-1"
                onClick={() => {
                  setMenuPop(10);
                  setIsOpen(true);
                }}
              >
                D
              </button>
            </div>
            <p className="font-bold px-2 text-gray-700 mt-3">Shareholders</p>
          </div>
          <div className="p-2 py-4 flex flex-col w-full h-full overflow-y-auto pb-20">
            <div className="w-full p-3">
              {sparticipants.map((i) => (
                <div key={i}>
                  {i.map((item, index) => (
                    <Participants
                      key={index}
                      address={item[0]}
                      share={item[1]}
                      balance={item[2]}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Contribution;
