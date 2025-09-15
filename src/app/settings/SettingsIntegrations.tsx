// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { Wrench, Key, Globe, Shield, Save } from "lucide-react"
// import { Card, CardContent } from "../../components/ui/card"
// import { Button } from "../../components/ui/button"
// import { Input } from "../../components/ui/input"
// import { Switch } from "../../components/ui/switch"
// import { settingsService } from "../../api/services/settings"
// import { toast } from "react-hot-toast"

// interface IntegrationConfig {
//   webhookUrl: string
//   apiKey: string
//   enable2FA: boolean
//   enableSandbox: boolean
// }

// export default function SettingsIntegrations() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSaving, setIsSaving] = useState(false);
//   const [config, setConfig] = useState<IntegrationConfig>({
//     webhookUrl: "",
//     apiKey: "",
//     enable2FA: true,
//     enableSandbox: false,
//   })
  
//   useEffect(() => {
//     const fetchSettings = async () => {
//       try {
//         setIsLoading(true);
//         // In a real app, you might combine multiple settings calls
//         const apiSettings = await settingsService.getApiSettings();
//         const securitySettings = await settingsService.getSecuritySettings();
//         setConfig({
//           webhookUrl: apiSettings.webhookUrl,
//           apiKey: "••••••••••••••••", // Mask API key for security
//           enable2FA: securitySettings.twoFactorRequired,
//           enableSandbox: false, // Assuming this comes from feature flags
//         });
//       } catch (error) {
//         toast.error("Failed to load settings.");
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchSettings();
//   }, [])

//   const handleSave = async () => {
//     setIsSaving(true);
//     // Note: API Key is masked and not sent back. A real implementation would handle key generation/updates separately.
//     const settingsToSave = Promise.all([
//       settingsService.updateApiSettings({ webhookUrl: config.webhookUrl }),
//       settingsService.updateSecuritySettings({ twoFactorRequired: config.enable2FA }),
//       // The sandbox mode is not saved as there is no API for it in settingsService.
//     ]);

//     toast.promise(
//       settingsToSave,
//       {
//         loading: 'Saving settings...',
//         success: 'Settings saved successfully!',
//         error: 'Failed to save settings.',
//       }
//     ).finally(() => setIsSaving(false));
//   }

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center p-6 h-96">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       className="p-6 space-y-6"
//       initial={{ opacity: 0, y: 10 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       {/* Page Header */}
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold flex items-center gap-2">
//           <Wrench className="text-blue-600" /> Settings & Integrations
//         </h1>
//         <Button onClick={handleSave} loading={isSaving} className="flex items-center gap-2">
//           {!isSaving && <Save className="w-4 h-4" />} {isSaving ? 'Saving...' : 'Save Changes'}
//         </Button>
//       </div>

//       {/* Webhook URL */}
//       <Card className="shadow-md">
//         <CardContent className="p-4 space-y-3">
//           <h2 className="font-semibold flex items-center gap-2">
//             <Globe className="text-blue-600" /> Webhook Configuration
//           </h2>
//           <Input
//             type="url"
//             placeholder="https://your-domain.com/webhook"
//             value={config.webhookUrl}
//             onChange={(e) =>
//               setConfig({ ...config, webhookUrl: e.target.value })
//             }
//           />
//         </CardContent>
//       </Card>

//       {/* API Key */}
//       <Card className="shadow-md">
//         <CardContent className="p-4 space-y-3">
//           <h2 className="font-semibold flex items-center gap-2">
//             <Key className="text-blue-600" /> API Key
//           </h2>
//           <Input
//             type="password"
//             placeholder="Enter or generate API key"
//             value={config.apiKey}
//             onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
//           />
//         </CardContent>
//       </Card>

//       {/* Security Options */}
//       <Card className="shadow-md">
//         <CardContent className="p-4 space-y-4">
//           <h2 className="font-semibold flex items-center gap-2">
//             <Shield className="text-blue-600" /> Security Options
//           </h2>

//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium">Enable Two-Factor Auth</span>
//             <Switch
//               checked={config.enable2FA}
//               onCheckedChange={(checked) =>
//                 setConfig({ ...config, enable2FA: checked })
//               }
//             />
//           </div>

//           <div className="flex items-center justify-between">
//             <span className="text-sm font-medium">
//               Use Sandbox Mode (Testing)
//             </span>
//             <Switch
//               checked={config.enableSandbox}
//               onCheckedChange={(checked) =>
//                 setConfig({ ...config, enableSandbox: checked })
//               }
//             />
//           </div>
//         </CardContent>
//       </Card>
//     </motion.div>
//   )
// }
import { useState, useEffect } from "react"
import { 
  Settings, Key, Shield, 
  Save, 
  Eye, 
  EyeOff, 
  Copy, 
  RefreshCw, 
  Bell, 
  Mail, 
  Smartphone,
  Database,
  Webhook, Lock,
  CheckCircle,
  AlertTriangle,
  ExternalLink
} from "lucide-react"

interface IntegrationConfig {
  webhookUrl: string
  apiKey: string
  enable2FA: boolean
  enableSandbox: boolean
  emailNotifications: boolean
  smsNotifications: boolean
  webhookEnabled: boolean
  dataRetention: number
}

const ToggleSwitch = ({ checked, onChange, disabled = false }: {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) => (
  <button
    onClick={() => !disabled && onChange(!checked)}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-800 ${
      checked ? 'bg-blue-600' : 'bg-slate-600'
    } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    disabled={disabled}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        checked ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
)

const StatusBadge = ({ status, text }: {
  status: 'active' | 'warning' | 'error';
  text: string;
}) => (
  <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
    status === 'active' ? 'bg-green-500/10 text-green-400' :
    status === 'warning' ? 'bg-yellow-500/10 text-yellow-400' :
    'bg-red-500/10 text-red-400'
  }`}>
    {status === 'active' && <CheckCircle className="w-3 h-3" />}
    {status === 'warning' && <AlertTriangle className="w-3 h-3" />}
    {status === 'error' && <AlertTriangle className="w-3 h-3" />}
    {text}
  </div>
);

export default function SettingsIntegrations() {
  const [config, setConfig] = useState<IntegrationConfig>({
    webhookUrl: "https://api.yourapp.com/webhook",
    apiKey: "sk_live_1234567890abcdef1234567890abcdef",
    enable2FA: true,
    enableSandbox: false,
    emailNotifications: true,
    smsNotifications: false,
    webhookEnabled: true,
    dataRetention: 90,
  })
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)

  useEffect(() => {
    const fetchSettings = async () => {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsLoading(false)
    }
    fetchSettings()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSaving(false)
  }

  const generateNewApiKey = () => {
    const newKey = `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
    setConfig({ ...config, apiKey: newKey })
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-800 rounded w-96"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-32 bg-slate-800 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Settings className="text-blue-400 w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-white">Settings & Integrations</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed rounded-lg transition-colors font-medium"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Main Settings - 2/3 width */}
        <div className="xl:col-span-2 space-y-6">
          {/* API Configuration */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-blue-400" />
                API Configuration
              </h2>
              <StatusBadge status="active" text="Active" />
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  API Key
                </label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type={showApiKey ? "text" : "password"}
                      value={config.apiKey}
                      onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your API key"
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <button
                    onClick={() => copyToClipboard(config.apiKey)}
                    className="p-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4 text-slate-300" />
                  </button>
                  <button
                    onClick={generateNewApiKey}
                    className="p-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 rounded-lg transition-colors"
                    title="Generate new key"
                  >
                    <RefreshCw className="w-4 h-4 text-slate-300" />
                  </button>
                </div>
                <p className="text-xs text-slate-400 mt-2">
                  Keep your API key secure and don't share it publicly
                </p>
              </div>
            </div>
          </div>

          {/* Webhook Configuration */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <Webhook className="w-5 h-5 text-blue-400" />
                Webhook Configuration
              </h2>
              <StatusBadge status={config.webhookEnabled ? "active" : "error"} text={config.webhookEnabled ? "Enabled" : "Disabled"} />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Enable Webhooks</span>
                  <p className="text-sm text-slate-400">Receive real-time notifications</p>
                </div>
                <ToggleSwitch
                  checked={config.webhookEnabled}
                  onChange={(checked) => setConfig({ ...config, webhookEnabled: checked })}
                />
              </div>

              {config.webhookEnabled && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Webhook URL
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="url"
                      value={config.webhookUrl}
                      onChange={(e) => setConfig({ ...config, webhookUrl: e.target.value })}
                      className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://your-domain.com/webhook"
                    />
                    <button className="p-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-400" />
              Security Settings
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Two-Factor Authentication
                  </span>
                  <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
                </div>
                <ToggleSwitch
                  checked={config.enable2FA}
                  onChange={(checked: boolean) => setConfig({ ...config, enable2FA: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-white font-medium">Sandbox Mode</span>
                  <p className="text-sm text-slate-400">Use test environment for development</p>
                </div>
                <ToggleSwitch
                  checked={config.enableSandbox}
                  onChange={(checked) => setConfig({ ...config, enableSandbox: checked })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Data Retention Period
                </label>
                <select
                  value={config.dataRetention}
                  onChange={(e) => setConfig({ ...config, dataRetention: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={30}>30 days</option>
                  <option value={90}>90 days</option>
                  <option value={180}>6 months</option>
                  <option value={365}>1 year</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - 1/3 width */}
        <div className="xl:col-span-1 space-y-6">
          {/* Notification Settings */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-blue-400" />
              Notifications
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-white">Email</span>
                </div>
                <ToggleSwitch
                  checked={config.emailNotifications}
                  onChange={(checked) => setConfig({ ...config, emailNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-white">SMS</span>
                </div>
                <ToggleSwitch
                  checked={config.smsNotifications}
                  onChange={(checked) => setConfig({ ...config, smsNotifications: checked })}
                />
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-blue-400" />
              System Status
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">API Status</span>
                <StatusBadge status="active" text="Operational" />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Webhooks</span>
                <StatusBadge status="active" text="Healthy" />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">Database</span>
                <StatusBadge status="warning" text="High Load" />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-300">CDN</span>
                <StatusBadge status="active" text="Optimal" />
              </div>
            </div>

            <button className="w-full mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium text-white transition-colors">
              View Detailed Status
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                <div className="text-white text-sm font-medium">Test Webhook</div>
                <div className="text-slate-400 text-xs">Send a test event to your endpoint</div>
              </button>
              
              <button className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                <div className="text-white text-sm font-medium">Download Logs</div>
                <div className="text-slate-400 text-xs">Export recent activity logs</div>
              </button>
              
              <button className="w-full text-left p-3 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors">
                <div className="text-white text-sm font-medium">Reset Settings</div>
                <div className="text-slate-400 text-xs">Restore default configuration</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}