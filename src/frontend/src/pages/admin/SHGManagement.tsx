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
import { CheckCircle, Eye, Plus, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { SHG } from "../../types";

export function SHGManagement() {
  const { state, approveSHG, rejectSHG, addSHG } = useApp();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedSHG, setSelectedSHG] = useState<SHG | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    groupName: "",
    leaderName: "",
    mobile: "",
    address: "",
    branchId: "b1",
    memberCount: "10",
    password: "",
  });

  const filtered = state.shgs.filter((s) => {
    const matchSearch =
      s.groupName.toLowerCase().includes(search.toLowerCase()) ||
      s.leaderName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || s.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleAdd = () => {
    if (!form.groupName || !form.leaderName || !form.mobile || !form.password) {
      toast.error("Please fill all required fields");
      return;
    }
    addSHG({
      ...form,
      status: "pending",
      walletBalance: 0,
      joinedDate: new Date().toISOString().split("T")[0],
      memberCount: Number.parseInt(form.memberCount) || 10,
      referralCode: `REF${Date.now().toString().slice(-4)}`,
    });
    toast.success("SHG registered successfully!");
    setAddOpen(false);
    setForm({
      groupName: "",
      leaderName: "",
      mobile: "",
      address: "",
      branchId: "b1",
      memberCount: "10",
      password: "",
    });
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-heading font-bold text-xl text-gray-900">
          SHG Management
        </h1>
        <Dialog open={addOpen} onOpenChange={setAddOpen}>
          <DialogTrigger asChild>
            <Button
              className="text-gray-900 font-bold text-xs"
              style={{ background: "#FFC107" }}
              data-ocid="shg.open_modal_button"
            >
              <Plus className="h-4 w-4 mr-1" /> Add SHG
            </Button>
          </DialogTrigger>
          <DialogContent data-ocid="shg.dialog">
            <DialogHeader>
              <DialogTitle>Register New SHG</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Group Name *</Label>
                <Input
                  value={form.groupName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, groupName: e.target.value }))
                  }
                  data-ocid="shg.input"
                />
              </div>
              <div>
                <Label className="text-xs">Leader Name *</Label>
                <Input
                  value={form.leaderName}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, leaderName: e.target.value }))
                  }
                  data-ocid="shg.input"
                />
              </div>
              <div>
                <Label className="text-xs">Mobile *</Label>
                <Input
                  value={form.mobile}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, mobile: e.target.value }))
                  }
                  data-ocid="shg.input"
                />
              </div>
              <div>
                <Label className="text-xs">Address</Label>
                <Input
                  value={form.address}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, address: e.target.value }))
                  }
                  data-ocid="shg.input"
                />
              </div>
              <div>
                <Label className="text-xs">Branch</Label>
                <Select
                  value={form.branchId}
                  onValueChange={(v) => setForm((p) => ({ ...p, branchId: v }))}
                >
                  <SelectTrigger data-ocid="shg.select">
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
                  onChange={(e) =>
                    setForm((p) => ({ ...p, password: e.target.value }))
                  }
                  data-ocid="shg.input"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAdd}
                  className="flex-1 text-gray-900 font-bold"
                  style={{ background: "#FFC107" }}
                  data-ocid="shg.submit_button"
                >
                  Register SHG
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setAddOpen(false)}
                  data-ocid="shg.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Search SHG..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="shg.search_input"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-36" data-ocid="shg.select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="shg.table">
            <thead>
              <tr style={{ background: "#FFC107" }}>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  #
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  Group Name
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800 hidden sm:table-cell">
                  Leader
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800 hidden md:table-cell">
                  Mobile
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  Status
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((shg, idx) => (
                <tr
                  key={shg.id}
                  className="table-row-alt border-b border-gray-100"
                  data-ocid={`shg.item.${idx + 1}`}
                >
                  <td className="px-3 py-2 text-gray-500 text-xs">{idx + 1}</td>
                  <td className="px-3 py-2">
                    <p className="font-semibold text-xs text-gray-800">
                      {shg.groupName}
                    </p>
                    <p className="text-gray-400 text-[10px] sm:hidden">
                      {shg.leaderName}
                    </p>
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600 hidden sm:table-cell">
                    {shg.leaderName}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600 hidden md:table-cell">
                    {shg.mobile}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold badge-${shg.status}`}
                    >
                      {shg.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => setSelectedSHG(shg)}
                        className="p-1 rounded text-blue-500 hover:bg-blue-50"
                        data-ocid={`shg.edit_button.${idx + 1}`}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      {shg.status === "pending" && (
                        <>
                          <button
                            type="button"
                            onClick={() => {
                              approveSHG(shg.id);
                              toast.success(`${shg.groupName} approved!`);
                            }}
                            className="p-1 rounded text-green-600 hover:bg-green-50"
                            data-ocid={`shg.confirm_button.${idx + 1}`}
                          >
                            <CheckCircle className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              rejectSHG(shg.id);
                              toast.error(`${shg.groupName} rejected.`);
                            }}
                            className="p-1 rounded text-red-500 hover:bg-red-50"
                            data-ocid={`shg.delete_button.${idx + 1}`}
                          >
                            <XCircle className="h-3.5 w-3.5" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div
            className="text-center py-8 text-gray-400"
            data-ocid="shg.empty_state"
          >
            No SHGs found
          </div>
        )}
      </div>

      {/* Detail dialog */}
      {selectedSHG && (
        <Dialog open={!!selectedSHG} onOpenChange={() => setSelectedSHG(null)}>
          <DialogContent data-ocid="shg.dialog">
            <DialogHeader>
              <DialogTitle>{selectedSHG.groupName}</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-2">
                {[
                  ["Leader", selectedSHG.leaderName],
                  ["Mobile", selectedSHG.mobile],
                  ["Status", selectedSHG.status.toUpperCase()],
                  ["Members", selectedSHG.memberCount],
                  [
                    "Branch",
                    state.branches.find((b) => b.id === selectedSHG.branchId)
                      ?.name || "N/A",
                  ],
                  ["Wallet", `₹${selectedSHG.walletBalance.toLocaleString()}`],
                  ["Joined", selectedSHG.joinedDate],
                  ["Address", selectedSHG.address],
                ].map(([k, v]) => (
                  <div key={k as string} className="bg-gray-50 rounded p-2">
                    <p className="text-[10px] text-gray-500">{k}</p>
                    <p className="font-semibold text-xs text-gray-800">{v}</p>
                  </div>
                ))}
              </div>
            </div>
            <Button
              onClick={() => setSelectedSHG(null)}
              variant="outline"
              className="w-full"
              data-ocid="shg.close_button"
            >
              Close
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
