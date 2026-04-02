import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Plus, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { Loan } from "../../types";

export function LoanManagement() {
  const { state, approveLoan, rejectLoan, addLoan } = useApp();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [remarks, setRemarks] = useState("");
  const [action, setAction] = useState<"approve" | "reject" | null>(null);

  // Admin direct loan
  const [directOpen, setDirectOpen] = useState(false);
  const [directForm, setDirectForm] = useState({
    shgId: "",
    amount: "",
    purpose: "",
  });

  const filtered = state.loans.filter((l) => {
    const matchSearch = l.shgName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleAction = () => {
    if (!selectedLoan || !action) return;
    if (action === "approve") {
      approveLoan(selectedLoan.id, remarks);
      toast.success("Loan approved successfully!");
    } else {
      rejectLoan(selectedLoan.id, remarks);
      toast.error("Loan rejected.");
    }
    setSelectedLoan(null);
    setRemarks("");
    setAction(null);
  };

  const handleDirectLoan = () => {
    if (!directForm.shgId || !directForm.amount || !directForm.purpose) {
      toast.error("Please fill all fields");
      return;
    }
    const shg = state.shgs.find((s) => s.id === directForm.shgId);
    if (!shg) return;
    addLoan({
      shgId: directForm.shgId,
      shgName: shg.groupName,
      amount: Number(directForm.amount),
      purpose: directForm.purpose,
      status: "approved",
      approvedDate: new Date().toISOString().split("T")[0],
      remarks: "Directly approved by Admin",
    });
    toast.success(
      `Loan of ₹${directForm.amount} directly approved for ${shg.groupName}!`,
    );
    setDirectForm({ shgId: "", amount: "", purpose: "" });
    setDirectOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="font-heading font-bold text-xl text-gray-900">
          Loan Management
        </h1>
        <Button
          onClick={() => setDirectOpen(true)}
          className="text-gray-900 font-bold text-xs"
          style={{ background: "#FFC107" }}
          data-ocid="loan.open_modal_button"
        >
          <Plus className="h-4 w-4 mr-1" /> Admin Direct Loan
        </Button>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            className="pl-9"
            placeholder="Search by SHG name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            data-ocid="loan.search_input"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-36" data-ocid="loan.select">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="loan.table">
            <thead>
              <tr style={{ background: "#FFC107" }}>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  #
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  SHG Name
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  Amount
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800 hidden sm:table-cell">
                  Purpose
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
              {filtered.map((loan, idx) => (
                <tr
                  key={loan.id}
                  className="border-b border-gray-100 hover:bg-amber-50"
                  data-ocid={`loan.row.${idx + 1}`}
                >
                  <td className="px-3 py-2 text-xs text-gray-500">{idx + 1}</td>
                  <td className="px-3 py-2">
                    <span className="font-semibold text-xs text-gray-800">
                      {loan.shgName}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs font-semibold text-gray-800">
                    ₹{loan.amount.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600 hidden sm:table-cell">
                    <span className="line-clamp-1">{loan.purpose}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        loan.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : loan.status === "rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {loan.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {loan.status === "pending" && (
                      <div className="flex gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-green-600 hover:bg-green-50"
                          onClick={() => {
                            setSelectedLoan(loan);
                            setAction("approve");
                          }}
                          data-ocid={`loan.edit_button.${idx + 1}`}
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 text-red-600 hover:bg-red-50"
                          onClick={() => {
                            setSelectedLoan(loan);
                            setAction("reject");
                          }}
                          data-ocid={`loan.delete_button.${idx + 1}`}
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    {loan.status !== "pending" && (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="text-center py-8 text-gray-400"
                    data-ocid="loan.empty_state"
                  >
                    No loans found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Approve/Reject Dialog */}
      <Dialog
        open={!!selectedLoan}
        onOpenChange={(o) => {
          if (!o) {
            setSelectedLoan(null);
            setRemarks("");
            setAction(null);
          }
        }}
      >
        <DialogContent data-ocid="loan.dialog">
          <DialogHeader>
            <DialogTitle>
              {action === "approve" ? "✅ Approve Loan" : "❌ Reject Loan"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-sm text-gray-600">
              SHG: <strong>{selectedLoan?.shgName}</strong> | Amount:{" "}
              <strong>₹{selectedLoan?.amount?.toLocaleString()}</strong>
            </p>
            <div>
              <Label className="text-xs">Remarks (optional)</Label>
              <Textarea
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={2}
                className="mt-1"
                placeholder="Add remarks..."
                data-ocid="loan.textarea"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleAction}
                className="flex-1 text-gray-900 font-semibold"
                style={{
                  background: action === "approve" ? "#4CAF50" : "#F44336",
                  color: "white",
                }}
                data-ocid="loan.confirm_button"
              >
                {action === "approve" ? "✅ Approve" : "❌ Reject"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setSelectedLoan(null);
                  setRemarks("");
                  setAction(null);
                }}
                data-ocid="loan.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Admin Direct Loan Dialog */}
      <Dialog open={directOpen} onOpenChange={setDirectOpen}>
        <DialogContent data-ocid="loan.dialog">
          <DialogHeader>
            <DialogTitle>💰 Admin Direct Loan Approval</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <p className="text-xs text-gray-500">
              Admin सीधे किसी SHG को loan approve कर सकते हैं।
            </p>
            <div>
              <Label className="text-xs">Select SHG *</Label>
              <Select
                value={directForm.shgId}
                onValueChange={(v) =>
                  setDirectForm((p) => ({ ...p, shgId: v }))
                }
              >
                <SelectTrigger className="mt-1" data-ocid="loan.select">
                  <SelectValue placeholder="Select SHG..." />
                </SelectTrigger>
                <SelectContent>
                  {state.shgs
                    .filter((s) => s.status === "approved")
                    .map((shg) => (
                      <SelectItem key={shg.id} value={shg.id}>
                        {shg.groupName} - {shg.leaderName}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Loan Amount (₹) *</Label>
              <Input
                type="number"
                value={directForm.amount}
                onChange={(e) =>
                  setDirectForm((p) => ({ ...p, amount: e.target.value }))
                }
                placeholder="e.g. 50000"
                className="mt-1"
                data-ocid="loan.input"
              />
            </div>
            <div>
              <Label className="text-xs">Purpose *</Label>
              <Textarea
                value={directForm.purpose}
                onChange={(e) =>
                  setDirectForm((p) => ({ ...p, purpose: e.target.value }))
                }
                rows={2}
                placeholder="Loan purpose..."
                className="mt-1"
                data-ocid="loan.textarea"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleDirectLoan}
                className="flex-1 text-gray-900 font-semibold"
                style={{ background: "#FFC107" }}
                data-ocid="loan.confirm_button"
              >
                ✅ Create & Approve Loan
              </Button>
              <Button
                variant="outline"
                onClick={() => setDirectOpen(false)}
                data-ocid="loan.cancel_button"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
