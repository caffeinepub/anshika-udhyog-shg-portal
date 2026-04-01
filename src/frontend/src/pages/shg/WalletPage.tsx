import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { useApp } from "../../context/AppContext";

export function WalletPage() {
  const { state, currentUser } = useApp();
  const shg = state.shgs.find((s) => s.id === currentUser?.id);
  if (!shg) return null;

  const myTxns = state.walletTransactions.filter((t) => t.shgId === shg.id);
  const totalCredits = myTxns
    .filter((t) => t.type === "credit")
    .reduce((a, t) => a + t.amount, 0);
  const totalDebits = myTxns
    .filter((t) => t.type === "debit")
    .reduce((a, t) => a + t.amount, 0);

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        Wallet
      </h1>

      {/* Balance card */}
      <div
        className="rounded-xl p-5 mb-4 text-white"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)",
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Wallet className="h-5 w-5" style={{ color: "#FFC107" }} />
          <span className="text-sm opacity-75">Current Balance</span>
        </div>
        <p className="text-4xl font-bold">
          ₹{shg.walletBalance.toLocaleString()}
        </p>
        <div className="flex gap-6 mt-4">
          <div>
            <p className="text-xs opacity-60">Total Credits</p>
            <p className="font-bold text-green-400">
              ₹{totalCredits.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs opacity-60">Total Debits</p>
            <p className="font-bold text-red-400">
              ₹{totalDebits.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <h3 className="font-semibold text-sm text-gray-700 mb-2">
        Transaction History
      </h3>
      <div className="space-y-2" data-ocid="wallet.list">
        {myTxns.length === 0 ? (
          <div
            className="text-center py-8 text-gray-400"
            data-ocid="wallet.empty_state"
          >
            No transactions yet
          </div>
        ) : (
          myTxns.map((txn, idx) => (
            <div
              key={txn.id}
              className="bg-white rounded-xl shadow-card p-3 flex items-center gap-3"
              data-ocid={`wallet.item.${idx + 1}`}
            >
              <div
                className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${txn.type === "credit" ? "bg-green-50" : "bg-red-50"}`}
              >
                {txn.type === "credit" ? (
                  <TrendingUp className="h-4 w-4 text-green-600" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-800">
                  {txn.description}
                </p>
                <p className="text-[10px] text-gray-400">{txn.date}</p>
              </div>
              <div className="text-right">
                <p
                  className={`font-bold text-sm ${txn.type === "credit" ? "text-green-600" : "text-red-500"}`}
                >
                  {txn.type === "credit" ? "+" : "-"}₹
                  {txn.amount.toLocaleString()}
                </p>
                <p className="text-[10px] text-gray-400">
                  Bal: ₹{txn.balance.toLocaleString()}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
