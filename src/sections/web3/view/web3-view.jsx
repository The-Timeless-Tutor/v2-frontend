import { Avatar, Container, Grid, Stack, Typography } from '@mui/material';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import TTTTokenABI from 'src/utils/TTTTokenABI.json';
import SwapperABI from 'src/utils/SwapperABI.json';
import CreateWallet from 'src/components/create-wallet';
import { CardBody, CardContainer, CardItem } from 'src/components/evervault-card/evervault-card';
import ImportWallet from 'src/components/import-wallet';
import BalanceSlider from 'src/components/slider';
import UserOnboard from 'src/components/user-onboard';
import DexForm from 'src/components/dex-form';

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

  // State variables to hold various pieces of information
  // const [signer, setSigner] = useState(null); // Signer object for signing transactions
  // const [isLoading, setIsLoading] = useState(false); // Loading state for UI
  const tokenAddress = '0x17A65c12a053Aa9f6EAb707684ecCD2204103B28'; // TTT token address
  const ETHAddress = '0xd38E5c25935291fFD51C9d66C3B7384494bb099A'; // ETH token address
  const swapperAddress = '0x1b0439C406308B52692CC0DF667874E606f0Dd7F'; // Swapper contract address
  const [balance, setBalance] = useState(); // Token balance of the user
  const [tokenContract, setTokenContract] = useState(null); // Contract instance for TTT token
  const [isPurchasing, setIsPurchasing] = useState(false); // Purchasing state for UI

  // set balance
  React.useEffect(() => {
    if (wallet?.address) {
      (async () => {
        fetch(`https://api-sepolia.etherscan.io/api
        ?module=account
        &action=tokenbalance
        &contractaddress=${ETHAddress}
        &address=${wallet?.address}
        &tag=latest&apikey=${import.meta.env.VITE_ETHERSCAN_API_KEY}`)
          .then((res) => res.json())
          // .then((res) => console.log(res))
          .catch((error) => console.log(error));
      })();
    }
  }, [wallet]);

  return (
    <Container>
      {!hasWallet && (
        <>
          <ImportWallet
            setHasWallet={setHasWallet}
            open={isImportWalletModalOpen}
            setOpen={setIsImportWalletModalOpen}
            setWallet={setWallet}
          />

          <CreateWallet
            setHasWallet={setHasWallet}
            open={isCreateWalletModalOpen}
            setOpen={setIsCreateWalletModalOpen}
            setWallet={setWallet}
          />
          <div style={{ display: 'flex', gap: 4 }}>
            <Typography variant="h2">🌍</Typography>
            <Stack direction="column" mb={3}>
              <Typography variant="h4">Web 3.0</Typography>
              <Typography variant="p">Welcome to the world of decentralization. 🎉</Typography>
            </Stack>
          </div>
          <UserOnboard
            setIsImportWalletModalOpen={setIsImportWalletModalOpen}
            setIsCreateWalletModalOpen={setIsCreateWalletModalOpen}
          />
        </>
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

          <DexForm />
        </div>
      )}
    </Container>
  );
}
