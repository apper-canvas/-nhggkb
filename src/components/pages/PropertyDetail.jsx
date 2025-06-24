import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PropertyDetails from '@/components/organisms/PropertyDetails';
import SkeletonLoader from '@/components/molecules/SkeletonLoader';
import ErrorState from '@/components/molecules/ErrorState';
import Button from '@/components/atoms/Button';
import propertyService from '@/services/api/propertyService';
import favoriteService from '@/services/api/favoriteService';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadProperty();
      checkFavoriteStatus();
    }
  }, [id]);

  const loadProperty = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await propertyService.getById(id);
      setProperty(result);
    } catch (err) {
      setError(err.message || 'Failed to load property');
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      const isFav = await favoriteService.isFavorite(id);
      setIsFavorite(isFav);
    } catch (err) {
      console.error('Failed to check favorite status:', err);
    }
  };

  const handleFavoriteToggle = async () => {
    setFavoriteLoading(true);
    
    try {
      if (isFavorite) {
        await favoriteService.remove(id);
        setIsFavorite(false);
        toast.success('Removed from favorites');
      } else {
        await favoriteService.add(id);
        setIsFavorite(true);
        toast.success('Added to favorites');
      }
    } catch (error) {
      toast.error('Failed to update favorites');
    } finally {
      setFavoriteLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <SkeletonLoader count={1} type="detail" />
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <ErrorState
            title="Property not found"
            message={error || "The property you're looking for doesn't exist or has been removed."}
            onRetry={loadProperty}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50"
    >
      {/* Header Actions */}
      <div className="bg-white border-b border-gray-200 py-4">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <Button
            onClick={() => navigate(-1)}
            variant="ghost"
            icon="ArrowLeft"
            size="sm"
          >
            Back
          </Button>
          
          <Button
            onClick={handleFavoriteToggle}
            loading={favoriteLoading}
            variant={isFavorite ? 'accent' : 'outline'}
            icon="Heart"
            size="sm"
          >
            {isFavorite ? 'Saved' : 'Save'}
          </Button>
        </div>
      </div>

      {/* Property Details */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4">
          <PropertyDetails property={property} />
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetail;