import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Ruler, TrendingUp } from 'lucide-react';
import { calculateSizeRecommendation } from '@/utils/sizeRecommendation';
import { products } from '@/data/products';
import type { UserMeasurements } from '@/types';
import { Link } from 'react-router-dom';

export default function SizeGuide() {
  const [measurements, setMeasurements] = useState<UserMeasurements>({
    height: 0,
    weight: 0,
    bodyType: 'regular',
  });
  const [showRecommendations, setShowRecommendations] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (measurements.height > 0 && measurements.weight > 0) {
      setShowRecommendations(true);
    }
  };

  const recommendations = showRecommendations
    ? products.map((product) => ({
        product,
        recommendation: calculateSizeRecommendation(measurements, product),
      }))
    : [];

  return (
    <div className="min-h-screen py-8 xl:py-12">
      <div className="max-w-4xl mx-auto px-4 xl:px-8">
        <div className="mb-8">
          <h1 className="text-3xl xl:text-4xl font-bold mb-2">Size Recommendation</h1>
          <p className="text-muted-foreground">
            Get personalized size suggestions based on your body measurements
          </p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-primary" />
              Enter Your Measurements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    min="100"
                    max="250"
                    value={measurements.height || ''}
                    onChange={(e) =>
                      setMeasurements({ ...measurements, height: Number(e.target.value) })
                    }
                    placeholder="e.g., 170"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    min="30"
                    max="200"
                    value={measurements.weight || ''}
                    onChange={(e) =>
                      setMeasurements({ ...measurements, weight: Number(e.target.value) })
                    }
                    placeholder="e.g., 65"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="bodyType">Body Type</Label>
                <Select
                  value={measurements.bodyType}
                  onValueChange={(value: 'slim' | 'regular' | 'athletic' | 'plus') =>
                    setMeasurements({ ...measurements, bodyType: value })
                  }
                >
                  <SelectTrigger id="bodyType">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="slim">Slim</SelectItem>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="athletic">Athletic</SelectItem>
                    <SelectItem value="plus">Plus Size</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full" size="lg">
                <TrendingUp className="h-5 w-5 mr-2" />
                Get Size Recommendations
              </Button>
            </form>
          </CardContent>
        </Card>

        {showRecommendations && (
          <div className="space-y-4 fade-in">
            <h2 className="text-2xl font-bold mb-4">Your Size Recommendations</h2>
            {recommendations.map(({ product, recommendation }) => (
              <Card key={product.id} className="transition-smooth hover:shadow-elegant">
                <CardContent className="p-6">
                  <div className="flex flex-col xl:flex-row gap-6">
                    <div className="w-full xl:w-32 h-32 rounded-lg overflow-hidden bg-muted shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        crossOrigin="anonymous"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-4 mb-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-lg px-3 py-1">
                            Size: {recommendation.size}
                          </Badge>
                          <Badge
                            variant={recommendation.confidence >= 90 ? 'default' : 'outline'}
                            className="px-3 py-1"
                          >
                            {recommendation.confidence}% match
                          </Badge>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{recommendation.reason}</p>
                      <div className="flex flex-col xl:flex-row gap-2">
                        <Link to={`/product/${product.id}`}>
                          <Button variant="outline" size="sm" className="w-full xl:w-auto">
                            View Product
                          </Button>
                        </Link>
                        <Link to={`/try-on/${product.id}`}>
                          <Button size="sm" className="w-full xl:w-auto">
                            Try On Virtually
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
