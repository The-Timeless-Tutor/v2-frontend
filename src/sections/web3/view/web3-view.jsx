import { Avatar, Container, Grid, Stack, Typography } from '@mui/material';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import TTTTokenABI from 'src/utils/TTTTokenABI.json';
import SwapperABI from 'src/utils/SwapperABI.json';
import CreateWallet from 'src/components/create-wallet';
import { CardBody, CardContainer, CardItem } from 'src/components/evervault-card/evervault-card';
import ImportWallet from 'src/components/import-wallet';
import BalanceSlider from 'src/components/slider';

export default function Web3Page() {
  // @dev wallet collection
  const [isImportWalletModalOpen, setIsImportWalletModalOpen] = useState(false);
  const [isCreateWalletModalOpen, setIsCreateWalletModalOpen] = useState(false);
  const [hasWallet, setHasWallet] = useState(false);
  const [wallet, setWallet] = useState();

  React.useEffect(() => {
    const encryptedKey = window.localStorage.getItem(
      import.meta.env.VITE_ENCRYPTED_PRIVATE_KEY_LOCATION
    );
    const _hasWallet = window.localStorage.getItem(import.meta.env.VITE_IS_WALLET_AUTHENTICATED);

    if (encryptedKey != undefined && _hasWallet) {
      setHasWallet(true);
      const _wallet = JSON.parse(window.localStorage.getItem(import.meta.env.VITE_WEB3_WALLET));
      setWallet(_wallet);
    }
  }, [hasWallet]);

  // @dev gas estimation
  const [gasInfo, setGasInfo] = useState();

  // React.useEffect(() => {
  //   fetch(
  //     `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${
  //       import.meta.env.VITE_ETHERSCAN_API_KEY
  //     }`
  //   )
  //     .then((res) => res.json())
  //     .then((res) => setGasInfo(res.result?.suggestBaseFee))
  //     .catch((error) => console.log(error));
  // }, []);

  // State variables to hold various pieces of information
  // const [signer, setSigner] = useState(null); // Signer object for signing transactions
  // const [isLoading, setIsLoading] = useState(false); // Loading state for UI
  const [tttInput, setTTTInput] = useState(1); // Input for TTT token
  const [ethInput, setEthInput] = useState(0.001); // Input for ETH
  const tokenAddress = '0x17A65c12a053Aa9f6EAb707684ecCD2204103B28'; // TTT token address
  const ETHAddress = '0xd38E5c25935291fFD51C9d66C3B7384494bb099A'; // ETH token address
  const swapperAddress = '0x1b0439C406308B52692CC0DF667874E606f0Dd7F'; // Swapper contract address
  const [balance, setBalance] = useState(); // Token balance of the user
  const [tokenContract, setTokenContract] = useState(null); // Contract instance for TTT token
  const [isPurchasing, setIsPurchasing] = useState(false); // Purchasing state for UI

  // Function to handle changes in the TTT input field
  const handleTTTChange = (e) => {
    setTTTInput(e.target.value); // Update TTT input based on user input
    setEthInput(e.target.value * 0.001); // Update ETH input based on TTT value
  };

  // Function to handle changes in the ETH input field
  const handleEthChange = (e) => {
    setEthInput(e.target.value); // Update ETH input based on user input
    setTTTInput(e.target.value / 0.001); // Update TTT input based on ETH value
  };

  // set balance
  React.useEffect(() => {
    if (wallet?.address) {
      (async () => {
        let _provider = ethers.getDefaultProvider('sepolia');
        console.log(_provider);
        // const signer = _provider.getSigner(wallet?.address);

        const contract = new ethers.Contract(tokenAddress, TTTTokenABI, _provider); // Create contract instance

        fetch(`https://api-sepolia.etherscan.io/api
        ?module=account
        &action=tokenbalance
        &contractaddress=${ETHAddress}
        &address=${wallet?.address}
        &tag=latest&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`)
          .then((res) => res.json())
          .then((res) => console.log(res))
          .catch((error) => console.log(error));

        const ethContract = new ethers.Contract(ETHAddress, TTTTokenABI, _provider); // Create contract instance
        const _balance = await contract.balanceOf(wallet?.address); // Get token balance
        const _ethBalance = await ethContract.balanceOf(wallet?.address); // Get token balance
        console.log(_ethBalance);
        setBalance(ethers.formatUnits(_balance, 18));
      })();
    }
  }, [wallet]);

  return (
    <Container>
      {!hasWallet && (
        <ImportWallet
          setHasWallet={setHasWallet}
          open={isImportWalletModalOpen}
          setOpen={setIsImportWalletModalOpen}
          setWallet={setWallet}
        />
      )}
      {!hasWallet && (
        <CreateWallet
          setHasWallet={setHasWallet}
          open={isCreateWalletModalOpen}
          setOpen={setIsCreateWalletModalOpen}
          setWallet={setWallet}
        />
      )}
      {!hasWallet && (
        <div style={{ display: 'flex', gap: 4 }}>
          <Typography variant="h2">🌍</Typography>
          <Stack direction="column" mb={3}>
            <Typography variant="h4">Web 3.0</Typography>
            <Typography variant="p">Welcome to the world of decentralization. 🎉</Typography>
          </Stack>
        </div>
      )}

      {!hasWallet && (
        <div className="flex gap-4 flex-wrap items-start">
          <CardContainer className="inter-var w-[100%]">
            <CardBody className="bg-gray-50 relative group/card border-black/[0.1] w-[100%] h-auto rounded-xl p-6 border  ">
              <CardItem translateZ="50" className="text-xl font-bold text-neutral-600">
                💵 Import Wallet
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="https://images.unsplash.com/photo-1604079628040-94301bb21b91?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-5 flex-wrap gap-3">
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-3 rounded-xl bg-black text-white text-sm font-semibold cursor-pointer"
                  onClick={() => setIsImportWalletModalOpen(true)}
                >
                  Import using Private Key
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="a"
                  href="https://twitter.com/mannupaaji"
                  target="__blank"
                  className="px-4 py-1 rounded-xl text-sm font-semibold text-center text-blue-600"
                >
                  Learn More →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var w-[100%]">
            <CardBody className="bg-gray-50 relative group/card border-black/[0.1] w-[100%] h-auto rounded-xl p-6 border  ">
              <CardItem translateZ="50" className="text-xl font-bold text-neutral-600">
                🪛 Create Wallet
              </CardItem>
              <CardItem translateZ="100" className="w-full mt-4">
                <img
                  src="https://images.unsplash.com/photo-1604076984203-587c92ab2e58?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="flex justify-between items-center mt-5 flex-wrap gap-3">
                <CardItem
                  translateZ={20}
                  as="button"
                  onClick={() => setIsCreateWalletModalOpen(true)}
                  className="px-4 py-3 rounded-xl bg-black text-white text-sm font-semibold cursor-pointer"
                >
                  Generate Wallet
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="a"
                  href="https://twitter.com/mannupaaji"
                  target="__blank"
                  className="px-4 py-1 rounded-xl text-sm font-semibold text-center text-blue-600"
                >
                  Learn More →
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      )}

      {hasWallet && (
        <div className="pb-4">
          <div className="flex items-center justify-between flex-wrap">
            <Typography variant="h4" sx={{ color: 'text.secondary' }}>
              📜 TTT Swap
            </Typography>
            <div className="flex items-center gap-2 p-4">
              <Avatar
                src="https://avatars.githubusercontent.com/u/135448616?s=64&v=4"
                alt="photoURL"
              />
              <div>
                <p className="text-md">
                  {wallet?.address.substring(0, 10) +
                    '...' +
                    wallet?.address.substring(wallet?.address.length - 3, wallet?.address.length)}
                </p>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary' }}
                  className="flex items-center cursor-pointer gap-1"
                >
                  <span>Sepolia</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                      />
                    </svg>
                  </span>
                </Typography>
              </div>
            </div>
            <div className="mb-3">
              <Typography variant="h4" sx={{ color: 'text.secondary' }}>
                🌍 Web 3.0
              </Typography>
            </div>
          </div>

          <div className="max-w-lg mx-auto p-4 bg-white rounded-xl mt-2">
            <div className="flex flex-col gap-1 mb-4 px-4 py-2 rounded-xl bg-[#f9f8f8] focus:outline-none focus:ring-2 focus:ring-blue-500">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                You Pay
              </Typography>
              <div className="flex items-center justify-between w-[100%] rounded-3xl">
                <input
                  id="fromAmount"
                  type="number"
                  value={ethInput}
                  onChange={(e) => handleEthChange(e)}
                  className="w-[80%] focus:outline-none focus:ring-0 bg-transparent text-4xl"
                  placeholder="0"
                />
                <div className="flex items-center gap-2">
                  <img
                    src="data:image/png;base64,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"
                    width={30}
                    height={30}
                    className="rounded-full"
                    alt=""
                  />
                  <p>ETH</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  $12
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Balance: 0
                </Typography>
              </div>
            </div>

            <div className="flex flex-col gap-1 mb-4 px-4 py-2 rounded-xl bg-[#f9f8f8] focus:outline-none focus:ring-2 focus:ring-blue-500">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                You Receive
              </Typography>
              <div className="flex items-center justify-between w-[100%] rounded-3xl">
                <input
                  id="toAmount"
                  type="number"
                  value={tttInput}
                  onChange={(e) => handleTTTChange(e)}
                  className="w-[80%] focus:outline-none focus:ring-0 bg-transparent text-4xl"
                  placeholder="0"
                />
                <div className="flex items-center gap-2">
                  <img
                    src="https://avatars.githubusercontent.com/u/135448616?s=64&v=4"
                    width={30}
                    height={30}
                    className="rounded-full"
                    alt=""
                  />
                  <p>TTT</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  $12
                </Typography>
                <Typography
                  variant="div"
                  sx={{ color: 'text.secondary' }}
                  className="flex items-center"
                >
                  Balance:{' '}
                  {balance ? (
                    Number.parseFloat(balance).toFixed(2)
                  ) : (
                    <div role="status" className="max-w-sm animate-pulse">
                      <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-8 gap-2"></div>
                      <span className="sr-only">Loading...</span>
                    </div>
                  )}
                </Typography>
              </div>
            </div>

            <div className="text-right">Add TTT to Wallet</div>

            <BalanceSlider />

            <button
              // onClick={handleSwap}
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-400 transition"
            >
              Swap
            </button>

            <div className="my-3 flex items-center justify-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                💵 1 TTT = 0.001 WETH
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                ⛽ {gasInfo} GWEI
              </Typography>
            </div>

            <Typography
              className="text-blue-500"
              variant="body2"
              sx={{ color: 'text.secondary', textAlign: 'center', textDecoration: 'underline' }}
            >
              Terms of Service
            </Typography>
          </div>
        </div>
      )}
    </Container>
  );
}
