import { Button } from "@/components/ui/button";
import { Wallet, ShoppingCart, LayoutDashboard } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-50 border-b border-border/50 bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow-primary">
            <Wallet className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-gradient">SwapCart</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
            Home
          </Link>
          <Link to="/shop" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
            Demo Store
          </Link>
          <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/shop">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              <LayoutDashboard className="w-4 h-4" />
              Merchant Login
            </Button>
          </Link>
          <Link to="/shop">
            <Button variant="hero" size="sm">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
