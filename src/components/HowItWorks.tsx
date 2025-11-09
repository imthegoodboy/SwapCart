import { Card } from "@/components/ui/card";
import { ShoppingBag, Coins, Repeat2, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: ShoppingBag,
    step: "1",
    title: "Customer Shops",
    description: "Browse products and add items to cart just like any e-commerce site",
  },
  {
    icon: Coins,
    step: "2",
    title: "Select Crypto",
    description: "Choose from 100+ cryptocurrencies to pay with at checkout",
  },
  {
    icon: Repeat2,
    step: "3",
    title: "Auto-Convert",
    description: "Payment instantly swaps to merchant's preferred stablecoin via SideShift",
  },
  {
    icon: CheckCircle,
    step: "4",
    title: "Confirmed",
    description: "Both parties receive instant confirmation and order proceeds",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How <span className="text-gradient">SwapCart</span> Works
          </h2>
          <p className="text-xl text-muted-foreground">
            Four simple steps to seamless crypto payments
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-6 bg-card border-border hover:border-primary/50 transition-smooth h-full">
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow-primary font-bold text-lg">
                  {step.step}
                </div>
                <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center mb-4 mt-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-primary to-transparent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
