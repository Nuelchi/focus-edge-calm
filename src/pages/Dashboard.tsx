
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddAppBlockDialog from "@/components/AddAppBlockDialog";
import ScheduleBlockDialog from "@/components/ScheduleBlockDialog";
import AnalyticsView from "@/components/AnalyticsView";
import AppLayout from "@/components/AppLayout";
import StatsOverview from "@/components/dashboard/StatsOverview";
import FocusSession from "@/components/dashboard/FocusSession";
import QuickActions from "@/components/dashboard/QuickActions";
import AppManagement from "@/components/dashboard/AppManagement";
import { useFocusSession } from "@/hooks/useFocusSession";
import { useAppBlocks } from "@/hooks/useAppBlocks";

const Dashboard = () => {
  const { activeSession, focusLogs, handleStartFocus, endSession } = useFocusSession();
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

  return (
    <AppLayout 
      availableBlocks={availableBlocks} 
      onStartFocus={handleStartFocus}
    >
      <StatsOverview blockedAppsCount={blockedApps.filter(app => app.blocked).length} />

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Active Session */}
        <div className="lg:col-span-2">
          <FocusSession 
            activeSession={activeSession} 
            onEndSession={endSession}
          />
        </div>

        {/* Quick Actions */}
        <QuickActions
          onAddAppBlock={() => setAddAppBlockOpen(true)}
          onScheduleBlock={() => setScheduleBlockOpen(true)}
          onViewAnalytics={() => setAnalyticsOpen(true)}
        />
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
        onAddBlock={handleAddBlock}
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
