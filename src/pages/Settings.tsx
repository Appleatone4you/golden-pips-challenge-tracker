
import Navigation from "@/components/layout/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTradeStore } from "@/lib/store";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const { initialCapital, initializeChallenge, resetChallenge } = useTradeStore();
  const [newCapital, setNewCapital] = useState(initialCapital.toString());
  const { toast } = useToast();

  const handleInitialize = () => {
    const capital = parseFloat(newCapital);
    if (isNaN(capital) || capital <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }
    initializeChallenge(capital);
    toast({
      title: "Challenge Initialized",
      description: `Starting capital set to $${capital.toLocaleString()}`,
    });
  };

  const handleReset = () => {
    resetChallenge();
    toast({
      title: "Challenge Reset",
      description: "All progress has been reset to initial values",
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      <header className="glass-card p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground">Configure your challenge parameters</p>
      </header>

      <Navigation />

      <Card className="glass-card p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Initial Capital</h3>
            <p className="text-sm text-muted-foreground">Set your starting capital for the challenge</p>
            <div className="flex gap-4">
              <Input
                type="number"
                value={newCapital}
                onChange={(e) => setNewCapital(e.target.value)}
                className="max-w-[200px]"
              />
              <Button onClick={handleInitialize}>Update Capital</Button>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Reset Challenge</h3>
            <p className="text-sm text-muted-foreground">Reset all progress to initial values</p>
            <Button variant="destructive" onClick={handleReset}>
              Reset Challenge
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Settings;
