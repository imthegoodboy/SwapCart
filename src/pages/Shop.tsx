import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PaymentModal from "@/components/PaymentModal";
import { supabase } from "@/integrations/supabase/client";

const Shop = () => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products...');
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: true });
        
        if (error) {
          console.error('Error fetching products:', error);
          throw error;
        }
        
        console.log('Products fetched:', data);
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleBuy = (product: any) => {
    console.log('Buy button clicked for product:', product);
    if (!product.id) {
      console.error('Product has no ID!', product);
      return;
    }
    setSelectedProduct(product);
    setShowPayment(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              CryptoTees <span className="text-gradient">Demo Store</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Experience SwapCart checkout with any cryptocurrency
            </p>
          </div>

          {loading ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden bg-card border-border hover:border-primary/50 transition-smooth group">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={product.image_url} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                    />
                  </div>
                  <div className="p-4 space-y-3">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-bold text-gradient">${product.price}</span>
                      <Button 
                        variant="hero" 
                        size="sm"
                        onClick={() => handleBuy(product)}
                        className="gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {selectedProduct && (
        <PaymentModal 
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default Shop;
