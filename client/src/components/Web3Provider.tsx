import React from 'react';
import { WagmiProvider } from 'wagmi';
import { Web3Modal } from '@web3modal/react';
import { wagmiConfig, ethereumClient, modalProjectId } from '../lib/web3/client';

interface Web3ProviderProps {
  children: React.ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        {children}
      </WagmiProvider>
      <Web3Modal projectId={modalProjectId} ethereumClient={ethereumClient} />
    </>
  );
};