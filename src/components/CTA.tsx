import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 p-12 rounded-2xl bg-card/50 border border-primary/20 backdrop-blur-sm shadow-glow-primary">
          <Rocket className="w-16 h-16 text-primary mx-auto" />
          
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Accept <span className="text-gradient">Crypto Payments?</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join the future of e-commerce. Start accepting cryptocurrency payments today 
            with zero setup fees and instant settlement.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/dashboard">
              <Button variant="hero" size="lg" className="gap-2">
                Create Merchant Account
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/shop">
              <Button variant="outline" size="lg">
                Schedule a Demo
              </Button>
            </Link>
          </div>

          <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">$2M+</div>
              <div className="text-sm text-muted-foreground">Processed Volume</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Active Merchants</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gradient mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Supported Tokens</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
