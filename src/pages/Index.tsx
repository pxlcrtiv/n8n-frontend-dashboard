
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Users, Workflow, Settings, Play, Pause, AlertCircle, CheckCircle2, Clock, Upload } from "lucide-react";
import WorkflowManager from "@/components/WorkflowManager";
import UserManager from "@/components/UserManager";
import ExecutionMonitor from "@/components/ExecutionMonitor";
import DashboardStats from "@/components/DashboardStats";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 bg-slate-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
                <Workflow className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">n8n Workflow Manager</h1>
                <p className="text-sm text-slate-400">Enterprise Admin Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-green-400 border-green-400">
                <CheckCircle2 className="w-3 h-3 mr-1" />
                System Online
              </Badge>
              <Button variant="outline" size="sm" className="text-slate-300 border-slate-600 hover:bg-slate-800">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="workflows" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Workflow className="w-4 h-4 mr-2" />
              Workflows
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="executions" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
              <Clock className="w-4 h-4 mr-2" />
              Executions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <DashboardStats />
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
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
