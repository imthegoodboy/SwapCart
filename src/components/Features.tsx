import { Card } from "@/components/ui/card";
import { Wallet, Repeat, LineChart, Lock, Globe, Sparkles } from "lucide-react";

const features = [
  {
    icon: Wallet,
    title: "Multi-Currency Support",
    description: "Accept BTC, ETH, SOL, USDC, DOGE and 100+ cryptocurrencies seamlessly",
  },
  {
    icon: Repeat,
    title: "Auto-Conversion",
    description: "Instant swap to your preferred stablecoin using SideShift Pay API",
  },
  {
    icon: LineChart,
    title: "Real-Time Analytics",
    description: "Track conversions, transaction volumes, and revenue in one dashboard",
  },
  {
    icon: Lock,
    title: "Secure & Trustless",
    description: "Non-custodial payments with military-grade encryption",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Accept payments from anywhere in the world, 24/7",
  },
  {
    icon: Sparkles,
    title: "AI Checkout Assistant",
    description: "Smart recommendations to optimize gas fees and payment routes",
  },
];

const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to Accept <span className="text-gradient">Crypto Payments</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Built for e-commerce, powered by cutting-edge DeFi technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 bg-card/50 border-border/50 hover:border-primary/50 transition-smooth hover:shadow-glow-primary backdrop-blur-sm group"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth shadow-glow-primary">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
