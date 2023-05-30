// import { GatewayProvider, useGateway } from "@civic/ethereum-gateway-react";
// import { FC, PropsWithChildren, useContext } from "react";
// import AppContext from "../components/contract";
// import { ethers } from 'ethers';
// import Web3 from "web3";
// const Civicpass:FC<PropsWithChildren> = ({children}) => {
//     const { web3, currentAccount } = useContext(AppContext);
//     const PASS = 'ignREusXmGrscGNUesoU9mxfds9AiYTezUKex2PsZV6';


//     // Inside your component or function
//     const provider = new Web3(window.ethereum);
//     const wallet = provider.eth.accounts.wallet.add(currentAccount);

//     // const 
//     // const wallet = window.ethereum && new ethers.Web3Provider(window.ethereum).getSigner();

//     return (
//         <GatewayProvider
//             wallet={wallet}
//             gatekeeperNetwork={PASS}
//             >
//             {children}
//         </GatewayProvider>
//     )
// }

// export default Civicpass;