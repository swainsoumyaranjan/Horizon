import React from 'react';
import { MapPin, Calendar, Award, Mail } from 'lucide-react';
import { Card, CardContent } from '../ui/Card';
import { User } from '../../types';
import { Button } from '../ui/Button';
import { Link } from 'react-router-dom';

interface UserProfileCardProps {
  user: User;
  isCurrentUser?: boolean;
}

export const UserProfileCard: React.FC<UserProfileCardProps> = ({ user, isCurrentUser = false }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long'
    }).format(date);
  };

  return (
    <Card className="overflow-visible">
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-t-lg" />
        
        <div className="absolute -bottom-12 left-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-white object-cover bg-white"
          />
        </div>

        {!isCurrentUser && (
          <div className="absolute top-4 right-4">
            <Button variant="primary" size="sm">
              Connect
            </Button>
          </div>
        )}
      </div>
      
      <CardContent className="pt-16">
        <Link to={`/profile/${user.id}`} className="hover:text-primary-600">
          <h2 className="text-2xl font-bold font-heading text-gray-900">{user.name}</h2>
        </Link>
        
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <Mail size={16} className="mr-1" />
          <span>{user.email}</span>
        </div>
        
        {user.location && (
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <MapPin size={16} className="mr-1" />
            <span>{user.location.name}</span>
          </div>
        )}
        
        <div className="flex items-center text-sm text-gray-600 mt-1">
          <Calendar size={16} className="mr-1" />
          <span>Joined {formatDate(user.joinedDate)}</span>
        </div>
        
        <p className="mt-4 text-gray-700">{user.bio}</p>
        
        {user.badges && user.badges.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 font-heading">Badges</h3>
            <div className="flex flex-wrap gap-3">
              {user.badges.map(badge => (
                <div key={badge.id} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                  <Award size={16} className="text-primary-600 mr-1" />
                  <span className="text-sm font-medium">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {user.interests && user.interests.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3 font-heading">Interests</h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map(interest => (
                <span 
                  key={interest} 
                  className="bg-secondary-100 text-secondary-800 px-3 py-1 rounded-full text-sm"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-6 bg-gradient-to-r from-primary-50 to-secondary-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold font-heading">Impact Score</h3>
              <p className="text-sm text-gray-600">Positive influence</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm">
              <span className="text-xl font-bold text-primary-600">{user.impactScore}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};