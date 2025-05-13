import React from 'react';
import { motion } from 'framer-motion';
import { causeCategories } from '../../data/mockData';
import { useNavigate } from 'react-router-dom';
import { Globe, BookOpen, Users, HeartPulse, Lightbulb, Home } from 'lucide-react';

const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'leaf':
      return <Globe className="h-6 w-6 text-white" />;
    case 'book-open':
      return <BookOpen className="h-6 w-6 text-white" />;
    case 'users':
      return <Users className="h-6 w-6 text-white" />;
    case 'heart-pulse':
      return <HeartPulse className="h-6 w-6 text-white" />;
    case 'lightbulb':
      return <Lightbulb className="h-6 w-6 text-white" />;
    case 'home':
      return <Home className="h-6 w-6 text-white" />;
    default:
      return <Globe className="h-6 w-6 text-white" />;
  }
};

export const CauseExplorer: React.FC = () => {
  const navigate = useNavigate();

  const handleCauseClick = (causeId: string) => {
    navigate(`/content?cause=${causeId}`);
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-semibold font-heading mb-6">Explore Causes</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {causeCategories.map((cause, index) => (
          <motion.div
            key={cause.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            onClick={() => handleCauseClick(cause.id)}
            className="cursor-pointer"
          >
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className={`w-12 h-12 ${cause.color} rounded-full flex items-center justify-center mb-3`}>
                {getIconComponent(cause.icon)}
              </div>
              <h3 className="text-base font-medium text-gray-900 text-center">{cause.name}</h3>
              <p className="text-xs text-gray-500 text-center mt-1 line-clamp-2">
                {cause.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};