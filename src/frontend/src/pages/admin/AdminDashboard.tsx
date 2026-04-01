import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  BookOpen,
  Building2,
  CheckCircle,
  Clock,
  CreditCard,
  Gift,
  TrendingUp,
  UserCog,
  Users,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export function AdminDashboard() {
  const { state } = useApp();

  const stats = [
    {
      label: "Total SHGs",
      value: state.shgs.length,
      icon: Users,
      color: "#1565c0",
      bg: "#e3f2fd",
    },
    {
      label: "Approved SHGs",
      value: state.shgs.filter((s) => s.status === "approved").length,
      icon: CheckCircle,
      color: "#2e7d32",
      bg: "#e8f5e9",
    },
    {
      label: "Pending Approvals",
      value: state.shgs.filter((s) => s.status === "pending").length,
      icon: Clock,
      color: "#e65100",
      bg: "#fff3e0",
    },
    {
      label: "Total Loans",
      value: state.loans.length,
      icon: CreditCard,
      color: "#6a1b9a",
      bg: "#f3e5f5",
    },
    {
      label: "Pending Loans",
      value: state.loans.filter((l) => l.status === "pending").length,
      icon: AlertCircle,
      color: "#c62828",
      bg: "#ffebee",
    },
    {
      label: "Active Training",
      value: state.trainings.length,
      icon: BookOpen,
      color: "#0277bd",
      bg: "#e1f5fe",
    },
    {
      label: "Total Rewards",
      value: state.rewards.length,
      icon: Gift,
      color: "#f57f17",
      bg: "#fffde7",
    },
    {
      label: "Total Branches",
      value: state.branches.length,
      icon: Building2,
      color: "#37474f",
      bg: "#eceff1",
    },
    {
      label: "Staff Count",
      value: state.staff.length,
      icon: UserCog,
      color: "#558b2f",
      bg: "#f1f8e9",
    },
    {
      label: "Total Wallet",
      value: `₹${state.shgs.reduce((a, s) => a + s.walletBalance, 0).toLocaleString()}`,
      icon: TrendingUp,
      color: "#00695c",
      bg: "#e0f2f1",
    },
  ];

  return (
    <div className="p-4">
      <div className="mb-4">
        <h1 className="font-heading font-bold text-xl text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Welcome back, Super Admin! Here's an overview of Anshika Udhyog SHG
          Portal.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.label}
              className="border-0 shadow-card"
              data-ocid="admin.stat.card"
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-gray-500 font-medium leading-tight">
                      {s.label}
                    </p>
                    <p
                      className="text-2xl font-bold mt-1"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </p>
                  </div>
                  <div
                    className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: s.bg }}
                  >
                    <Icon className="h-5 w-5" style={{ color: s.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <h3 className="font-heading font-bold text-sm mb-3 text-gray-800">
              🕐 Recent Loan Applications
            </h3>
            <div className="space-y-2">
              {state.loans.slice(0, 4).map((loan) => (
                <div
                  key={loan.id}
                  className="flex items-center justify-between text-xs"
                >
                  <div>
                    <p className="font-semibold text-gray-800">
                      {loan.shgName}
                    </p>
                    <p className="text-gray-500">
                      ₹{loan.amount.toLocaleString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold badge-${loan.status}`}
                  >
                    {loan.status.toUpperCase()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <h3 className="font-heading font-bold text-sm mb-3 text-gray-800">
              🔔 Recent Notifications
            </h3>
            <div className="space-y-2">
              {state.notifications.slice(0, 4).map((n) => (
                <div
                  key={n.id}
                  className="text-xs border-l-2 pl-2"
                  style={{ borderColor: "#FFC107" }}
                >
                  <p className="font-semibold text-gray-800">{n.title}</p>
                  <p className="text-gray-500">{n.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
