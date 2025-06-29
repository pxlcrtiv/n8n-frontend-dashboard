
// Central data service - replace these functions with n8n API calls when ready
export interface WorkflowData {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'paused' | 'error';
  assignedClients: number;
  lastExecution: string;
  executionCount: number;
  tags: string[];
  createdAt: string;
}

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  company: string;
  status: 'active' | 'inactive';
  lastLogin: string;
  workflows: number;
  avatar: string;
  joinedAt: string;
  mfaEnabled: boolean;
}

export interface ExecutionData {
  id: string;
  workflowId: string;
  workflowName: string;
  status: 'success' | 'running' | 'error' | 'queued';
  startTime: string | null;
  endTime: string | null;
  duration: string | null;
  client: string;
  triggeredBy: string;
  inputSize: string;
  outputSize: string | null;
  steps: number;
  completedSteps: number;
  errorMessage: string | null;
}

export interface StatsData {
  totalWorkflows: number;
  activeExecutions: number;
  totalUsers: number;
  successRate: number;
}

// Demo data - REPLACE THESE WITH YOUR CLIENT DATA
const demoWorkflows: WorkflowData[] = [
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

const demoUsers: UserData[] = [
  {
    id: "user_001",
    name: "Sarah Johnson",
    email: "sarah.johnson@acmecorp.com",
    role: "admin",
    company: "Acme Corp",
    status: "active",
    lastLogin: "2 hours ago",
    workflows: 8,
    avatar: "SJ",
    joinedAt: "2024-01-15",
    mfaEnabled: true
  },
  {
    id: "user_002",
    name: "Michael Chen",
    email: "m.chen@techflow.com",
    role: "editor",
    company: "TechFlow Inc",
    status: "active",
    lastLogin: "1 day ago",
    workflows: 5,
    avatar: "MC",
    joinedAt: "2024-02-01",
    mfaEnabled: true
  },
  {
    id: "user_003",
    name: "Emily Rodriguez",
    email: "emily@startupxyz.com",
    role: "viewer",
    company: "StartupXYZ",
    status: "inactive",
    lastLogin: "1 week ago",
    workflows: 2,
    avatar: "ER",
    joinedAt: "2024-01-20",
    mfaEnabled: false
  },
  {
    id: "user_004",
    name: "David Wilson",
    email: "d.wilson@enterprise.com",
    role: "editor",
    company: "Enterprise Ltd",
    status: "active",
    lastLogin: "30 minutes ago",
    workflows: 12,
    avatar: "DW",
    joinedAt: "2024-01-10",
    mfaEnabled: true
  },
  {
    id: "user_005",
    name: "Lisa Thompson",
    email: "lisa@datacorp.com",
    role: "viewer",
    company: "DataCorp",
    status: "active",
    lastLogin: "4 hours ago",
    workflows: 3,
    avatar: "LT",
    joinedAt: "2024-02-10",
    mfaEnabled: false
  }
];

const demoExecutions: ExecutionData[] = [
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

// Data service functions - REPLACE WITH n8n API CALLS
export const dataService = {
  // Workflows
  async getWorkflows(): Promise<WorkflowData[]> {
    // TODO: Replace with n8n API call
    return Promise.resolve(demoWorkflows);
  },

  async deleteWorkflow(id: string): Promise<void> {
    // TODO: Replace with n8n API call
    console.log(`Deleting workflow ${id}`);
    const index = demoWorkflows.findIndex(w => w.id === id);
    if (index !== -1) {
      demoWorkflows.splice(index, 1);
    }
  },

  async executeWorkflow(id: string): Promise<void> {
    // TODO: Replace with n8n API call
    console.log(`Executing workflow ${id}`);
  },

  async pauseWorkflow(id: string): Promise<void> {
    // TODO: Replace with n8n API call
    console.log(`Pausing workflow ${id}`);
    const workflow = demoWorkflows.find(w => w.id === id);
    if (workflow) {
      workflow.status = 'paused';
    }
  },

  // Users
  async getUsers(): Promise<UserData[]> {
    // TODO: Replace with database call
    return Promise.resolve(demoUsers);
  },

  async deleteUser(id: string): Promise<void> {
    // TODO: Replace with database call
    console.log(`Deleting user ${id}`);
    const index = demoUsers.findIndex(u => u.id === id);
    if (index !== -1) {
      demoUsers.splice(index, 1);
    }
  },

  // Executions
  async getExecutions(): Promise<ExecutionData[]> {
    // TODO: Replace with n8n API call
    return Promise.resolve(demoExecutions);
  },

  async stopExecution(id: string): Promise<void> {
    // TODO: Replace with n8n API call
    console.log(`Stopping execution ${id}`);
    const execution = demoExecutions.find(e => e.id === id);
    if (execution) {
      execution.status = 'error';
      execution.errorMessage = 'Execution stopped by user';
    }
  },

  // Stats
  async getStats(): Promise<StatsData> {
    // TODO: Calculate from n8n API data
    return Promise.resolve({
      totalWorkflows: demoWorkflows.length,
      activeExecutions: demoExecutions.filter(e => e.status === 'running').length,
      totalUsers: demoUsers.length,
      successRate: 94.2
    });
  }
};
