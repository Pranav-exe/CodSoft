import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Map, Users, Shield, ArrowRight, CreditCard, Star } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-dark-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1600')] bg-cover bg-center">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg to-dark-bg/90"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-bold text-dark-text mb-6 leading-tight animate-fade-in">
              Travel together, <span className="text-primary">save together</span>
            </h1>
            <p className="text-xl text-dark-text-secondary mb-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Share your journey with others heading the same way. Save money, reduce emissions, and make new connections.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <button
                onClick={() => navigate('/register')}
                className="btn-primary text-center py-3 px-6 text-lg"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-secondary text-center py-3 px-6 text-lg"
              >
                Find Rides
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* How It Works Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-dark-text mb-4">How RideShare Works</h2>
          <p className="text-xl text-dark-text-secondary max-w-3xl mx-auto">
            Simple, affordable, and sustainable ridesharing in just a few steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="card p-6 flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Map className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-dark-text mb-3">Find a Ride</h3>
            <p className="text-dark-text-secondary">
              Enter your destination and find drivers heading your way. Filter by date, time, and price to find the perfect match.
            </p>
          </div>
          
          <div className="card p-6 flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
              <CreditCard className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-dark-text mb-3">Book Your Seat</h3>
            <p className="text-dark-text-secondary">
              Review ride details and book instantly. Communicate with the driver through our messaging system.
            </p>
          </div>
          
          <div className="card p-6 flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6">
              <Car className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold text-dark-text mb-3">Enjoy the Journey</h3>
            <p className="text-dark-text-secondary">
              Meet at the agreed location and enjoy your shared journey. Rate your experience afterward.
            </p>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="bg-dark-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-dark-text mb-4">Why Choose RideShare</h2>
            <p className="text-xl text-dark-text-secondary max-w-3xl mx-auto">
              Our platform offers benefits for both drivers and passengers
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6 flex items-start animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary mr-4">
                <CreditCard className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark-text mb-2">Save Money</h3>
                <p className="text-dark-text-secondary">
                  Drivers can offset their travel costs by sharing empty seats, while passengers get affordable rides at a fraction of traditional options.
                </p>
              </div>
            </div>
            
            <div className="card p-6 flex items-start animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary mr-4">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark-text mb-2">Safety First</h3>
                <p className="text-dark-text-secondary">
                  Our verification process, user ratings, and secure messaging system ensure a safe experience for everyone.
                </p>
              </div>
            </div>
            
            <div className="card p-6 flex items-start animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary mr-4">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark-text mb-2">Community</h3>
                <p className="text-dark-text-secondary">
                  Connect with like-minded travelers, make new friends, and enjoy social interactions during your journey.
                </p>
              </div>
            </div>
            
            <div className="card p-6 flex items-start animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="h-12 w-12 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center text-primary mr-4">
                <Star className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-dark-text mb-2">Convenience</h3>
                <p className="text-dark-text-secondary">
                  Easy-to-use platform with instant booking, real-time notifications, and a smooth user experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-gradient-to-r from-primary/20 to-dark-bg py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3 p-8">
                <h2 className="text-3xl font-bold text-dark-text mb-4">Ready to start sharing rides?</h2>
                <p className="text-dark-text-secondary mb-6">
                  Join thousands of users who are already saving money and reducing their carbon footprint with RideShare.
                </p>
                <button
                  onClick={() => navigate('/register')}
                  className="btn-primary flex items-center"
                >
                  Create an Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </div>
              <div className="md:w-1/3 bg-dark-surface-2 p-8 flex items-center justify-center">
                <div className="text-center">
                  <Car className="h-16 w-16 text-primary mx-auto mb-4" />
                  <p className="text-dark-text font-medium">Already a member?</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="mt-4 btn-outline"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-dark-surface border-t border-dark-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium text-dark-text mb-4">RideShare</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">About Us</a></li>
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">How It Works</a></li>
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">Careers</a></li>
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">Press</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-dark-text mb-4">Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">Help Center</a></li>
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">Safety</a></li>
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">Community Guidelines</a></li>
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-dark-text mb-4">Legal</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">Terms of Service</a></li>
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">Cookie Policy</a></li>
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">Licenses</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-dark-text mb-4">Connect</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">Twitter</a></li>
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">Facebook</a></li>
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">Instagram</a></li>
                <li><a href="#" className="text-dark-text-secondary hover:text-primary transition-colors duration-200">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-dark-border flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <Car className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-dark-text">RideShare</span>
            </div>
            <p className="text-dark-text-secondary text-sm">
              © {new Date().getFullYear()} RideShare. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;