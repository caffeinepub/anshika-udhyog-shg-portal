import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";
import type { SHG } from "../../types";

export function WalletControl() {
  const { state, creditWallet, debitWallet } = useApp();
  const [selectedSHG, setSelectedSHG] = useState<SHG | null>(null);
  const [walletAction, setWalletAction] = useState<"credit" | "debit">(
    "credit",
  );
  const [amount, setAmount] = useState("");
  const [desc, setDesc] = useState("");

  const handleWalletAction = () => {
    if (!selectedSHG || !amount || !desc) {
      toast.error("Fill all fields");
      return;
    }
    const amt = Number.parseInt(amount);
    if (Number.isNaN(amt) || amt <= 0) {
      toast.error("Invalid amount");
      return;
    }
    if (walletAction === "credit") {
      creditWallet(selectedSHG.id, amt, desc);
      toast.success(`₹${amt} credited to ${selectedSHG.groupName}`);
    } else {
      if (selectedSHG.walletBalance < amt) {
        toast.error("Insufficient balance");
        return;
      }
      debitWallet(selectedSHG.id, amt, desc);
      toast.success(`₹${amt} debited from ${selectedSHG.groupName}`);
    }
    setSelectedSHG(null);
    setAmount("");
    setDesc("");
  };

  const approvedSHGs = state.shgs.filter((s) => s.status === "approved");
  const totalWallet = approvedSHGs.reduce((a, s) => a + s.walletBalance, 0);

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-2">
        Wallet Control
      </h1>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white rounded-xl shadow-card p-3 text-center">
          <p className="text-xs text-gray-500">Total Wallet</p>
          <p className="font-bold text-lg text-green-700">
            ₹{totalWallet.toLocaleString()}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-card p-3 text-center">
          <p className="text-xs text-gray-500">Approved SHGs</p>
          <p className="font-bold text-lg text-blue-700">
            {approvedSHGs.length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-card p-3 text-center">
          <p className="text-xs text-gray-500">Transactions</p>
          <p className="font-bold text-lg text-purple-700">
            {state.walletTransactions.length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-ocid="wallet.table">
            <thead>
              <tr style={{ background: "#FFC107" }}>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  #
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  SHG Name
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  Balance
                </th>
                <th className="px-3 py-3 text-left text-xs font-bold text-gray-800">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {approvedSHGs.map((shg, idx) => (
                <tr
                  key={shg.id}
                  className="table-row-alt border-b border-gray-100"
                  data-ocid={`wallet.item.${idx + 1}`}
                >
                  <td className="px-3 py-2 text-gray-500 text-xs">{idx + 1}</td>
                  <td className="px-3 py-2">
                    <p className="font-semibold text-xs text-gray-800">
                      {shg.groupName}
                    </p>
                    <p className="text-gray-400 text-[10px]">
                      {shg.leaderName}
                    </p>
                  </td>
                  <td className="px-3 py-2 font-bold text-green-700 text-sm">
                    ₹{shg.walletBalance.toLocaleString()}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSHG(shg);
                          setWalletAction("credit");
                        }}
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs text-green-700 bg-green-50 hover:bg-green-100"
                        data-ocid={`wallet.confirm_button.${idx + 1}`}
                      >
                        <TrendingUp className="h-3 w-3" /> Credit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSHG(shg);
                          setWalletAction("debit");
                        }}
                        className="flex items-center gap-1 px-2 py-1 rounded text-xs text-red-600 bg-red-50 hover:bg-red-100"
                        data-ocid={`wallet.delete_button.${idx + 1}`}
                      >
                        <TrendingDown className="h-3 w-3" /> Debit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={!!selectedSHG} onOpenChange={() => setSelectedSHG(null)}>
        <DialogContent data-ocid="wallet.dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5" />
              {walletAction === "credit" ? "Credit Wallet" : "Debit Wallet"} -{" "}
              {selectedSHG?.groupName}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="bg-gray-50 rounded p-2 text-sm">
              <p>
                Current Balance:{" "}
                <strong className="text-green-700">
                  ₹{selectedSHG?.walletBalance.toLocaleString()}
                </strong>
              </p>
            </div>
            <div>
              <Label className="text-xs">Amount (₹)</Label>
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                data-ocid="wallet.input"
              />
            </div>
            <div>
              <Label className="text-xs">Description</Label>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="Reason for transaction"
                data-ocid="wallet.input"
              />
            </div>
            <div className="flex gap-2">
              <Button
                onClick={handleWalletAction}
                className="flex-1 font-bold text-white"
                style={{
                  background: walletAction === "credit" ? "#2e7d32" : "#c62828",
                }}
                data-ocid="wallet.confirm_button"
              >
                {walletAction === "credit" ? "Credit" : "Debit"}
              </Button>
              <Button
                variant="outline"
                onClick={() => setSelectedSHG(null)}
                data-ocid="wallet.cancel_button"
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
