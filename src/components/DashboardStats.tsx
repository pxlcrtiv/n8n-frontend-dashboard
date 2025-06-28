
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Users, Workflow, AlertTriangle, CheckCircle2, Clock, TrendingUp } from "lucide-react";

const DashboardStats = () => {
  const stats = [
    {
      title: "Active Workflows",
      value: "12",
      change: "+2 this week",
      icon: Workflow,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      title: "Total Users",
      value: "48",
      change: "+5 this month",
      icon: Users,
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      title: "Executions Today",
      value: "234",
      change: "+18% vs yesterday",
      icon: Activity,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      title: "Success Rate",
      value: "97.2%",
      change: "+0.5% this week",
      icon: TrendingUp,
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10"
    }
  ];

  const recentExecutions = [
    { id: "exec_001", workflow: "Data Processing Pipeline", status: "success", duration: "2.3s", client: "Acme Corp" },
    { id: "exec_002", workflow: "Report Generation", status: "running", duration: "45s", client: "TechFlow Inc" },
    { id: "exec_003", workflow: "Email Automation", status: "success", duration: "1.1s", client: "StartupXYZ" },
    { id: "exec_004", workflow: "Data Validation", status: "error", duration: "12s", client: "Enterprise Ltd" },
    { id: "exec_005", workflow: "File Processing", status: "success", duration: "8.7s", client: "DataCorp" }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case "running":
        return <Clock className="w-4 h-4 text-blue-400 animate-spin" />;
      case "error":
        return <AlertTriangle className="w-4 h-4 text-red-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      success: "bg-green-500/10 text-green-400 border-green-500/20",
      running: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      error: "bg-red-500/10 text-red-400 border-red-500/20"
    };
    return variants[status as keyof typeof variants] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">{stat.title}</CardTitle>
                <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                  <IconComponent className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                <p className="text-xs text-slate-400">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Executions */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Executions</CardTitle>
          <CardDescription className="text-slate-400">
            Latest workflow executions across all clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentExecutions.map((execution) => (
              <div key={execution.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
                <div className="flex items-center space-x-4">
                  {getStatusIcon(execution.status)}
                  <div>
                    <p className="font-medium text-white">{execution.workflow}</p>
                    <p className="text-sm text-slate-400">{execution.client}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-400">{execution.duration}</span>
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
