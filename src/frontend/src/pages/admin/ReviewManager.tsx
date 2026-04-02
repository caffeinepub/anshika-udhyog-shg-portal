import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { TeamReview } from "../../types";

const EMPTY: Omit<TeamReview, "id"> = {
  memberName: "",
  photo: "",
  rating: 5,
  message: "",
  active: true,
};
const COLORS = [
  "#FFC107",
  "#1565c0",
  "#2e7d32",
  "#6a1b9a",
  "#c62828",
  "#00695c",
];

export function ReviewManager() {
  const { state, addTeamReview, updateTeamReview, deleteTeamReview } = useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<TeamReview | null>(null);
  const [form, setForm] = useState<Omit<TeamReview, "id">>(EMPTY);
  const photoRef = useRef<HTMLInputElement>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (r: TeamReview) => {
    setEditing(r);
    setForm({
      memberName: r.memberName,
      photo: r.photo,
      rating: r.rating,
      message: r.message,
      active: r.active,
    });
    setOpen(true);
  };

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((p) => ({ ...p, photo: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.memberName.trim() || !form.message.trim()) {
      toast.error("Name and message required");
      return;
    }
    if (editing) {
      updateTeamReview({ ...editing, ...form });
      toast.success("Review updated!");
    } else {
      addTeamReview(form);
      toast.success("Review added!");
    }
    setOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-heading font-bold text-xl text-gray-900">
          💬 Happy Reviews Manager
        </h1>
        <Button
          onClick={openAdd}
          className="text-gray-900 font-semibold"
          style={{ background: "#FFC107" }}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Review
        </Button>
      </div>
      {state.teamReviews.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-2">💬</p>
          <p className="text-sm">No reviews yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {state.teamReviews.map((r, idx) => (
            <Card key={r.id} className="border-0 shadow-card">
              <CardContent className="p-3 flex items-start gap-3">
                {r.photo ? (
                  <img
                    src={r.photo}
                    alt={r.memberName}
                    className="h-12 w-12 rounded-full object-cover border-2 border-amber-300 shrink-0"
                  />
                ) : (
                  <div
                    className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold border-2 border-amber-300 shrink-0"
                    style={{ background: COLORS[idx % COLORS.length] }}
                  >
                    {r.memberName.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-gray-900">
                      {r.memberName}
                    </p>
                    <span className="text-xs">{"⭐".repeat(r.rating)}</span>
                  </div>
                  <p className="text-xs text-gray-500 italic mt-0.5">
                    "{r.message}"
                  </p>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full mt-1 inline-block ${r.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {r.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => openEdit(r)}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-red-500"
                    onClick={() => {
                      deleteTeamReview(r.id);
                      toast.success("Deleted");
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit Review" : "Add Review"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt=""
                  className="h-12 w-12 rounded-full object-cover border-2 border-amber-300"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-amber-200 flex items-center justify-center text-2xl">
                  👤
                </div>
              )}
              <div>
                <input
                  ref={photoRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhoto}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => photoRef.current?.click()}
                >
                  Upload Photo
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-xs">Member Name *</Label>
              <Input
                value={form.memberName}
                onChange={(e) =>
                  setForm((p) => ({ ...p, memberName: e.target.value }))
                }
                placeholder="Reviewer name"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Rating</Label>
              <Select
                value={String(form.rating)}
                onValueChange={(v) =>
                  setForm((p) => ({ ...p, rating: Number(v) }))
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[5, 4, 3, 2, 1].map((n) => (
                    <SelectItem key={n} value={String(n)}>
                      {"⭐".repeat(n)} ({n}/5)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Message *</Label>
              <Textarea
                value={form.message}
                onChange={(e) =>
                  setForm((p) => ({ ...p, message: e.target.value }))
                }
                placeholder="Review message..."
                rows={3}
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.active}
                onCheckedChange={(v) => setForm((p) => ({ ...p, active: v }))}
              />
              <Label className="text-xs">Show on Homepage</Label>
            </div>
            <div className="flex gap-2 pt-1">
              <Button
                onClick={handleSave}
                className="flex-1 text-gray-900 font-semibold"
                style={{ background: "#FFC107" }}
              >
                Save
              </Button>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
