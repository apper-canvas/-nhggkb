import { forwardRef } from 'react';
import ApperIcon from '@/components/ApperIcon';

const Input = forwardRef(({ 
  label, 
  type = 'text', 
  error, 
  icon, 
  iconPosition = 'left',
  className = '',
  ...props 
}, ref) => {
  const baseClasses = 'block w-full rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 transition-colors';
  
  const errorClasses = error ? 'ring-red-300 focus:ring-red-500' : '';
  const iconClasses = icon ? (iconPosition === 'left' ? 'pl-10' : 'pr-10') : 'px-3';

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium leading-6 text-gray-900 mb-2">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className={`pointer-events-none absolute inset-y-0 ${iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center`}>
            <ApperIcon name={icon} className="h-5 w-5 text-gray-400" />
          </div>
        )}
        <input
          ref={ref}
          type={type}
          className={`${baseClasses} ${iconClasses} ${errorClasses} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;