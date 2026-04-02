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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Edit, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { Award } from "../../types";

const EMPTY: Omit<Award, "id"> = {
  title: "",
  description: "",
  imageUrl: "",
  year: "",
  active: true,
};
const TROPHIES = ["🏆", "🥇", "🌟", "🎖️"];

export function AwardManager() {
  const { state, addAward, updateAward, deleteAward } = useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Award | null>(null);
  const [form, setForm] = useState<Omit<Award, "id">>(EMPTY);
  const imgRef = useRef<HTMLInputElement>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (a: Award) => {
    setEditing(a);
    setForm({
      title: a.title,
      description: a.description,
      imageUrl: a.imageUrl,
      year: a.year,
      active: a.active,
    });
    setOpen(true);
  };

  const handleImg = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setForm((p) => ({ ...p, imageUrl: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      toast.error("Title required");
      return;
    }
    if (editing) {
      updateAward({ ...editing, ...form });
      toast.success("Award updated!");
    } else {
      addAward(form);
      toast.success("Award added!");
    }
    setOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-heading font-bold text-xl text-gray-900">
          🏆 Awards Manager
        </h1>
        <Button
          onClick={openAdd}
          className="text-gray-900 font-semibold"
          style={{ background: "#FFC107" }}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Award
        </Button>
      </div>
      {state.awards.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-2">🏆</p>
          <p className="text-sm">No awards yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {state.awards.map((a, idx) => (
            <Card key={a.id} className="border-0 shadow-card overflow-hidden">
              <div
                className="h-1.5"
                style={{
                  background: "linear-gradient(135deg, #FFC107, #FF8F00)",
                }}
              />
              <CardContent className="p-3 flex items-start gap-3">
                {a.imageUrl ? (
                  <img
                    src={a.imageUrl}
                    alt={a.title}
                    className="h-12 w-12 rounded-full object-cover border-2 border-amber-300 shrink-0"
                  />
                ) : (
                  <div
                    className="h-12 w-12 rounded-full flex items-center justify-center text-2xl border-2 border-amber-200 shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #FFF8E1, #FFE082)",
                    }}
                  >
                    {TROPHIES[idx % 4]}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-sm text-gray-900 truncate flex-1">
                      {a.title}
                    </p>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-full shrink-0">
                      {a.year}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                    {a.description}
                  </p>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full mt-1 inline-block ${a.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {a.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => openEdit(a)}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-red-500"
                    onClick={() => {
                      deleteAward(a.id);
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
            <DialogTitle>{editing ? "Edit Award" : "Add Award"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {form.imageUrl ? (
                <img
                  src={form.imageUrl}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover border-2 border-amber-300"
                />
              ) : (
                <div
                  className="h-14 w-14 rounded-full flex items-center justify-center text-3xl"
                  style={{
                    background: "linear-gradient(135deg, #FFF8E1, #FFE082)",
                  }}
                >
                  🏆
                </div>
              )}
              <div className="space-y-1">
                <input
                  ref={imgRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImg}
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => imgRef.current?.click()}
                >
                  Upload Image
                </Button>
              </div>
            </div>
            <div>
              <Label className="text-xs">Title *</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm((p) => ({ ...p, title: e.target.value }))
                }
                placeholder="Award title"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Year</Label>
              <Input
                value={form.year}
                onChange={(e) =>
                  setForm((p) => ({ ...p, year: e.target.value }))
                }
                placeholder="e.g. 2023"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm((p) => ({ ...p, description: e.target.value }))
                }
                placeholder="Award description..."
                rows={2}
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Or Image URL</Label>
              <Input
                value={form.imageUrl}
                onChange={(e) =>
                  setForm((p) => ({ ...p, imageUrl: e.target.value }))
                }
                placeholder="https://..."
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
