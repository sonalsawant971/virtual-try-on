import type { ReactNode } from 'react';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import TryOn from './pages/TryOn';
import SizeGuide from './pages/SizeGuide';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Register from './pages/Register';
import Login from './pages/Login';
import Auth from './pages/Auth';

export interface RouteConfig {
  name: string;
  path: string;
  element: ReactNode;
  visible?: boolean;
}

const routes: RouteConfig[] = [
  {
    name: 'Landing',
    path: '/',
    element: <Landing />,
    visible: false,
  },
  {
    name: 'Home',
    path: '/app',
    element: <Home />,
  },
  {
    name: 'Catalog',
    path: '/catalog',
    element: <Catalog />,
  },
  {
    name: 'Size Guide',
    path: '/size-guide',
    element: <SizeGuide />,
  },
  {
    name: 'Product Detail',
    path: '/product/:id',
    element: <ProductDetail />,
    visible: false,
  },
  {
    name: 'Try On',
    path: '/try-on/:id',
    element: <TryOn />,
    visible: false,
  },
  {
    name: 'Cart',
    path: '/cart',
    element: <Cart />,
    visible: false,
  },
  {
    name: 'Checkout',
    path: '/checkout',
    element: <Checkout />,
    visible: false,
  },
  {
    name: 'Auth',
    path: '/auth',
    element: <Auth />,
    visible: false,
  },
  {
    name: 'Register',
    path: '/register',
    element: <Register />,
    visible: false,
  },
  {
    name: 'Login',
    path: '/login',
    element: <Login />,
    visible: false,
  },
];

export default routes;
