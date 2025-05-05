import { createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { EthereumClient } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';

const projectId = process.env.VITE_WALLET_CONNECT_PROJECT_ID! as string;

export const wagmiConfig = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http()
  },
  ssr: true,
});

export const ethereumClient = new EthereumClient(wagmiConfig, [mainnet]);
export const modalProjectId = projectId;