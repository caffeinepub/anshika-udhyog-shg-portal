import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { useRef, useState } from "react";
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
  const [galleryPickerIdx, setGalleryPickerIdx] = useState<number | null>(null);
  const logoRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    updateHomepageContent(form);
    toast.success("Homepage updated successfully!");
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((prev) => ({ ...prev, logoUrl: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const galleryPhotos = state.galleryItems.filter(
    (g) => g.type === "photo" && g.src,
  );

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
        >
          <Save className="h-4 w-4 mr-2" /> Save Changes
        </Button>
      </div>

      <Tabs defaultValue="site">
        <TabsList className="w-full mb-4 grid grid-cols-5 h-auto">
          <TabsTrigger value="site" className="text-xs py-2">
            🏷️ Site
          </TabsTrigger>
          <TabsTrigger value="slider" className="text-xs py-2">
            🖼️ Slider
          </TabsTrigger>
          <TabsTrigger value="about" className="text-xs py-2">
            ℹ️ About
          </TabsTrigger>
          <TabsTrigger value="stats" className="text-xs py-2">
            📊 Stats
          </TabsTrigger>
          <TabsTrigger value="contact" className="text-xs py-2">
            📞 Contact
          </TabsTrigger>
        </TabsList>

        {/* Site Tab */}
        <TabsContent value="site" className="space-y-4">
          <Card>
            <CardHeader className="pb-2 pt-3">
              <CardTitle className="text-sm">🏷️ Site Identity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs">Site Title</Label>
                <Input
                  value={form.siteTitle || ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, siteTitle: e.target.value }))
                  }
                  placeholder="ANSHIKA UDHYOG"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Tagline</Label>
                <Input
                  value={form.tagline}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, tagline: e.target.value }))
                  }
                  placeholder="SHG PORTAL"
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">🖼️ Logo Upload</Label>
                <div className="mt-1 flex items-center gap-3">
                  {form.logoUrl ? (
                    <img
                      src={form.logoUrl}
                      alt="Logo Preview"
                      className="h-14 w-14 rounded-full object-cover border-2 border-amber-400"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-amber-100 flex items-center justify-center text-2xl border-2 border-amber-300">
                      🏠
                    </div>
                  )}
                  <div className="space-y-1">
                    <input
                      ref={logoRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => logoRef.current?.click()}
                    >
                      Upload from Device
                    </Button>
                  </div>
                </div>
                <Label className="text-xs mt-2 block">Or enter URL:</Label>
                <Input
                  value={form.logoUrl || ""}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, logoUrl: e.target.value }))
                  }
                  placeholder="https://example.com/logo.png"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Slider Tab */}
        <TabsContent value="slider" className="space-y-3">
          {form.slides.map((slide, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: slide array has no unique id
            <Card key={idx} className="overflow-hidden">
              <div className="h-2" style={{ background: slide.bg }} />
              <CardHeader className="pb-2 pt-3">
                <CardTitle className="text-sm">Slide {idx + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div>
                  <Label className="text-xs">Title</Label>
                  <Input
                    value={slide.title}
                    onChange={(e) => {
                      const slides = [...form.slides];
                      slides[idx] = { ...slides[idx], title: e.target.value };
                      setForm((prev) => ({ ...prev, slides }));
                    }}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label className="text-xs">Subtitle</Label>
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
                  />
                </div>
                <div>
                  <Label className="text-xs">Slide Background Image</Label>
                  <div className="mt-1 flex gap-2">
                    <Input
                      value={slide.imageUrl || ""}
                      onChange={(e) => {
                        const slides = [...form.slides];
                        slides[idx] = {
                          ...slides[idx],
                          imageUrl: e.target.value,
                        };
                        setForm((prev) => ({ ...prev, slides }));
                      }}
                      placeholder="https://... or pick from gallery"
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        setGalleryPickerIdx(
                          galleryPickerIdx === idx ? null : idx,
                        )
                      }
                    >
                      🖼️ Pick
                    </Button>
                  </div>
                  {galleryPickerIdx === idx && (
                    <div className="mt-2 p-2 border rounded-lg bg-gray-50">
                      <p className="text-xs font-semibold text-gray-600 mb-2">
                        Pick from Gallery Photos:
                      </p>
                      {galleryPhotos.length === 0 ? (
                        <p className="text-xs text-gray-400">
                          No gallery photos available — upload photos to Gallery
                          first.
                        </p>
                      ) : (
                        <div className="grid grid-cols-3 gap-1.5">
                          {galleryPhotos.map((g) => (
                            <button
                              type="button"
                              key={g.id}
                              onClick={() => {
                                const slides = [...form.slides];
                                slides[idx] = {
                                  ...slides[idx],
                                  imageUrl: g.src,
                                };
                                setForm((prev) => ({ ...prev, slides }));
                                setGalleryPickerIdx(null);
                              }}
                              className="relative rounded overflow-hidden border-2 border-transparent hover:border-amber-400 transition-colors"
                            >
                              <img
                                src={g.src}
                                alt={g.title}
                                className="w-full h-14 object-cover"
                              />
                              <p className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[9px] px-1 truncate">
                                {g.title}
                              </p>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <div>
                  <Label className="text-xs">Background Gradient (CSS)</Label>
                  <Input
                    value={slide.bg}
                    onChange={(e) => {
                      const slides = [...form.slides];
                      slides[idx] = { ...slides[idx], bg: e.target.value };
                      setForm((prev) => ({ ...prev, slides }));
                    }}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* About Tab */}
        <TabsContent value="about" className="space-y-3">
          <Card>
            <CardHeader className="pb-2 pt-3">
              <CardTitle className="text-sm">About Text</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={form.aboutText}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, aboutText: e.target.value }))
                }
                rows={4}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Stats Tab */}
        <TabsContent value="stats" className="space-y-3">
          {form.stats.map((stat, idx) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: stat array has no unique id
            <Card key={idx}>
              <CardHeader className="pb-2 pt-3">
                <CardTitle className="text-sm">Stat {idx + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-1">
                  {EMOJI_OPTIONS.map((e) => (
                    <button
                      type="button"
                      key={e}
                      onClick={() => {
                        const stats = [...form.stats];
                        stats[idx] = { ...stats[idx], icon: e };
                        setForm((prev) => ({ ...prev, stats }));
                      }}
                      className={`text-lg p-1 rounded transition-colors ${stat.icon === e ? "bg-amber-200" : "hover:bg-gray-100"}`}
                    >
                      {e}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
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
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-3">
          <Card>
            <CardHeader className="pb-2 pt-3">
              <CardTitle className="text-sm">Contact Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <Label className="text-xs">Phone</Label>
                <Input
                  value={form.phone}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Email</Label>
                <Input
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <Label className="text-xs">Address</Label>
                <Textarea
                  value={form.address}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, address: e.target.value }))
                  }
                  rows={2}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
