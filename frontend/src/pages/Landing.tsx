import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import PageMeta from '@/components/common/PageMeta';

export default function Landing() {
  return (
    <>
      <PageMeta
        title="Virtual Wardrobe – AR Virtual Try-On for Fashion"
        description="Experience Virtual Wardrobe, an AR-powered virtual try-on platform that helps you preview outfits, get smart size recommendations, and shop online with confidence."
      />

      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-background via-primary/5 to-secondary/5">
        <section className="w-full">
          <div className="max-w-3xl mx-auto px-4 text-center space-y-6 fade-in">
            <h1 className="text-4xl xl:text-6xl font-bold tracking-tight text-foreground">
              Virtual Wardrobe
            </h1>
            <p className="text-lg xl:text-2xl font-medium text-primary">
              Try your outfits online before you buy.
            </p>
            <p className="text-base xl:text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload your look, explore our casual wear catalog, and see how each piece fits you
              with AR-powered virtual try-on and smart size recommendations.
            </p>
            <div className="pt-4">
              <Link to="/auth">
                <Button
                  size="lg"
                  className="px-10 rounded-full bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-elegant transition-smooth hover:brightness-110"
                >
                  Start Shopping
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

