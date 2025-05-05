import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, MapPin, Calendar, Users, Filter } from 'lucide-react';
import RideCard from '../components/RideCard';

const Dashboard = () => {
  const [rides, setRides] = useState([]);
  const [filteredRides, setFilteredRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    from: '',
    to: '',
    date: '',
    seats: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate('/login');
      return;
    }

    // Fetch rides
    const fetchRides = async () => {
      try {
        const response = await fetch('https://rideshare-backend.onrender.com/api/rides', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch rides');
        }
        
        const data = await response.json();
        setRides(data);
        setFilteredRides(data);
      } catch (error) {
        setError(error.message || 'Failed to fetch rides');
      } finally {
        setLoading(false);
      }
    };
    
    fetchRides();
  }, [user, navigate]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = () => {
    let result = [...rides];
    
    if (filters.from) {
      result = result.filter(ride => 
        ride.from.toLowerCase().includes(filters.from.toLowerCase())
      );
    }
    
    if (filters.to) {
      result = result.filter(ride => 
        ride.to.toLowerCase().includes(filters.to.toLowerCase())
      );
    }
    
    if (filters.date) {
      const filterDate = new Date(filters.date);
      result = result.filter(ride => {
        const rideDate = new Date(ride.date);
        return (
          rideDate.getFullYear() === filterDate.getFullYear() &&
          rideDate.getMonth() === filterDate.getMonth() &&
          rideDate.getDate() === filterDate.getDate()
        );
      });
    }
    
    if (filters.seats) {
      result = result.filter(ride => 
        ride.seats >= parseInt(filters.seats, 10)
      );
    }
    
    setFilteredRides(result);
  };

  const resetFilters = () => {
    setFilters({
      from: '',
      to: '',
      date: '',
      seats: '',
    });
    setFilteredRides(rides);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (!searchTerm.trim()) {
      setFilteredRides(rides);
      return;
    }
    
    const searchResults = rides.filter(ride =>
      ride.from.toLowerCase().includes(searchTerm) ||
      ride.to.toLowerCase().includes(searchTerm)
    );
    
    setFilteredRides(searchResults);
  };

  return (
    <div className="min-h-screen bg-dark-bg pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-dark-text">Available Rides</h1>
            <p className="text-dark-text-secondary mt-1">
              Find and book rides for your journey
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0">
            <button
              onClick={() => navigate('/create-ride')}
              className="btn-primary flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Offer a Ride
            </button>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-dark-text-secondary" />
              </div>
              <input
                type="text"
                placeholder="Search locations..."
                onChange={handleSearch}
                className="input pl-10"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn-secondary flex items-center"
            >
              <Filter className="h-5 w-5 mr-2" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 card animate-slide-down">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="label">From</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-dark-text-secondary" />
                    </div>
                    <input
                      type="text"
                      name="from"
                      value={filters.from}
                      onChange={handleFilterChange}
                      placeholder="Departure city"
                      className="input pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="label">To</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-dark-text-secondary" />
                    </div>
                    <input
                      type="text"
                      name="to"
                      value={filters.to}
                      onChange={handleFilterChange}
                      placeholder="Destination city"
                      className="input pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="label">Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-dark-text-secondary" />
                    </div>
                    <input
                      type="date"
                      name="date"
                      value={filters.date}
                      onChange={handleFilterChange}
                      className="input pl-10"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="label">Seats</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-dark-text-secondary" />
                    </div>
                    <input
                      type="number"
                      name="seats"
                      value={filters.seats}
                      onChange={handleFilterChange}
                      placeholder="Min seats"
                      min="1"
                      className="input pl-10"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={resetFilters}
                  className="btn-secondary"
                >
                  Reset
                </button>
                <button
                  onClick={applyFilters}
                  className="btn-primary"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : filteredRides.length === 0 ? (
          <div className="card py-12 text-center">
            <p className="text-xl text-dark-text-secondary">No rides found</p>
            <p className="mt-2 text-dark-text-secondary">Try adjusting your filters or search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredRides.map((ride) => (
              <RideCard key={ride._id} ride={ride} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;