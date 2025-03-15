import { Truck, ShieldCheck, RotateCcw, CreditCard } from "lucide-react";

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function Feature({ icon, title, description }: FeatureProps) {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <div className="bg-primary/10 p-3 rounded-full mb-4">{icon}</div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export function FeaturesSection() {
  const features = [
    {
      icon: <Truck className="h-6 w-6 text-primary" />,
      title: "Free Shipping",
      description: "Free shipping on all orders over $50",
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-primary" />,
      title: "Secure Payments",
      description: "We use encrypted SSL security",
    },
    {
      icon: <RotateCcw className="h-6 w-6 text-primary" />,
      title: "Easy Returns",
      description: "30 day money back guarantee",
    },
    {
      icon: <CreditCard className="h-6 w-6 text-primary" />,
      title: "Flexible Payment",
      description: "Pay with multiple credit cards",
    },
  ];

  return (
    <section className="py-12 bg-white border-t border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
