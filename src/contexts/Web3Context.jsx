/* eslint-disable react/prop-types */
import { ethers } from 'ethers';
import { createContext, useEffect, useReducer } from 'react';
import Web3 from 'web3';

const initialState = {
  wallet: null,
  sepolia: {
    provider: null,
    tttBalance: 0,
    ethBalance: 0,
  },
};

const Web3Context = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    case 'SET_INITIAL_SETUP':
      return {
        ...state,
        wallet: action.payload.wallet,
        sepolia: action.payload.sepolia,
      };
    default:
      return state;
  }
};

const Web3Provider = ({ children }) => {
  const [web3state, web3Dispatch] = useReducer(reducer, initialState);

  // const setUser = (user) => {
  //   dispatch({
  //     type: 'SET_USER',
  //     payload: user,
  //   });
  // };

  useEffect(() => {
    (async () => {
      const encryptedKey = window.localStorage.getItem(
        import.meta.env.VITE_ENCRYPTED_PRIVATE_KEY_LOCATION
      );

      const _hasWallet = window.localStorage.getItem(import.meta.env.VITE_IS_WALLET_AUTHENTICATED);
      
      if (encryptedKey != undefined && _hasWallet) {
        const wallet = JSON.parse(window.localStorage.getItem(import.meta.env.VITE_WEB3_WALLET));

        const web3 = new Web3(
          `https://arbitrum-sepolia.infura.io/v3/${import.meta.env.VITE_INFURA_API_KEY}`
        );
        
        const tokenContract = '0x17A65c12a053Aa9f6EAb707684ecCD2204103B28';

        const balanceOfABI = [
          {
            constant: true,
            inputs: [
              {
                name: '_owner',
                type: 'address',
              },
            ],
            name: 'balanceOf',
            outputs: [
              {
                name: 'balance',
                type: 'uint256',
              },
            ],
            payable: false,
            stateMutability: 'view',
            type: 'function',
          },
        ];
        const _provider = new ethers.InfuraProvider("sepolia", import.meta.env.VITE_INFURA_API_KEY)
        console.log(_provider)
        const contract = new web3.eth.Contract(balanceOfABI, tokenContract);
        
        try {
          const result = await contract.methods.balanceOf(wallet?.address).call();
          console.log(result);
        } catch (error) {
          console.log(error);
        }
      }
    })();
  }, []);

  return (
    <Web3Context.Provider value={{ web3state, web3Dispatch }}>{children}</Web3Context.Provider>
  );
};

export { Web3Context, Web3Provider };
