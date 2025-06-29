
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Clock, Users, Target, Award, Zap } from "lucide-react";
import { useState } from "react";

const AnalyticsDashboard = () => {
  const [selectedClient, setSelectedClient] = useState("all");
  const [timeRange, setTimeRange] = useState("3months");

  // Client ROI Data
  const roiData = [
    { month: "Jan", savings: 15000, revenue: 45000, efficiency: 85 },
    { month: "Feb", savings: 22000, revenue: 52000, efficiency: 88 },
    { month: "Mar", savings: 28000, revenue: 61000, efficiency: 92 },
    { month: "Apr", savings: 35000, revenue: 68000, efficiency: 94 },
    { month: "May", savings: 42000, revenue: 75000, efficiency: 96 },
    { month: "Jun", savings: 48000, revenue: 82000, efficiency: 98 }
  ];

  // Performance Metrics
  const performanceData = [
    { workflow: "Data Processing", successRate: 97.8, avgTime: 2.3, executions: 1240 },
    { workflow: "Email Automation", successRate: 99.2, avgTime: 1.1, executions: 2150 },
    { workflow: "Report Generation", successRate: 95.5, avgTime: 8.7, executions: 890 },
    { workflow: "Inventory Sync", successRate: 98.4, avgTime: 4.2, executions: 1680 },
    { workflow: "Customer Onboarding", successRate: 96.9, avgTime: 12.5, executions: 560 }
  ];

  // Client Impact Data
  const clientImpactData = [
    { client: "Acme Corp", timeSaved: 320, costSaved: 45000, satisfaction: 98 },
    { client: "TechFlow Inc", timeSaved: 280, costSaved: 38000, satisfaction: 96 },
    { client: "StartupXYZ", timeSaved: 150, costSaved: 22000, satisfaction: 94 },
    { client: "Enterprise Ltd", timeSaved: 420, costSaved: 62000, satisfaction: 99 },
    { client: "DataCorp", timeSaved: 380, costSaved: 54000, satisfaction: 97 }
  ];

  // Process Efficiency Data
  const efficiencyData = [
    { process: "Manual Data Entry", before: 480, after: 45, improvement: 90.6 },
    { process: "Report Generation", before: 120, after: 15, improvement: 87.5 },
    { process: "Email Campaigns", before: 90, after: 8, improvement: 91.1 },
    { process: "Inventory Updates", before: 200, after: 25, improvement: 87.5 },
    { process: "Customer Follow-up", before: 150, after: 20, improvement: 86.7 }
  ];

  // Workflow Volume Data
  const volumeData = [
    { name: "Week 1", executions: 2400, success: 2340, errors: 60 },
    { name: "Week 2", executions: 2800, success: 2730, errors: 70 },
    { name: "Week 3", executions: 3200, success: 3120, errors: 80 },
    { name: "Week 4", executions: 3600, success: 3510, errors: 90 }
  ];

  const chartConfig = {
    savings: { label: "Cost Savings", color: "#10b981" },
    revenue: { label: "Revenue Impact", color: "#3b82f6" },
    efficiency: { label: "Efficiency %", color: "#8b5cf6" },
    executions: { label: "Executions", color: "#06b6d4" },
    success: { label: "Successful", color: "#10b981" },
    errors: { label: "Errors", color: "#ef4444" }
  };

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Client Analytics</h2>
          <p className="text-slate-400">Business impact and performance insights</p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedClient} onValueChange={setSelectedClient}>
            <SelectTrigger className="w-48 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Select Client" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="all">All Clients</SelectItem>
              <SelectItem value="acme">Acme Corp</SelectItem>
              <SelectItem value="techflow">TechFlow Inc</SelectItem>
              <SelectItem value="startup">StartupXYZ</SelectItem>
              <SelectItem value="enterprise">Enterprise Ltd</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-36 bg-slate-800/50 border-slate-700 text-white">
              <SelectValue placeholder="Time Range" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="1month">1 Month</SelectItem>
              <SelectItem value="3months">3 Months</SelectItem>
              <SelectItem value="6months">6 Months</SelectItem>
              <SelectItem value="1year">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-900/20 to-green-800/10 border-green-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-green-100">Total Cost Savings</CardTitle>
            <DollarSign className="h-5 w-5 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">$190,000</div>
            <div className="flex items-center text-xs text-green-300 mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +28% vs last quarter
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/20 to-blue-800/10 border-blue-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">Revenue Impact</CardTitle>
            <TrendingUp className="h-5 w-5 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">$343,000</div>
            <div className="flex items-center text-xs text-blue-300 mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +35% revenue increase
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-purple-800/10 border-purple-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-purple-100">Time Saved</CardTitle>
            <Clock className="h-5 w-5 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">1,550 hrs</div>
            <div className="flex items-center text-xs text-purple-300 mt-1">
              <Award className="w-3 h-3 mr-1" />
              89% efficiency gain
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/20 to-orange-800/10 border-orange-700/30">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-orange-100">Client Satisfaction</CardTitle>
            <Target className="h-5 w-5 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-400">96.8%</div>
            <div className="flex items-center text-xs text-orange-300 mt-1">
              <TrendingUp className="w-3 h-3 mr-1" />
              +2.3% this month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="roi" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border border-slate-700">
          <TabsTrigger value="roi" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            ROI Analysis
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Performance
          </TabsTrigger>
          <TabsTrigger value="clients" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Client Impact
          </TabsTrigger>
          <TabsTrigger value="efficiency" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Process Efficiency
          </TabsTrigger>
        </TabsList>

        <TabsContent value="roi" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* ROI Trend Chart */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">ROI Trend Analysis</CardTitle>
                <CardDescription className="text-slate-400">
                  Monthly cost savings and revenue impact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <AreaChart data={roiData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="savings" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Area type="monotone" dataKey="revenue" stackId="2" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Efficiency Chart */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Efficiency Growth</CardTitle>
                <CardDescription className="text-slate-400">
                  Process efficiency improvement over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <LineChart data={roiData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="efficiency" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Workflow Performance */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Workflow Success Rates</CardTitle>
                <CardDescription className="text-slate-400">
                  Success rate by workflow type
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <BarChart data={performanceData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis type="number" stroke="#9ca3af" />
                    <YAxis dataKey="workflow" type="category" stroke="#9ca3af" width={120} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="successRate" fill="#10b981" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Execution Volume */}
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Weekly Execution Volume</CardTitle>
                <CardDescription className="text-slate-400">
                  Success vs error rates over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-80">
                  <AreaChart data={volumeData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="name" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="success" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
                    <Area type="monotone" dataKey="errors" stackId="1" stroke="#ef4444" fill="#ef4444" fillOpacity={0.8} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="clients" className="space-y-6">
          {/* Client Impact Table with Visual Elements */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Client Success Stories</CardTitle>
              <CardDescription className="text-slate-400">
                Impact metrics across all client implementations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientImpactData.map((client, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-slate-900/50 border border-slate-700/50">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                        {client.client.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{client.client}</p>
                        <p className="text-sm text-slate-400">{client.timeSaved} hours saved monthly</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-lg font-bold text-green-400">${client.costSaved.toLocaleString()}</p>
                        <p className="text-xs text-slate-400">Cost Savings</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-bold text-blue-400">{client.satisfaction}%</p>
                        <p className="text-xs text-slate-400">Satisfaction</p>
                      </div>
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                        <Zap className="w-3 h-3 mr-1" />
                        Active
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="efficiency" className="space-y-6">
          {/* Process Efficiency Comparison */}
          <Card className="bg-slate-800/50 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Process Transformation</CardTitle>
              <CardDescription className="text-slate-400">
                Before vs After automation implementation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {efficiencyData.map((process, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{process.process}</span>
                      <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                        {process.improvement}% improvement
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Before</span>
                          <span className="text-red-400">{process.before} min</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">After</span>
                          <span className="text-green-400">{process.after} min</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${(process.after / process.before) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsDashboard;
