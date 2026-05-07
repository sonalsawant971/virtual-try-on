import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden transition-smooth hover:shadow-elegant group">
      <div className="aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          crossOrigin="anonymous"
          className="w-full h-full object-cover transition-smooth group-hover:scale-105"
        />
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{product.name}</h3>
          <Badge variant="secondary" className="shrink-0">
            {product.price}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{product.description}</p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>{product.material}</span>
          <span>•</span>
          <span>{product.sizes.length} sizes</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Link to={`/try-on/${product.id}`} className="flex-1">
          <Button variant="default" className="w-full">
            Try On
          </Button>
        </Link>
        <Link to={`/product/₹{product.id}`} className="flex-1">
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
