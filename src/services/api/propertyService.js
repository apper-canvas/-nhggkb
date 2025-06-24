import propertyData from '@/services/mockData/properties.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class PropertyService {
  constructor() {
    this.data = [...propertyData];
  }

  async getAll(filters = {}) {
    await delay(300);
    
    let filteredData = [...this.data];
    
    // Apply filters
    if (filters.priceMin !== undefined) {
      filteredData = filteredData.filter(property => property.price >= filters.priceMin);
    }
    
    if (filters.priceMax !== undefined) {
      filteredData = filteredData.filter(property => property.price <= filters.priceMax);
    }
    
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      filteredData = filteredData.filter(property => 
        filters.propertyTypes.includes(property.propertyType)
      );
    }
    
    if (filters.bedroomsMin !== undefined) {
      filteredData = filteredData.filter(property => property.bedrooms >= filters.bedroomsMin);
    }
    
    if (filters.bathroomsMin !== undefined) {
      filteredData = filteredData.filter(property => property.bathrooms >= filters.bathroomsMin);
    }
    
    if (filters.sqftMin !== undefined) {
      filteredData = filteredData.filter(property => property.squareFeet >= filters.sqftMin);
    }
    
    if (filters.sqftMax !== undefined) {
      filteredData = filteredData.filter(property => property.squareFeet <= filters.sqftMax);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredData = filteredData.filter(property => 
        property.title.toLowerCase().includes(searchTerm) ||
        property.address.street.toLowerCase().includes(searchTerm) ||
        property.address.city.toLowerCase().includes(searchTerm) ||
        property.address.state.toLowerCase().includes(searchTerm)
      );
    }
    
    return filteredData;
  }

  async getById(id) {
    await delay(200);
    const property = this.data.find(item => item.Id === parseInt(id, 10));
    if (!property) {
      throw new Error('Property not found');
    }
    return { ...property };
  }

  async getRentals(filters = {}) {
    await delay(300);
    const rentals = this.data.filter(property => property.status === 'for-rent');
    
    // Apply same filtering logic as getAll
    let filteredData = [...rentals];
    
    if (filters.priceMin !== undefined) {
      filteredData = filteredData.filter(property => property.price >= filters.priceMin);
    }
    
    if (filters.priceMax !== undefined) {
      filteredData = filteredData.filter(property => property.price <= filters.priceMax);
    }
    
    if (filters.propertyTypes && filters.propertyTypes.length > 0) {
      filteredData = filteredData.filter(property => 
        filters.propertyTypes.includes(property.propertyType)
      );
    }
    
    if (filters.bedroomsMin !== undefined) {
      filteredData = filteredData.filter(property => property.bedrooms >= filters.bedroomsMin);
    }
    
    if (filters.bathroomsMin !== undefined) {
      filteredData = filteredData.filter(property => property.bathrooms >= filters.bathroomsMin);
    }
    
    if (filters.sqftMin !== undefined) {
      filteredData = filteredData.filter(property => property.squareFeet >= filters.sqftMin);
    }
    
    if (filters.sqftMax !== undefined) {
      filteredData = filteredData.filter(property => property.squareFeet <= filters.sqftMax);
    }
    
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredData = filteredData.filter(property => 
        property.title.toLowerCase().includes(searchTerm) ||
        property.address.street.toLowerCase().includes(searchTerm) ||
        property.address.city.toLowerCase().includes(searchTerm) ||
        property.address.state.toLowerCase().includes(searchTerm)
      );
    }
    
    return filteredData;
  }

  async getFeatured() {
    await delay(200);
    return this.data.filter(property => property.featured).slice(0, 6);
  }
}

export default new PropertyService();