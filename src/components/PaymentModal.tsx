import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import AIAssistant from "./AIAssistant";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id?: string;
    name: string;
    price: number;
  };
}

const cryptocurrencies = [
  { symbol: "BTC", name: "Bitcoin", icon: "₿", color: "text-orange-500" },
  { symbol: "ETH", name: "Ethereum", icon: "Ξ", color: "text-blue-500" },
  { symbol: "SOL", name: "Solana", icon: "◎", color: "text-purple-500" },
  { symbol: "USDC", name: "USD Coin", icon: "$", color: "text-green-500" },
  { symbol: "MATIC", name: "Polygon", icon: "⬡", color: "text-purple-600" },
  { symbol: "DOGE", name: "Dogecoin", icon: "Ð", color: "text-yellow-500" },
];

const PaymentModal = ({ isOpen, onClose, product }: PaymentModalProps) => {
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const { toast } = useToast();

  const handlePayment = async () => {
    console.log('handlePayment called', { selectedCrypto, productId: product.id });
    
    if (!selectedCrypto) {
      toast({
        title: "Select a payment token",
        description: "Please choose a cryptocurrency to pay with.",
        variant: "destructive",
      });
      return;
    }
    
    if (!product.id) {
      console.error('Product has no ID:', product);
      toast({
        title: "Error",
        description: "Invalid product. Please try again.",
        variant: "destructive",
      });
      return;
    }
    
    setProcessing(true);
    
    try {
      console.log('Invoking create-order function...');
      const { data, error } = await supabase.functions.invoke('create-order', {
        body: {
          productId: product.id,
          paymentToken: selectedCrypto,
          paymentAmount: getConversionAmount(selectedCrypto)
        }
      });

      console.log('Create order response:', { data, error });

      if (error) {
        console.error('Order creation error:', error);
        throw error;
      }

      setProcessing(false);
      setConfirmed(true);
      setTransactionHash(data.transactionHash);
      
      toast({
        title: "Payment Successful!",
        description: `Your payment in ${selectedCrypto} has been confirmed and converted to USDT.`,
      });

      setTimeout(() => {
        onClose();
        setConfirmed(false);
        setSelectedCrypto(null);
      }, 3000);
    } catch (error: any) {
      setProcessing(false);
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getConversionAmount = (crypto: string) => {
    const rates: Record<string, number> = {
      BTC: 0.00058,
      ETH: 0.0094,
      SOL: 0.37,
      USDC: product.price,
      MATIC: 35.2,
      DOGE: 285,
    };
    return rates[crypto] || 0;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {confirmed ? "Payment Confirmed!" : "Pay with Crypto"}
          </DialogTitle>
        </DialogHeader>

        {confirmed ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
            <div>
              <p className="text-lg font-semibold">Transaction Complete!</p>
              <p className="text-sm text-muted-foreground mt-2">
                Order #{Math.floor(Math.random() * 10000)}
              </p>
              <p className="text-xs text-muted-foreground mt-1 font-mono">
                Tx: {transactionHash.substring(0, 16)}...
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="p-4 rounded-lg bg-secondary/50 border border-border">
              <p className="text-sm text-muted-foreground">Purchasing</p>
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-2xl font-bold text-gradient mt-2">${product.price}</p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium">Select Payment Token</p>
                <AIAssistant productPrice={product.price} onSelectToken={setSelectedCrypto} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                {cryptocurrencies.map((crypto) => (
                  <Card
                    key={crypto.symbol}
                    className={`p-4 cursor-pointer transition-smooth hover:border-primary/50 ${
                      selectedCrypto === crypto.symbol
                        ? "border-primary shadow-glow-primary bg-primary/5"
                        : "border-border"
                    }`}
                    onClick={() => {
                      console.log('Crypto selected:', crypto.symbol);
                      setSelectedCrypto(crypto.symbol);
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-2xl ${crypto.color}`}>{crypto.icon}</span>
                      <div>
                        <p className="font-semibold text-sm">{crypto.symbol}</p>
                        <p className="text-xs text-muted-foreground">{crypto.name}</p>
                      </div>
                    </div>
                    {selectedCrypto === crypto.symbol && (
                      <p className="text-xs text-primary font-medium mt-1">
                        ≈ {getConversionAmount(crypto.symbol)} {crypto.symbol}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </div>

            {selectedCrypto && (
              <div className="p-4 rounded-lg bg-muted/30 border border-border text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">You pay:</span>
                  <span className="font-medium">
                    {getConversionAmount(selectedCrypto)} {selectedCrypto}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Merchant receives:</span>
                  <span className="font-medium">${product.price} USDT</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Rate locked for:</span>
                  <span className="text-primary">5 minutes</span>
                </div>
              </div>
            )}

            <Button
              variant="hero"
              className="w-full"
              size="lg"
              onClick={handlePayment}
              disabled={!selectedCrypto || processing}
            >
              {processing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing Payment...
                </>
              ) : (
                "Confirm Payment"
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
