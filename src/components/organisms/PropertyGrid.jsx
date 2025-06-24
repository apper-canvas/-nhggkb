import { motion } from 'framer-motion';
import PropertyCard from '@/components/molecules/PropertyCard';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import EmptyState from '@/components/molecules/EmptyState';
import ErrorState from '@/components/molecules/ErrorState';

const PropertyGrid = ({ 
  properties = [], 
  loading = false, 
  error = null,
  favoriteIds = [],
  onFavoriteChange,
  onRetry
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <SkeletonLoader count={6} type="card" />
      </div>
    );
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load properties"
        message={error}
        onRetry={onRetry}
      />
    );
  }

  if (properties.length === 0) {
    return (
      <EmptyState
        icon="Home"
        title="No properties found"
        description="Try adjusting your search filters or browse all available properties."
      />
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {properties.map((property, index) => (
        <motion.div
          key={property.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <PropertyCard
            property={property}
            isFavorite={favoriteIds.includes(property.Id.toString())}
            onFavoriteChange={onFavoriteChange}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PropertyGrid;