
import Navigation from "@/components/layout/Navigation";
import { Card } from "@/components/ui/card";
import { useTradeStore } from "@/lib/store";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Analytics = () => {
  const { trades, currentCapital, initialCapital } = useTradeStore();

  // Calculate statistics
  const winningTrades = trades.filter(t => t.profitLoss > 0);
  const losingTrades = trades.filter(t => t.profitLoss <= 0);
  
  const winRate = trades.length > 0 
    ? (winningTrades.length / trades.length) * 100 
    : 0;

  const totalGrowth = ((currentCapital - initialCapital) / initialCapital) * 100;
  
  const totalProfits = winningTrades.reduce((sum, trade) => sum + trade.profitLoss, 0);
  const totalLosses = losingTrades.reduce((sum, trade) => sum + trade.profitLoss, 0);

  const chartData = trades.map((trade, index) => ({
    name: `Trade ${index + 1}`,
    balance: trade.balance,
  }));

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      <header className="glass-card p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          Analytics
        </h1>
        <p className="text-muted-foreground">Track your performance metrics</p>
      </header>

      <Navigation />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-card p-6">
          <h3 className="text-lg font-medium mb-4">Win Rate</h3>
          <p className="text-3xl font-bold text-primary">{winRate.toFixed(1)}%</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-muted-foreground">
              Winning Trades: <span className="text-trading-profit">{winningTrades.length}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Losing Trades: <span className="text-trading-loss">{losingTrades.length}</span>
            </p>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-medium mb-4">Total Growth</h3>
          <p className="text-3xl font-bold text-trading-profit">
            {totalGrowth > 0 ? "+" : ""}{totalGrowth.toFixed(1)}%
          </p>
          <div className="mt-2 space-y-1">
            <p className="text-sm text-muted-foreground">
              Initial Capital: <span className="font-medium">${initialCapital.toLocaleString()}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Current Capital: <span className="font-medium">${currentCapital.toLocaleString()}</span>
            </p>
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-medium mb-4">Profit & Loss</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">Total Profits</p>
              <p className="text-2xl font-bold text-trading-profit">
                +${totalProfits.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Losses</p>
              <p className="text-2xl font-bold text-trading-loss">
                ${totalLosses.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 col-span-full h-[400px]">
          <h3 className="text-lg font-medium mb-4">Balance History</h3>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="balance" 
                stroke="rgb(249, 115, 22)" 
                fill="rgba(249, 115, 22, 0.1)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
