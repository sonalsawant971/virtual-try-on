import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Shirt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import routes from '@/routes';

export default function Header() {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const navigation = routes.filter((route) => route.visible !== false);
  const totalItems = getTotalItems();
  const isLanding = location.pathname === '/';

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 shadow-elegant">
      <nav className="max-w-7xl mx-auto px-4 xl:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 transition-smooth hover:opacity-80">
            <Shirt className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">Virtual Wardrobe</span>
          </Link>

          {!isLanding && (
            <div className="hidden xl:flex items-center gap-6">
              {navigation.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 text-base font-medium rounded-lg transition-smooth ${
                    location.pathname === item.path
                      ? 'text-primary bg-muted'
                      : 'text-foreground hover:text-primary hover:bg-muted'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
