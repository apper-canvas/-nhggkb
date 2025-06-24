import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropertyGrid from '@/components/organisms/PropertyGrid';
import PropertyFilters from '@/components/organisms/PropertyFilters';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import propertyService from '@/services/api/propertyService';
import favoriteService from '@/services/api/favoriteService';

const Browse = () => {
  const [properties, setProperties] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  
  const location = useLocation();
  const isRentPage = location.pathname === '/rent';

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    loadProperties();
  }, [filters, searchTerm, isRentPage]);

  const loadProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const searchFilters = {
        ...filters,
        ...(searchTerm && { search: searchTerm })
      };
      
      const result = isRentPage 
        ? await propertyService.getRentals(searchFilters)
        : await propertyService.getAll(searchFilters);
      
      setProperties(result);
    } catch (err) {
      setError(err.message || 'Failed to load properties');
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    try {
      const favoritePropertyIds = await favoriteService.getFavoritePropertyIds();
      setFavoriteIds(favoritePropertyIds);
    } catch (err) {
      console.error('Failed to load favorites:', err);
    }
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  const handleFavoriteChange = (propertyId, isFavorite) => {
    if (isFavorite) {
      setFavoriteIds(prev => [...prev, propertyId.toString()]);
    } else {
      setFavoriteIds(prev => prev.filter(id => id !== propertyId.toString()));
    }
  };

  const pageTitle = isRentPage ? 'Properties for Rent' : 'Properties for Sale';
  const emptyMessage = isRentPage 
    ? 'No rental properties match your search criteria.' 
    : 'No properties for sale match your search criteria.';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Filters */}
      <PropertyFilters
        onFiltersChange={handleFiltersChange}
        onSearch={handleSearch}
      />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            {pageTitle}
          </h1>
          <p className="text-gray-600">
            {loading ? 'Loading properties...' : `${properties.length} properties found`}
          </p>
        </div>

        {/* Properties Grid */}
        <PropertyGrid
          properties={properties}
          loading={loading}
          error={error}
          favoriteIds={favoriteIds}
          onFavoriteChange={handleFavoriteChange}
          onRetry={loadProperties}
        />
      </div>
    </motion.div>
  );
};

export default Browse;