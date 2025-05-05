import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Clock, Car, ArrowLeft, MessageSquare, Calendar } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('myRides');
  const [myRides, setMyRides] = useState([]);
  const [myBookings, setMyBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        // Fetch user's rides
        const ridesResponse = await fetch('https://rideshare-backend.onrender.com/api/rides/my-rides', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        
        if (!ridesResponse.ok) {
          throw new Error('Failed to fetch rides');
        }
        
        const ridesData = await ridesResponse.json();
        setMyRides(ridesData);
        
        // Fetch user's bookings
        const bookingsResponse = await fetch('https://rideshare-backend.onrender.com/api/bookings/my-bookings', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        
        if (!bookingsResponse.ok) {
          throw new Error('Failed to fetch bookings');
        }
        
        const bookingsData = await bookingsResponse.json();
        setMyBookings(bookingsData);
        
      } catch (error) {
        setError(error.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [user, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-dark-bg pb-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 text-dark-text-secondary hover:text-primary flex items-center transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="card">
              <div className="p-6 text-center border-b border-dark-border">
                <div className="h-24 w-24 mx-auto rounded-full bg-dark-surface-2 flex items-center justify-center text-primary text-3xl font-medium">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <h2 className="mt-4 text-xl font-bold text-dark-text">{user?.name || 'User'}</h2>
                <div className="mt-2 flex items-center justify-center text-dark-text-secondary text-sm">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>{user?.email || 'user@example.com'}</span>
                </div>
                <p className="mt-4 text-dark-text-secondary">
                  Member since {user?.createdAt ? formatDate(user.createdAt) : 'Recently'}
                </p>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-medium text-dark-text mb-3">Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-dark-text-secondary">
                      <Car className="h-5 w-5 mr-2 text-primary" />
                      <span>Rides Offered</span>
                    </div>
                    <span className="text-dark-text font-medium">{myRides.length}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-dark-text-secondary">
                      <Calendar className="h-5 w-5 mr-2 text-primary" />
                      <span>Rides Booked</span>
                    </div>
                    <span className="text-dark-text font-medium">{myBookings.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="card">
              <div className="border-b border-dark-border">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('myRides')}
                    className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                      activeTab === 'myRides'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-dark-text-secondary hover:text-dark-text'
                    }`}
                  >
                    My Rides
                  </button>
                  <button
                    onClick={() => setActiveTab('myBookings')}
                    className={`px-6 py-4 text-sm font-medium transition-colors duration-200 ${
                      activeTab === 'myBookings'
                        ? 'text-primary border-b-2 border-primary'
                        : 'text-dark-text-secondary hover:text-dark-text'
                    }`}
                  >
                    My Bookings
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {loading ? (
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                  </div>
                ) : error ? (
                  <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                ) : activeTab === 'myRides' ? (
                  myRides.length === 0 ? (
                    <div className="text-center py-12">
                      <Car className="h-12 w-12 mx-auto text-dark-text-secondary" />
                      <p className="mt-4 text-dark-text font-medium">You haven't offered any rides yet</p>
                      <p className="mt-2 text-dark-text-secondary">Create a ride to start offering rides to others</p>
                      <button
                        onClick={() => navigate('/create-ride')}
                        className="mt-4 btn-primary"
                      >
                        Offer a Ride
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myRides.map((ride) => (
                        <div
                          key={ride._id}
                          className="card hover:shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
                          onClick={() => navigate(`/ride/${ride._id}`)}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                                <div className="flex items-center space-x-2 text-dark-text font-medium">
                                  <span>{ride.from}</span>
                                </div>
                                
                                <div className="hidden sm:block text-dark-text-secondary">→</div>
                                
                                <div className="flex items-center space-x-2 text-dark-text font-medium">
                                  <span>{ride.to}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4 text-dark-text-secondary text-sm">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{formatDate(ride.date)}</span>
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{ride.time}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 sm:mt-0 flex flex-col items-end">
                              <div className="text-primary font-medium">${ride.price}</div>
                              <div className="text-dark-text-secondary text-sm">{ride.seats} seats left</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                ) : (
                  myBookings.length === 0 ? (
                    <div className="text-center py-12">
                      <Calendar className="h-12 w-12 mx-auto text-dark-text-secondary" />
                      <p className="mt-4 text-dark-text font-medium">You haven't booked any rides yet</p>
                      <p className="mt-2 text-dark-text-secondary">Browse available rides and book your journey</p>
                      <button
                        onClick={() => navigate('/dashboard')}
                        className="mt-4 btn-primary"
                      >
                        Find Rides
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {myBookings.map((booking) => (
                        <div
                          key={booking._id}
                          className="card hover:shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all duration-300"
                          onClick={() => navigate(`/ride/${booking.ride?._id}`)}
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
                                <div className="flex items-center space-x-2 text-dark-text font-medium">
                                  <span>{booking.ride?.from || 'Unknown'}</span>
                                </div>
                                
                                <div className="hidden sm:block text-dark-text-secondary">→</div>
                                
                                <div className="flex items-center space-x-2 text-dark-text font-medium">
                                  <span>{booking.ride?.to || 'Unknown'}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-4 text-dark-text-secondary text-sm">
                                <div className="flex items-center space-x-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{booking.ride?.date ? formatDate(booking.ride.date) : 'Unknown'}</span>
                                </div>
                                
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{booking.ride?.time || 'Unknown'}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-4 sm:mt-0 flex flex-col items-end">
                              <div className="text-primary font-medium">${booking.ride?.price || '0'}</div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/chat/${booking.ride?.driver}`);
                                }}
                                className="mt-2 text-dark-text-secondary hover:text-primary text-sm flex items-center transition-colors duration-200"
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Contact Driver
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;