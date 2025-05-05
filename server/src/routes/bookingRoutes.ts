import express from 'express';
import {
  createBooking,
  getMyBookings,
  updateBookingStatus,
} from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

export const bookingRoutes = express.Router();

bookingRoutes.use(protect);
bookingRoutes.route('/').post(createBooking);
bookingRoutes.get('/my-bookings', getMyBookings);
bookingRoutes.patch('/:id/status', updateBookingStatus);