import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Menu, X, User, LogOut } from 'lucide-react';
import { ConnectWallet } from './ConnectWallet';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-dark-surface border-b border-dark-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
              <Car className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold text-dark-text">RideShare</span>
            </div>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <ConnectWallet />
            {user ? (
              <>
                <button 
                  onClick={() => navigate('/dashboard')}
                  className="text-dark-text-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => navigate('/profile')}
                  className="text-dark-text-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="ml-2 flex items-center text-dark-text-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4 mr-1" /> Log out
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => navigate('/login')}
                  className="text-dark-text-secondary hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Login
                </button>
                <button 
                  onClick={() => navigate('/register')}
                  className="btn-primary"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-dark-text-secondary hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-dark-surface border-b border-dark-border animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="px-3 py-2">
              <ConnectWallet />
            </div>
            {user ? (
              <>
                <button 
                  onClick={() => {
                    navigate('/dashboard');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-dark-text-secondary hover:text-primary hover:bg-dark-surface-2 transition-colors duration-200"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => {
                    navigate('/profile');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-dark-text-secondary hover:text-primary hover:bg-dark-surface-2 transition-colors duration-200"
                >
                  <User className="h-4 w-4 inline mr-2" /> Profile
                </button>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-dark-text-secondary hover:text-primary hover:bg-dark-surface-2 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4 inline mr-2" /> Log out
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    navigate('/login');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-dark-text-secondary hover:text-primary hover:bg-dark-surface-2 transition-colors duration-200"
                >
                  Login
                </button>
                <button 
                  onClick={() => {
                    navigate('/register');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 mt-2 rounded-md text-base font-medium btn-primary"
                >
                  Sign up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;