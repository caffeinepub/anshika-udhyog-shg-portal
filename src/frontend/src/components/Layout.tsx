import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Award,
  Bell,
  BookOpen,
  Briefcase,
  Building2,
  ChevronRight,
  CreditCard,
  DollarSign,
  FileText,
  Gift,
  Home,
  Image,
  LayoutDashboard,
  LogOut,
  Menu,
  TrendingUp,
  User,
  UserCog,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const ADMIN_MENU = [
  { key: "admin_dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "admin_shg", label: "SHG Management", icon: Users },
  { key: "admin_loans", label: "Loan Management", icon: CreditCard },
  { key: "admin_training", label: "Training Programs", icon: BookOpen },
  { key: "admin_rewards", label: "Reward Management", icon: Gift },
  { key: "admin_staff", label: "Staff Management", icon: UserCog },
  { key: "admin_branches", label: "Branch Management", icon: Building2 },
  { key: "admin_wallet", label: "Wallet Control", icon: Wallet },
  { key: "admin_notifications", label: "Notifications", icon: Bell },
  { key: "admin_mlm", label: "Multi-Level Income", icon: TrendingUp },
  { key: "admin_gallery", label: "Gallery", icon: Image },
];

const SHG_MENU = [
  { key: "shg_dashboard", label: "Dashboard", icon: Home },
  { key: "shg_profile", label: "My Profile", icon: User },
  { key: "shg_apply_loan", label: "Apply Loan", icon: CreditCard },
  { key: "shg_my_loans", label: "My Loans", icon: FileText },
  { key: "shg_trainings", label: "Training Programs", icon: BookOpen },
  { key: "shg_my_training", label: "My Training", icon: Award },
  { key: "shg_rewards", label: "Rewards", icon: Gift },
  { key: "shg_wallet", label: "Wallet", icon: Wallet },
  { key: "shg_idcard", label: "ID Card", icon: CreditCard },
  { key: "shg_notifications", label: "Notifications", icon: Bell },
];

const STAFF_MENU = [
  { key: "staff_dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "staff_profile", label: "My Profile", icon: User },
  { key: "staff_shgs", label: "Assigned SHGs", icon: Users },
  { key: "staff_work", label: "Work Assignment", icon: Briefcase },
  { key: "staff_salary", label: "Salary Info", icon: DollarSign },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const {
    currentUser,
    currentPage,
    sidebarOpen,
    setSidebarOpen,
    setCurrentPage,
    logout,
    state,
  } = useApp();

  const menu =
    currentUser?.role === "admin"
      ? ADMIN_MENU
      : currentUser?.role === "shg"
        ? SHG_MENU
        : STAFF_MENU;

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "#F5F5F5" }}
    >
      <header
        className="sticky top-0 z-40 shadow-header"
        style={{ background: "#FFC107" }}
      >
        <div className="flex items-center h-14 px-3 gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-900 hover:bg-amber-500 shrink-0"
            onClick={() => setSidebarOpen(true)}
            data-ocid="nav.toggle"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <img
              src="/assets/img-20260315-wa0038-019d4aae-fcb3-75aa-abdd-0170412930a9.jpg"
              alt="Logo"
              className="h-8 w-8 rounded-full object-cover border-2 border-white shadow shrink-0"
            />
            <div className="min-w-0">
              <p className="font-heading font-bold text-gray-900 text-xs leading-tight truncate">
                ANSHIKA UDHYOG
              </p>
              <p className="text-gray-800 text-[10px] leading-tight truncate">
                SHG PORTAL
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <div className="text-right hidden sm:block">
              <p className="font-semibold text-gray-900 text-xs">
                {currentUser?.name}
              </p>
              <p className="text-gray-700 text-[10px] capitalize">
                {currentUser?.role}
              </p>
            </div>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white text-[10px] h-5 min-w-5 px-1">
                {unreadCount}
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-900 hover:bg-amber-500"
              onClick={logout}
              data-ocid="nav.link"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          role="presentation"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full z-50 w-72 flex flex-col slide-menu ${sidebarOpen ? "open" : ""}`}
        style={{ background: "#1a1a2e" }}
      >
        <div
          className="flex items-center justify-between p-4"
          style={{ background: "#FFC107" }}
        >
          <div className="flex items-center gap-2">
            <img
              src="/assets/img-20260315-wa0038-019d4aae-fcb3-75aa-abdd-0170412930a9.jpg"
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover border-2 border-white"
            />
            <div>
              <p className="font-heading font-bold text-gray-900 text-sm leading-tight">
                ANSHIKA UDHYOG
              </p>
              <p className="text-gray-800 text-[11px]">SHG Portal</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-900 hover:bg-amber-500"
            onClick={() => setSidebarOpen(false)}
            data-ocid="nav.close_button"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="px-4 py-3 border-b" style={{ borderColor: "#2d2d4e" }}>
          <p className="text-white font-semibold text-sm">
            {currentUser?.name}
          </p>
          <p className="text-gray-400 text-xs capitalize">
            {currentUser?.role === "admin"
              ? "👑 Super Admin"
              : currentUser?.role === "staff"
                ? "👷 Staff Member"
                : "👥 SHG Member"}
          </p>
        </div>

        <nav className="flex-1 overflow-y-auto py-2">
          {menu.map((item, idx) => {
            const Icon = item.icon;
            const isActive = currentPage === item.key;
            return (
              <button
                type="button"
                key={item.key}
                onClick={() => {
                  setCurrentPage(item.key);
                  setSidebarOpen(false);
                }}
                data-ocid={`nav.link.${idx + 1}`}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${isActive ? "text-gray-900 font-semibold" : "text-gray-300 hover:text-white hover:bg-white/10"}`}
                style={isActive ? { background: "#FFC107" } : {}}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {isActive && <ChevronRight className="h-3 w-3" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t" style={{ borderColor: "#2d2d4e" }}>
          <Button
            onClick={logout}
            className="w-full text-gray-900 font-semibold"
            style={{ background: "#FFC107" }}
            data-ocid="nav.link"
          >
            <LogOut className="h-4 w-4 mr-2" /> Logout
          </Button>
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>

      <footer className="py-3 px-4 text-center text-xs text-gray-500 bg-white border-t">
        © {new Date().getFullYear()} Anshika Udhyog SHG Portal. Built with ❤️
        using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
