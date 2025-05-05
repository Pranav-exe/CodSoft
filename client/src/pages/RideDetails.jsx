import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, DollarSign, ArrowLeft, Phone, Mail, MessageSquare } from 'lucide-react';

const RideDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ride, setRide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bookingStatus, setBookingStatus] = useState('idle'); // idle, loading, success, error
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchRideDetails = async () => {
      try {
        const response = await fetch(`https://rideshare-backend.onrender.com/api/rides/${id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch ride details');
        }
        
        const data = await response.json();
        setRide(data);
      } catch (error) {
        setError(error.message || 'Failed to fetch ride details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRideDetails();
  }, [id, user, navigate]);

  const handleBookRide = async () => {
    setBookingStatus('loading');
    
    try {
      const response = await fetch(`https://rideshare-backend.onrender.com/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          rideId: id,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to book ride');
      }
      
      setBookingStatus('success');
      
      // Reload ride details to update available seats
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      
    } catch (error) {
      setBookingStatus('error');
      setError(error.message || 'Failed to book ride');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-bg flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error && !ride) {
    return (
      <div className="min-h-screen bg-dark-bg px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-4 btn-secondary flex items-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!ride) return null;

  const { from, to, date, time, seats, price, description, driver } = ride;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Check if current user is the driver
  const isDriver = driver?._id === user?._id;
  
  // Check if ride is full
  const isFull = seats <= 0;
  
  // Get booking status text and color
  let statusText = '';
  let statusColor = '';
  
  if (bookingStatus === 'success') {
    statusText = 'Ride booked successfully!';
    statusColor = 'text-green-400';
  } else if (bookingStatus === 'error') {
    statusText = error || 'Failed to book ride. Please try again.';
    statusColor = 'text-red-400';
  }

  return (
    <div className="min-h-screen bg-dark-bg pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 text-dark-text-secondary hover:text-primary flex items-center transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to all rides
        </button>
        
        <div className="card overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-primary/20 to-dark-surface border-b border-dark-border p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-dark-text">
                  {from} → {to}
                </h1>
                <div className="mt-2 flex items-center text-dark-text-secondary">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>{formattedDate}</span>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center">
                <span className="text-3xl font-bold text-primary">${price}</span>
                <span className="ml-2 text-dark-text-secondary">per seat</span>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Clock className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-dark-text-secondary text-sm">Departure Time</p>
                  <p className="text-dark-text font-medium">{time}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-dark-text-secondary text-sm">Available Seats</p>
                  <p className="text-dark-text font-medium">{seats} {seats === 1 ? 'seat' : 'seats'}</p>
                </div>
              </div>
            </div>
            
            {description && (
              <div className="mb-6">
                <h2 className="text-lg font-medium text-dark-text mb-2">Trip Details</h2>
                <p className="text-dark-text-secondary">{description}</p>
              </div>
            )}
            
            <div className="border-t border-dark-border pt-6">
              <h2 className="text-lg font-medium text-dark-text mb-4">Driver Information</h2>
              <div className="flex items-center">
                <div className="h-14 w-14 rounded-full bg-dark-surface-2 flex items-center justify-center text-primary text-xl font-medium">
                  {driver?.name ? driver.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="ml-4">
                  <p className="text-dark-text font-medium">{driver?.name || 'Unknown'}</p>
                  <div className="mt-1 flex items-center text-dark-text-secondary">
                    <Mail className="h-4 w-4 mr-1" />
                    <span>{driver?.email || 'N/A'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-lg font-medium text-dark-text">Ready to join this ride?</h2>
              <p className="text-dark-text-secondary mt-1">
                {isFull ? 'This ride is fully booked' : 'Book your seat now before they\'re gone'}
              </p>
              {statusText && (
                <p className={`mt-2 ${statusColor}`}>{statusText}</p>
              )}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate(`/chat/${driver?._id}`)}
                className="btn-secondary flex items-center justify-center"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Message Driver
              </button>
              
              {!isDriver && (
                <button
                  onClick={handleBookRide}
                  disabled={isFull || bookingStatus === 'loading' || bookingStatus === 'success'}
                  className={`btn-primary flex items-center justify-center ${(isFull || bookingStatus === 'success') ? 'opacity-60 cursor-not-allowed' : ''}`}
                >
                  {bookingStatus === 'loading' ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : bookingStatus === 'success' ? (
                    'Booked Successfully'
                  ) : isFull ? (
                    'Fully Booked'
                  ) : (
                    'Book This Ride'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetails;