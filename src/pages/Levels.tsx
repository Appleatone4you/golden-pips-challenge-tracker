
import Navigation from "@/components/layout/Navigation";
import { Card } from "@/components/ui/card";
import { useTradeStore } from "@/lib/store";
import { Check, Circle, Radio } from "lucide-react";

const Levels = () => {
  const { levels } = useTradeStore();

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      <header className="glass-card p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          Challenge Levels
        </h1>
        <p className="text-muted-foreground">Track your level progression</p>
      </header>

      <Navigation />

      <Card className="glass-card p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-border">
                <th className="p-3">Level</th>
                <th className="p-3">Opening Balance</th>
                <th className="p-3">Target Profit</th>
                <th className="p-3">Lot Size</th>
                <th className="p-3">Running Balance</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {levels.map((level) => (
                <tr key={level.level} className="border-b border-border/50">
                  <td className="p-3">Level {level.level}</td>
                  <td className="p-3">${level.openingBalance.toLocaleString()}</td>
                  <td className="p-3 text-trading-profit">+${level.targetProfit.toLocaleString()}</td>
                  <td className="p-3">{(level.targetProfit / 200).toFixed(2)}</td>
                  <td className="p-3">${level.runningBalance.toLocaleString()}</td>
                  <td className="p-3">
                    {level.status === "completed" && <Check className="w-4 h-4 text-trading-profit" />}
                    {level.status === "current" && <Radio className="w-4 h-4 text-primary" />}
                    {level.status === "pending" && <Circle className="w-4 h-4 text-muted-foreground" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Levels;
