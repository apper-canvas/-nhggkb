import favoriteData from '@/services/mockData/favorites.json';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class FavoriteService {
  constructor() {
    this.data = [...favoriteData];
  }

  async getAll() {
    await delay(200);
    return [...this.data];
  }

  async add(propertyId) {
    await delay(200);
    
    // Check if already exists
    const exists = this.data.find(fav => fav.propertyId === propertyId);
    if (exists) {
      return { ...exists };
    }

    const newFavorite = {
      Id: this.data.length > 0 ? Math.max(...this.data.map(f => f.Id)) + 1 : 1,
      propertyId: propertyId,
      savedDate: new Date().toISOString()
    };

    this.data.push(newFavorite);
    return { ...newFavorite };
  }

  async remove(propertyId) {
    await delay(200);
    
    const index = this.data.findIndex(fav => fav.propertyId === propertyId);
    if (index === -1) {
      throw new Error('Favorite not found');
    }

    const removed = this.data.splice(index, 1)[0];
    return { ...removed };
  }

  async isFavorite(propertyId) {
    await delay(100);
    return this.data.some(fav => fav.propertyId === propertyId);
  }

  async getFavoritePropertyIds() {
    await delay(100);
    return this.data.map(fav => fav.propertyId);
  }
}

export default new FavoriteService();