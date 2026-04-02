import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Save, Settings } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { SiteSettings } from "../../types";

export function AdminSiteSettings() {
  const { state, updateSiteSettings } = useApp();
  const [form, setForm] = useState<SiteSettings>(state.siteSettings);

  const handleSave = () => {
    updateSiteSettings(form);
    toast.success("Site settings saved!");
  };

  const fontPreview: Record<string, string> = {
    default: "font-sans",
    serif: "font-serif",
    rounded: "font-sans",
    mono: "font-mono",
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="font-heading font-bold text-xl text-gray-900 flex items-center gap-2 mb-4">
        <Settings className="h-5 w-5 text-amber-600" /> Site Settings
      </h1>

      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm">🏷️ Branding</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs">Site Title</Label>
              <Input
                value={form.siteTitle}
                onChange={(e) =>
                  setForm((p) => ({ ...p, siteTitle: e.target.value }))
                }
                placeholder="ANSHIKA UDHYOG"
                className="mt-1"
                data-ocid="site_settings.input"
              />
            </div>
            <div>
              <Label className="text-xs">Logo URL</Label>
              <Input
                value={form.logoUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, logoUrl: e.target.value }))
                }
                placeholder="https://example.com/logo.png"
                className="mt-1"
                data-ocid="site_settings.input"
              />
              {form.logoUrl && (
                <img
                  src={form.logoUrl}
                  alt="Logo Preview"
                  className="mt-2 h-12 w-12 rounded-full object-cover border-2 border-amber-300"
                />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm">🔤 Typography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs">Font Family</Label>
              <Select
                value={form.fontFamily}
                onValueChange={(v) => setForm((p) => ({ ...p, fontFamily: v }))}
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="site_settings.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">
                    Default (Inter / System)
                  </SelectItem>
                  <SelectItem value="serif">Serif (Georgia)</SelectItem>
                  <SelectItem value="rounded">Rounded (Nunito)</SelectItem>
                  <SelectItem value="mono">Monospace</SelectItem>
                </SelectContent>
              </Select>
              <p
                className={`mt-2 text-sm text-gray-600 ${fontPreview[form.fontFamily]}`}
              >
                Preview: अंशिका उद्योग SHG Portal — Anshika Udhyog
              </p>
            </div>
            <div>
              <Label className="text-xs">Font Size</Label>
              <Select
                value={form.fontSize}
                onValueChange={(v) => setForm((p) => ({ ...p, fontSize: v }))}
              >
                <SelectTrigger
                  className="mt-1"
                  data-ocid="site_settings.select"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small (14px)</SelectItem>
                  <SelectItem value="medium">Medium (16px)</SelectItem>
                  <SelectItem value="large">Large (18px)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleSave}
          className="w-full text-gray-900 font-semibold"
          style={{ background: "#FFC107" }}
          data-ocid="site_settings.save_button"
        >
          <Save className="h-4 w-4 mr-2" /> Save Settings
        </Button>
      </div>
    </div>
  );
}
