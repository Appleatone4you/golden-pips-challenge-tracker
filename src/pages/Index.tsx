
import Navigation from "@/components/layout/Navigation";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTradeStore } from "@/lib/store";

const Index = () => {
  const { toast } = useToast();
  const { currentLevel, currentCapital, levels, recordTrade } = useTradeStore();
  
  const currentLevelData = levels[currentLevel - 1];
  const progressPercentage = (currentLevel / 30) * 100;
  
  const handleTrade = (isProfit: boolean) => {
    const amount = isProfit ? currentLevelData.targetProfit : -currentLevelData.targetProfit;
    recordTrade(amount);
    
    toast({
      title: isProfit ? "Trade Won! 🎉" : "Trade Lost 😔",
      description: `${isProfit ? "Progressing" : "Returning"} to Level ${isProfit ? Math.min(currentLevel + 1, 30) : Math.max(1, currentLevel - 1)}`,
      variant: isProfit ? "default" : "destructive",
    });
  };

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
              <span className="text-primary font-semibold">Level {currentLevel}/30</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-secondary" />
          </div>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-medium mb-4">Current Capital</h3>
          <p className="text-3xl font-bold text-primary">
            ${currentCapital.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-medium mb-4">Target Profit</h3>
          <p className="text-2xl font-bold text-trading-profit">
            +${currentLevelData.targetProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {((currentLevelData.targetProfit / currentCapital) * 100).toFixed(1)}% of current capital
          </p>
        </Card>

        <Card className="glass-card p-6">
          <h3 className="text-lg font-medium mb-4">Maximum Loss</h3>
          <p className="text-2xl font-bold text-trading-loss">
            -${currentLevelData.targetProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-muted-foreground mt-1">Equal to target profit at Level {currentLevel}</p>
        </Card>

        <Card className="glass-card p-6 col-span-full">
          <h3 className="text-lg font-medium mb-4">Record Trade Result</h3>
          <div className="flex gap-4">
            <Button
              onClick={() => handleTrade(true)}
              className="flex-1 bg-trading-profit hover:bg-trading-profit/90"
            >
              Win Trade (+{currentLevelData.targetProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
            </Button>
            <Button
              onClick={() => handleTrade(false)}
              variant="destructive"
              className="flex-1"
            >
              Lose Trade (-{currentLevelData.targetProfit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })})
            </Button>
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;
