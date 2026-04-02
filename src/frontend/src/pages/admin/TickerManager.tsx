import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Edit2, Megaphone, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { TickerItem } from "../../types";

export function TickerManager() {
  const { state, addTicker, updateTicker, deleteTicker } = useApp();
  const [editItem, setEditItem] = useState<TickerItem | null>(null);
  const [newMsg, setNewMsg] = useState("");
  const [newActive, setNewActive] = useState(true);
  const [addOpen, setAddOpen] = useState(false);

  const activeTickers = state.tickers.filter((t) => t.active);

  const handleAdd = () => {
    if (!newMsg.trim()) {
      toast.error("Message is required");
      return;
    }
    addTicker({ message: newMsg, active: newActive });
    toast.success("Ticker added!");
    setNewMsg("");
    setNewActive(true);
    setAddOpen(false);
  };

  const handleUpdate = () => {
    if (!editItem) return;
    updateTicker(editItem);
    toast.success("Ticker updated!");
    setEditItem(null);
  };

  const handleDelete = (id: string) => {
    deleteTicker(id);
    toast.success("Ticker deleted!");
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-heading font-bold text-xl text-gray-900 flex items-center gap-2">
          <Megaphone className="h-5 w-5 text-amber-600" /> Ticker Manager
        </h1>
        <Button
          onClick={() => setAddOpen(!addOpen)}
          className="text-gray-900 font-bold text-xs"
          style={{ background: "#FFC107" }}
          data-ocid="ticker.open_modal_button"
        >
          <Plus className="h-4 w-4 mr-1" /> Add Ticker
        </Button>
      </div>

      {/* Live Preview */}
      {activeTickers.length > 0 && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <p className="text-xs font-semibold text-gray-600 mb-1">
            Live Preview:
          </p>
          <div
            style={{
              background: "#1a1a2e",
              color: "#FFC107",
              padding: "6px 12px",
              overflow: "hidden",
            }}
          >
            <div className="ticker-inner" style={{ fontSize: "13px" }}>
              {activeTickers.map((t) => t.message).join(" │ ")}
            </div>
          </div>
        </div>
      )}

      {/* Add Form */}
      {addOpen && (
        <Card className="mb-4 border-amber-300">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm">➕ New Ticker Message</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs">Message *</Label>
              <Textarea
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                placeholder="Enter ticker message..."
                rows={2}
                className="mt-1"
                data-ocid="ticker.textarea"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={newActive}
                onCheckedChange={setNewActive}
                data-ocid="ticker.switch"
              />
              <Label className="text-xs">Active</Label>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAdd}
                className="text-gray-900 font-semibold"
                style={{ background: "#FFC107" }}
                data-ocid="ticker.submit_button"
              >
                Add Ticker
              </Button>
              <Button
                variant="outline"
                onClick={() => setAddOpen(false)}
                data-ocid="ticker.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Edit Form */}
      {editItem && (
        <Card className="mb-4 border-blue-300">
          <CardHeader className="pb-2 pt-3">
            <CardTitle className="text-sm">✏️ Edit Ticker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Label className="text-xs">Message *</Label>
              <Textarea
                value={editItem.message}
                onChange={(e) =>
                  setEditItem({ ...editItem, message: e.target.value })
                }
                rows={2}
                className="mt-1"
                data-ocid="ticker.textarea"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={editItem.active}
                onCheckedChange={(v) => setEditItem({ ...editItem, active: v })}
                data-ocid="ticker.switch"
              />
              <Label className="text-xs">Active</Label>
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleUpdate}
                className="text-gray-900 font-semibold"
                style={{ background: "#FFC107" }}
                data-ocid="ticker.save_button"
              >
                Save
              </Button>
              <Button
                variant="outline"
                onClick={() => setEditItem(null)}
                data-ocid="ticker.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Ticker List */}
      <div className="space-y-3">
        {state.tickers.length === 0 && (
          <div
            className="text-center py-10 text-gray-400"
            data-ocid="ticker.empty_state"
          >
            No tickers yet. Add one!
          </div>
        )}
        {state.tickers.map((ticker, idx) => (
          <Card
            key={ticker.id}
            className="overflow-hidden"
            data-ocid={`ticker.item.${idx + 1}`}
          >
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-800 leading-snug truncate">
                    {ticker.message}
                  </p>
                  <div className="mt-1">
                    <Badge
                      variant={ticker.active ? "default" : "secondary"}
                      className={
                        ticker.active ? "bg-green-100 text-green-800" : ""
                      }
                    >
                      {ticker.active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-blue-600 hover:bg-blue-50"
                    onClick={() => setEditItem(ticker)}
                    data-ocid={`ticker.edit_button.${idx + 1}`}
                  >
                    <Edit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-red-600 hover:bg-red-50"
                    onClick={() => handleDelete(ticker.id)}
                    data-ocid={`ticker.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
