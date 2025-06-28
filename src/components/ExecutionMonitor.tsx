
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, RefreshCw, AlertCircle, CheckCircle2, Clock, Play, StopCircle, Eye, Download } from "lucide-react";

const ExecutionMonitor = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [autoRefresh, setAutoRefresh] = useState(true);

  const executions = [
    {
      id: "exec_001",
      workflowId: "wf_001",
      workflowName: "Customer Data Processing",
      status: "success",
      startTime: "2024-06-28 14:30:22",
      endTime: "2024-06-28 14:30:24",
      duration: "2.3s",
      client: "Acme Corp",
      triggeredBy: "sarah.johnson@acmecorp.com",
      inputSize: "1.2MB",
      outputSize: "847KB",
      steps: 8,
      completedSteps: 8,
      errorMessage: null
    },
    {
      id: "exec_002",
      workflowId: "wf_002",
      workflowName: "Email Marketing Automation",
      status: "running",
      startTime: "2024-06-28 14:31:15",
      endTime: null,
      duration: "45s",
      client: "TechFlow Inc",
      triggeredBy: "m.chen@techflow.com",
      inputSize: "524KB",
      outputSize: null,
      steps: 12,
      completedSteps: 7,
      errorMessage: null
    },
    {
      id: "exec_003",
      workflowId: "wf_003",
      workflowName: "Financial Report Generation",
      status: "error",
      startTime: "2024-06-28 14:25:10",
      endTime: "2024-06-28 14:25:22",
      duration: "12s",
      client: "Enterprise Ltd",
      triggeredBy: "d.wilson@enterprise.com",
      inputSize: "2.1MB",
      outputSize: null,
      steps: 15,
      completedSteps: 8,
      errorMessage: "Failed to connect to external API endpoint"
    },
    {
      id: "exec_004",
      workflowId: "wf_004",
      workflowName: "Inventory Management Sync",
      status: "success",
      startTime: "2024-06-28 14:20:45",
      endTime: "2024-06-28 14:20:53",
      duration: "8.7s",
      client: "DataCorp",
      triggeredBy: "lisa@datacorp.com",
      inputSize: "3.5MB",
      outputSize: "2.8MB",
      steps: 10,
      completedSteps: 10,
      errorMessage: null
    },
    {
      id: "exec_005",
      workflowId: "wf_001",
      workflowName: "Customer Data Processing",
      status: "queued",
      startTime: null,
      endTime: null,
      duration: null,
      client: "StartupXYZ",
      triggeredBy: "emily@startupxyz.com",
      inputSize: "890KB",
      outputSize: null,
      steps: 8,
      completedSteps: 0,
      errorMessage: null
    }
  ];

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

  const getProgressPercentage = (completed: number, total: number) => {
    return Math.round((completed / total) * 100);
  };

  const filteredExecutions = executions.filter(execution => {
    const matchesSearch = execution.workflowName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         execution.triggeredBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || execution.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Execution Monitor</h2>
          <p className="text-slate-400">Monitor workflow executions in real-time</p>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={`border-slate-600 text-slate-300 ${autoRefresh ? 'bg-blue-600/20 border-blue-500' : 'hover:bg-slate-800'}`}
            onClick={() => setAutoRefresh(!autoRefresh)}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${autoRefresh ? 'animate-spin' : ''}`} />
            Auto Refresh
          </Button>
          <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search executions, workflows, or clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 border-slate-700 text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="running">Running</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="queued">Queued</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Executions List */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Recent Executions</CardTitle>
          <CardDescription className="text-slate-400">
            Live monitoring of workflow executions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px]">
            <div className="space-y-4">
              {filteredExecutions.map((execution, index) => (
                <div key={execution.id}>
                  <div className="flex items-start justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
                    <div className="flex items-start space-x-4 flex-1">
                      {getStatusIcon(execution.status)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-white truncate">{execution.workflowName}</h4>
                          <Badge className={getStatusBadge(execution.status)}>
                            {execution.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-slate-400 mb-3">
                          <div>
                            <span className="text-slate-500">Client:</span>
                            <p className="text-white">{execution.client}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Triggered by:</span>
                            <p className="text-white truncate">{execution.triggeredBy}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Duration:</span>
                            <p className="text-white">{execution.duration || 'N/A'}</p>
                          </div>
                          <div>
                            <span className="text-slate-500">Input Size:</span>
                            <p className="text-white">{execution.inputSize}</p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        {execution.status === "running" && (
                          <div className="mb-3">
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                              <span>Progress</span>
                              <span>{execution.completedSteps}/{execution.steps} steps ({getProgressPercentage(execution.completedSteps, execution.steps)}%)</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${getProgressPercentage(execution.completedSteps, execution.steps)}%` }}
                              ></div>
                            </div>
                          </div>
                        )}

                        {/* Error Message */}
                        {execution.errorMessage && (
                          <div className="bg-red-500/10 border border-red-500/20 rounded p-2 text-red-400 text-sm">
                            {execution.errorMessage}
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <p className="text-xs text-slate-500">
                            Started: {execution.startTime || 'Not started'}
                            {execution.endTime && ` • Ended: ${execution.endTime}`}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2 ml-4">
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                        <Eye className="w-4 h-4" />
                      </Button>
                      {execution.status === "running" && (
                        <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10">
                          <StopCircle className="w-4 h-4" />
                        </Button>
                      )}
                      {execution.status === "error" && (
                        <Button size="sm" variant="outline" className="border-blue-600 text-blue-400 hover:bg-blue-600/10">
                          <Play className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  {index < filteredExecutions.length - 1 && <Separator className="bg-slate-700/50" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExecutionMonitor;
