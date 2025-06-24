import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import favoriteService from '@/services/api/favoriteService';

const PropertyCard = ({ property, isFavorite = false, onFavoriteChange }) => {
  const [isLiked, setIsLiked] = useState(isFavorite);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    setIsLoading(true);
    
    try {
      if (isLiked) {
        await favoriteService.remove(property.Id.toString());
        setIsLiked(false);
        toast.success('Removed from favorites');
      } else {
        await favoriteService.add(property.Id.toString());
        setIsLiked(true);
        toast.success('Added to favorites');
      }
      
      if (onFavoriteChange) {
        onFavoriteChange(property.Id, !isLiked);
      }
    } catch (error) {
      toast.error('Failed to update favorites');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardClick = () => {
    navigate(`/property/${property.Id}`);
  };

  const formatPrice = (price) => {
    if (property.status === 'for-rent') {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, y: -4 }}
      onClick={handleCardClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={property.photos[0]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          disabled={isLoading}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ApperIcon
              name="Heart"
              className={`w-5 h-5 transition-colors ${
                isLiked ? 'text-accent fill-current' : 'text-gray-400'
              }`}
            />
          </motion.div>
        </button>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={property.status === 'for-rent' ? 'secondary' : 'primary'}>
            {property.status === 'for-rent' ? 'For Rent' : 'For Sale'}
          </Badge>
        </div>

        {/* Price Badge */}
        <div className="absolute bottom-3 left-3">
          <div className="bg-accent text-white px-3 py-1 rounded-md font-semibold">
            {formatPrice(property.price)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-heading font-semibold text-lg text-gray-900 mb-2 line-clamp-1">
          {property.title}
        </h3>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-1">
          {property.address.street}, {property.address.city}, {property.address.state}
        </p>
        
        {/* Property Details */}
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <ApperIcon name="Bed" className="w-4 h-4" />
            <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Bath" className="w-4 h-4" />
            <span>{property.bathrooms} bath{property.bathrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-1">
            <ApperIcon name="Square" className="w-4 h-4" />
            <span>{property.squareFeet.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyCard;