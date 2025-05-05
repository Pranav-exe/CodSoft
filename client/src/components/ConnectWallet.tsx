import React from 'react';
import { useWallet } from '../lib/web3/hooks/useWallet';
import { Wallet } from 'lucide-react';

export const ConnectWallet: React.FC = () => {
  const { address, isConnected, connect, disconnect } = useWallet();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={isConnected ? disconnect : connect}
        className={`btn-primary flex items-center ${isConnected ? 'bg-dark-surface-2' : ''}`}
      >
        <Wallet className="h-5 w-5 mr-2" />
        {isConnected
          ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
          : 'Connect Wallet'}
      </button>
      {isConnected && (
        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
      )}
    </div>
  );
};