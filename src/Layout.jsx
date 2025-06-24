import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import { routeArray } from '@/config/routes';

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const visibleRoutes = routeArray.filter(route => !route.hidden);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">
      {/* Header */}
      <header className="flex-shrink-0 h-16 bg-white border-b border-gray-200 z-40">
        <div className="h-full px-4 flex items-center justify-between max-w-7xl mx-auto">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <ApperIcon name="Home" className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-heading font-bold text-primary">HomeHunt</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {visibleRoutes.map((route) => (
              <NavLink
                key={route.id}
                to={route.path}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-primary bg-blue-50'
                      : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                  }`
                }
              >
                <ApperIcon name={route.icon} className="w-4 h-4" />
                <span>{route.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-primary hover:bg-gray-50"
          >
            <ApperIcon name={isMobileMenuOpen ? 'X' : 'Menu'} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Menu */}
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                transition={{ duration: 0.3 }}
                className="fixed top-16 right-0 bottom-0 w-64 bg-white shadow-xl z-50 md:hidden"
              >
                <nav className="p-4 space-y-2">
                  {visibleRoutes.map((route) => (
                    <NavLink
                      key={route.id}
                      to={route.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? 'text-primary bg-blue-50'
                            : 'text-gray-600 hover:text-primary hover:bg-gray-50'
                        }`
                      }
                    >
                      <ApperIcon name={route.icon} className="w-5 h-5" />
                      <span>{route.label}</span>
                    </NavLink>
                  ))}
                </nav>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;