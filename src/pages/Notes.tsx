
import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface Note {
  id: string;
  content: string;
  date: Date;
}

const Notes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState("");
  const { toast } = useToast();

  const handleAddNote = () => {
    if (!newNote.trim()) {
      toast({
        title: "Empty Note",
        description: "Please enter some content for your note",
        variant: "destructive",
      });
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      content: newNote.trim(),
      date: new Date(),
    };

    setNotes([note, ...notes]);
    setNewNote("");
    
    toast({
      title: "Note Added",
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
          <Textarea
            placeholder="Write your trading note here..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={handleAddNote}>Add Note</Button>
        </div>
      </Card>

      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id} className="glass-card p-6">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  {note.date.toLocaleDateString()} {note.date.toLocaleTimeString()}
                </p>
                <p className="whitespace-pre-wrap">{note.content}</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDeleteNote(note.id)}
                className="text-destructive hover:text-destructive"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Notes;
