import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Wrench, Key, Globe, Shield, Save } from "lucide-react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Switch } from "../../components/ui/switch"
import { settingsService } from "../../api/services/settings"
import { toast } from "react-hot-toast"

interface IntegrationConfig {
  webhookUrl: string
  apiKey: string
  enable2FA: boolean
  enableSandbox: boolean
}

export default function SettingsIntegrations() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [config, setConfig] = useState<IntegrationConfig>({
    webhookUrl: "",
    apiKey: "",
    enable2FA: true,
    enableSandbox: false,
  })
  
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setIsLoading(true);
        // In a real app, you might combine multiple settings calls
        const apiSettings = await settingsService.getApiSettings();
        const securitySettings = await settingsService.getSecuritySettings();
        setConfig({
          webhookUrl: apiSettings.webhookUrl,
          apiKey: "••••••••••••••••", // Mask API key for security
          enable2FA: securitySettings.twoFactorRequired,
          enableSandbox: false, // Assuming this comes from feature flags
        });
      } catch (error) {
        toast.error("Failed to load settings.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, [])

  const handleSave = async () => {
    setIsSaving(true);
    // Note: API Key is masked and not sent back. A real implementation would handle key generation/updates separately.
    const settingsToSave = Promise.all([
      settingsService.updateApiSettings({ webhookUrl: config.webhookUrl }),
      settingsService.updateSecuritySettings({ twoFactorRequired: config.enable2FA }),
      // The sandbox mode is not saved as there is no API for it in settingsService.
    ]);

    toast.promise(
      settingsToSave,
      {
        loading: 'Saving settings...',
        success: 'Settings saved successfully!',
        error: 'Failed to save settings.',
      }
    ).finally(() => setIsSaving(false));
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-6 h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      className="p-6 space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Wrench className="text-blue-600" /> Settings & Integrations
        </h1>
        <Button onClick={handleSave} loading={isSaving} className="flex items-center gap-2">
          {!isSaving && <Save className="w-4 h-4" />} {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      {/* Webhook URL */}
      <Card className="shadow-md">
        <CardContent className="p-4 space-y-3">
          <h2 className="font-semibold flex items-center gap-2">
            <Globe className="text-blue-600" /> Webhook Configuration
          </h2>
          <Input
            type="url"
            placeholder="https://your-domain.com/webhook"
            value={config.webhookUrl}
            onChange={(e) =>
              setConfig({ ...config, webhookUrl: e.target.value })
            }
          />
        </CardContent>
      </Card>

      {/* API Key */}
      <Card className="shadow-md">
        <CardContent className="p-4 space-y-3">
          <h2 className="font-semibold flex items-center gap-2">
            <Key className="text-blue-600" /> API Key
          </h2>
          <Input
            type="password"
            placeholder="Enter or generate API key"
            value={config.apiKey}
            onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
          />
        </CardContent>
      </Card>

      {/* Security Options */}
      <Card className="shadow-md">
        <CardContent className="p-4 space-y-4">
          <h2 className="font-semibold flex items-center gap-2">
            <Shield className="text-blue-600" /> Security Options
          </h2>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Enable Two-Factor Auth</span>
            <Switch
              checked={config.enable2FA}
              onCheckedChange={(checked) =>
                setConfig({ ...config, enable2FA: checked })
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Use Sandbox Mode (Testing)
            </span>
            <Switch
              checked={config.enableSandbox}
              onCheckedChange={(checked) =>
                setConfig({ ...config, enableSandbox: checked })
              }
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
