
export interface TradeLevel {
  level: number;
  openingBalance: number;
  targetProfit: number;
  runningBalance: number;
  status: "completed" | "current" | "pending";
}

export interface TradeState {
  currentLevel: number;
  initialCapital: number;
  currentCapital: number;
  levels: TradeLevel[];
  trades: Trade[];
}

export interface Trade {
  id: string;
  date: Date;
  level: number;
  lotSize: number;
  profitLoss: number;
  balance: number;
}
