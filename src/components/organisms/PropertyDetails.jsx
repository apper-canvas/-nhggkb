import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import PhotoGallery from '@/components/molecules/PhotoGallery';
import { format } from 'date-fns';

const PropertyDetails = ({ property }) => {
  const formatPrice = (price) => {
    if (property.status === 'for-rent') {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Photo Gallery */}
      <PhotoGallery photos={property.photos} title={property.title} />
      
      {/* Property Header */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              {property.title}
            </h1>
            <p className="text-lg text-gray-600 mb-4">
              {property.address.street}, {property.address.city}, {property.address.state} {property.address.zipCode}
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-heading font-bold text-accent mb-2">
              {formatPrice(property.price)}
            </div>
            <Badge variant={property.status === 'for-rent' ? 'secondary' : 'primary'}>
              {property.status === 'for-rent' ? 'For Rent' : 'For Sale'}
            </Badge>
          </div>
        </div>

        {/* Property Stats */}
        <div className="flex items-center space-x-6 text-lg">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Bed" className="w-5 h-5 text-gray-500" />
            <span className="font-medium">{property.bedrooms}</span>
            <span className="text-gray-600">bed{property.bedrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Bath" className="w-5 h-5 text-gray-500" />
            <span className="font-medium">{property.bathrooms}</span>
            <span className="text-gray-600">bath{property.bathrooms !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Square" className="w-5 h-5 text-gray-500" />
            <span className="font-medium">{property.squareFeet.toLocaleString()}</span>
            <span className="text-gray-600">sqft</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Home" className="w-5 h-5 text-gray-500" />
            <span className="text-gray-600">{property.propertyType}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-heading font-semibold mb-4">Description</h2>
        <p className="text-gray-700 leading-relaxed">
          {property.description}
        </p>
      </div>

      {/* Features */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-heading font-semibold mb-4">Features & Amenities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {property.features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-3"
            >
              <ApperIcon name="Check" className="w-5 h-5 text-success" />
              <span className="text-gray-700">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Property Information */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-heading font-semibold mb-4">Property Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Property Type</h3>
            <p className="text-gray-700">{property.propertyType}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Square Footage</h3>
            <p className="text-gray-700">{property.squareFeet.toLocaleString()} sqft</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Bedrooms</h3>
            <p className="text-gray-700">{property.bedrooms}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Bathrooms</h3>
            <p className="text-gray-700">{property.bathrooms}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Listed Date</h3>
            <p className="text-gray-700">{formatDate(property.listingDate)}</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 mb-2">Status</h3>
            <Badge variant={property.status === 'for-rent' ? 'secondary' : 'primary'}>
              {property.status === 'for-rent' ? 'For Rent' : 'For Sale'}
            </Badge>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="bg-primary text-white rounded-lg p-6">
        <h2 className="text-xl font-heading font-semibold mb-4">Interested in this property?</h2>
        <p className="mb-6">Contact us to schedule a viewing or get more information.</p>
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            <ApperIcon name="Phone" className="w-5 h-5" />
            <span>Call Now</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center space-x-2 bg-white text-primary px-6 py-3 rounded-md font-medium hover:bg-gray-50 transition-colors"
          >
            <ApperIcon name="Mail" className="w-5 h-5" />
            <span>Send Message</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default PropertyDetails;