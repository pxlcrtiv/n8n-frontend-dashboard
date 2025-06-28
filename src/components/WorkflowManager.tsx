
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Play, Pause, Edit, Trash2, Upload, Plus, Search, Filter, Users, Calendar, Activity } from "lucide-react";

const WorkflowManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const workflows = [
    {
      id: "wf_001",
      name: "Customer Data Processing",
      description: "Processes customer data from multiple sources and generates analytics reports",
      status: "active",
      assignedClients: 5,
      lastExecution: "2 hours ago",
      executionCount: 234,
      tags: ["data-processing", "analytics"],
      createdAt: "2024-01-15"
    },
    {
      id: "wf_002",
      name: "Email Marketing Automation",
      description: "Automated email campaigns based on user behavior and preferences",
      status: "active",
      assignedClients: 12,
      lastExecution: "15 minutes ago",
      executionCount: 1057,
      tags: ["marketing", "automation"],
      createdAt: "2024-01-20"
    },
    {
      id: "wf_003",
      name: "Financial Report Generation",
      description: "Generates monthly financial reports from accounting data",
      status: "paused",
      assignedClients: 3,
      lastExecution: "1 day ago",
      executionCount: 89,
      tags: ["finance", "reporting"],
      createdAt: "2024-02-01"
    },
    {
      id: "wf_004",
      name: "Inventory Management Sync",
      description: "Synchronizes inventory data across multiple platforms",
      status: "active",
      assignedClients: 8,
      lastExecution: "30 minutes ago",
      executionCount: 445,
      tags: ["inventory", "sync"],
      createdAt: "2024-01-10"
    }
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-500/10 text-green-400 border-green-500/20",
      paused: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
      error: "bg-red-500/10 text-red-400 border-red-500/20"
    };
    return variants[status as keyof typeof variants] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  const filteredWorkflows = workflows.filter(workflow => {
    const matchesSearch = workflow.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workflow.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || workflow.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Workflow Management</h2>
          <p className="text-slate-400">Manage and monitor your n8n workflows</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Upload className="w-4 h-4 mr-2" />
                Import Workflow
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700">
              <DialogHeader>
                <DialogTitle className="text-white">Import n8n Workflow</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Upload a workflow JSON file or connect via API
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="workflow-file" className="text-slate-300">Workflow File</Label>
                  <Input id="workflow-file" type="file" accept=".json" className="bg-slate-700 border-slate-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="workflow-name" className="text-slate-300">Workflow Name</Label>
                  <Input id="workflow-name" placeholder="Enter workflow name" className="bg-slate-700 border-slate-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="workflow-desc" className="text-slate-300">Description</Label>
                  <Textarea id="workflow-desc" placeholder="Describe what this workflow does" className="bg-slate-700 border-slate-600 text-white" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Import Workflow</Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
            <Plus className="w-4 h-4 mr-2" />
            Create New
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search workflows..."
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Workflows Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredWorkflows.map((workflow) => (
          <Card key={workflow.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-white">{workflow.name}</CardTitle>
                  <CardDescription className="text-slate-400">
                    {workflow.description}
                  </CardDescription>
                </div>
                <Badge className={getStatusBadge(workflow.status)}>
                  {workflow.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="flex items-center justify-center text-blue-400 mb-1">
                    <Users className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{workflow.assignedClients}</span>
                  </div>
                  <p className="text-xs text-slate-500">Clients</p>
                </div>
                <div>
                  <div className="flex items-center justify-center text-green-400 mb-1">
                    <Activity className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{workflow.executionCount}</span>
                  </div>
                  <p className="text-xs text-slate-500">Executions</p>
                </div>
                <div>
                  <div className="flex items-center justify-center text-purple-400 mb-1">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span className="text-sm font-medium">{workflow.lastExecution}</span>
                  </div>
                  <p className="text-xs text-slate-500">Last Run</p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {workflow.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs text-slate-400 border-slate-600">
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Play className="w-4 h-4 mr-2" />
                  Execute
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Pause className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WorkflowManager;
