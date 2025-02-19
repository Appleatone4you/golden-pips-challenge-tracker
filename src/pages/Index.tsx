
import Navigation from "@/components/layout/Navigation";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Index = () => {
  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      <header className="glass-card p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          20 Pips Challenge
        </h1>
        <p className="text-muted-foreground">Track your trading progress</p>
      </header>

      <Navigation />

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="glass-card p-6 col-span-full">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Challenge Progress</h3>
              <span className="text-primary font-semibold">Level 1/30</span>
            </div>
            <Progress value={3.33} className="h-2 bg-secondary" />
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-medium mb-4">Current Capital</h3>
          <p className="text-3xl font-bold text-primary">$10,000.00</p>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-medium mb-4">Target Profit</h3>
          <p className="text-2xl font-bold text-trading-profit">+$3,000.00</p>
          <p className="text-sm text-muted-foreground mt-1">30% of current capital</p>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-medium mb-4">Maximum Loss</h3>
          <p className="text-2xl font-bold text-trading-loss">-$3,000.00</p>
          <p className="text-sm text-muted-foreground mt-1">Equal to target profit at Level 1</p>
        </Card>
      </main>
    </div>
  );
};

export default Index;
