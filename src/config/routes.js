import Browse from '@/components/pages/Browse';
import PropertyDetail from '@/components/pages/PropertyDetail';
import Saved from '@/components/pages/Saved';
import MapView from '@/components/pages/MapView';

export const routes = {
  browse: {
    id: 'browse',
    label: 'Buy',
    path: '/',
    icon: 'Home',
    component: Browse
  },
  rent: {
    id: 'rent',
    label: 'Rent',
    path: '/rent',
    icon: 'Key',
    component: Browse
  },
  saved: {
    id: 'saved',
    label: 'Saved',
    path: '/saved',
    icon: 'Heart',
    component: Saved
  },
  map: {
    id: 'map',
    label: 'Map View',
    path: '/map',
    icon: 'Map',
    component: MapView
  },
  propertyDetail: {
    id: 'propertyDetail',
    label: 'Property Detail',
    path: '/property/:id',
    icon: 'Home',
    component: PropertyDetail,
    hidden: true
  }
};

export const routeArray = Object.values(routes);
export default routes;