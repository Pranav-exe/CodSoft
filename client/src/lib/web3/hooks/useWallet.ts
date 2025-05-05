import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useWeb3Modal } from '@web3modal/react';

export function useWallet() {
  const { address, isConnected } = useAccount();
  const { disconnectAsync } = useDisconnect();
  const { open } = useWeb3Modal();

  const handleConnect = async () => {
    try {
      await open();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnectAsync();
    } catch (error) {
      console.error('Failed to disconnect wallet:', error);
    }
  };

  return {
    address,
    isConnected,
    connect: handleConnect,
    disconnect: handleDisconnect,
  };
}