import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

export default function GetTTTBalance({ wallet }) {
  const [tttBalance, setTTTBalance] = useState(null);

  const tokenContract = "0x17A65c12a053Aa9f6EAb707684ecCD2204103B28";

  useEffect(() => {
    (async () => {
      try {
        const web3 = new Web3(
          new Web3.providers.HttpProvider(
            "https://mainnet.infura.io/v3/<YOUR_API_KEY>",
          ),
        );

       
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    })();
  }, []); // Add wallet to dependency array to ensure re-render on wallet change

  return (
    <Typography variant="div" sx={{ color: 'text.secondary' }} className="flex items-center">
      Balance:{' '}
      {tttBalance !== null ? ( // Check for null instead of undefined
        tttBalance
      ) : (
        <div role="status" className="max-w-sm animate-pulse">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-8 gap-2"></div>
          <span className="sr-only">Loading...</span>
        </div>
      )}
    </Typography>
  );
}
