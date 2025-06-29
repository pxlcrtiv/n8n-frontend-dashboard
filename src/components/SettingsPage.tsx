
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Settings, Server, Key, TestTube, CheckCircle, AlertCircle } from "lucide-react";
import { useSettings } from "@/contexts/SettingsContext";
import { toast } from "sonner";

const SettingsPage = () => {
  const { n8nSettings, updateN8nSettings, isConfigured } = useSettings();
  const [formData, setFormData] = useState(n8nSettings);
  const [testing, setTesting] = useState(false);

  const handleSave = () => {
    updateN8nSettings(formData);
    toast.success("N8N settings saved successfully");
  };

  const handleTest = async () => {
    if (!formData.baseUrl || !formData.apiKey) {
      toast.error("Please fill in all required fields");
      return;
    }

    setTesting(true);
    try {
      const response = await fetch(`${formData.baseUrl}/workflows`, {
        headers: {
          'X-N8N-API-KEY': formData.apiKey,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        toast.success("N8N connection test successful!");
      } else {
        toast.error(`Connection failed: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      toast.error("Connection test failed. Check your settings and network.");
      console.error("N8N connection test error:", error);
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-slate-400">Configure your n8n integration and application settings</p>
      </div>

      {/* N8N Integration Settings */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Server className="w-5 h-5 text-blue-400" />
              <CardTitle className="text-white">N8N Integration</CardTitle>
            </div>
            <Badge className={isConfigured ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-gray-500/10 text-gray-400 border-gray-500/20"}>
              {isConfigured ? (
                <>
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Connected
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Not Connected
                </>
              )}
            </Badge>
          </div>
          <CardDescription className="text-slate-400">
            Connect to your n8n instance to manage workflows and executions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="baseUrl" className="text-slate-300">N8N Base URL</Label>
              <Input
                id="baseUrl"
                placeholder="https://your-n8n-instance.com"
                value={formData.baseUrl}
                onChange={(e) => setFormData({ ...formData, baseUrl: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-500">The base URL of your n8n instance</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiKey" className="text-slate-300">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="n8n_api_key_..."
                value={formData.apiKey}
                onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <p className="text-xs text-slate-500">Your n8n API key for authentication</p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-slate-300">Enable N8N Integration</Label>
              <p className="text-sm text-slate-500">Use live data from n8n instead of demo data</p>
            </div>
            <Switch
              checked={formData.enabled}
              onCheckedChange={(enabled) => setFormData({ ...formData, enabled })}
            />
          </div>

          <Separator className="bg-slate-700" />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleTest}
              disabled={testing || !formData.baseUrl || !formData.apiKey}
              variant="outline"
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <TestTube className="w-4 h-4 mr-2" />
              {testing ? "Testing..." : "Test Connection"}
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              Save Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* API Integration Guide */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Key className="w-5 h-5 mr-2 text-yellow-400" />
            N8N API Setup Guide
          </CardTitle>
          <CardDescription className="text-slate-400">
            How to get your n8n API credentials
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center mt-0.5">1</div>
              <div>
                <p className="font-medium">Access your n8n instance</p>
                <p className="text-slate-400">Go to your n8n web interface (e.g., https://your-domain.com)</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center mt-0.5">2</div>
              <div>
                <p className="font-medium">Navigate to Settings → API</p>
                <p className="text-slate-400">In the n8n interface, go to Settings and then to the API section</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center mt-0.5">3</div>
              <div>
                <p className="font-medium">Create API Key</p>
                <p className="text-slate-400">Generate a new API key and copy it to the field above</p>
              </div>
            </div>
            <div className="flex items-start space-x-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center mt-0.5">4</div>
              <div>
                <p className="font-medium">Test & Enable</p>
                <p className="text-slate-400">Test the connection and enable the integration to start using live data</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
