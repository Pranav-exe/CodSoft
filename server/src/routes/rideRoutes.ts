import express from 'express';
import { createRide, getRides, getRideById } from '../controllers/rideController.js';
import { protect } from '../middleware/authMiddleware.js';

export const rideRoutes = express.Router();

rideRoutes.use(protect);
rideRoutes.route('/').post(createRide).get(getRides);
rideRoutes.route('/:id').get(getRideById);