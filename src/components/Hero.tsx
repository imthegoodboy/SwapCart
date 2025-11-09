import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-crypto.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Cryptocurrency payment technology"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-primary/20 backdrop-blur-sm">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Powered by SideShift Pay API</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Pay in <span className="text-gradient">Any Crypto</span><br />
            Get Paid in <span className="text-gradient">Your Favorite</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            The first AI-powered crypto payment gateway that lets customers pay with any cryptocurrency 
            while merchants receive their preferred stablecoin — instantly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/dashboard">
              <Button variant="hero" size="lg" className="gap-2">
                Start Accepting Crypto
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline" size="lg">
                View Demo Store
              </Button>
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="p-6 rounded-xl bg-card/30 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-smooth">
              <Shield className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Zero Volatility Risk</h3>
              <p className="text-sm text-muted-foreground">
                Automatic conversion to your preferred stablecoin eliminates price fluctuation worries
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card/30 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-smooth">
              <Zap className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Instant Settlement</h3>
              <p className="text-sm text-muted-foreground">
                Payments processed and converted in seconds, not days
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card/30 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-smooth">
              <TrendingUp className="w-8 h-8 text-primary mb-3 mx-auto" />
              <h3 className="font-semibold mb-2">Accept 100+ Coins</h3>
              <p className="text-sm text-muted-foreground">
                BTC, ETH, SOL, DOGE and more — your customers choose their preferred payment method
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
