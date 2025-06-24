import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const PhotoGallery = ({ photos = [], title = '' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToPhoto = (index) => {
    setCurrentIndex(index);
  };

  if (!photos.length) return null;

  return (
    <>
      {/* Main Gallery */}
      <div className="relative">
        {/* Main Photo */}
        <div className="relative h-64 md:h-96 overflow-hidden rounded-lg">
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={photos[currentIndex]}
            alt={`${title} - Photo ${currentIndex + 1}`}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => setIsFullscreen(true)}
          />
          
          {/* Navigation Arrows */}
          {photos.length > 1 && (
            <>
              <button
                onClick={prevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
              >
                <ApperIcon name="ChevronLeft" className="w-5 h-5" />
              </button>
              <button
                onClick={nextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
              >
                <ApperIcon name="ChevronRight" className="w-5 h-5" />
              </button>
            </>
          )}
          
          {/* Fullscreen Button */}
          <button
            onClick={() => setIsFullscreen(true)}
            className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors"
          >
            <ApperIcon name="Maximize" className="w-5 h-5" />
          </button>
          
          {/* Photo Counter */}
          <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>

        {/* Thumbnails */}
        {photos.length > 1 && (
          <div className="mt-4 flex space-x-2 overflow-x-auto scrollbar-hide">
            {photos.map((photo, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => goToPhoto(index)}
                className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-colors ${
                  index === currentIndex ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={photo}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.button>
            ))}
          </div>
        )}
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={() => setIsFullscreen(false)}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
            >
              <ApperIcon name="X" className="w-6 h-6" />
            </button>

            {/* Navigation */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevPhoto(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
                >
                  <ApperIcon name="ChevronLeft" className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextPhoto(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-10"
                >
                  <ApperIcon name="ChevronRight" className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Photo Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full">
              {currentIndex + 1} / {photos.length}
            </div>

            {/* Main Photo */}
            <motion.img
              key={currentIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={photos[currentIndex]}
              alt={`${title} - Photo ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PhotoGallery;