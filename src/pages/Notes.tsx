
import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ChevronUp, Edit, MessageSquare } from "lucide-react";
import { useTradeStore } from "@/lib/store";
import { format } from "date-fns";

interface TradeNote {
  tradeId: string;
  position: string;
  comment: string;
  isCommentVisible: boolean;
}

const Notes = () => {
  const { trades } = useTradeStore();
  const [tradeNotes, setTradeNotes] = useState<Record<string, TradeNote>>({});
  const [editingId, setEditingId] = useState<string | null>(null);
  const [position, setPosition] = useState("");
  const [comment, setComment] = useState("");
  const { toast } = useToast();

  const handleAddNote = (tradeId: string) => {
    if (!position.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter the position details",
        variant: "destructive",
      });
      return;
    }

    setTradeNotes({
      ...tradeNotes,
      [tradeId]: {
        tradeId,
        position: position.trim(),
        comment: comment.trim(),
        isCommentVisible: false,
      },
    });
    
    setPosition("");
    setComment("");
    setEditingId(null);
    
    toast({
      title: "Trade Note Added",
      description: "Your trading note has been saved",
    });
  };

  const toggleComment = (tradeId: string) => {
    if (tradeNotes[tradeId]) {
      setTradeNotes({
        ...tradeNotes,
        [tradeId]: {
          ...tradeNotes[tradeId],
          isCommentVisible: !tradeNotes[tradeId].isCommentVisible,
        },
      });
    }
  };

  const handleUpdatePosition = (tradeId: string, newPosition: string) => {
    if (!newPosition.trim()) {
      toast({
        title: "Invalid Position",
        description: "Position cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setTradeNotes({
      ...tradeNotes,
      [tradeId]: {
        ...tradeNotes[tradeId],
        position: newPosition.trim(),
      },
    });
    setEditingId(null);
    
    toast({
      title: "Position Updated",
      description: "Your trade position has been updated",
    });
  };

  return (
    <div className="min-h-screen p-4 md:p-6 space-y-6">
      <header className="glass-card p-6 rounded-lg mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
          Trading Notes
        </h1>
        <p className="text-muted-foreground">Add notes to your trades</p>
      </header>

      <Navigation />

      <div className="space-y-4">
        {trades.map((trade) => (
          <Card key={trade.id} className="glass-card p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1 flex-1">
                  <p className="text-sm text-muted-foreground">
                    {format(trade.date, "MMM dd, yyyy HH:mm")}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${
                      trade.profitLoss > 0 ? "text-trading-profit" : "text-trading-loss"
                    }`}>
                      {trade.profitLoss > 0 ? "+" : ""}{trade.profitLoss.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      XAUUSD (Gold) • Level {trade.level}
                    </span>
                  </div>
                  {editingId === trade.id ? (
                    <div className="flex-1 flex gap-2 mt-2">
                      <Input
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        placeholder="Add position details"
                      />
                      <Button 
                        size="sm"
                        onClick={() => handleAddNote(trade.id)}
                      >
                        Save
                      </Button>
                    </div>
                  ) : tradeNotes[trade.id] ? (
                    <div className="flex items-center gap-2 mt-2">
                      <span>{tradeNotes[trade.id].position}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setPosition(tradeNotes[trade.id].position);
                          setEditingId(trade.id);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-2"
                      onClick={() => {
                        setPosition("");
                        setEditingId(trade.id);
                      }}
                    >
                      Add Position Details
                    </Button>
                  )}
                </div>
                {tradeNotes[trade.id] && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleComment(trade.id)}
                  >
                    {tradeNotes[trade.id].isCommentVisible ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <MessageSquare className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
              
              {editingId === trade.id && (
                <Textarea
                  placeholder="Add your trade analysis and insights..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                />
              )}
              
              {tradeNotes[trade.id]?.isCommentVisible && tradeNotes[trade.id]?.comment && (
                <p className="text-sm whitespace-pre-wrap border-t pt-4 mt-4">
                  {tradeNotes[trade.id].comment}
                </p>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notes;
