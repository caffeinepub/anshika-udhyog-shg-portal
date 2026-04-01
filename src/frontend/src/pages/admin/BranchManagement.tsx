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
import { Building2, Pencil, Plus, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { Branch } from "../../types";

export function BranchManagement() {
  const { state, addBranch, updateBranch, deleteBranch } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [editBranch, setEditBranch] = useState<Branch | null>(null);
  const emptyForm = {
    name: "",
    city: "",
    address: "",
    managerName: "",
    mobile: "",
  };
  const [form, setForm] = useState(emptyForm);

  const handleAdd = () => {
    if (!form.name || !form.city) {
      toast.error("Name and city are required");
      return;
    }
    addBranch(form);
    toast.success("Branch added!");
    setAddOpen(false);
    setForm(emptyForm);
  };

  const handleUpdate = () => {
    if (!editBranch) return;
    updateBranch({ ...editBranch, ...form });
    toast.success("Branch updated!");
    setEditBranch(null);
  };

  const BranchForm = ({
    onSubmit,
    submitLabel,
  }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs">Branch Name *</Label>
          <Input
            value={form.name}
            onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
            data-ocid="branch.input"
          />
        </div>
        <div>
          <Label className="text-xs">City *</Label>
          <Input
            value={form.city}
            onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
            data-ocid="branch.input"
          />
        </div>
      </div>
      <div>
        <Label className="text-xs">Address</Label>
        <Input
          value={form.address}
          onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
          data-ocid="branch.input"
        />
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs">Manager Name</Label>
          <Input
            value={form.managerName}
            onChange={(e) =>
              setForm((p) => ({ ...p, managerName: e.target.value }))
            }
            data-ocid="branch.input"
          />
        </div>
        <div>
          <Label className="text-xs">Mobile</Label>
          <Input
            value={form.mobile}
            onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))}
            data-ocid="branch.input"
          />
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onSubmit}
          className="flex-1 text-gray-900 font-bold"
          style={{ background: "#FFC107" }}
          data-ocid="branch.submit_button"
        >
          {submitLabel}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setAddOpen(false);
            setEditBranch(null);
          }}
          data-ocid="branch.cancel_button"
        >
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-heading font-bold text-xl text-gray-900">
          Branch Management
        </h1>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button
              className="text-gray-900 font-bold text-xs"
              style={{ background: "#FFC107" }}
              data-ocid="branch.open_modal_button"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Branch
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="branch.dialog">
            <DialogHeader>
              <DialogTitle>Add New Branch</DialogTitle>
            </DialogHeader>
            <BranchForm onSubmit={handleAdd} submitLabel="Add Branch" />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {state.branches.map((b, idx) => {
          const branchStaff = state.staff.filter((s) => s.branchId === b.id);
          const branchSHGs = state.shgs.filter((s) => s.branchId === b.id);
          return (
            <div
              key={b.id}
              className="bg-white rounded-xl shadow-card p-4"
              data-ocid={`branch.item.${idx + 1}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center"
                    style={{ background: "#FFF8E1" }}
                  >
                    <Building2 className="h-5 w-5 text-yellow-700" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-sm text-gray-800">
                      {b.name}
                    </h3>
                    <p className="text-xs text-gray-500">{b.city}</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEditBranch(b);
                      setForm({
                        name: b.name,
                        city: b.city,
                        address: b.address,
                        managerName: b.managerName,
                        mobile: b.mobile,
                      });
                    }}
                    className="p-1 rounded text-blue-500 hover:bg-blue-50"
                    data-ocid={`branch.edit_button.${idx + 1}`}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      deleteBranch(b.id);
                      toast.success("Branch deleted");
                    }}
                    className="p-1 rounded text-red-500 hover:bg-red-50"
                    data-ocid={`branch.delete_button.${idx + 1}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mb-2">{b.address}</p>
              <div className="flex gap-3 text-xs">
                <span className="flex items-center gap-1 text-blue-600">
                  <Users className="h-3 w-3" /> {branchStaff.length} Staff
                </span>
                <span className="flex items-center gap-1 text-green-600">
                  <Users className="h-3 w-3" /> {branchSHGs.length} SHGs
                </span>
              </div>
              {b.managerName && (
                <p className="text-xs text-gray-400 mt-2">
                  Manager: {b.managerName}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <Dialog open={!!editBranch} onOpenChange={() => setEditBranch(null)}>
        <DialogContent data-ocid="branch.dialog">
          <DialogHeader>
            <DialogTitle>Edit Branch - {editBranch?.name}</DialogTitle>
          </DialogHeader>
          <BranchForm onSubmit={handleUpdate} submitLabel="Update Branch" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
