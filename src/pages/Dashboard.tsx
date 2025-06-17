import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AddAppBlockDialog } from "@/components/AddAppBlockDialog";
import ScheduleBlockDialog from "@/components/ScheduleBlockDialog";
import AnalyticsView from "@/components/AnalyticsView";
import AppLayout from "@/components/AppLayout";
import StatsOverview from "@/components/dashboard/StatsOverview";
import FocusSession from "@/components/dashboard/FocusSession";
import QuickActions from "@/components/dashboard/QuickActions";
import AppManagement from "@/components/dashboard/AppManagement";
import NativeStatus from "@/components/dashboard/NativeStatus";
import { useFocusSession } from "@/hooks/useFocusSession";
import { useAppBlocks } from "@/hooks/useAppBlocks";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { activeSession, focusLogs, handleStartFocus, endSession, triggerTestNotification } = useFocusSession();
  const { blockedApps, availableBlocks, toggleAppBlock, handleAddBlock } = useAppBlocks();
  
  // Dialog states
  const [addAppBlockOpen, setAddAppBlockOpen] = useState(false);
  const [scheduleBlockOpen, setScheduleBlockOpen] = useState(false);
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  // Mock data for schedules
  const [schedules, setSchedules] = useState([]);

  const handleScheduleBlock = (newSchedule: any) => {
    setSchedules(prev => [...prev, newSchedule]);
  };

  const handleAddApp = (app: { name: string; packageName?: string }) => {
    // Handle adding a new app block
    console.log('Adding app:', app);
  };

  return (
    <AppLayout 
      availableBlocks={availableBlocks} 
      onStartFocus={handleStartFocus}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Focus Dashboard</h1>
        <div className="space-x-2">
          <Button onClick={() => setAddAppBlockOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add New Block
          </Button>
          <Button variant="outline" onClick={() => setScheduleBlockOpen(true)}>
            Schedule Block
          </Button>
        </div>
      </div>

      <StatsOverview blockedAppsCount={blockedApps.filter(app => app.blocked).length} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Session */}
        <div className="lg:col-span-2">
          <FocusSession 
            activeSession={activeSession} 
            onEndSession={endSession}
            onTestNotification={triggerTestNotification}
          />
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <QuickActions
            onAddAppBlock={() => setAddAppBlockOpen(true)}
            onScheduleBlock={() => setScheduleBlockOpen(true)}
            onViewAnalytics={() => setAnalyticsOpen(true)}
          />
          
          <NativeStatus />
        </div>
      </div>

      {/* App Management */}
      <div className="mt-6">
        <AppManagement 
          blockedApps={blockedApps}
          onToggleAppBlock={toggleAppBlock}
        />
      </div>

      {/* Dialogs */}
      <AddAppBlockDialog
        open={addAppBlockOpen}
        onOpenChange={setAddAppBlockOpen}
        onAddApp={handleAddApp}
      />

      <ScheduleBlockDialog
        open={scheduleBlockOpen}
        onOpenChange={setScheduleBlockOpen}
        onScheduleBlock={handleScheduleBlock}
        availableBlocks={availableBlocks}
      />

      <Dialog open={analyticsOpen} onOpenChange={setAnalyticsOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Analytics Dashboard</DialogTitle>
          </DialogHeader>
          <AnalyticsView 
            focusLogs={focusLogs}
            schedules={schedules}
            blocks={availableBlocks}
          />
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
};

export default Dashboard;
