import {Web3} from 'web3';
import { Request, Response } from 'express';
import { Booking } from '../models/Booking.js';
import { Ride } from '../models/Ride.js';


const web3 = new Web3(process.env.WEB3_PROVIDER_URL!);

export const createBooking = async (req: Request, res: Response) => {
  try {
    const { rideId, transactionHash } = req.body;
    const userId = req.user._id;

    // Verify the ride exists and has available seats
    const ride = await Ride.findById(rideId);
    if (!ride) {
      return res.status(404).json({ message: 'Ride not found' });
    }

    if (ride.seats <= 0) {
      return res.status(400).json({ message: 'No seats available' });
    }

    // Create booking
    const booking = await Booking.create({
      user: userId,
      ride: rideId,
      transactionHash,
    });

    // Decrease available seats
    ride.seats -= 1;
    await ride.save();

    await booking.populate([
      { path: 'user', select: 'name email walletAddress' },
      { path: 'ride', populate: { path: 'driver', select: 'name email walletAddress' } }
    ]);

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking' });
  }
};

export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate([
        { path: 'user', select: 'name email walletAddress' },
        { path: 'ride', populate: { path: 'driver', select: 'name email walletAddress' } }
      ])
      .sort('-createdAt');

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch bookings' });
  }
};

export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update booking status' });
  }
};