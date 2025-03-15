import { Layout } from "./layout/layout";
import { HeroSection } from "./home/hero-section";
import { FeaturedProducts } from "./home/featured-products";
import { CategoriesSection } from "./home/categories-section";
import { FeaturesSection } from "./home/features-section";
import { NewsletterSection } from "./home/newsletter-section";
import { products, categories } from "@/data/products";

function Home() {
  // Filter featured products
  const featuredProducts = products.filter((product) => product.featured);

  // Filter new products
  const newProducts = products.filter((product) => product.new);

  return (
    <Layout>
      <HeroSection />
      <CategoriesSection categories={categories} />
      <FeaturedProducts
        products={featuredProducts}
        title="Featured Products"
        viewAllLink="/category/featured"
      />
      <FeaturedProducts
        products={newProducts}
        title="New Arrivals"
        viewAllLink="/category/new"
      />
      <FeaturesSection />
      <NewsletterSection />
    </Layout>
  );
}

export default Home;
