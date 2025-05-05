import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, DollarSign, FileText, ArrowLeft } from 'lucide-react';

const CreateRide = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    date: '',
    time: '',
    seats: '',
    price: '',
    description: '',
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.from.trim()) {
      newErrors.from = 'Departure location is required';
    }
    
    if (!formData.to.trim()) {
      newErrors.to = 'Destination location is required';
    }
    
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    
    if (!formData.time) {
      newErrors.time = 'Time is required';
    }
    
    if (!formData.seats) {
      newErrors.seats = 'Number of seats is required';
    } else if (parseInt(formData.seats, 10) < 1) {
      newErrors.seats = 'At least 1 seat is required';
    }
    
    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://rideshare-backend.onrender.com/api/rides', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          from: formData.from,
          to: formData.to,
          date: formData.date,
          time: formData.time,
          seats: parseInt(formData.seats, 10),
          price: parseFloat(formData.price),
          description: formData.description,
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create ride');
      }
      
      const data = await response.json();
      
      // Navigate to the created ride's details page
      navigate(`/ride/${data._id}`);
      
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to create ride. Please try again.' });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg pb-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 text-dark-text-secondary hover:text-primary flex items-center transition-colors duration-200"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>
        
        <div className="card overflow-hidden">
          <div className="bg-gradient-to-r from-primary/20 to-dark-surface border-b border-dark-border p-6">
            <h1 className="text-2xl font-bold text-dark-text">Offer a Ride</h1>
            <p className="text-dark-text-secondary mt-2">
              Fill in the details below to create a new ride
            </p>
          </div>
          
          <div className="p-6">
            {errors.submit && (
              <div className="mb-6 bg-red-900/20 border border-red-800 text-red-400 px-4 py-3 rounded-lg">
                {errors.submit}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="label">From</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="h-5 w-5 text-dark-text-secondary" />
                    </div>
                    <input
                      type="text"
                      name="from"
                      value={formData.from}
                      onChange={handleChange}
                      placeholder="Departure location"
                      className="input pl-10"
                    />
                  </div>
                  {errors.from && <p className="mt-1 text-sm text-red-400">{errors.from}</p>}
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
                      value={formData.to}
                      onChange={handleChange}
                      placeholder="Destination location"
                      className="input pl-10"
                    />
                  </div>
                  {errors.to && <p className="mt-1 text-sm text-red-400">{errors.to}</p>}
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
                      value={formData.date}
                      onChange={handleChange}
                      className="input pl-10"
                    />
                  </div>
                  {errors.date && <p className="mt-1 text-sm text-red-400">{errors.date}</p>}
                </div>
                
                <div>
                  <label className="label">Time</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-dark-text-secondary" />
                    </div>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="input pl-10"
                    />
                  </div>
                  {errors.time && <p className="mt-1 text-sm text-red-400">{errors.time}</p>}
                </div>
                
                <div>
                  <label className="label">Available Seats</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-dark-text-secondary" />
                    </div>
                    <input
                      type="number"
                      name="seats"
                      value={formData.seats}
                      onChange={handleChange}
                      placeholder="Number of seats"
                      min="1"
                      className="input pl-10"
                    />
                  </div>
                  {errors.seats && <p className="mt-1 text-sm text-red-400">{errors.seats}</p>}
                </div>
                
                <div>
                  <label className="label">Price per Seat ($)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-dark-text-secondary" />
                    </div>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Price in USD"
                      min="0.01"
                      step="0.01"
                      className="input pl-10"
                    />
                  </div>
                  {errors.price && <p className="mt-1 text-sm text-red-400">{errors.price}</p>}
                </div>
              </div>
              
              <div>
                <label className="label">
                  Description (Optional)
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                    <FileText className="h-5 w-5 text-dark-text-secondary" />
                  </div>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Add any additional details about the ride..."
                    className="input pl-10"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center"
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    'Create Ride'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRide;