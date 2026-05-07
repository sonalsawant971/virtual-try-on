import { products } from "@/data/products";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

export default function Catalog() {
  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Catalog</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <Card className="cursor-pointer hover:shadow-lg transition">
                <CardContent className="p-4">
                  <div className="aspect-square overflow-hidden rounded mb-3 bg-muted">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h3 className="font-medium">{product.name}</h3>

                  {/* ✅ PRICE IN RUPEES */}
                  <p className="text-sm text-muted-foreground">
                    ₹{product.price}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
