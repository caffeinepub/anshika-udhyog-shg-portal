import { Card, CardContent } from "@/components/ui/card";
import { Bell, Briefcase, Building2, DollarSign, Users } from "lucide-react";
import { useApp } from "../../context/AppContext";
import type { Staff } from "../../types";

export function StaffDashboard() {
  const { state, currentUser } = useApp();
  const staff = state.staff.find((s) => s.id === currentUser?.id) as
    | Staff
    | undefined;
  if (!staff) return null;

  const branch = state.branches.find((b) => b.id === staff.branchId);
  const assignedSHGs = state.shgs.filter((s) => s.branchId === staff.branchId);
  const myNotifs = state.notifications.filter(
    (n) => n.targetRole === "all" || n.targetRole === "staff",
  );

  const stats = [
    {
      label: "Assigned Branch",
      value: branch?.name || "N/A",
      icon: Building2,
      color: "#1565c0",
      bg: "#e3f2fd",
    },
    {
      label: "Assigned SHGs",
      value: assignedSHGs.length,
      icon: Users,
      color: "#2e7d32",
      bg: "#e8f5e9",
    },
    {
      label: "Pending Tasks",
      value: staff.tasks.length,
      icon: Briefcase,
      color: "#e65100",
      bg: "#fff3e0",
    },
    {
      label: "Monthly Salary",
      value: `₹${staff.salary.toLocaleString()}`,
      icon: DollarSign,
      color: "#6a1b9a",
      bg: "#f3e5f5",
    },
    {
      label: "Notifications",
      value: myNotifs.filter((n) => !n.read).length,
      icon: Bell,
      color: "#c62828",
      bg: "#ffebee",
    },
  ];

  return (
    <div className="p-4">
      <div
        className="rounded-xl p-4 mb-4 text-white"
        style={{ background: "linear-gradient(135deg, #1a1a2e, #0f3460)" }}
      >
        <p className="text-xs opacity-70">नमस्ते,</p>
        <h2 className="font-heading font-bold text-lg">{staff.name}</h2>
        <p className="text-xs opacity-70">
          {staff.role} • {branch?.name}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 mb-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.label}
              className="border-0 shadow-card"
              data-ocid="staff_dashboard.card"
            >
              <CardContent className="p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium leading-tight">
                      {s.label}
                    </p>
                    <p
                      className="text-base font-bold mt-0.5"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </p>
                  </div>
                  <div
                    className="h-8 w-8 rounded-xl flex items-center justify-center"
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

      <div className="bg-white rounded-xl shadow-card p-4 mb-3">
        <h3 className="font-heading font-bold text-sm mb-3">
          📝 Assigned Tasks
        </h3>
        <div className="space-y-2">
          {staff.tasks.map((task, i) => (
            <div
              key={task}
              className="flex items-center gap-2 text-xs"
              data-ocid={`staff_dashboard.item.${i + 1}`}
            >
              <div
                className="h-2 w-2 rounded-full shrink-0"
                style={{ background: "#FFC107" }}
              />
              <span className="text-gray-700">{task}</span>
            </div>
          ))}
          {staff.tasks.length === 0 && (
            <p className="text-xs text-gray-400">No tasks assigned</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-card p-4">
        <h3 className="font-heading font-bold text-sm mb-3">
          👥 SHGs in {branch?.name}
        </h3>
        <div className="space-y-2">
          {assignedSHGs.slice(0, 4).map((shg) => (
            <div
              key={shg.id}
              className="flex items-center justify-between text-xs"
            >
              <div>
                <p className="font-semibold text-gray-800">{shg.groupName}</p>
                <p className="text-gray-400">{shg.leaderName}</p>
              </div>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold badge-${shg.status}`}
              >
                {shg.status.toUpperCase()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function StaffProfile() {
  const { state, currentUser } = useApp();
  const staff = state.staff.find((s) => s.id === currentUser?.id);
  if (!staff) return null;
  const branch = state.branches.find((b) => b.id === staff.branchId);

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        My Profile
      </h1>
      <div className="bg-white rounded-xl shadow-card p-4">
        <div className="flex items-center gap-4 mb-4">
          <div
            className="h-16 w-16 rounded-full flex items-center justify-center text-3xl"
            style={{ background: "#E3F2FD" }}
          >
            👷
          </div>
          <div>
            <h2 className="font-heading font-bold text-lg">{staff.name}</h2>
            <p className="text-sm text-gray-600">{staff.role}</p>
            <p className="text-xs text-gray-500">{branch?.name}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            ["Staff ID", staff.id.toUpperCase()],
            ["Mobile", staff.mobile],
            ["Role", staff.role],
            ["Branch", branch?.name || "N/A"],
            ["Salary", `₹${staff.salary.toLocaleString()}`],
            ["Joined", staff.joiningDate],
          ].map(([k, v]) => (
            <div key={k as string} className="bg-gray-50 rounded-lg p-2">
              <p className="text-[10px] text-gray-500">{k}</p>
              <p className="font-semibold text-xs text-gray-800">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AssignedSHGs() {
  const { state, currentUser } = useApp();
  const staff = state.staff.find((s) => s.id === currentUser?.id);
  if (!staff) return null;
  const assignedSHGs = state.shgs.filter((s) => s.branchId === staff.branchId);

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        Assigned SHGs
      </h1>
      <div className="space-y-3" data-ocid="assigned_shg.list">
        {assignedSHGs.map((shg, idx) => (
          <div
            key={shg.id}
            className="bg-white rounded-xl shadow-card p-4"
            data-ocid={`assigned_shg.item.${idx + 1}`}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-heading font-bold text-sm">
                  {shg.groupName}
                </h3>
                <p className="text-xs text-gray-500">
                  Leader: {shg.leaderName}
                </p>
                <p className="text-xs text-gray-500">Mobile: {shg.mobile}</p>
                <p className="text-xs text-gray-500 mt-1">{shg.address}</p>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full badge-${shg.status} font-semibold`}
              >
                {shg.status.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
        {assignedSHGs.length === 0 && (
          <p
            className="text-sm text-gray-400 text-center py-8"
            data-ocid="assigned_shg.empty_state"
          >
            No SHGs assigned
          </p>
        )}
      </div>
    </div>
  );
}

export function WorkAssignment() {
  const { state, currentUser } = useApp();
  const staff = state.staff.find((s) => s.id === currentUser?.id);
  if (!staff) return null;

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        Work Assignment
      </h1>
      <div className="space-y-3" data-ocid="work.list">
        {staff.tasks.map((task, idx) => (
          <div
            key={task}
            className="bg-white rounded-xl shadow-card p-4 flex items-start gap-3"
            data-ocid={`work.item.${idx + 1}`}
          >
            <div
              className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
              style={{ background: "#FFC107", color: "#1a1a2e" }}
            >
              {idx + 1}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{task}</p>
              <p className="text-xs text-gray-400 mt-0.5">Assigned by Admin</p>
            </div>
          </div>
        ))}
        {staff.tasks.length === 0 && (
          <p
            className="text-sm text-gray-400 text-center py-8"
            data-ocid="work.empty_state"
          >
            No tasks assigned
          </p>
        )}
      </div>
    </div>
  );
}

export function SalaryInfo() {
  const { state, currentUser } = useApp();
  const staff = state.staff.find((s) => s.id === currentUser?.id);
  if (!staff) return null;

  const months = [
    "March 2026",
    "February 2026",
    "January 2026",
    "December 2025",
    "November 2025",
    "October 2025",
  ];

  return (
    <div className="p-4">
      <h1 className="font-heading font-bold text-xl text-gray-900 mb-4">
        Salary Info
      </h1>
      <div
        className="rounded-xl p-4 mb-4 text-white"
        style={{ background: "linear-gradient(135deg, #2e7d32, #1b5e20)" }}
      >
        <p className="text-sm opacity-75">Monthly Salary</p>
        <p className="text-4xl font-bold">₹{staff.salary.toLocaleString()}</p>
        <p className="text-xs opacity-75 mt-1">
          {staff.role} • Joined {staff.joiningDate}
        </p>
      </div>
      <h3 className="font-semibold text-sm text-gray-700 mb-2">
        Salary History
      </h3>
      <div className="space-y-2" data-ocid="salary.list">
        {months.map((month, idx) => (
          <div
            key={month}
            className="bg-white rounded-xl shadow-card p-3 flex items-center justify-between"
            data-ocid={`salary.item.${idx + 1}`}
          >
            <div>
              <p className="text-sm font-semibold text-gray-800">{month}</p>
              <p className="text-xs text-gray-500">Credit to account</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-green-700">
                ₹{staff.salary.toLocaleString()}
              </p>
              <span className="text-[10px] badge-approved px-1.5 py-0.5 rounded-full">
                PAID
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
