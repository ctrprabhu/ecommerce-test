import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative bg-gray-900 text-white">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80"
          alt="Tech devices on desk"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative container mx-auto px-4 py-24 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl">
          Next-Gen Tech for Your Digital Lifestyle
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-300">
          Discover the latest laptops, smartphones, and accessories with
          exclusive deals and free shipping.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link to="/products">Shop Now</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10"
          >
            <Link to="/category/featured">View Deals</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
