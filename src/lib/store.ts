
import { create } from "zustand";
import { TradeState, TradeLevel } from "./types";

const calculateInitialLevels = (initialCapital: number): TradeLevel[] => {
  const levels: TradeLevel[] = [];
  let currentBalance = initialCapital;

  for (let i = 1; i <= 30; i++) {
    const powerFactor = 1 + (i * 0.1);
    const targetProfit = currentBalance * (0.3 * powerFactor);
    
    levels.push({
      level: i,
      openingBalance: currentBalance,
      targetProfit,
      runningBalance: currentBalance + targetProfit,
      status: i === 1 ? "current" : "pending",
    } as TradeLevel);

    currentBalance += targetProfit;
  }

  return levels;
};

interface TradeStore extends TradeState {
  initializeChallenge: (initialCapital: number) => void;
  recordTrade: (profitLoss: number) => void;
  resetChallenge: () => void;
}

export const useTradeStore = create<TradeStore>((set, get) => ({
  currentLevel: 1,
  initialCapital: 10000,
  currentCapital: 10000,
  levels: calculateInitialLevels(10000),
  trades: [],

  initializeChallenge: (initialCapital: number) => {
    set({
      currentLevel: 1,
      initialCapital,
      currentCapital: initialCapital,
      levels: calculateInitialLevels(initialCapital),
      trades: [],
    });
  },

  recordTrade: (profitLoss: number) => {
    const state = get();
    const newBalance = state.currentCapital + profitLoss;
    const currentLevel = state.levels[state.currentLevel - 1];
    
    const newTrade = {
      id: Date.now().toString(),
      date: new Date(),
      level: state.currentLevel,
      lotSize: currentLevel.targetProfit / 200,
      profitLoss,
      balance: newBalance,
    };

    let newCurrentLevel = profitLoss > 0 
      ? Math.min(state.currentLevel + 1, 30)
      : Math.max(1, state.currentLevel - 1);

    const updatedLevels = state.levels.map(level => ({
      ...level,
      status: 
        level.level < newCurrentLevel ? "completed" as const :
        level.level === newCurrentLevel ? "current" as const : 
        "pending" as const
    }));

    set({
      currentLevel: newCurrentLevel,
      currentCapital: newBalance,
      levels: updatedLevels,
      trades: [...state.trades, newTrade],
    });
  },

  resetChallenge: () => {
    const state = get();
    set({
      currentLevel: 1,
      currentCapital: state.initialCapital,
      levels: calculateInitialLevels(state.initialCapital),
      trades: [],
    });
  },
}));
