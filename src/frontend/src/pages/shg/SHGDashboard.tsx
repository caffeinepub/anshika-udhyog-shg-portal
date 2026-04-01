import { Card, CardContent } from "@/components/ui/card";
import {
  BookOpen,
  CheckCircle,
  CreditCard,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export function SHGDashboard() {
  const { state, currentUser } = useApp();
  const shg = state.shgs.find((s) => s.id === currentUser?.id);
  if (!shg) return null;

  const myLoans = state.loans.filter((l) => l.shgId === shg.id);
  const myTrainings = state.trainings.filter((t) =>
    t.enrolledSHGs.includes(shg.id),
  );
  const myRewards = state.rewards.filter((r) => r.winnerSHGId === shg.id);
  const unreadNotifs = state.notifications.filter(
    (n) => (n.targetRole === "all" || n.targetRole === "shg") && !n.read,
  );

  const stats = [
    {
      label: "Wallet Balance",
      value: `₹${shg.walletBalance.toLocaleString()}`,
      icon: Wallet,
      color: "#2e7d32",
      bg: "#e8f5e9",
    },
    {
      label: "Active Loans",
      value: myLoans.filter((l) => l.status === "approved").length,
      icon: CreditCard,
      color: "#1565c0",
      bg: "#e3f2fd",
    },
    {
      label: "Training Enrolled",
      value: myTrainings.length,
      icon: BookOpen,
      color: "#6a1b9a",
      bg: "#f3e5f5",
    },
    {
      label: "Rewards Won",
      value: myRewards.length,
      icon: Trophy,
      color: "#f57f17",
      bg: "#fffde7",
    },
    {
      label: "Group Members",
      value: shg.memberCount,
      icon: Users,
      color: "#00695c",
      bg: "#e0f2f1",
    },
    {
      label: "Unread Alerts",
      value: unreadNotifs.length,
      icon: CheckCircle,
      color: "#c62828",
      bg: "#ffebee",
    },
  ];

  return (
    <div className="p-4">
      <div
        className="rounded-xl p-4 mb-4 text-white"
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
        }}
      >
        <p className="text-xs opacity-75">नमस्ते,</p>
        <h2 className="font-heading font-bold text-lg">{shg.groupName}</h2>
        <p className="text-xs opacity-75 mt-0.5">Leader: {shg.leaderName}</p>
        <div className="flex items-center gap-2 mt-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full badge-${shg.status} font-semibold`}
          >
            {shg.status.toUpperCase()}
          </span>
          <span className="text-xs opacity-75">ID: {shg.id.toUpperCase()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.label}
              className="border-0 shadow-card"
              data-ocid="shg_dashboard.card"
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium leading-tight">
                      {s.label}
                    </p>
                    <p
                      className="text-xl font-bold mt-0.5"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </p>
                  </div>
                  <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center"
                    style={{ background: s.bg }}
                  >
                    <Icon className="h-4 w-4" style={{ color: s.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-4 space-y-3">
        <div className="bg-white rounded-xl shadow-card p-4">
          <h3 className="font-heading font-bold text-sm mb-2">
            💳 Recent Loans
          </h3>
          {myLoans.length === 0 ? (
            <p className="text-xs text-gray-400">No loans yet</p>
          ) : (
            <div className="space-y-2">
              {myLoans.slice(0, 3).map((loan) => (
                <div
                  key={loan.id}
                  className="flex justify-between items-center text-xs"
                >
                  <span className="text-gray-700">
                    ₹{loan.amount.toLocaleString()} -{" "}
                    {loan.purpose.slice(0, 30)}
                  </span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] badge-${loan.status}`}
                  >
                    {loan.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="bg-white rounded-xl shadow-card p-4">
          <h3 className="font-heading font-bold text-sm mb-2">
            🔔 Recent Notifications
          </h3>
          {unreadNotifs.length === 0 ? (
            <p className="text-xs text-gray-400">No new notifications</p>
          ) : (
            <div className="space-y-2">
              {unreadNotifs.slice(0, 3).map((n) => (
                <div
                  key={n.id}
                  className="text-xs border-l-2 pl-2"
                  style={{ borderColor: "#FFC107" }}
                >
                  <p className="font-semibold text-gray-800">{n.title}</p>
                  <p className="text-gray-500 truncate">{n.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
