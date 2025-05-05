import { ethers } from 'ethers';
import { parseEther } from 'viem';

const contractABI = [
  // Add your contract ABI here
];

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export class RideShareContract {
  private contract: ethers.Contract;
  private signer: ethers.Signer;

  constructor(provider: ethers.Provider) {
    this.signer = provider.getSigner();
    this.contract = new ethers.Contract(contractAddress, contractABI, this.signer);
  }

  async createRide(
    from: string,
    to: string,
    date: string,
    seats: number,
    price: number
  ) {
    try {
      const priceInWei = parseEther(price.toString());
      const tx = await this.contract.createRide(from, to, date, seats, priceInWei);
      return await tx.wait();
    } catch (error) {
      console.error('Error creating ride:', error);
      throw error;
    }
  }

  async bookRide(rideId: string, price: number) {
    try {
      const priceInWei = parseEther(price.toString());
      const tx = await this.contract.bookRide(rideId, { value: priceInWei });
      return await tx.wait();
    } catch (error) {
      console.error('Error booking ride:', error);
      throw error;
    }
  }
}