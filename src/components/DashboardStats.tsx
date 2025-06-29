
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Activity, Users, Workflow, TrendingUp, Clock, CheckCircle2, AlertCircle, Play } from "lucide-react";
import { dataService, ExecutionData, StatsData } from "@/services/dataService";
import { toast } from "sonner";

const DashboardStats = () => {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recentExecutions, setRecentExecutions] = useState<ExecutionData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsData, executionsData] = await Promise.all([
        dataService.getStats(),
        dataService.getExecutions()
      ]);
      
      setStats(statsData);
      // Show only the 5 most recent executions
      setRecentExecutions(executionsData.slice(0, 5));
    } catch (error) {
      toast.error("Failed to load dashboard data");
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case "running":
        return <Clock className="w-4 h-4 text-blue-400 animate-pulse" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-400" />;
      case "queued":
        return <Clock className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "bg-green-500/10 text-green-400 border-green-500/20",
      running: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      error: "bg-red-500/10 text-red-400 border-red-500/20",
      queued: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
    };
    return variants[status as keyof typeof variants] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-white">Loading dashboard...</div>;
  }

  if (!stats) {
    return <div className="flex items-center justify-center h-64 text-red-400">Failed to load dashboard data</div>;
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Workflows</CardTitle>
            <Workflow className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalWorkflows}</div>
            <p className="text-xs text-slate-500">
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Active Executions</CardTitle>
            <Activity className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.activeExecutions}</div>
            <p className="text-xs text-slate-500">
              Currently running
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Total Users</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.totalUsers}</div>
            <p className="text-xs text-slate-500">
              +1 new this week
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-400">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.successRate}%</div>
            <p className="text-xs text-slate-500">
              +2.1% from last week
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Executions */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Recent Executions</CardTitle>
              <CardDescription className="text-slate-400">
                Latest workflow execution activity
              </CardDescription>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
              onClick={loadDashboardData}
            >
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExecutions.map((execution) => (
              <div key={execution.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-900/50 border border-slate-700/50">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(execution.status)}
                  <div>
                    <p className="font-medium text-white">{execution.workflowName}</p>
                    <p className="text-sm text-slate-400">{execution.client} • {execution.triggeredBy}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="text-sm text-white">{execution.duration || 'Running...'}</p>
                    <p className="text-xs text-slate-500">
                      {execution.startTime ? new Date(execution.startTime).toLocaleTimeString() : 'Queued'}
                    </p>
                  </div>
                  <Badge className={getStatusBadge(execution.status)}>
                    {execution.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardStats;
