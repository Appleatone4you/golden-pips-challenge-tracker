
import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ChevronDown, ChevronUp, Edit, MessageSquare } from "lucide-react";

interface Note {
  id: string;
  tradeType: "profit" | "loss";
  amount: number;
  position: string;
  comment: string;
  date: Date;
  isCommentVisible: boolean;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [amount, setAmount] = useState("");
  const [position, setPosition] = useState("");
  const [comment, setComment] = useState("");
  const [tradeType, setTradeType] = useState<"profit" | "loss">("profit");
  const [editingId, setEditingId] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAddNote = () => {
    if (!amount || !position.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter the trade amount and position",
        variant: "destructive",
      });
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      tradeType,
      amount: parseFloat(amount),
      position: position.trim(),
      comment: comment.trim(),
      date: new Date(),
      isCommentVisible: false,
    };

    setNotes([note, ...notes]);
    setAmount("");
    setPosition("");
    setComment("");
    setTradeType("profit");
    
    toast({
      title: "Trade Note Added",
      description: "Your trading note has been saved",
    });
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
    toast({
      title: "Note Deleted",
      description: "Your trading note has been removed",
    });
  };

  const toggleComment = (id: string) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isCommentVisible: !note.isCommentVisible } : note
    ));
  };

  const handleUpdatePosition = (id: string, newPosition: string) => {
    if (!newPosition.trim()) {
      toast({
        title: "Invalid Position",
        description: "Position cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setNotes(notes.map(note => 
      note.id === id ? { ...note, position: newPosition.trim() } : note
    ));
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
        <p className="text-muted-foreground">Keep track of your trading insights</p>
      </header>

      <Navigation />

      <Card className="glass-card p-6">
        <div className="space-y-4">
          <div className="flex gap-4">
            <Button
              variant={tradeType === "profit" ? "default" : "outline"}
              onClick={() => setTradeType("profit")}
              className="flex-1"
            >
              Profit
            </Button>
            <Button
              variant={tradeType === "loss" ? "destructive" : "outline"}
              onClick={() => setTradeType("loss")}
              className="flex-1"
            >
              Loss
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Input
              placeholder="Position (e.g., Long BTC/USD)"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
          </div>
          
          <Textarea
            placeholder="Add your trade analysis and insights..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleAddNote}>Add Trade Note</Button>
        </div>
      </Card>

      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id} className="glass-card p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div className="space-y-1 flex-1">
                  <p className="text-sm text-muted-foreground">
                    {note.date.toLocaleDateString()} {note.date.toLocaleTimeString()}
                  </p>
                  <div className="flex items-center gap-2">
                    <span className={`font-semibold ${
                      note.tradeType === "profit" ? "text-trading-profit" : "text-trading-loss"
                    }`}>
                      {note.tradeType === "profit" ? "+" : "-"}${Math.abs(note.amount).toFixed(2)}
                    </span>
                    {editingId === note.id ? (
                      <div className="flex-1 flex gap-2">
                        <Input
                          value={position}
                          onChange={(e) => setPosition(e.target.value)}
                          placeholder="Update position"
                        />
                        <Button 
                          size="sm"
                          onClick={() => handleUpdatePosition(note.id, position)}
                        >
                          Save
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span>{note.position}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setPosition(note.position);
                            setEditingId(note.id);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleComment(note.id)}
                  >
                    {note.isCommentVisible ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <MessageSquare className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    Delete
                  </Button>
                </div>
              </div>
              
              {note.isCommentVisible && note.comment && (
                <p className="text-sm whitespace-pre-wrap border-t pt-4 mt-4">
                  {note.comment}
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
