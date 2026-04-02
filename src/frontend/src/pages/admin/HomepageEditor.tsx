import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { HomepageContent } from "../../types";

const EMOJI_OPTIONS = [
  "👥",
  "🏢",
  "💰",
  "👩",
  "🌟",
  "📈",
  "🤝",
  "🎯",
  "🏆",
  "💡",
  "🌺",
  "✨",
];

export function HomepageEditor() {
  const { state, updateHomepageContent } = useApp();
  const [form, setForm] = useState<HomepageContent>(state.homepageContent);

  const handleSave = () => {
    updateHomepageContent(form);
    toast.success("Homepage updated successfully!");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-heading font-bold text-xl text-gray-900">
          🌐 Homepage Editor
        </h1>
        <Button
          onClick={handleSave}
          className="text-gray-900 font-semibold"
          style={{ background: "#FFC107" }}
          data-ocid="homepage_editor.save_button"
        >
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </div>

      <Tabs defaultValue="slider">
        <TabsList className="w-full mb-4 grid grid-cols-4 h-auto">
          <TabsTrigger
            value="slider"
            className="text-xs py-2"
            data-ocid="homepage_editor.tab"
          >
            🖼️ Slider
          </TabsTrigger>
          <TabsTrigger
            value="about"
            className="text-xs py-2"
            data-ocid="homepage_editor.tab"
          >
            ℹ️ About
          </TabsTrigger>
          <TabsTrigger
            value="stats"
            className="text-xs py-2"
            data-ocid="homepage_editor.tab"
          >
            📊 Stats
          </TabsTrigger>
          <TabsTrigger
            value="contact"
            className="text-xs py-2"
            data-ocid="homepage_editor.tab"
          >
            📞 Contact
          </TabsTrigger>
        </TabsList>

        {/* Slider Tab */}
        <TabsContent value="slider" className="space-y-3">
          {form.slides.map((slide, idx) => (
            <Card key={slide.title} className="overflow-hidden">
              <div className="h-2" style={{ background: slide.bg }} />
              <CardHeader className="pb-2 pt-3">
                <CardTitle className="text-sm">Slide {idx + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Label className="text-xs">Title (Hindi)</Label>
                  <Input
                    value={slide.title}
                    onChange={(e) => {
                      const slides = [...form.slides];
                      slides[idx] = { ...slides[idx], title: e.target.value };
                      setForm((prev) => ({ ...prev, slides }));
                    }}
                    className="mt-1"
                    data-ocid={`homepage_editor.input.${idx + 1}`}
                  />
                </div>
                <div>
                  <Label className="text-xs">Subtitle (English)</Label>
                  <Input
                    value={slide.subtitle}
                    onChange={(e) => {
                      const slides = [...form.slides];
                      slides[idx] = {
                        ...slides[idx],
                        subtitle: e.target.value,
                      };
                      setForm((prev) => ({ ...prev, slides }));
                    }}
                    className="mt-1"
                    data-ocid={`homepage_editor.input.${idx + 1}`}
                  />
                </div>
                <div
                  className="h-10 rounded-md flex items-center justify-center text-white text-xs font-semibold"
                  style={{ background: slide.bg }}
                >
                  Preview: {slide.title}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-3">
          <Card>
            <CardContent className="pt-4 space-y-3">
              <div>
                <Label className="text-xs font-semibold">Portal Tagline</Label>
                <Input
                  value={form.tagline}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, tagline: e.target.value }))
                  }
                  className="mt-1"
                  placeholder="ANSHIKA UDHYOG SHG PORTAL"
                  data-ocid="homepage_editor.input"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">About Us Text</Label>
                <Textarea
                  value={form.aboutText}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, aboutText: e.target.value }))
                  }
                  rows={5}
                  className="mt-1"
                  data-ocid="homepage_editor.textarea"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-3">
          {form.stats.map((stat, idx) => (
            <Card key={stat.label}>
              <CardContent className="pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{stat.icon}</span>
                  <span className="font-semibold text-sm">Stat {idx + 1}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <div>
                    <Label className="text-xs">Value</Label>
                    <Input
                      value={stat.value}
                      onChange={(e) => {
                        const stats = [...form.stats];
                        stats[idx] = { ...stats[idx], value: e.target.value };
                        setForm((prev) => ({ ...prev, stats }));
                      }}
                      className="mt-1"
                      data-ocid={`homepage_editor.input.${idx + 1}`}
                    />
                  </div>
                  <div>
                    <Label className="text-xs">Label</Label>
                    <Input
                      value={stat.label}
                      onChange={(e) => {
                        const stats = [...form.stats];
                        stats[idx] = { ...stats[idx], label: e.target.value };
                        setForm((prev) => ({ ...prev, stats }));
                      }}
                      className="mt-1"
                      data-ocid={`homepage_editor.input.${idx + 1}`}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-xs">Icon</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {EMOJI_OPTIONS.map((emoji) => (
                      <button
                        type="button"
                        key={emoji}
                        onClick={() => {
                          const stats = [...form.stats];
                          stats[idx] = { ...stats[idx], icon: emoji };
                          setForm((prev) => ({ ...prev, stats }));
                        }}
                        className={`text-xl p-1 rounded border-2 transition-all ${
                          stat.icon === emoji
                            ? "border-amber-400 bg-amber-50 scale-110"
                            : "border-transparent hover:border-amber-200"
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-3">
          <Card>
            <CardContent className="pt-4 space-y-3">
              <div>
                <Label className="text-xs font-semibold">📱 Phone Number</Label>
                <Input
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="mt-1"
                  placeholder="+91 XXXXX XXXXX"
                  data-ocid="homepage_editor.input"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">✉️ Email Address</Label>
                <Input
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="mt-1"
                  placeholder="info@example.org"
                  data-ocid="homepage_editor.input"
                />
              </div>
              <div>
                <Label className="text-xs font-semibold">📍 Address</Label>
                <Textarea
                  value={form.address}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, address: e.target.value }))
                  }
                  rows={3}
                  className="mt-1"
                  data-ocid="homepage_editor.textarea"
                />
              </div>
              <div
                className="rounded-xl p-4 mt-2"
                style={{
                  background:
                    "linear-gradient(135deg, #FFC107 0%, #FF8F00 100%)",
                }}
              >
                <p className="font-semibold text-sm text-gray-900 mb-2">
                  Preview:
                </p>
                <p className="text-xs text-gray-800">📱 {form.phone}</p>
                <p className="text-xs text-gray-800">✉️ {form.email}</p>
                <p className="text-xs text-gray-800">📍 {form.address}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-4">
        <Button
          onClick={handleSave}
          className="w-full text-gray-900 font-bold py-3"
          style={{ background: "#FFC107" }}
          data-ocid="homepage_editor.submit_button"
        >
          <Save className="h-4 w-4 mr-2" /> Save All Changes
        </Button>
      </div>
    </div>
  );
}
