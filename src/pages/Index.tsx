
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Users, Workflow, Activity, Settings } from "lucide-react";
import DashboardStats from "@/components/DashboardStats";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import WorkflowManager from "@/components/WorkflowManager";
import UserManager from "@/components/UserManager";
import ExecutionMonitor from "@/components/ExecutionMonitor";
import SettingsPage from "@/components/SettingsPage";
import { SettingsProvider } from "@/contexts/SettingsContext";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <SettingsProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">
              N8N Management Dashboard
            </h1>
            <p className="text-slate-400 text-lg">
              Comprehensive workflow automation management and analytics platform
            </p>
          </div>

          {/* Main Navigation */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 bg-slate-800/50 border border-slate-700">
              <TabsTrigger value="dashboard" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="analytics" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
                <Activity className="w-4 h-4" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="workflows" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
                <Workflow className="w-4 h-4" />
                Workflows
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
                <Users className="w-4 h-4" />
                Users
              </TabsTrigger>
              <TabsTrigger value="executions" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
                <Activity className="w-4 h-4" />
                Executions
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2 data-[state=active]:bg-slate-700 data-[state=active]:text-white">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            <div className="mt-8">
              <TabsContent value="dashboard" className="space-y-6">
                <DashboardStats />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <AnalyticsDashboard />
              </TabsContent>

              <TabsContent value="workflows" className="space-y-6">
                <WorkflowManager />
              </TabsContent>

              <TabsContent value="users" className="space-y-6">
                <UserManager />
              </TabsContent>

              <TabsContent value="executions" className="space-y-6">
                <ExecutionMonitor />
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <SettingsPage />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </SettingsProvider>
  );
};

export default Index;
