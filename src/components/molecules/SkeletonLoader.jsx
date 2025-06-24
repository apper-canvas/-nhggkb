import { motion } from 'framer-motion';

const SkeletonLoader = ({ count = 3, type = 'card' }) => {
  const variants = {
    card: (
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse"></div>
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="flex space-x-4">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-20"></div>
          </div>
        </div>
      </div>
    ),
    
    detail: (
      <div className="space-y-6">
        <div className="h-96 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse"></div>
        <div className="space-y-4">
          <div className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-4/5"></div>
          </div>
        </div>
      </div>
    ),
    
    list: (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="flex space-x-4">
          <div className="w-24 h-16 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse flex-shrink-0"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded animate-pulse w-2/3"></div>
            <div className="flex space-x-3">
              <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
              <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
            </div>
          </div>
        </div>
      </div>
    )
  };

  return (
    <div className="space-y-4">
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {variants[type]}
        </motion.div>
      ))}
    </div>
  );
};

export default SkeletonLoader;