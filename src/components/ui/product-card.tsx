import { Product } from "@/types/product";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}

export function ProductCard({
  product,
  onAddToCart = () => {},
  onAddToWishlist = () => {},
}: ProductCardProps) {
  return (
    <Card className="overflow-hidden h-full flex flex-col bg-white">
      <div className="relative">
        <div className="aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform hover:scale-105"
          />
        </div>
        {(product.new || product.featured) && (
          <div className="absolute top-2 left-2">
            {product.new && <Badge className="bg-blue-500 mr-2">New</Badge>}
            {product.featured && (
              <Badge className="bg-amber-500">Featured</Badge>
            )}
          </div>
        )}
        <button
          onClick={() => onAddToWishlist(product)}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white transition-colors"
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>

      <CardContent className="flex-grow py-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
            <h3 className="font-medium text-gray-900 line-clamp-2">
              {product.name}
            </h3>
          </div>
        </div>
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-sm text-gray-500">
            {product.reviewCount} reviews
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-0 pb-4 px-6">
        <div className="w-full">
          <div className="flex items-center justify-between mb-3">
            {product.discountPrice ? (
              <div className="flex items-center gap-2">
                <span className="font-medium text-lg">
                  ${product.discountPrice.toFixed(2)}
                </span>
                <span className="text-gray-500 line-through text-sm">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="font-medium text-lg">
                ${product.price.toFixed(2)}
              </span>
            )}
            <span
              className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}
            >
              {product.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>
          <Button
            onClick={() => onAddToCart(product)}
            className="w-full"
            disabled={product.stock <= 0}
          >
            Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
