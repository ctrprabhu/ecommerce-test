import { useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "./layout/layout";
import { ProductCard } from "./ui/product-card";
import { products } from "@/data/products";
import { Product } from "@/types/product";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function CategoryPage() {
  // In storyboard preview, useParams might not be available, so provide a fallback
  const params = useParams<{ category: string }>();
  const category = params?.category || "laptops";
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [inStock, setInStock] = useState(false);
  const [onSale, setOnSale] = useState(false);

  // Format category name for display
  const formatCategoryName = (cat: string | undefined) => {
    if (!cat) return "";
    return cat.charAt(0).toUpperCase() + cat.slice(1);
  };

  // Filter products by category
  const categoryProducts = products.filter((product) => {
    const categoryMatch =
      product.category.toLowerCase() === (category || "").toLowerCase();
    const searchMatch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const priceMatch =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    const stockMatch = !inStock || product.stock > 0;
    const saleMatch = !onSale || product.discountPrice !== undefined;

    return (
      categoryMatch &&
      searchMatch &&
      priceMatch &&
      brandMatch &&
      stockMatch &&
      saleMatch
    );
  });

  // Get unique brands for the filter
  const uniqueBrands = Array.from(
    new Set(categoryProducts.map((product) => product.brand)),
  );

  // Handle brand selection
  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand],
    );
  };

  // Handle adding to cart
  const handleAddToCart = (product: Product) => {
    console.log("Added to cart:", product);
    // Implement cart functionality here
  };

  // Handle adding to wishlist
  const handleAddToWishlist = (product: Product) => {
    console.log("Added to wishlist:", product);
    // Implement wishlist functionality here
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          {formatCategoryName(category)}
        </h1>

        {/* Search and filter bar */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="relative flex-grow">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:w-auto w-full flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {showFilters ? "Hide Filters" : "Show Filters"}
            </Button>
          </div>

          {/* Filters section */}
          {showFilters && (
            <div className="bg-white p-4 rounded-lg shadow-sm border mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium">Filters</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedBrands([]);
                    setPriceRange([0, 2000]);
                    setInStock(false);
                    setOnSale(false);
                  }}
                  className="h-8 text-sm"
                >
                  Clear All
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Price range filter */}
                <div>
                  <h4 className="font-medium mb-3">Price Range</h4>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 2000]}
                      max={2000}
                      step={10}
                      value={priceRange}
                      onValueChange={(value) =>
                        setPriceRange(value as [number, number])
                      }
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Brand filter */}
                <div>
                  <h4 className="font-medium mb-3">Brands</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {uniqueBrands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => toggleBrand(brand)}
                        />
                        <Label htmlFor={`brand-${brand}`} className="text-sm">
                          {brand}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional filters */}
                <div>
                  <h4 className="font-medium mb-3">Other Filters</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="in-stock"
                        checked={inStock}
                        onCheckedChange={() => setInStock(!inStock)}
                      />
                      <Label htmlFor="in-stock" className="text-sm">
                        In Stock Only
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="on-sale"
                        checked={onSale}
                        onCheckedChange={() => setOnSale(!onSale)}
                      />
                      <Label htmlFor="on-sale" className="text-sm">
                        On Sale
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Active filters */}
              {(selectedBrands.length > 0 || inStock || onSale) && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Active Filters:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedBrands.map((brand) => (
                      <div
                        key={brand}
                        className="bg-gray-100 text-sm rounded-full px-3 py-1 flex items-center gap-1"
                      >
                        {brand}
                        <button onClick={() => toggleBrand(brand)}>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                    {inStock && (
                      <div className="bg-gray-100 text-sm rounded-full px-3 py-1 flex items-center gap-1">
                        In Stock
                        <button onClick={() => setInStock(false)}>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                    {onSale && (
                      <div className="bg-gray-100 text-sm rounded-full px-3 py-1 flex items-center gap-1">
                        On Sale
                        <button onClick={() => setOnSale(false)}>
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results count */}
        <p className="mb-6 text-gray-600">
          {categoryProducts.length} products found
        </p>

        {/* Products grid */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium mb-2">No products found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters or search term
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setSelectedBrands([]);
                setPriceRange([0, 2000]);
                setInStock(false);
                setOnSale(false);
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
