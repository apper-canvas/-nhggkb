import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '@/components/atoms/Button';
import Input from '@/components/atoms/Input';
import ApperIcon from '@/components/ApperIcon';

const FilterPanel = ({ isOpen, onClose, onApplyFilters, initialFilters = {} }) => {
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    propertyTypes: [],
    bedroomsMin: '',
    bathroomsMin: '',
    sqftMin: '',
    sqftMax: '',
    ...initialFilters
  });

  const propertyTypes = ['House', 'Condo', 'Apartment', 'Townhouse'];

  useEffect(() => {
    setFilters(prev => ({ ...prev, ...initialFilters }));
  }, [initialFilters]);

  const handleInputChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePropertyTypeChange = (type) => {
    setFilters(prev => ({
      ...prev,
      propertyTypes: prev.propertyTypes.includes(type)
        ? prev.propertyTypes.filter(t => t !== type)
        : [...prev.propertyTypes, type]
    }));
  };

  const handleApply = () => {
    const cleanFilters = {};
    
    // Convert strings to numbers and filter out empty values
    Object.entries(filters).forEach(([key, value]) => {
      if (key === 'propertyTypes') {
        if (value.length > 0) cleanFilters[key] = value;
      } else if (value !== '' && value !== null && value !== undefined) {
        const numValue = parseFloat(value);
        if (!isNaN(numValue)) {
          cleanFilters[key] = numValue;
        }
      }
    });
    
    onApplyFilters(cleanFilters);
    onClose();
  };

  const handleClear = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      propertyTypes: [],
      bedroomsMin: '',
      bathroomsMin: '',
      sqftMin: '',
      sqftMax: ''
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />
          
          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-lg font-heading font-semibold">Filters</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <ApperIcon name="X" className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Price Range */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder="Min Price"
                    value={filters.priceMin}
                    onChange={(e) => handleInputChange('priceMin', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max Price"
                    value={filters.priceMax}
                    onChange={(e) => handleInputChange('priceMax', e.target.value)}
                  />
                </div>
              </div>

              {/* Property Type */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Property Type</h3>
                <div className="space-y-2">
                  {propertyTypes.map((type) => (
                    <label key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.propertyTypes.includes(type)}
                        onChange={() => handlePropertyTypeChange(type)}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <span className="ml-2 text-sm text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Bedrooms & Bathrooms */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Bedrooms & Bathrooms</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder="Min Bedrooms"
                    value={filters.bedroomsMin}
                    onChange={(e) => handleInputChange('bedroomsMin', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Min Bathrooms"
                    value={filters.bathroomsMin}
                    onChange={(e) => handleInputChange('bathroomsMin', e.target.value)}
                  />
                </div>
              </div>

              {/* Square Footage */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Square Footage</h3>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    type="number"
                    placeholder="Min Sqft"
                    value={filters.sqftMin}
                    onChange={(e) => handleInputChange('sqftMin', e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Max Sqft"
                    value={filters.sqftMax}
                    onChange={(e) => handleInputChange('sqftMax', e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 border-t bg-gray-50 space-y-3">
              <Button onClick={handleApply} className="w-full">
                Apply Filters
              </Button>
              <Button 
                onClick={handleClear} 
                variant="outline" 
                className="w-full"
              >
                Clear All
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FilterPanel;