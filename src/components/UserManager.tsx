
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { UserPlus, Search, Filter, Shield, Mail, Calendar, Settings, Trash2, Eye } from "lucide-react";

const UserManager = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const users = [
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

  const getRoleBadge = (role: string) => {
    const variants = {
      admin: "bg-red-500/10 text-red-400 border-red-500/20",
      editor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
      viewer: "bg-green-500/10 text-green-400 border-green-500/20"
    };
    return variants[role as keyof typeof variants] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-500/10 text-green-400 border-green-500/20",
      inactive: "bg-gray-500/10 text-gray-400 border-gray-500/20"
    };
    return variants[status as keyof typeof variants] || "bg-gray-500/10 text-gray-400 border-gray-500/20";
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">User Management</h2>
          <p className="text-slate-400">Manage user access and permissions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-white">Add New User</DialogTitle>
              <DialogDescription className="text-slate-400">
                Create a new user account and assign permissions
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first-name" className="text-slate-300">First Name</Label>
                  <Input id="first-name" placeholder="John" className="bg-slate-700 border-slate-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="last-name" className="text-slate-300">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" className="bg-slate-700 border-slate-600 text-white" />
                </div>
              </div>
              <div>
                <Label htmlFor="email" className="text-slate-300">Email</Label>
                <Input id="email" type="email" placeholder="john.doe@company.com" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div>
                <Label htmlFor="company" className="text-slate-300">Company</Label>
                <Input id="company" placeholder="Company Name" className="bg-slate-700 border-slate-600 text-white" />
              </div>
              <div>
                <Label htmlFor="role" className="text-slate-300">Role</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="viewer">Viewer</SelectItem>
                    <SelectItem value="editor">Editor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Create User</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search users, emails, or companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-slate-400"
          />
        </div>
        <Select value={filterRole} onValueChange={setFilterRole}>
          <SelectTrigger className="w-full sm:w-48 bg-slate-800/50 border-slate-700 text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent className="bg-slate-800 border-slate-700">
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Users List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                {/* User Info */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="" alt={user.name} />
                    <AvatarFallback className="bg-blue-600 text-white">{user.avatar}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-white">{user.name}</h3>
                    <div className="flex items-center space-x-2 text-sm text-slate-400">
                      <Mail className="w-3 h-3" />
                      <span>{user.email}</span>
                    </div>
                    <p className="text-sm text-slate-400">{user.company}</p>
                  </div>
                </div>

                {/* Status and Role */}
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      <Badge className={getRoleBadge(user.role)}>
                        <Shield className="w-3 h-3 mr-1" />
                        {user.role}
                      </Badge>
                      <Badge className={getStatusBadge(user.status)}>
                        {user.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-400">
                      <span>{user.workflows} workflows</span>
                      <span>•</span>
                      <span>{user.lastLogin}</span>
                      {user.mfaEnabled && (
                        <>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs text-green-400 border-green-500/20">
                            MFA
                          </Badge>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      <Settings className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UserManager;
