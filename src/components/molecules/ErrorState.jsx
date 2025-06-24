import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const ErrorState = ({ 
  title = "Something went wrong", 
  message = "We encountered an error while loading the data.", 
  onRetry,
  showRetry = true 
}) => {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center justify-center py-12 text-center"
    >
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
        className="mb-6"
      >
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-red-500" />
        </div>
      </motion.div>
      
      <h3 className="text-lg font-heading font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <Button 
          onClick={onRetry}
          icon="RefreshCw"
          variant="outline"
        >
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default ErrorState;