import React from 'react';
import { Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RideCard = ({ ride }) => {
  const navigate = useNavigate();
  const { _id, from, to, date, time, seats, price, driver } = ride;

  // Format date
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div 
      className="card hover:shadow-lg cursor-pointer transform hover:-translate-y-1 transition-all duration-300 animate-fade-in"
      onClick={() => navigate(`/ride/${_id}`)}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
            <div className="flex items-center space-x-2 text-dark-text font-medium">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{from}</span>
            </div>
            
            <div className="hidden sm:block text-dark-text-secondary">→</div>
            
            <div className="flex items-center space-x-2 text-dark-text font-medium">
              <MapPin className="h-4 w-4 text-primary" />
              <span>{to}</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="flex items-center space-x-2 text-dark-text-secondary">
              <Calendar className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-dark-text-secondary">
              <Clock className="h-4 w-4" />
              <span>{time}</span>
            </div>
            
            <div className="flex items-center space-x-2 text-dark-text-secondary">
              <Users className="h-4 w-4" />
              <span>{seats} seats</span>
            </div>
            
            <div className="flex items-center space-x-2 text-primary font-medium">
              <DollarSign className="h-4 w-4" />
              <span>${price}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 md:ml-6 flex items-center">
          <div className="flex flex-col items-end">
            <span className="text-dark-text-secondary text-sm">Driver</span>
            <span className="text-dark-text">{driver?.name || 'Unknown'}</span>
          </div>
          <div className="ml-3 h-10 w-10 rounded-full bg-dark-surface-2 flex items-center justify-center text-primary font-medium">
            {driver?.name ? driver.name.charAt(0).toUpperCase() : 'U'}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideCard;