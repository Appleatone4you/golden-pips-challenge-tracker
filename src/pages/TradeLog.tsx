
import Navigation from "@/components/layout/Navigation";
import { Card } from "@/components/ui/card";
import { useTradeStore } from "@/lib/store";
import { format } from "date-fns";

const TradeLog = () => {
  const { trades } = useTradeStore();

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      <header className="glass-card p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          Trade Log
        </h1>
        <p className="text-muted-foreground">Review your trading history</p>
      </header>

      <Navigation />

      <Card className="glass-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="p-3">Date</th>
                <th className="p-3">Level</th>
                <th className="p-3">Lot Size</th>
                <th className="p-3">Profit/Loss</th>
                <th className="p-3">Balance</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((trade) => (
                <tr key={trade.id} className="border-b border-border/50">
                  <td className="p-3">{format(trade.date, "MMM dd, yyyy HH:mm")}</td>
                  <td className="p-3">Level {trade.level}</td>
                  <td className="p-3">{trade.lotSize.toFixed(2)}</td>
                  <td className={`p-3 ${trade.profitLoss > 0 ? "text-trading-profit" : "text-trading-loss"}`}>
                    {trade.profitLoss > 0 ? "+" : ""}{trade.profitLoss.toLocaleString()}
                  </td>
                  <td className="p-3">${trade.balance.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default TradeLog;
