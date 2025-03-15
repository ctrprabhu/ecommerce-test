import { useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "@/components/ui/product-card";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface FeaturedProductsProps {
  products: Product[];
  title?: string;
  viewAllLink?: string;
}

export function FeaturedProducts({
  products = [],
  title = "Featured Products",
  viewAllLink = "/products",
}: FeaturedProductsProps) {
  const [cart, setCart] = useState<Product[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  const handleAddToCart = (product: Product) => {
    setCart([...cart, product]);
    // In a real app, this would dispatch to a cart context/store
    console.log(`Added ${product.name} to cart`);
  };

  const handleAddToWishlist = (product: Product) => {
    setWishlist([...wishlist, product]);
    // In a real app, this would dispatch to a wishlist context/store
    console.log(`Added ${product.name} to wishlist`);
  };

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <Button asChild variant="ghost" className="group">
            <Link to={viewAllLink} className="flex items-center">
              View All
              <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
