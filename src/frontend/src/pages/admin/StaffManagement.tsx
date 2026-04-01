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
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { Staff } from "../../types";

export function StaffManagement() {
  const { state, addStaff, updateStaff, deleteStaff } = useApp();
  const [addOpen, setAddOpen] = useState(false);
  const [editStaff, setEditStaff] = useState<Staff | null>(null);
  const emptyForm = {
    name: "",
    role: "Field Officer" as Staff["role"],
    mobile: "",
    branchId: "b1",
    salary: "18000",
    password: "",
    joiningDate: new Date().toISOString().split("T")[0],
    tasks: [] as string[],
  };
  const [form, setForm] = useState(emptyForm);

  const handleAdd = () => {
    if (!form.name || !form.mobile || !form.password) {
      toast.error("Fill required fields");
      return;
    }
    addStaff({ ...form, salary: Number.parseInt(form.salary) || 15000 });
    toast.success("Staff added!");
    setAddOpen(false);
    setForm(emptyForm);
  };

  const handleUpdate = () => {
    if (!editStaff) return;
    updateStaff({
      ...editStaff,
      ...form,
      salary: Number.parseInt(form.salary) || editStaff.salary,
    });
    toast.success("Staff updated!");
    setEditStaff(null);
  };

  const openEdit = (s: Staff) => {
    setEditStaff(s);
    setForm({
      name: s.name,
      role: s.role,
      mobile: s.mobile,
      branchId: s.branchId,
      salary: String(s.salary),
      password: s.password,
      joiningDate: s.joiningDate,
      tasks: s.tasks,
    });
  };

  const StaffForm = ({
    onSubmit,
    submitLabel,
  }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="space-y-3">
      <div>
        <Label className="text-xs">Full Name *</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
          data-ocid="staff.input"
        />
      </div>
      <div>
        <Label className="text-xs">Role</Label>
        <Select
          value={form.role}
          onValueChange={(v) =>
            setForm((p) => ({ ...p, role: v as Staff["role"] }))
          }
        >
          <SelectTrigger data-ocid="staff.select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Field Officer">Field Officer</SelectItem>
            <SelectItem value="Coordinator">Coordinator</SelectItem>
            <SelectItem value="Office Staff">Office Staff</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <Label className="text-xs">Mobile *</Label>
          <Input
            value={form.mobile}
            onChange={(e) => setForm((p) => ({ ...p, mobile: e.target.value }))}
            data-ocid="staff.input"
          />
        </div>
        <div>
          <Label className="text-xs">Salary</Label>
          <Input
            type="number"
            value={form.salary}
            onChange={(e) => setForm((p) => ({ ...p, salary: e.target.value }))}
            data-ocid="staff.input"
          />
        </div>
      </div>
      <div>
        <Label className="text-xs">Branch</Label>
        <Select
          value={form.branchId}
          onValueChange={(v) => setForm((p) => ({ ...p, branchId: v }))}
        >
          <SelectTrigger data-ocid="staff.select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {state.branches.map((b) => (
              <SelectItem key={b.id} value={b.id}>
                {b.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-xs">Password *</Label>
        <Input
          type="password"
          value={form.password}
          onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))}
          data-ocid="staff.input"
        />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onSubmit}
          className="flex-1 text-gray-900 font-bold"
          style={{ background: "#FFC107" }}
          data-ocid="staff.submit_button"
        >
          {submitLabel}
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setAddOpen(false);
            setEditStaff(null);
          }}
          data-ocid="staff.cancel_button"
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
          Staff Management
        </h1>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button
              className="text-gray-900 font-bold text-xs"
              style={{ background: "#FFC107" }}
              data-ocid="staff.open_modal_button"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Staff
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="staff.dialog">
            <DialogHeader>
              <DialogTitle>Add New Staff</DialogTitle>
            </DialogHeader>
            <StaffForm onSubmit={handleAdd} submitLabel="Add Staff" />
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="staff.table">
            <thead>
              <tr style={{ background: "#FFC107" }}>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  #
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  Name
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800 hidden sm:table-cell">
                  Role
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800 hidden md:table-cell">
                  Branch
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  Salary
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {state.staff.map((s, idx) => (
                <tr
                  key={s.id}
                  className="table-row-alt border-b border-gray-100"
                  data-ocid={`staff.item.${idx + 1}`}
                >
                  <td className="px-3 py-2 text-gray-500 text-xs">{idx + 1}</td>
                  <td className="px-3 py-2">
                    <p className="font-semibold text-xs text-gray-800">
                      {s.name}
                    </p>
                    <p className="text-gray-400 text-[10px] sm:hidden">
                      {s.role}
                    </p>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600 hidden sm:table-cell">
                    {s.role}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600 hidden md:table-cell">
                    {state.branches.find((b) => b.id === s.branchId)?.name ||
                      "-"}
                  </td>
                  <td className="px-3 py-2 text-xs font-semibold text-green-700">
                    ₹{s.salary.toLocaleString()}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(s)}
                        className="p-1 rounded text-blue-500 hover:bg-blue-50"
                        data-ocid={`staff.edit_button.${idx + 1}`}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          deleteStaff(s.id);
                          toast.success("Staff removed");
                        }}
                        className="p-1 rounded text-red-500 hover:bg-red-50"
                        data-ocid={`staff.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit dialog */}
      <Dialog open={!!editStaff} onOpenChange={() => setEditStaff(null)}>
        <DialogContent data-ocid="staff.dialog">
          <DialogHeader>
            <DialogTitle>Edit Staff - {editStaff?.name}</DialogTitle>
          </DialogHeader>
          <StaffForm onSubmit={handleUpdate} submitLabel="Update Staff" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
