import {Web3} from 'web3';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';

const contractABI: AbiItem[] = [
  // Add your contract ABI here after compilation
];

class Web3Service {
  private web3: any;
  private contract: any;

  constructor() {
    // Initialize Web3 with the correct type
    this.web3 = new Web3(process.env.WEB3_PROVIDER_URL!);
    this.contract = new this.web3.eth.Contract(
      contractABI,
      process.env.CONTRACT_ADDRESS!
    );
  }

  async verifyTransaction(txHash: string) {
    try {
      const receipt = await this.web3.eth.getTransactionReceipt(txHash);
      return receipt && receipt.status;
    } catch (error) {
      console.error('Error verifying transaction:', error);
      return false;
    }
  }

  async getRideFromContract(rideId: string) {
    try {
      return await this.contract.methods.getRideDetails(rideId).call();
    } catch (error) {
      console.error('Error fetching ride from contract:', error);
      throw error;
    }
  }
}

export const web3Service = new Web3Service();