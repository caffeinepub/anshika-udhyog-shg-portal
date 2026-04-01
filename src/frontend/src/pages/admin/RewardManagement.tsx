import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Shuffle, Trophy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

const PRIZES = [
  "Scooty",
  "Car",
  "TV",
  "Washing Machine",
  "Cooler",
  "AC",
  "Mobile Phone",
  "Cash Prize ₹5000",
];

export function RewardManagement() {
  const { state, addReward, luckyDraw } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [luckyWinner, setLuckyWinner] = useState<string | null>(null);
  const [form, setForm] = useState({
    type: "lucky_draw" as "lucky_draw" | "best_performer",
    prize: "Scooty",
    winnerSHGId: "",
    description: "",
  });

  const handleLuckyDraw = () => {
    const winnerId = luckyDraw();
    if (!winnerId) {
      toast.error("No eligible SHGs");
      return;
    }
    setLuckyWinner(winnerId);
    setForm((p) => ({ ...p, winnerSHGId: winnerId }));
    toast.success("Lucky Draw completed!");
  };

  const handleAdd = () => {
    if (!form.winnerSHGId || !form.prize) {
      toast.error("Please select winner and prize");
      return;
    }
    const winner = state.shgs.find((s) => s.id === form.winnerSHGId);
    if (!winner) {
      toast.error("Invalid SHG selected");
      return;
    }
    addReward({ ...form, winnerName: winner.groupName });
    toast.success("Reward announced!");
    setAddOpen(false);
    setLuckyWinner(null);
    setForm({
      type: "lucky_draw",
      prize: "Scooty",
      winnerSHGId: "",
      description: "",
    });
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-heading font-bold text-xl text-gray-900">
          Reward Management
        </h1>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button
              className="text-gray-900 font-bold text-xs"
              style={{ background: "#FFC107" }}
              data-ocid="reward.open_modal_button"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Reward
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="reward.dialog">
            <DialogHeader>
              <DialogTitle>Announce Reward</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Reward Type</Label>
                <Select
                  value={form.type}
                  onValueChange={(v) =>
                    setForm((p) => ({
                      ...p,
                      type: v as "lucky_draw" | "best_performer",
                      winnerSHGId: "",
                    }))
                  }
                >
                  <SelectTrigger data-ocid="reward.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lucky_draw">🎰 Lucky Draw</SelectItem>
                    <SelectItem value="best_performer">
                      🏆 Best Performer
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {form.type === "lucky_draw" && (
                <Button
                  onClick={handleLuckyDraw}
                  className="w-full text-gray-900 font-bold"
                  style={{ background: "#FFC107" }}
                  data-ocid="reward.primary_button"
                >
                  <Shuffle className="h-4 w-4 mr-2" />
                  Run Lucky Draw
                </Button>
              )}

              {luckyWinner && form.type === "lucky_draw" && (
                <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-600">Lucky Winner:</p>
                  <p className="font-bold text-lg text-yellow-700">
                    {state.shgs.find((s) => s.id === luckyWinner)?.groupName}
                  </p>
                </div>
              )}

              {form.type === "best_performer" && (
                <div>
                  <Label className="text-xs">Select Winner SHG</Label>
                  <Select
                    value={form.winnerSHGId}
                    onValueChange={(v) =>
                      setForm((p) => ({ ...p, winnerSHGId: v }))
                    }
                  >
                    <SelectTrigger data-ocid="reward.select">
                      <SelectValue placeholder="Select SHG" />
                    </SelectTrigger>
                    <SelectContent>
                      {state.shgs
                        .filter((s) => s.status === "approved")
                        .map((s) => (
                          <SelectItem key={s.id} value={s.id}>
                            {s.groupName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label className="text-xs">Prize</Label>
                <Select
                  value={form.prize}
                  onValueChange={(v) => setForm((p) => ({ ...p, prize: v }))}
                >
                  <SelectTrigger data-ocid="reward.select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIZES.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-xs">Description</Label>
                <Input
                  value={form.description}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, description: e.target.value }))
                  }
                  data-ocid="reward.input"
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleAdd}
                  className="flex-1 text-gray-900 font-bold"
                  style={{ background: "#FFC107" }}
                  data-ocid="reward.submit_button"
                >
                  Announce
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setAddOpen(false)}
                  data-ocid="reward.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4" data-ocid="reward.list">
        {state.rewards.map((r, idx) => (
          <div
            key={r.id}
            className="bg-white rounded-xl shadow-card p-4 flex items-start gap-4"
            data-ocid={`reward.item.${idx + 1}`}
          >
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center text-2xl shrink-0"
              style={{
                background: r.type === "lucky_draw" ? "#FFF3CD" : "#E8F5E9",
              }}
            >
              {r.type === "lucky_draw" ? "🎰" : "🏆"}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-600" />
                <span className="font-heading font-bold text-sm text-gray-800">
                  {r.prize}
                </span>
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "#FFF3CD", color: "#856404" }}
                >
                  {r.type === "lucky_draw" ? "Lucky Draw" : "Best Performer"}
                </span>
              </div>
              <p className="text-sm font-semibold text-green-700 mt-1">
                🏅 Winner: {r.winnerName}
              </p>
              <p className="text-xs text-gray-500 mt-0.5">{r.description}</p>
              <p className="text-xs text-gray-400 mt-1">{r.announcedDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
