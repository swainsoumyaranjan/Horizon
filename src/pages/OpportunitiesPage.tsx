import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { opportunities, causeCategories } from '../data/mockData';
import { OpportunityCard } from '../components/features/OpportunityCard';
import { Filter, Search, MapPin } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const OpportunitiesPage: React.FC = () => {
  const [activeTypeFilter, setActiveTypeFilter] = useState<string | null>(null);
  const [activeCauseFilter, setActiveCauseFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleTypeFilterChange = (type: string) => {
    setActiveTypeFilter(prevFilter => prevFilter === type ? null : type);
  };
  
  const handleCauseFilterChange = (causeId: string) => {
    setActiveCauseFilter(prevFilter => prevFilter === causeId ? null : causeId);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const filteredOpportunities = opportunities.filter(opportunity => {
    let matchesType = true;
    let matchesCause = true;
    let matchesSearch = true;
    
    if (activeTypeFilter) {
      matchesType = opportunity.type === activeTypeFilter;
    }
    
    if (activeCauseFilter) {
      matchesCause = opportunity.causes.includes(activeCauseFilter);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      matchesSearch = 
        opportunity.title.toLowerCase().includes(query) || 
        opportunity.description.toLowerCase().includes(query) ||
        opportunity.organization.toLowerCase().includes(query);
    }
    
    return matchesType && matchesCause && matchesSearch;
  });
  
  const opportunityTypes = [
    { id: 'volunteer', label: 'Volunteer' },
    { id: 'funding', label: 'Funding' },
    { id: 'event', label: 'Event' },
    { id: 'petition', label: 'Petition' },
    { id: 'course', label: 'Course' }
  ];
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-6"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-heading">Opportunities</h1>
        <p className="text-gray-600 mt-2">
          Find volunteer positions, funding, events, and more
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search opportunities..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Location"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex items-center">
              <span className="mr-2 text-gray-600">
                <Filter size={18} />
              </span>
              <span className="mr-2 text-gray-600 text-sm font-medium">Type:</span>
              <div className="flex flex-wrap gap-2">
                {opportunityTypes.map(type => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeFilterChange(type.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                      activeTypeFilter === type.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center mt-4 md:mt-0">
              <span className="mr-2 text-gray-600 text-sm font-medium">Cause:</span>
              <div className="flex flex-wrap gap-2">
                {causeCategories.slice(0, 4).map(cause => (
                  <button
                    key={cause.id}
                    onClick={() => handleCauseFilterChange(cause.id)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                      activeCauseFilter === cause.id
                        ? `${cause.color} text-white`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cause.name}
                  </button>
                ))}
                <button className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
                  More...
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Opportunities Grid */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOpportunities.map(opportunity => (
            <OpportunityCard key={opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      </div>
      
      {/* Post Opportunity CTA */}
      <div className="mb-8 bg-secondary-50 p-6 rounded-lg border border-secondary-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold font-heading text-secondary-900">
              Have an opportunity to share?
            </h3>
            <p className="text-secondary-600">
              Post volunteer positions, funding opportunities, events, and more.
            </p>
          </div>
          <Button variant="secondary">
            Post Opportunity
          </Button>
        </div>
      </div>
    </motion.div>
  );
};