import React from 'react';
import { ImpactMap } from '../components/features/ImpactMap';
import { motion } from 'framer-motion';

export const MapPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-6"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-heading">Impact Map</h1>
        <p className="text-gray-600 mt-2">
          Discover organizations, events, and change-makers around the world
        </p>
      </div>
      
      <div className="mb-8">
        <ImpactMap />
      </div>
    </motion.div>
  );
};