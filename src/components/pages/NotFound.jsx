import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center px-4"
    >
      <div className="max-w-md w-full text-center">
        <motion.div
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3
          }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto">
            <ApperIcon name="Home" className="w-12 h-12 text-gray-400" />
          </div>
        </motion.div>
        
        <h1 className="text-6xl font-heading font-bold text-gray-900 mb-4">
          404
        </h1>
        
        <h2 className="text-2xl font-heading font-semibold text-gray-900 mb-4">
          Property Not Found
        </h2>
        
        <p className="text-gray-600 mb-8">
          The property you're looking for doesn't exist or has been moved. 
          Let's get you back to browsing available properties.
        </p>
        
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/')}
            className="w-full"
            icon="Home"
          >
            Browse Properties
          </Button>
          
          <Button 
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full"
            icon="ArrowLeft"
          >
            Go Back
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default NotFound;