import { Typography } from '@mui/material';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import TTTTokenABI from 'src/utils/TTTTokenABI.json';

const tokenAddress = '0x17A65c12a053Aa9f6EAb707684ecCD2204103B28'; // TTT token address

export default function GetTTTBalance({ wallet }) {
  const [tttBalance, setTTTBalance] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const provider = new ethers.providers.InfuraProvider('sepolia'); // Or other provider
        const contract = new ethers.Contract(tokenAddress, TTTTokenABI, provider); // Create contract instance

        const balance = await contract.balanceOf(wallet?.address); // Get token balance
        const formattedBalance = ethers.utils.formatUnits(balance, 18); // Format the balance with appropriate decimals

        console.log('Balance:', formattedBalance); // Debug output
        setTTTBalance(formattedBalance); // Set the formatted balance to state
      } catch (error) {
        console.error('Error fetching balance:', error); // Improved error handling
      }
    })();
  }, [wallet]); // Add wallet to dependency array to ensure re-render on wallet change

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
