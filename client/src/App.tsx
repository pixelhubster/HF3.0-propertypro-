import Navbar from "./components/navbar";
import { Routes, Route } from "react-router-dom";
import Shares from "./pages/shares";
import Profiles from "./pages/profiles";
import Home from "./pages/home";
import Productpage from "./pages/productPage";
import Contribution from "./pages/contribution";
import contractArtifact from "../contract/PropertyContract.json";
import Web3 from "web3";
import AppContext from "./components/contract";
import { useEffect, useState } from "react";
import { Wallet } from "ethers";
// import Civicpass from "./assets/civicPass";
import { GatewayProvider } from "@civic/ethereum-gateway-react";
function App() {
  //declare
  // const { connector } = useAccount();
  const [selected, setSelected] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    0,
    "",
  ]);
  const [currentAccount, setCurrentAccount] = useState<Wallet>();
  const [isConnected, setIsConnected] = useState(false);
  const [propertyCount, setPropertyCount] = useState(0);
  //custom format function to format Address
  const formatAddress = (address: string) => {
    const formatted = address;
    return formatted.slice(0, 6) + "..." + formatted.slice(-4);
  };

  //connecting to the contract
  const web3 = new Web3("https://erpc.apothem.network/");
  const contractAbi = contractArtifact.abi;
  const contractAddress = "0x472a222d859C437F34d1368DF1423dC5D38794Be" //"0xB42BBE654EB9629FEb982FDef5e4b042270A97A7";
  const contract = new web3.eth.Contract(contractAbi, contractAddress);

  //connect to wallet
  const connectWallet = async () => {
    try {
      if (ethereum) {
        try {
          await ethereum.request({
            method: "eth_requestAccounts",
          });
          const accounts = await web3.eth.getAccounts();
          contract.options.from = accounts[0];
          setIsConnected(true);
          setCurrentAccount(accounts[0]);
          console.log(accounts[0])
        } catch (error) {}
      } else {
      }
    } catch (error) {
      console.log(error);
    }
    console.log(currentAccount)
  };
  //get property count
  let properties = [];
  contract.methods.getPropertyCount().call((error: String, result: String) => {
    if (error) {
      console.log(error);
    } else {
      setPropertyCount(parseInt(result.toString()));
    }
  });
  //loop through to the propertCount and get all product details
  async function getProperty() {
    for (let i = 0; i < propertyCount; i++) {
      await contract.methods.getProperty(i).call((error, result) => {
        if (error) {
          console.log(error);
        } else {
          properties.push(result);
        }
      });
    }
  }
  //get shares under a property
  const shares = [];
  // for (let i = 0; i < propertyCount; i++) {
    contract.methods.getShares(0).call((error, result) => {
      if (error) {
        console.log(error);
      } else {
        shares.push(result);
      }
    });


  // }
  const pass = 'ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6';
  return (
    <>
      <AppContext.Provider
        value={{
          contract,
          web3,
          properties,
          formatAddress,
          setCurrentAccount,
          currentAccount,
          setSelected,
          selected,
          connectWallet,
          isConnected,
          propertyCount,
          setPropertyCount,
        }}
      >
        {/* <GatewayProvider
        wallet={currentAccount}
        gatekeeperNetwork={pass}> */}
           <div className="h-full w-full fixed">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="shares" element={<Shares />} />
              <Route path="profiles" element={<Profiles />} />
              <Route path="product" element={<Productpage />} />
              <Route path="property/:id" element={<Contribution />} />
            </Routes>
          </div>
        {/* </GatewayProvider> */}
         
      </AppContext.Provider>
    </>
  );
}

export default App;
