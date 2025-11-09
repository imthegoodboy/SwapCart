import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { DollarSign, TrendingUp, ShoppingBag, Repeat } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    avgOrder: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    fetchOrders();
    
    // Subscribe to realtime updates
    const channel = supabase
      .channel('orders-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders'
        },
        () => {
          fetchOrders(); // Refresh orders when changes occur
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);

    if (data && !error) {
      setOrders(data);
      
      // Calculate stats
      const total = data.reduce((sum, order) => sum + parseFloat(order.received_amount.toString()), 0);
      const pending = data.filter(o => o.status === 'pending').length;
      
      setStats({
        totalRevenue: total,
        totalOrders: data.length,
        avgOrder: data.length > 0 ? total / data.length : 0,
        pendingOrders: pending,
      });
    }
  };

  const statsDisplay = [
    { label: "Total Revenue", value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, change: "+12.5%" },
    { label: "Transactions", value: stats.totalOrders.toString(), icon: ShoppingBag, change: "+8.2%" },
    { label: "Avg. Conversion", value: `$${stats.avgOrder.toFixed(2)}`, icon: TrendingUp, change: "+3.1%" },
    { label: "Pending Orders", value: stats.pendingOrders.toString(), icon: Repeat, change: "" },
  ];
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-12 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">
              Merchant <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-muted-foreground">Track your crypto payment performance</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsDisplay.map((stat, index) => (
              <Card key={index} className="p-6 bg-card border-border hover:border-primary/50 transition-smooth">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow-primary">
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  {stat.change && (
                    <span className="text-xs text-green-500 font-medium">{stat.change}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </Card>
            ))}
          </div>

          {/* Recent Orders */}
          <Card className="p-6 bg-card border-border">
            <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Paid In</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Received In</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-muted-foreground">
                        No orders yet. Start selling to see transactions here!
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="border-b border-border/50 hover:bg-secondary/20 transition-smooth">
                        <td className="py-4 px-4">
                          <span className="font-mono text-sm">#{order.id.substring(0, 8)}</span>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="font-mono">{order.payment_token}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline" className="font-mono">{order.received_token}</Badge>
                        </td>
                        <td className="py-4 px-4">
                          <span className="font-semibold">${parseFloat(order.received_amount).toFixed(2)}</span>
                        </td>
                        <td className="py-4 px-4">
                          {order.status === "completed" ? (
                            <Badge className="bg-green-500/20 text-green-500 hover:bg-green-500/30">
                              ✓ Completed
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">
                              ⏳ Pending
                            </Badge>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
