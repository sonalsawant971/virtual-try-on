import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Camera, Ruler, ShoppingBag, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const features = [
    {
      icon: Camera,
      title: 'AR Virtual Try-On',
      description: 'See how clothes look on you in real-time using your device camera',
    },
    {
      icon: Ruler,
      title: 'Smart Size Recommendations',
      description: 'Get personalized size suggestions based on your measurements',
    },
    {
      icon: ShoppingBag,
      title: 'Extensive Catalog',
      description: 'Browse through our collection of casual wear for every occasion',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Fitting',
      description: 'Advanced technology ensures accurate virtual fitting experience',
    },
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 xl:py-32">
        <div className="max-w-7xl mx-auto px-4 xl:px-8">
          <div className="text-center max-w-3xl mx-auto fade-in">
            <h1 className="text-4xl xl:text-6xl font-bold mb-6 text-foreground">
              Try Before You Buy with{' '}
              <span className="text-primary">Virtual Wardrobe</span>
            </h1>
            <p className="text-lg xl:text-xl text-muted-foreground mb-8">
              Experience the future of online shopping with AR-powered virtual try-on technology.
              See how clothes fit you before making a purchase.
            </p>
            <div className="flex flex-col xl:flex-row gap-4 justify-center">
              <Link to="/catalog">
                <Button size="lg" className="w-full xl:w-auto">
                  Browse Catalog
                </Button>
              </Link>
              <Link to="/size-guide">
                <Button size="lg" variant="outline" className="w-full xl:w-auto">
                  Get Size Recommendation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24 bg-muted/50">
        <div className="max-w-7xl mx-auto px-4 xl:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl xl:text-4xl font-bold mb-4">Why Choose Virtual Wardrobe?</h2>
            <p className="text-muted-foreground text-lg">
              Innovative features designed to enhance your shopping experience
            </p>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="transition-smooth hover:shadow-elegant">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 xl:py-24">
        <div className="max-w-7xl mx-auto px-4 xl:px-8">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 xl:p-12 text-center text-primary-foreground">
            <h2 className="text-3xl xl:text-4xl font-bold mb-4">
              Ready to Transform Your Shopping Experience?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Start trying on clothes virtually and find your perfect fit today
            </p>
            <Link to="/catalog">
              <Button size="lg" variant="secondary">
                Start Shopping Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
