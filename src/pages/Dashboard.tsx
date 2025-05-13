import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CauseExplorer } from '../components/features/CauseExplorer';
import { ContentCard } from '../components/features/ContentCard';
import { EventCard } from '../components/features/EventCard';
import { OpportunityCard } from '../components/features/OpportunityCard';
import { DiscoveryQuiz } from '../components/features/DiscoveryQuiz';
import { Button } from '../components/ui/Button';
import { contentItems, events, opportunities, currentUser } from '../data/mockData';
import { ChevronRight, ArrowRight, Search, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardTitle } from '../components/ui/Card';

export const Dashboard: React.FC = () => {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  
  const handleQuizComplete = (results: Record<string, string>) => {
    console.log('Quiz results:', results);
    setQuizCompleted(true);
    setShowQuiz(false);
  };
  
  const featuredContent = contentItems.filter(item => item.featured);
  const upcomingEvents = events.filter(event => new Date(event.startDate) > new Date());
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-6"
    >
      {/* Hero Section with Quiz Option */}
      <div className="mb-8">
        {showQuiz ? (
          <DiscoveryQuiz onComplete={handleQuizComplete} />
        ) : (
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-lg p-8 shadow-lg"
          >
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-4xl font-bold font-heading mb-4"
              >
                Discover Your Passion, Create Real Impact
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/90 text-lg mb-6"
              >
                Join a global community of change-makers working on causes that matter. Find your passion, connect with others, and turn your ideas into action.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  variant="accent"
                  size="lg"
                  onClick={() => setShowQuiz(true)}
                  icon={<Search size={18} />}
                >
                  Find Your Cause
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                  icon={<TrendingUp size={18} />}
                >
                  Trending Causes
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* User Welcome and Stats */}
      {quizCompleted && (
        <div className="mb-8 bg-gradient-to-r from-secondary-50 to-primary-50 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold font-heading">Welcome back, {currentUser.name}!</h2>
              <p className="text-gray-600">Based on your preferences, we've found some perfect matches for you.</p>
            </div>
            <div className="flex gap-4">
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <p className="text-sm text-gray-600">Impact Score</p>
                <p className="text-2xl font-bold text-primary-600">{currentUser.impactScore}</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <p className="text-sm text-gray-600">New Connections</p>
                <p className="text-2xl font-bold text-secondary-600">5</p>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <p className="text-sm text-gray-600">Badges</p>
                <p className="text-2xl font-bold text-accent-600">{currentUser.badges.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Cause Explorer */}
      <CauseExplorer />
      
      {/* Featured Content */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold font-heading">Featured Content</h2>
          <Button variant="ghost" icon={<ChevronRight size={18} />} iconPosition="right">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredContent.slice(0, 3).map(content => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </div>
      
      {/* Upcoming Events */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold font-heading">Upcoming Events</h2>
          <Button variant="ghost" icon={<ChevronRight size={18} />} iconPosition="right">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingEvents.slice(0, 3).map(event => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      
      {/* Opportunities */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold font-heading">Opportunities</h2>
          <Button variant="ghost" icon={<ChevronRight size={18} />} iconPosition="right">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {opportunities.slice(0, 4).map(opportunity => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
      
      {/* Get Involved CTA */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-accent-600 to-accent-500 text-white">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <CardTitle className="text-2xl md:text-3xl font-bold mb-4 text-white">Ready to Make a Difference?</CardTitle>
                <p className="text-white/90 mb-6 md:mb-0">
                  Join thousands of change-makers creating positive impact around the world.
                </p>
              </div>
              <Button
                variant="primary"
                size="lg"
                className="bg-white text-accent-700 hover:bg-gray-100"
                icon={<ArrowRight size={18} />}
                iconPosition="right"
              >
                Get Involved
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};