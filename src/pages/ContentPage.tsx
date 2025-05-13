import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { contentItems, causeCategories } from '../data/mockData';
import { ContentCard } from '../components/features/ContentCard';
import { Search, Filter, Bookmark } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useSearchParams } from 'react-router-dom';

export const ContentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContent, setFilteredContent] = useState(contentItems);
  
  // Set initial filter from URL params
  useEffect(() => {
    const causeParam = searchParams.get('cause');
    if (causeParam) {
      setActiveFilter(causeParam);
    }
  }, [searchParams]);
  
  // Filter content based on active filter and search query
  useEffect(() => {
    let filtered = [...contentItems];
    
    if (activeFilter) {
      filtered = filtered.filter(item => item.causes.includes(activeFilter));
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item => 
          item.title.toLowerCase().includes(query) || 
          item.description.toLowerCase().includes(query)
      );
    }
    
    setFilteredContent(filtered);
  }, [activeFilter, searchQuery]);
  
  const handleFilterChange = (causeId: string) => {
    setActiveFilter(prevFilter => prevFilter === causeId ? null : causeId);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-6"
    >
      <div className="mb-6">
        <h1 className="text-3xl font-bold font-heading">Content Library</h1>
        <p className="text-gray-600 mt-2">
          Discover articles, videos, books, and reports on social impact
        </p>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for content..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex items-center">
            <span className="mr-2 text-gray-600">
              <Filter size={18} />
            </span>
            <span className="mr-2 text-gray-600 text-sm font-medium">Filter:</span>
            <div className="flex flex-wrap gap-2">
              {causeCategories.map(cause => (
                <button
                  key={cause.id}
                  onClick={() => handleFilterChange(cause.id)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${
                    activeFilter === cause.id
                      ? `${cause.color} text-white`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cause.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Content Grid */}
      <div className="mb-8">
        {filteredContent.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContent.map(content => (
              <ContentCard key={content.id} content={content} />
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-gray-50 rounded-lg">
            <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No content found</h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search or filter to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setActiveFilter(null);
                setSearchQuery('');
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="primary" size="sm">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  );
};