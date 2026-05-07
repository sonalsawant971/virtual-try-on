import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, ShoppingCart, Camera } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  const product = products.find((p) => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link to="/catalog">
            <Button>Back to Catalog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast({
        title: 'Selection Required',
        description: 'Please select both size and color before adding to cart',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Backend call
      await axios.post('http://localhost:5000/api/cart/add', {
        userId: 1, // Hardcoded for now
        productId: product.id,
        productName: product.name,
        price: product.price,
        quantity,
        size: selectedSize,
        color: selectedColor,
        image: product.image,
      });

      addToCart(product, selectedSize, selectedColor, quantity);
      toast({
        title: 'Added to Cart',
        description: `₹{product.name} has been added to your cart`,
      });
    } catch (error) {
      console.error('Add to cart error:', error);
      toast({
        title: 'Error',
        description: 'Failed to add product to cart',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen py-8 xl:py-12">
      <div className="max-w-7xl mx-auto px-4 xl:px-8">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 xl:gap-12">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              crossOrigin="anonymous"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl xl:text-4xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="secondary" className="text-xl px-4 py-1">
                  ₹{product.price}
                </Badge>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <p className="text-muted-foreground text-lg">{product.description}</p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label className="text-base font-semibold mb-2 block">Material</Label>
                  <p className="text-muted-foreground">{product.material}</p>
                </div>

                <div>
                  <Label htmlFor="size" className="text-base font-semibold mb-2 block">
                    Select Size
                  </Label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger id="size">
                      <SelectValue placeholder="Choose a size" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="color" className="text-base font-semibold mb-2 block">
                    Select Color
                  </Label>
                  <Select value={selectedColor} onValueChange={setSelectedColor}>
                    <SelectTrigger id="color">
                      <SelectValue placeholder="Choose a color" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.colors.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="quantity" className="text-base font-semibold mb-2 block">
                    Quantity
                  </Label>
                  <Select value={quantity.toString()} onValueChange={(val) => setQuantity(Number(val))}>
                    <SelectTrigger id="quantity">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col xl:flex-row gap-3">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="flex-1"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Link to={`/try-on/${product.id}`} className="flex-1">
                <Button size="lg" variant="outline" className="w-full">
                  <Camera className="h-5 w-5 mr-2" />
                  Try On Virtually
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
