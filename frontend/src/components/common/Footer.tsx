import { Shirt } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 xl:px-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Shirt className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-primary">Virtual Wardrobe</span>
          </div>
          <p className="text-muted-foreground text-center">
            Experience the future of online shopping with AR-powered virtual try-on technology
          </p>
          <div className="text-center text-muted-foreground text-sm">
            <p>{currentYear} Virtual Wardrobe</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
