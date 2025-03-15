import { Link } from "react-router-dom";
import { Category } from "@/types/product";

interface CategoryCardProps {
  category: Category;
  image: string;
}

function CategoryCard({ category, image }: CategoryCardProps) {
  return (
    <Link to={`/category/${category.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-lg">
        <div className="aspect-square">
          <img
            src={image}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
          <h3 className="text-white text-xl font-medium">{category.name}</h3>
        </div>
      </div>
    </Link>
  );
}

interface CategoriesSectionProps {
  categories: Category[];
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  // Sample images for categories
  const categoryImages = {
    Laptops:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&q=80",
    Smartphones:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
    Accessories:
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&q=80",
    Monitors:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80",
    Components:
      "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=800&q=80",
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              image={
                categoryImages[category.name as keyof typeof categoryImages] ||
                "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
