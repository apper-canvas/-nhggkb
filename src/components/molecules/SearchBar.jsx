import { useState } from 'react';
import { motion } from 'framer-motion';
import Input from '@/components/atoms/Input';
import Button from '@/components/atoms/Button';

const SearchBar = ({ onSearch, placeholder = "Search by location...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`w-full ${className}`}
    >
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="flex-1 relative">
          <Input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            icon="Search"
            className="pr-10"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <span className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer">×</span>
              </motion.div>
            </button>
          )}
        </div>
        <Button type="submit" icon="Search" size="md">
          Search
        </Button>
      </form>
    </motion.div>
  );
};

export default SearchBar;