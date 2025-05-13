import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Globe, 
  Compass, 
  Library, 
  Calendar, 
  Users, 
  Award, 
  Menu, 
  X,
  Search,
  Bell,
  UserCircle,
  LogOut,
  Settings,
  User
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { currentUser } from '../../data/mockData';

interface NavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, icon, label, active, onClick }) => {
  return (
    <Link
      to={to}
      className={`flex items-center p-2 rounded-md transition-colors duration-200 ${
        active
          ? 'bg-primary-50 text-primary-700'
          : 'text-gray-700 hover:bg-gray-100'
      }`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </Link>
  );
};

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleProfileMenu = () => setIsProfileMenuOpen(!isProfileMenuOpen);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const navLinks = [
    { to: '/', icon: <Globe size={20} />, label: 'Dashboard' },
    { to: '/map', icon: <Compass size={20} />, label: 'Impact Map' },
    { to: '/content', icon: <Library size={20} />, label: 'Content' },
    { to: '/opportunities', icon: <Calendar size={20} />, label: 'Opportunities' },
    { to: '/community', icon: <Users size={20} />, label: 'Community' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Award className="h-8 w-8 text-primary-600" />
            <span className="ml-2 text-xl font-bold font-heading text-gray-900">
              ImpactConnect
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                icon={link.icon}
                label={link.label}
                active={location.pathname === link.to}
              />
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-gray-600 hover:text-primary-700">
              <Search size={20} />
            </button>
            <button className="text-gray-600 hover:text-primary-700 relative">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-accent-500 text-white text-xs flex items-center justify-center">
                3
              </span>
            </button>
            
            {/* Profile Menu */}
            <div className="relative">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center focus:outline-none"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-8 w-8 rounded-full border-2 border-primary-200"
                />
              </button>
              
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                    <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                  </div>
                  
                  <Link
                    to="/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <User size={16} className="mr-3" />
                    Your Profile
                  </Link>
                  
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsProfileMenuOpen(false)}
                  >
                    <Settings size={16} className="mr-3" />
                    Settings
                  </Link>
                  
                  <button
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      handleSignOut();
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={16} className="mr-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-2 bg-white border-t">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                icon={link.icon}
                label={link.label}
                active={location.pathname === link.to}
                onClick={closeMenu}
              />
            ))}
            <button
              onClick={handleSignOut}
              className="flex items-center w-full p-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <LogOut size={20} className="mr-3" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </header>
  );
};