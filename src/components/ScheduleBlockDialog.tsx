
import { useState } from "react";
import { Calendar, Clock, Repeat } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ScheduleBlockDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableBlocks: any[];
  onScheduleBlock: (schedule: any) => void;
}

const weekDays = [
  { id: 'monday', name: 'Monday', short: 'Mon' },
  { id: 'tuesday', name: 'Tuesday', short: 'Tue' },
  { id: 'wednesday', name: 'Wednesday', short: 'Wed' },
  { id: 'thursday', name: 'Thursday', short: 'Thu' },
  { id: 'friday', name: 'Friday', short: 'Fri' },
  { id: 'saturday', name: 'Saturday', short: 'Sat' },
  { id: 'sunday', name: 'Sunday', short: 'Sun' }
];

const ScheduleBlockDialog = ({ open, onOpenChange, availableBlocks, onScheduleBlock }: ScheduleBlockDialogProps) => {
  const [selectedBlock, setSelectedBlock] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("17:00");
  const [isRecurring, setIsRecurring] = useState(true);
  const [scheduleTitle, setScheduleTitle] = useState("");
  const { toast } = useToast();

  const handleDayToggle = (dayId: string) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const handleCreateSchedule = () => {
    if (!selectedBlock) {
      toast({
        title: "No block selected",
        description: "Please select a block to schedule.",
        variant: "destructive"
      });
      return;
    }

    if (selectedDays.length === 0) {
      toast({
        title: "No days selected",
        description: "Please select at least one day.",
        variant: "destructive"
      });
      return;
    }

    const selectedBlockData = availableBlocks.find(b => b.id === selectedBlock);
    const title = scheduleTitle || `${selectedBlockData?.name} Schedule`;

    const newSchedule = {
      id: Date.now().toString(),
      title,
      blockId: selectedBlock,
      blockName: selectedBlockData?.name,
      days: selectedDays,
      startTime,
      endTime,
      isRecurring,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    onScheduleBlock(newSchedule);
    
    // Reset form
    setSelectedBlock("");
    setSelectedDays([]);
    setStartTime("09:00");
    setEndTime("17:00");
    setIsRecurring(true);
    setScheduleTitle("");
    
    toast({
      title: "Schedule created! 📅",
      description: `${title} has been scheduled successfully.`
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5" />
            <span>Schedule Block</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="scheduleTitle">Schedule Title (Optional)</Label>
            <Input
              id="scheduleTitle"
              placeholder="e.g., Work Hours Block, Study Time"
              value={scheduleTitle}
              onChange={(e) => setScheduleTitle(e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="block">Select Block</Label>
            <Select value={selectedBlock} onValueChange={setSelectedBlock}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a block to schedule" />
              </SelectTrigger>
              <SelectContent>
                {availableBlocks.map((block) => (
                  <SelectItem key={block.id} value={block.id}>
                    <div className="flex items-center space-x-2">
                      <span>{block.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {block.apps?.length || 0} apps, {block.domains?.length || 0} domains
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Days of the Week</Label>
            <div className="grid grid-cols-4 gap-2 mt-2">
              {weekDays.map((day) => (
                <Button
                  key={day.id}
                  variant={selectedDays.includes(day.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleDayToggle(day.id)}
                  className="text-xs"
                >
                  {day.short}
                </Button>
              ))}
            </div>
            {selectedDays.length > 0 && (
              <div className="mt-2">
                <Badge variant="secondary">
                  {selectedDays.length} day{selectedDays.length > 1 ? 's' : ''} selected
                </Badge>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Input
                id="startTime"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Input
                id="endTime"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="recurring"
                checked={isRecurring}
                onCheckedChange={setIsRecurring}
              />
              <Label htmlFor="recurring" className="flex items-center space-x-1">
                <Repeat className="h-4 w-4" />
                <span>Recurring Schedule</span>
              </Label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateSchedule} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Clock className="h-4 w-4 mr-2" />
              Create Schedule
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ScheduleBlockDialog;
