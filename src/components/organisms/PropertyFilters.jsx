import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@/components/atoms/Button';
import SearchBar from '@/components/molecules/SearchBar';
import FilterPanel from '@/components/molecules/FilterPanel';
import ApperIcon from '@/components/ApperIcon';

const PropertyFilters = ({ onFiltersChange, onSearch }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [activeFilters, setActiveFilters] = useState({});

  const handleApplyFilters = (filters) => {
    setActiveFilters(filters);
    onFiltersChange(filters);
  };

  const handleSearch = (searchTerm) => {
    onSearch(searchTerm);
  };

  const getActiveFilterCount = () => {
    return Object.keys(activeFilters).length;
  };

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white border-b border-gray-200 p-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Top Row - Search */}
        <div className="mb-4">
          <SearchBar 
            onSearch={handleSearch}
            placeholder="Search by location, city, or address..."
            className="max-w-2xl"
          />
        </div>
        
        {/* Bottom Row - Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Filter Button */}
            <Button
              onClick={() => setIsFilterOpen(true)}
              variant="outline"
              size="md"
              icon="Filter"
              className="relative"
            >
              Filters
              {getActiveFilterCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
                  {getActiveFilterCount()}
                </span>
              )}
            </Button>
            
            {/* Active Filters Count */}
            {getActiveFilterCount() > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-sm text-gray-600"
              >
                {getActiveFilterCount()} filter{getActiveFilterCount() !== 1 ? 's' : ''} applied
              </motion.span>
            )}
          </div>
          
          {/* View Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => setViewMode('grid')}
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              icon="Grid3X3"
            />
            <Button
              onClick={() => setViewMode('list')}
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              icon="List"
            />
          </div>
        </div>
      </div>
      
      {/* Filter Panel */}
      <FilterPanel
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        initialFilters={activeFilters}
      />
    </motion.div>
  );
};

export default PropertyFilters;