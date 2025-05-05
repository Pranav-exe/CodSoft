import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { HydratedDocument } from 'mongoose';
import { IUser } from '../types/user.js'; // You need to define this interface

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET!, { expiresIn: '30d' });
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, walletAddress } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = await User.create({
      name,
      email,
      password,
      walletAddress,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      walletAddress: user.walletAddress,
      token: generateToken(user._id.toString()), // ✅ Fix: cast _id to string
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }) as HydratedDocument<IUser>; // ✅ Fix: use correct type

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const isMatch = await user.matchPassword(password); // ✅ matchPassword is now recognized
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      walletAddress: user.walletAddress,
      token: generateToken(user._id.toString()), // ✅ cast _id
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};