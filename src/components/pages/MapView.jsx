import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import PropertyFilters from '@/components/organisms/PropertyFilters';
import PropertyCard from '@/components/molecules/PropertyCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import ErrorState from '@/components/molecules/ErrorState';
import EmptyState from '@/components/molecules/EmptyState';
import Button from '@/components/atoms/Button';
import ApperIcon from '@/components/ApperIcon';
import propertyService from '@/services/api/propertyService';
import favoriteService from '@/services/api/favoriteService';

const MapView = () => {
  const [properties, setProperties] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    loadProperties();
  }, [filters, searchTerm]);

  const loadProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const searchFilters = {
        ...filters,
        ...(searchTerm && { search: searchTerm })
      };
      
      const result = await propertyService.getAll(searchFilters);
      setProperties(result);
      
      // Select first property if none selected
      if (result.length > 0 && !selectedProperty) {
        setSelectedProperty(result[0]);
      }
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

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
  };

  const handleViewProperty = (property) => {
    navigate(`/property/${property.Id}`);
  };

  // Mock map component since we don't have actual map integration
  const MapComponent = () => (
    <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-10 grid-rows-10 h-full w-full">
          {[...Array(100)].map((_, i) => (
            <div key={i} className="border border-gray-300"></div>
          ))}
        </div>
      </div>
      
      {/* Property Markers */}
      {properties.map((property, index) => (
        <motion.button
          key={property.Id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handlePropertySelect(property)}
          className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
            selectedProperty?.Id === property.Id
              ? 'bg-accent text-white scale-110'
              : 'bg-white text-gray-900 hover:bg-gray-50'
          } rounded-lg shadow-lg px-3 py-2 text-sm font-medium border transition-all duration-200`}
          style={{
            left: `${20 + (index * 15) % 60}%`,
            top: `${20 + (index * 20) % 60}%`
          }}
        >
          <div className="flex items-center space-x-1">
            <ApperIcon name="Home" className="w-4 h-4" />
            <span>
              {property.status === 'for-rent' 
                ? `$${property.price.toLocaleString()}/mo`
                : `$${property.price.toLocaleString()}`
              }
            </span>
          </div>
        </motion.button>
      ))}
      
      {/* Center Icon */}
      <div className="text-gray-400">
        <ApperIcon name="Map" className="w-16 h-16" />
        <p className="text-sm mt-2">Interactive Map View</p>
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen flex flex-col overflow-hidden bg-gray-50"
    >
      {/* Filters */}
      <PropertyFilters
        onFiltersChange={handleFiltersChange}
        onSearch={handleSearch}
      />

      {/* Map Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: showSidebar ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className="w-96 bg-white border-r border-gray-200 flex flex-col overflow-hidden"
        >
          {/* Sidebar Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="font-heading font-semibold text-lg">
              Properties ({properties.length})
            </h2>
            <Button
              onClick={() => setShowSidebar(false)}
              variant="ghost"
              size="sm"
              icon="X"
            />
          </div>

          {/* Property List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {loading ? (
              <SkeletonLoader count={3} type="card" />
            ) : error ? (
              <ErrorState
                title="Failed to load properties"
                message={error}
                onRetry={loadProperties}
              />
            ) : properties.length === 0 ? (
              <EmptyState
                icon="Home"
                title="No properties found"
                description="Try adjusting your search filters."
              />
            ) : (
              properties.map((property) => (
                <motion.div
                  key={property.Id}
                  whileHover={{ scale: 1.02 }}
                  className={`cursor-pointer rounded-lg transition-all duration-200 ${
                    selectedProperty?.Id === property.Id
                      ? 'ring-2 ring-primary'
                      : ''
                  }`}
                  onClick={() => handlePropertySelect(property)}
                >
                  <PropertyCard
                    property={property}
                    isFavorite={favoriteIds.includes(property.Id.toString())}
                    onFavoriteChange={handleFavoriteChange}
                  />
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Map Area */}
        <div className="flex-1 relative">
          {/* Toggle Sidebar Button */}
          {!showSidebar && (
            <Button
              onClick={() => setShowSidebar(true)}
              className="absolute top-4 left-4 z-10"
              icon="Menu"
              size="sm"
            >
              Show Properties
            </Button>
          )}

          {/* Map */}
          <div className="w-full h-full p-4">
            <MapComponent />
          </div>

          {/* Selected Property Info */}
          {selectedProperty && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 max-w-sm w-full mx-4"
            >
              <div className="flex items-start space-x-3">
                <img
                  src={selectedProperty.photos[0]}
                  alt={selectedProperty.title}
                  className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-900 truncate">
                    {selectedProperty.title}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {selectedProperty.address.street}, {selectedProperty.address.city}
                  </p>
                  <p className="text-lg font-semibold text-accent">
                    {selectedProperty.status === 'for-rent' 
                      ? `$${selectedProperty.price.toLocaleString()}/mo`
                      : `$${selectedProperty.price.toLocaleString()}`
                    }
                  </p>
                </div>
                <Button
                  onClick={() => handleViewProperty(selectedProperty)}
                  size="sm"
                  icon="ArrowRight"
                >
                  View
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MapView;