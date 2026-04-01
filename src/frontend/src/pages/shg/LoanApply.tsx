import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, Clock, CreditCard, XCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useApp } from "../../context/AppContext";

export function LoanApply() {
  const { state, currentUser, addLoan } = useApp();
  const shg = state.shgs.find((s) => s.id === currentUser?.id);
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!shg) return null;

  const myLoans = state.loans.filter((l) => l.shgId === shg.id);
  const hasPending = myLoans.some((l) => l.status === "pending");

  const handleSubmit = () => {
    if (!amount || !purpose) {
      toast.error("Please fill all fields");
      return;
    }
    const amt = Number.parseInt(amount);
    if (Number.isNaN(amt) || amt <= 0) {
      toast.error("Enter valid amount");
      return;
    }
    if (hasPending) {
      toast.error("You already have a pending loan");
      return;
    }
    addLoan({
      shgId: shg.id,
      shgName: shg.groupName,
      amount: amt,
      purpose,
      status: "pending",
    });
    toast.success("Loan application submitted!");
    setAmount("");
    setPurpose("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        Apply for Loan
      </h1>

      {submitted && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <p className="text-sm text-green-700 font-semibold">
            Loan application submitted! Admin will review shortly.
          </p>
        </div>
      )}
      {hasPending && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-4 flex items-center gap-3">
          <Clock className="h-5 w-5 text-yellow-600" />
          <p className="text-sm text-yellow-700">
            You have a pending loan application. Wait for approval.
          </p>
        </div>
      )}
      {shg.status !== "approved" && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 flex items-center gap-3">
          <XCircle className="h-5 w-5 text-red-500" />
          <p className="text-sm text-red-700">
            Your SHG account must be approved before applying for loans.
          </p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-card p-4">
        <div className="flex items-center gap-3 mb-4">
          <div
            className="h-12 w-12 rounded-xl flex items-center justify-center"
            style={{ background: "#E3F2FD" }}
          >
            <CreditCard className="h-6 w-6 text-blue-700" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm">
              New Loan Application
            </h3>
            <p className="text-xs text-gray-500">
              Fill the form below to apply
            </p>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <Label className="text-xs font-semibold">Loan Amount (₹) *</Label>
            <Input
              type="number"
              placeholder="Enter amount (e.g. 25000)"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={shg.status !== "approved" || hasPending}
              data-ocid="loan_apply.input"
            />
          </div>
          <div>
            <Label className="text-xs font-semibold">Purpose / Reason *</Label>
            <Textarea
              placeholder="Loan ka uddeshya likhein"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              disabled={shg.status !== "approved" || hasPending}
              className="text-xs"
              data-ocid="loan_apply.textarea"
            />
          </div>
          <Button
            onClick={handleSubmit}
            disabled={shg.status !== "approved" || hasPending}
            className="w-full font-bold text-gray-900"
            style={{ background: "#FFC107" }}
            data-ocid="loan_apply.submit_button"
          >
            Submit Loan Application
          </Button>
        </div>
      </div>

      {myLoans.length > 0 && (
        <div className="mt-4">
          <h3 className="font-heading font-bold text-sm mb-2">
            My Loan History
          </h3>
          <div className="space-y-2" data-ocid="loan_apply.list">
            {myLoans.map((loan, idx) => (
              <div
                key={loan.id}
                className="bg-white rounded-xl shadow-card p-3"
                data-ocid={`loan_apply.item.${idx + 1}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-bold text-sm text-green-700">
                      ₹{loan.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{loan.purpose}</p>
                    <p className="text-[10px] text-gray-400">
                      {loan.appliedDate}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold badge-${loan.status}`}
                  >
                    {loan.status.toUpperCase()}
                  </span>
                </div>
                {loan.remarks && (
                  <p className="text-xs text-gray-500 mt-1 border-t pt-1">
                    {loan.remarks}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
