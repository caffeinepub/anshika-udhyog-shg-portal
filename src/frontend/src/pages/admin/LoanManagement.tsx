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
import { CheckCircle, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { Loan } from "../../types";

export function LoanManagement() {
  const { state, approveLoan, rejectLoan } = useApp();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null);
  const [remarks, setRemarks] = useState("");
  const [action, setAction] = useState<"approve" | "reject" | null>(null);

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

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        Loan Management
      </h1>

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
                  className="table-row-alt border-b border-gray-100"
                  data-ocid={`loan.item.${idx + 1}`}
                >
                  <td className="px-3 py-2 text-gray-500 text-xs">{idx + 1}</td>
                  <td className="px-3 py-2 font-semibold text-xs text-gray-800">
                    {loan.shgName}
                  </td>
                  <td className="px-3 py-2 text-xs font-bold text-green-700">
                    ₹{loan.amount.toLocaleString()}
                  </td>
                  <td className="px-3 py-2 text-xs text-gray-600 hidden sm:table-cell max-w-xs truncate">
                    {loan.purpose}
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold badge-${loan.status}`}
                    >
                      {loan.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    {loan.status === "pending" && (
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLoan(loan);
                            setAction("approve");
                          }}
                          className="p-1 rounded text-green-600 hover:bg-green-50"
                          data-ocid={`loan.confirm_button.${idx + 1}`}
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedLoan(loan);
                            setAction("reject");
                          }}
                          className="p-1 rounded text-red-500 hover:bg-red-50"
                          data-ocid={`loan.delete_button.${idx + 1}`}
                        >
                          <XCircle className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    )}
                    {loan.status !== "pending" && (
                      <span className="text-xs text-gray-400">
                        {loan.approvedDate || "-"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div
            className="text-center py-8 text-gray-400"
            data-ocid="loan.empty_state"
          >
            No loans found
          </div>
        )}
      </div>

      {/* Confirm dialog */}
      <Dialog
        open={!!selectedLoan && !!action}
        onOpenChange={() => {
          setSelectedLoan(null);
          setAction(null);
        }}
      >
        <DialogContent data-ocid="loan.dialog">
          <DialogHeader>
            <DialogTitle>
              {action === "approve" ? "✅ Approve Loan" : "❌ Reject Loan"}
            </DialogTitle>
          </DialogHeader>
          {selectedLoan && (
            <div className="space-y-3">
              <div className="bg-gray-50 rounded p-3 text-sm">
                <p>
                  <strong>SHG:</strong> {selectedLoan.shgName}
                </p>
                <p>
                  <strong>Amount:</strong> ₹
                  {selectedLoan.amount.toLocaleString()}
                </p>
                <p>
                  <strong>Purpose:</strong> {selectedLoan.purpose}
                </p>
              </div>
              <div>
                <Label className="text-xs">Remarks (optional)</Label>
                <Input
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Add remarks..."
                  data-ocid="loan.input"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={handleAction}
                  className="flex-1 font-bold text-white"
                  style={{
                    background: action === "approve" ? "#2e7d32" : "#c62828",
                  }}
                  data-ocid="loan.confirm_button"
                >
                  {action === "approve" ? "Approve" : "Reject"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSelectedLoan(null);
                    setAction(null);
                  }}
                  data-ocid="loan.cancel_button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
