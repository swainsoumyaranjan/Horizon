import React from 'react';
import { motion } from 'framer-motion';
import { currentUser, contentItems } from '../data/mockData';
import { UserProfileCard } from '../components/features/UserProfileCard';
import { ContentCard } from '../components/features/ContentCard';
import { Edit, Star, ChevronRight, Award, TrendingUp, Clock } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardTitle } from '../components/ui/Card';

export const ProfilePage: React.FC = () => {
  // Recent activities
  const activities = [
    {
      action: 'Completed quiz',
      subject: 'Discover Your Cause',
      time: '2 days ago',
      points: 20,
      icon: <Star size={16} className="text-accent-500" />
    },
    {
      action: 'Connected with',
      subject: 'Jordan Lee',
      time: '3 days ago',
      points: 10,
      icon: <TrendingUp size={16} className="text-primary-500" />
    },
    {
      action: 'Viewed content',
      subject: 'How Regenerative Agriculture Can Transform Our Planet',
      time: '4 days ago',
      points: 5,
      icon: <Clock size={16} className="text-secondary-500" />
    }
  ];
  
  // Saved content
  const savedContent = contentItems.slice(0, 2);
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div>
          <UserProfileCard user={currentUser} isCurrentUser={true} />
          
          <div className="mt-6">
            <Button variant="outline" icon={<Edit size={16} />} className="w-full">
              Edit Profile
            </Button>
          </div>
          
          <Card className="mt-6">
            <CardContent className="p-4">
              <CardTitle className="text-lg mb-4">Badges</CardTitle>
              
              <div className="space-y-4">
                {currentUser.badges.map(badge => (
                  <div key={badge.id} className="flex items-center">
                    <div className="p-2 rounded-full bg-primary-50 mr-3">
                      <Award size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{badge.name}</h4>
                      <p className="text-sm text-gray-500">{badge.description}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">
                        Level {badge.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button variant="ghost" size="sm" icon={<ChevronRight size={16} />} iconPosition="right" className="w-full justify-between">
                  View All Badges
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Right Column - Activities & Content */}
        <div className="lg:col-span-2">
          {/* Activity Feed */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-6">Recent Activity</CardTitle>
              
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-2 rounded-full bg-gray-100 mr-3">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-800">
                        <span className="font-medium">{activity.action}</span>{' '}
                        <span className="text-primary-600">{activity.subject}</span>
                      </p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                    <div className="flex items-center text-success-600 text-sm font-medium">
                      +{activity.points} points
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <Button variant="ghost" size="sm" icon={<ChevronRight size={16} />} iconPosition="right" className="w-full justify-between">
                  View All Activity
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Impact Stats */}
          <Card className="mb-6">
            <CardContent className="p-6">
              <CardTitle className="text-xl mb-6">Your Impact</CardTitle>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-primary-50 p-4 rounded-lg">
                  <h4 className="text-primary-800 text-sm font-medium mb-1">Content Viewed</h4>
                  <p className="text-3xl font-bold text-primary-900">12</p>
                </div>
                <div className="bg-secondary-50 p-4 rounded-lg">
                  <h4 className="text-secondary-800 text-sm font-medium mb-1">Connections</h4>
                  <p className="text-3xl font-bold text-secondary-900">24</p>
                </div>
                <div className="bg-accent-50 p-4 rounded-lg">
                  <h4 className="text-accent-800 text-sm font-medium mb-1">Actions Taken</h4>
                  <p className="text-3xl font-bold text-accent-900">8</p>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">Level Progress</h4>
                  <span className="text-sm text-gray-500">Level 3</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary-600" style={{ width: '65%' }} />
                </div>
                <p className="text-sm text-gray-500 mt-2">756 / 1,000 points to next level</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Saved Content */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold font-heading">Saved Content</h2>
              <Button variant="ghost" size="sm" icon={<ChevronRight size={16} />} iconPosition="right">
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedContent.map(content => (
                <ContentCard key={content.id} content={content} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};