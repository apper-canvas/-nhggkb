import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PropertyGrid from '@/components/organisms/PropertyGrid';
import EmptyState from '@/components/molecules/EmptyState';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import ErrorState from '@/components/molecules/ErrorState';
import favoriteService from '@/services/api/favoriteService';
import propertyService from '@/services/api/propertyService';

const Saved = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSavedProperties();
  }, []);

  const loadSavedProperties = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get favorite property IDs
      const favorites = await favoriteService.getAll();
      const propertyIds = favorites.map(fav => fav.propertyId);
      setFavoriteIds(propertyIds);
      
      if (propertyIds.length === 0) {
        setSavedProperties([]);
        return;
      }
      
      // Get all properties and filter by favorites
      const allProperties = await propertyService.getAll();
      const favoriteProperties = allProperties.filter(property => 
        propertyIds.includes(property.Id.toString())
      );
      
      setSavedProperties(favoriteProperties);
    } catch (err) {
      setError(err.message || 'Failed to load saved properties');
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteChange = async (propertyId, isFavorite) => {
    if (!isFavorite) {
      // Remove from saved properties
      setSavedProperties(prev => prev.filter(property => property.Id !== propertyId));
      setFavoriteIds(prev => prev.filter(id => id !== propertyId.toString()));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              Saved Properties
            </h1>
            <p className="text-gray-600">Loading your saved properties...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkeletonLoader count={6} type="card" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              Saved Properties
            </h1>
          </div>
          <ErrorState
            title="Failed to load saved properties"
            message={error}
            onRetry={loadSavedProperties}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 py-8"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
            Saved Properties
          </h1>
          <p className="text-gray-600">
            {savedProperties.length === 0 
              ? 'No saved properties yet' 
              : `${savedProperties.length} property${savedProperties.length !== 1 ? 'ies' : ''} saved`
            }
          </p>
        </div>

        {/* Properties */}
        {savedProperties.length === 0 ? (
          <EmptyState
            icon="Heart"
            title="No saved properties"
            description="Start browsing properties and save your favorites to see them here."
            actionLabel="Browse Properties"
            onAction={() => window.location.href = '/'}
          />
        ) : (
          <PropertyGrid
            properties={savedProperties}
            loading={false}
            error={null}
            favoriteIds={favoriteIds}
            onFavoriteChange={handleFavoriteChange}
            onRetry={loadSavedProperties}
          />
        )}
      </div>
    </motion.div>
  );
};

export default Saved;