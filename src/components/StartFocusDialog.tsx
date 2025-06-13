
import { useState } from "react";
import { Play, Target, Clock, Shield } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface StartFocusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBlocks: any[];
  onStartFocus: (session: any) => void;
}

const sessionTypes = [
  { id: "deep-work", name: "Deep Work", icon: "🎯", description: "Intensive focus session" },
  { id: "study", name: "Study", icon: "📚", description: "Learning and research" },
  { id: "creative", name: "Creative", icon: "🎨", description: "Creative and design work" },
  { id: "meeting", name: "Meeting Focus", icon: "👥", description: "Meeting preparation" },
  { id: "custom", name: "Custom", icon: "⚙️", description: "Custom focus session" }
];

const StartFocusDialog = ({ open, onOpenChange, availableBlocks, onStartFocus }: StartFocusDialogProps) => {
  const [selectedBlock, setSelectedBlock] = useState("");
  const [sessionType, setSessionType] = useState("deep-work");
  const [duration, setDuration] = useState(25);
  const [sessionTitle, setSessionTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [strictMode, setStrictMode] = useState(true);
  const { toast } = useToast();

  const handleStartSession = () => {
    if (!selectedBlock) {
      toast({
        title: "No block selected",
        description: "Please select a block to focus on.",
        variant: "destructive"
      });
      return;
    }

    const selectedBlockData = availableBlocks.find(b => b.id === selectedBlock);
    const selectedSessionType = sessionTypes.find(t => t.id === sessionType);
    const title = sessionTitle || `${selectedSessionType?.name} Session`;

    const newSession = {
      id: Date.now().toString(),
      title,
      blockId: selectedBlock,
      blockName: selectedBlockData?.name,
      sessionType: sessionType,
      duration: duration,
      remaining: duration * 60, // convert to seconds
      notes,
      strictMode,
      startedAt: new Date().toISOString(),
      status: "active"
    };

    onStartFocus(newSession);
    
    // Reset form
    setSelectedBlock("");
    setSessionType("deep-work");
    setDuration(25);
    setSessionTitle("");
    setNotes("");
    setStrictMode(true);
    
    toast({
      title: "Focus session started! 🎯",
      description: `${title} is now active. Stay focused!`
    });
    
    onOpenChange(false);
  };

  const selectedSessionType = sessionTypes.find(t => t.id === sessionType);
  const selectedBlockData = availableBlocks.find(b => b.id === selectedBlock);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Play className="h-5 w-5" />
            <span>Start Focus Session</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="sessionTitle">Session Title (Optional)</Label>
            <Input
              id="sessionTitle"
              placeholder="e.g., Morning Deep Work, Study Session"
              value={sessionTitle}
              onChange={(e) => setSessionTitle(e.target.value)}
            />
          </div>

          <div>
            <Label>Session Type</Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {sessionTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={sessionType === type.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSessionType(type.id)}
                  className="justify-start h-auto p-3"
                >
                  <div className="text-left">
                    <div className="flex items-center space-x-2">
                      <span>{type.icon}</span>
                      <span className="font-medium">{type.name}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="block">Block to Activate</Label>
            <Select value={selectedBlock} onValueChange={setSelectedBlock}>
              <SelectTrigger>
                <SelectValue placeholder="Choose what to block during focus" />
              </SelectTrigger>
              <SelectContent>
                {availableBlocks.map((block) => (
                  <SelectItem key={block.id} value={block.id}>
                    <div className="flex items-center justify-between w-full">
                      <span>{block.name}</span>
                      <div className="flex space-x-1 ml-2">
                        {block.apps?.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {block.apps.length} apps
                          </Badge>
                        )}
                        {block.domains?.length > 0 && (
                          <Badge variant="outline" className="text-xs">
                            {block.domains.length} sites
                          </Badge>
                        )}
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedBlockData && (
              <div className="mt-2 p-2 bg-gray-50 rounded text-sm">
                <p className="font-medium">Will block:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedBlockData.apps?.map((app: string) => (
                    <Badge key={app} variant="secondary" className="text-xs">{app}</Badge>
                  ))}
                  {selectedBlockData.domains?.map((domain: string) => (
                    <Badge key={domain} variant="outline" className="text-xs">{domain}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Select value={duration.toString()} onValueChange={(value) => setDuration(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="25">25 minutes (Pomodoro)</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                  <SelectItem value="90">1.5 hours</SelectItem>
                  <SelectItem value="120">2 hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                variant={strictMode ? "default" : "outline"}
                onClick={() => setStrictMode(!strictMode)}
                className="w-full"
              >
                <Shield className="h-4 w-4 mr-2" />
                {strictMode ? "Strict Mode ON" : "Strict Mode OFF"}
              </Button>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Session Notes (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="What do you want to accomplish in this session?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {strictMode && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center space-x-2 text-orange-800">
                <Shield className="h-4 w-4" />
                <span className="font-medium">Strict Mode Enabled</span>
              </div>
              <p className="text-sm text-orange-700 mt-1">
                You won't be able to end this session early. Choose your duration carefully!
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleStartSession} className="bg-gradient-to-r from-green-600 to-blue-600">
              <Target className="h-4 w-4 mr-2" />
              Start Focus Session
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StartFocusDialog;
