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
import { Edit, Plus, Trash2 } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { Member } from "../../types";

const EMPTY: Omit<Member, "id"> = {
  name: "",
  photo: "",
  location: "",
  designation: "",
  idNumber: "",
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

export function MemberManager() {
  const { state, addMember, updateMember, deleteMember } = useApp();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [form, setForm] = useState<Omit<Member, "id">>(EMPTY);
  const photoRef = useRef<HTMLInputElement>(null);

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setOpen(true);
  };
  const openEdit = (m: Member) => {
    setEditing(m);
    setForm({
      name: m.name,
      photo: m.photo,
      location: m.location,
      designation: m.designation,
      idNumber: m.idNumber,
      active: m.active,
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
    if (!form.name.trim() || !form.idNumber.trim()) {
      toast.error("Name and ID Number required");
      return;
    }
    if (editing) {
      updateMember({ ...editing, ...form });
      toast.success("Member updated!");
    } else {
      addMember(form);
      toast.success("Member added!");
    }
    setOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-heading font-bold text-xl text-gray-900">
          👥 Member Manager
        </h1>
        <Button
          onClick={openAdd}
          className="text-gray-900 font-semibold"
          style={{ background: "#FFC107" }}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Member
        </Button>
      </div>
      {state.members.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-4xl mb-2">👥</p>
          <p className="text-sm">No members yet. Add the first one!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {state.members.map((m, idx) => (
            <Card key={m.id} className="border-0 shadow-card">
              <CardContent className="p-3 flex items-center gap-3">
                {m.photo ? (
                  <img
                    src={m.photo}
                    alt={m.name}
                    className="h-12 w-12 rounded-full object-cover border-2 border-amber-300 shrink-0"
                  />
                ) : (
                  <div
                    className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold border-2 border-amber-300 shrink-0"
                    style={{ background: COLORS[idx % COLORS.length] }}
                  >
                    {m.name.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-gray-900 truncate">
                    {m.name}
                  </p>
                  <p className="text-xs text-amber-600">{m.designation}</p>
                  <p className="text-xs text-gray-500">
                    📍 {m.location} &bull; ID: {m.idNumber}
                  </p>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${m.active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                  >
                    {m.active ? "Active" : "Inactive"}
                  </span>
                </div>
                <div className="flex flex-col gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => openEdit(m)}
                  >
                    <Edit className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-red-500"
                    onClick={() => {
                      deleteMember(m.id);
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
            <DialogTitle>{editing ? "Edit Member" : "Add Member"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {form.photo ? (
                <img
                  src={form.photo}
                  alt=""
                  className="h-14 w-14 rounded-full object-cover border-2 border-amber-300"
                />
              ) : (
                <div className="h-14 w-14 rounded-full bg-amber-200 flex items-center justify-center text-2xl">
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
              <Label className="text-xs">Name *</Label>
              <Input
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                placeholder="Member name"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">ID Number *</Label>
              <Input
                value={form.idNumber}
                onChange={(e) =>
                  setForm((p) => ({ ...p, idNumber: e.target.value }))
                }
                placeholder="e.g. AUC001"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Designation</Label>
              <Input
                value={form.designation}
                onChange={(e) =>
                  setForm((p) => ({ ...p, designation: e.target.value }))
                }
                placeholder="e.g. Group Leader"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs">Location</Label>
              <Input
                value={form.location}
                onChange={(e) =>
                  setForm((p) => ({ ...p, location: e.target.value }))
                }
                placeholder="City / District"
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch
                checked={form.active}
                onCheckedChange={(v) => setForm((p) => ({ ...p, active: v }))}
              />
              <Label className="text-xs">Active</Label>
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
