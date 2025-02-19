
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BarChart2, Settings, FileText, List, LineChart, LayoutDashboard } from "lucide-react";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState("trade");

  const navItems = [
    { id: "trade", label: "Trade", icon: LayoutDashboard },
    { id: "levels", label: "Levels", icon: List },
    { id: "analytics", label: "Analytics", icon: BarChart2 },
    { id: "notes", label: "Notes", icon: FileText },
    { id: "log", label: "Trade Log", icon: LineChart },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <nav className="glass-card p-4 rounded-lg mb-6">
      <div className="flex flex-wrap gap-2 justify-center md:justify-start">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              className={cn(
                "flex items-center gap-2 transition-all",
                activeTab === item.id
                  ? "bg-primary/10 text-primary hover:bg-primary/20"
                  : "hover:bg-secondary"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden md:inline">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default Navigation;
