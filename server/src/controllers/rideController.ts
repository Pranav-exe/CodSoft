import { Request, Response } from 'express';
import { Ride } from '../models/Ride.js';
import {Web3} from 'web3';

const web3 = new Web3(process.env.WEB3_PROVIDER_URL!);

export const createRide = async (req: Request, res: Response) => {
  try {
    const { from, to, date, time, seats, price, description, transactionHash } = req.body;
    const userId = req.user._id;

    const ride = await Ride.create({
      driver: userId,
      from,
      to,
      date,
      time,
      seats,
      price,
      description,
      transactionHash,
    });

    await ride.populate('driver', 'name email walletAddress');
    res.status(201).json(ride);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create ride' });
  }
};

export const getRides = async (req: Request, res: Response) => {
  try {
    const rides = await Ride.find()
      .populate('driver', 'name email walletAddress')
      .sort('-createdAt');
    res.json(rides);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch rides' });
  }
};

export const getRideById = async (req: Request, res: Response) => {
  try {
    const ride = await Ride.findById(req.params.id)
      .populate('driver', 'name email walletAddress');
    
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }
    
    res.json(ride);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch ride' });
  }
};