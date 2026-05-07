import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { CartProvider } from '@/contexts/CartContext';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import routes from './routes';

const SHELL_HIDDEN_PATHS = ['/', '/auth'];

function AppShell() {
  const location = useLocation();
  const showShell = !SHELL_HIDDEN_PATHS.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {showShell && <Header />}
      <main className="flex-grow">
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {showShell && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <CartProvider>
        <AppShell />
        <Toaster />
      </CartProvider>
    </Router>
  );
}
