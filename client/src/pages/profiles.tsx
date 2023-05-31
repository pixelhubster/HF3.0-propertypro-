import { useState, useContext, useRef } from "react";
import Createpopup from "../components/createpopup";
import { MdCancel } from "react-icons/md";
import AppContext from "../components/contract";
import { IdentityButton, useGateway, GatewayStatus } from "@civic/ethereum-gateway-react";
const Profiles = () => {
  const { gatewayStatus} = useGateway();
  const [isOpen, setIsOpen] = useState(false);
  const { contract, web3, currentAccount, connectWallet } =
    useContext(AppContext);
  connectWallet;
  const nameRef = useRef(null);
  const locationRef = useRef(null);
  const priceRef = useRef(null);
  const sharesRef = useRef(null);
  const image1Ref = useRef(null);
  const image2Ref = useRef(null);
  const image3Ref = useRef(null);
  const descriptionRef = useRef(null);
  const handleSubmit = () => {
    const form = {
      name: nameRef.current.value,
      location: locationRef.current.value,
      price: priceRef.current.value,
      shares: sharesRef.current.value,
      image1: image1Ref.current.value,
      image2: image2Ref.current.value,
      image3: image3Ref.current.value,
      description: descriptionRef.current.value,
    };
    //create Property
    async function createProperty() {
      try {
        // console.log(currentAccount)
        // const amountToSend = web3.utils.toWei(10, 'XDC');
        // console.log(amountToSend)
        await contract.methods
          .createProperty(
            form.name,
            form.location,
            [form.image1, form.image2, form.image3],
            form.price,
            form.description,
            0,
            form.shares
          )
          .send({ from: currentAccount })
          .then((result) => {
            console.log("Property created ", result);
          });
      } catch (error) {
        console.log(error);
      }
    }
    createProperty();
  };
  const PASS = "ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6";
  return (
    <>
      {/* <Civicpass> */}
        <Createpopup>
          {isOpen ? (
            <div className="fixed top-0 backdrop-blur-[1px] z-10 bg-white/2 w-full h-full flex justify-center items-center animate-[all] duration-[10s]">
              <div className="overflow-hidden w-[40rem] h-[40rem] md:h-[50rem] bg-white rounded-md">
                <div className="w-full h-[3rem] bg-gray-200 flex justify-between items-center px-5">
                  <p className="font-bold">Create Property</p>
                  <button
                    className="w-[2rem] h-[2rem] rounded-full text-2xl text-gray-600 bg-gray-100 flex items-center justify-center overflow-hidden"
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <MdCancel />
                  </button>
                </div>
                {/* <form action="" onSubmit={handleSubmit} className='relative w-full h-full flex flex-col justity-evenly'> */}
                <div className="h-[90%] overflow-y-auto p-4 flex flex-col items-center">
                  <div className="flex flex-col w-10/12 pb-10">
                    <label className="font-bold mt-6 text-[18px] w-full p-2">
                      Property Name{" "}
                      <i className="font-normal not-italic text-gray-500">*</i>
                    </label>
                    <input
                      name="name"
                      ref={nameRef}
                      className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
                      placeholder="House 200"
                      required
                    />
                    <label className="font-bold mt-4 text-[18px] w-full p-2">
                      Location{" "}
                      <i className="font-normal not-italic text-gray-500">*</i>
                    </label>
                    <input
                      name="location"
                      ref={locationRef}
                      className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
                      placeholder="Ghana, Accra"
                      required
                    />
                    <label className="font-bold mt-4 text-[18px] w-full p-2">
                      Price{" "}
                      <i className="font-normal not-italic text-gray-500">*</i>
                    </label>
                    <input
                      name="price"
                      ref={priceRef}
                      type="tel"
                      className="w-full ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
                      placeholder="$"
                      required
                    />
                    <label className="font-bold mt-4 text-[18px] w-full p-2">
                      Shares{" "}
                      <i className="font-normal not-italic text-gray-500">*</i>
                    </label>
                    <input
                      name="shares"
                      ref={sharesRef}
                      type="tel"
                      className="w-1/2 ml-4 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
                      placeholder="%"
                      max={100}
                      required
                    />
                    <label className="font-bold mt-4 text-[18px] w-full p-2">
                      Add image{" "}
                      <i className="font-normal not-italic text-gray-500">*</i>
                    </label>
                    <input
                      name="image1"
                      ref={image1Ref}
                      type="tel"
                      className="w-full ml-4 mb-2 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
                      placeholder="https://urltoimage.jpg"
                      required
                    />
                    <input
                      name="image2"
                      ref={image2Ref}
                      type="tel"
                      className="w-full ml-4 mb-2 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
                      placeholder="https://urltoimage.jpg"
                      required
                    />
                    <input
                      name="image3"
                      ref={image3Ref}
                      type="tel"
                      className="w-full ml-4 mb-2 border-2 border-gray-300 outline-1 outline-blue-400 p-2 rounded-md"
                      placeholder="https://urltoimage.jpg"
                      required
                    />
                    <label className="font-bold mt-4 text-[18px] w-full p-2">
                      Description{" "}
                      <i className="font-normal not-italic text-gray-500">*</i>
                    </label>
                    <textarea
                      name="description"
                      ref={descriptionRef}
                      rows={3}
                      cols={1}
                      className="border-gray-300 border-2 p-2 outline-blue-500 rounded-md ml-5"
                      required
                    />
                    <label className="font-bold mt-4 text-[18px] w-full p-2">
                      Proof of Property{" "}
                      <i className="font-normal not-italic text-gray-500">*</i>
                    </label>
                    <input name="doc" type="file" className="p-2" required />
                  </div>
                  <IdentityButton className="mb-4 p-3 rounded-lg"/>
                  <button
                  disabled={gatewayStatus != GatewayStatus.ACTIVE }
                  className={`"p-2 px-5 w-10/12 text-white font-bold bg-blue-500 rounded-md" ${gatewayStatus && 'hidden'} `}
                  onClick={handleSubmit}
                >
                  Create
                </button>
                </div>
                {/* <GatewayProvider
                wallet={currentAccount}
                gatekeeperNetwork={gatekeeperNetwork}
              >
                <p>Done</p>
              </GatewayProvider> */}

                {/* </form> */}
              </div>
            </div>
          ) : (
            ""
          )}
        </Createpopup>
        <div className="w-full h-full flex justify-center fixed">
          <div className="w-full h-full lg:w-10/12 bg-white flex flex-col items-center overflow-y-scroll pb-[5rem]">
            <p className="p-4 pt-6 text-xl font-bold w-full">My Dashboard</p>
            <div className="p-4 py-2 w-full">
              <button
                className="w-[10rem] h-[3rem] bg-blue-500 text-white font-bold rounded-md"
                onClick={() => {
                  isOpen ? setIsOpen(false) : setIsOpen(true);
                }}
              >
                Create Property
              </button>
              {/* <div className="py-3 w-full flex overflow-x-auto">
              <Createdproperty />
            </div> */}
            </div>
            {/* <p className="p-4 pt-6 text-xl font-bold w-full">Properties</p>
          <div className="p-4 py-2 w-full">
            <div className="py-3 w-full flex overflow-x-auto">
              <Property
                name="Hello world"
                rate="4"
                share="100"
                price="200"
                owner="0x230..3fd"
                location="Ghana, Accra"
              />
            </div>
          </div>
          <p className="p-4 pt-6 text-xl font-bold w-full">Saved</p>
          <div className="p-4 py-2 w-full">
            <div className="py-3 w-full flex overflow-x-auto">
              <Property
                name="Hello world"
                rate="4"
                share="100"
                price="200"
                owner="0x230..3fd"
                location="Ghana, Accra"
              />
              <Property
                name="Hello world"
                rate="4"
                share="100"
                price="200"
                owner="0x230..3fd"
                location="Ghana, Accra"
              />
            </div>
          </div>
          <p className="p-4 pt-6 text-xl font-bold w-full">My Transactions</p>
          <div className="p-4 py-2 w-full"></div> */}
          </div>
        </div>
      {/* </Civicpass> */}

      {/* </GatewayProvider> */}
    </>
  );
};

export default Profiles;
