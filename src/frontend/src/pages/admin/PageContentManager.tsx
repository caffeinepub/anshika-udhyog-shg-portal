import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Save } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

const PAGES = [
  { key: "marketing", label: "📢 Marketing", emoji: "📢" },
  { key: "seller", label: "🛒 Seller", emoji: "🛒" },
  { key: "shipping", label: "🚚 Shipping", emoji: "🚚" },
  { key: "policy", label: "📜 Policy", emoji: "📜" },
];

export function PageContentManager() {
  const { state, updatePageContent } = useApp();
  const [drafts, setDrafts] = useState<Record<string, string>>(
    Object.fromEntries(
      PAGES.map((p) => [
        p.key,
        state.pageContents.find((pc) => pc.page === p.key)?.content || "",
      ]),
    ),
  );

  const handleSave = (page: string) => {
    updatePageContent(page, drafts[page]);
    toast.success(`${page} page content saved!`);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="font-heading font-bold text-xl text-gray-900 flex items-center gap-2 mb-4">
        <FileText className="h-5 w-5 text-amber-600" /> Page Content Manager
      </h1>

      <Tabs defaultValue="marketing">
        <TabsList className="w-full mb-4 grid grid-cols-4 h-auto">
          {PAGES.map((p) => (
            <TabsTrigger
              key={p.key}
              value={p.key}
              className="text-xs py-2"
              data-ocid="pagecontent.tab"
            >
              {p.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {PAGES.map((p) => {
          const pageName = p.key.charAt(0).toUpperCase() + p.key.slice(1);
          return (
            <TabsContent key={p.key} value={p.key}>
              <Card>
                <CardHeader className="pb-2 pt-3">
                  <CardTitle className="text-sm">
                    {p.emoji} Edit {pageName} Page Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label className="text-xs">
                      Page Content / Description
                    </Label>
                    <Textarea
                      value={drafts[p.key]}
                      onChange={(e) =>
                        setDrafts((prev) => ({
                          ...prev,
                          [p.key]: e.target.value,
                        }))
                      }
                      rows={6}
                      className="mt-1"
                      placeholder={`Enter content for ${p.key} page...`}
                      data-ocid="pagecontent.textarea"
                    />
                  </div>
                  <p className="text-xs text-gray-400">
                    Last updated:{" "}
                    {state.pageContents.find((pc) => pc.page === p.key)
                      ?.updatedAt || "Never"}
                  </p>
                  <Button
                    onClick={() => handleSave(p.key)}
                    className="text-gray-900 font-semibold"
                    style={{ background: "#FFC107" }}
                    data-ocid="pagecontent.save_button"
                  >
                    <Save className="h-4 w-4 mr-2" /> Save {pageName} Content
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
