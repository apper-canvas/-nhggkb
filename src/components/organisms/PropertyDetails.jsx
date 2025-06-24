import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';
import PhotoGallery from '@/components/molecules/PhotoGallery';
import { format } from 'date-fns';
const PropertyDetails = ({ property }) => {
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hi, I'm interested in the property at ${property?.address?.street || 'this address'}. Could you please provide more information?`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatPrice = (price) => {
    if (property.status === 'for-rent') {
      return `$${price.toLocaleString()}/mo`;
    }
    return `$${price.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'MMMM d, yyyy');
  };

  const handleSendMessage = () => {
    setShowContactModal(true);
  };

  const handleContactFormChange = (field, value) => {
    setContactForm(prev => ({ ...prev, [field]: value }));
  };

  const handleContactFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setShowContactModal(false);
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: `Hi, I'm interested in the property at ${property?.address?.street || 'this address'}. Could you please provide more information?`
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const ContactModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => e.target === e.currentTarget && setShowContactModal(false)}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-heading font-semibold">Send Message</h3>
          <button
            onClick={() => setShowContactModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ApperIcon name="X" className="w-5 h-5" />
          </button>
        </div>
        
        <form onSubmit={handleContactFormSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              value={contactForm.name}
              onChange={(e) => handleContactFormChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              id="email"
              value={contactForm.email}
              onChange={(e) => handleContactFormChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              value={contactForm.phone}
              onChange={(e) => handleContactFormChange('phone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message *
            </label>
            <textarea
              id="message"
              value={contactForm.message}
              onChange={(e) => handleContactFormChange('message', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              required
            />
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowContactModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              className="flex-1"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );

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
<Button
            variant="outline"
            size="lg"
            onClick={handleSendMessage}
            className="bg-white text-primary hover:bg-gray-50 border-white"
            leftIcon="Mail"
          >
            Send Message
          </Button>
        </div>
</div>

      {/* Contact Modal */}
      {showContactModal && <ContactModal />}
    </motion.div>
  );
};

export default PropertyDetails;