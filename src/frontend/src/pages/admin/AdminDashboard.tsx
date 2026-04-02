import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertCircle,
  Award,
  Bell,
  BookOpen,
  Building2,
  CheckCircle,
  Clock,
  CreditCard,
  FileText,
  Gift,
  Globe,
  Image,
  Megaphone,
  MessageSquare,
  PlusCircle,
  Settings,
  ShoppingBag,
  Star,
  TrendingUp,
  UserCog,
  Users,
  Wallet,
} from "lucide-react";
import { useApp } from "../../context/AppContext";

export function AdminDashboard() {
  const { state, setCurrentPage } = useApp();

  const stats = [
    {
      label: "Total SHGs",
      value: state.shgs.length,
      icon: Users,
      color: "#1565c0",
      bg: "#e3f2fd",
      page: "admin_shg",
    },
    {
      label: "Approved SHGs",
      value: state.shgs.filter((s) => s.status === "approved").length,
      icon: CheckCircle,
      color: "#2e7d32",
      bg: "#e8f5e9",
      page: "admin_shg",
    },
    {
      label: "Pending Approvals",
      value: state.shgs.filter((s) => s.status === "pending").length,
      icon: Clock,
      color: "#e65100",
      bg: "#fff3e0",
      page: "admin_shg",
    },
    {
      label: "Total Loans",
      value: state.loans.length,
      icon: CreditCard,
      color: "#6a1b9a",
      bg: "#f3e5f5",
      page: "admin_loans",
    },
    {
      label: "Pending Loans",
      value: state.loans.filter((l) => l.status === "pending").length,
      icon: AlertCircle,
      color: "#c62828",
      bg: "#ffebee",
      page: "admin_loans",
    },
    {
      label: "Active Training",
      value: state.trainings.length,
      icon: BookOpen,
      color: "#0277bd",
      bg: "#e1f5fe",
      page: "admin_training",
    },
    {
      label: "Total Rewards",
      value: state.rewards.length,
      icon: Gift,
      color: "#f57f17",
      bg: "#fffde7",
      page: "admin_rewards",
    },
    {
      label: "Total Branches",
      value: state.branches.length,
      icon: Building2,
      color: "#37474f",
      bg: "#eceff1",
      page: "admin_branches",
    },
    {
      label: "Staff Count",
      value: state.staff.length,
      icon: UserCog,
      color: "#558b2f",
      bg: "#f1f8e9",
      page: "admin_staff",
    },
    {
      label: "Total Wallet",
      value: `₹${state.shgs.reduce((a, s) => a + s.walletBalance, 0).toLocaleString()}`,
      icon: TrendingUp,
      color: "#00695c",
      bg: "#e0f2f1",
      page: "admin_wallet",
    },
  ];

  const quickActions = [
    { label: "+ Add SHG", icon: PlusCircle, page: "admin_shg" },
    { label: "+ Add Loan", icon: PlusCircle, page: "admin_loans" },
    { label: "📢 Notification", icon: null, page: "admin_notifications" },
    { label: "🖼️ Gallery", icon: Image, page: "admin_gallery" },
  ];

  const contentMgmt = [
    { label: "🌐 Homepage Editor", page: "admin_homepage", icon: Globe },
    { label: "🖼️ Gallery", page: "admin_gallery", icon: Image },
    { label: "📢 Ticker", page: "admin_ticker", icon: Megaphone },
    { label: "📄 Page Content", page: "admin_pagecontent", icon: FileText },
    { label: "👥 Members", page: "admin_members", icon: Users },
    { label: "🌟 Our Team", page: "admin_team", icon: Star },
    { label: "💬 Reviews", page: "admin_reviews", icon: MessageSquare },
    { label: "🏆 Awards", page: "admin_awards", icon: Award },
    { label: "🛒 Shopping", page: "admin_shopping", icon: ShoppingBag },
    { label: "💼 Vacancies", page: "admin_vacancies", icon: Users },
    { label: "⚙️ Site Settings", page: "admin_settings", icon: Settings },
    { label: "🔔 Notifications", page: "admin_notifications", icon: Bell },
  ];

  const menuPages = [
    { label: "Home", page: "admin_pagecontent" },
    { label: "About Us", page: "admin_pagecontent" },
    { label: "Mission & Vision", page: "admin_pagecontent" },
    { label: "Our Team", page: "admin_team" },
    { label: "Branch Network", page: "admin_branches" },
    { label: "SHG Program", page: "admin_pagecontent" },
    { label: "Cottage Industry", page: "admin_pagecontent" },
    { label: "Training", page: "admin_training" },
    { label: "Rewards", page: "admin_rewards" },
    { label: "Jobs / Work", page: "admin_vacancies" },
    { label: "News / Updates", page: "admin_pagecontent" },
    { label: "Gallery", page: "admin_gallery" },
    { label: "Success Stories", page: "admin_pagecontent" },
    { label: "Documents", page: "admin_pagecontent" },
    { label: "FAQ", page: "admin_pagecontent" },
    { label: "Marketing", page: "admin_pagecontent" },
    { label: "Vacancies", page: "admin_vacancies" },
    { label: "Shopping", page: "admin_shopping" },
    { label: "Seller", page: "admin_pagecontent" },
    { label: "Shipping", page: "admin_pagecontent" },
    { label: "Policy", page: "admin_pagecontent" },
    { label: "Contact", page: "admin_homepage" },
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

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card
              key={s.label}
              className="border-0 shadow-card cursor-pointer hover:shadow-lg transition-shadow active:scale-95"
              onClick={() => setCurrentPage(s.page)}
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

      {/* Quick Actions */}
      <div className="mt-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Quick Actions
        </p>
        <div className="flex flex-wrap gap-2">
          {quickActions.map((qa) => (
            <Button
              key={qa.label}
              size="sm"
              onClick={() => setCurrentPage(qa.page)}
              className="text-gray-900 font-semibold text-xs h-8"
              style={{ background: "#FFC107" }}
            >
              {qa.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content Management */}
      <div className="mt-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Content Management
        </p>
        <div className="flex flex-wrap gap-2">
          {contentMgmt.map((item) => (
            <Button
              key={item.label}
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(item.page)}
              className="text-xs h-8 font-medium border border-amber-200 hover:bg-amber-50"
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Menu Pages Management */}
      <div className="mt-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
          Menu Pages (Edit / Update)
        </p>
        <div className="flex flex-wrap gap-1.5">
          {menuPages.map((item) => (
            <Button
              key={item.label}
              size="sm"
              variant="ghost"
              onClick={() => setCurrentPage(item.page)}
              className="text-xs h-7 font-medium bg-gray-100 hover:bg-amber-100 text-gray-700"
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card className="border-0 shadow-card">
          <CardContent className="p-4">
            <Button
              variant="ghost"
              className="font-heading font-bold text-sm mb-3 text-gray-800 hover:text-yellow-600 p-0 h-auto w-full justify-start"
              onClick={() => setCurrentPage("admin_loans")}
            >
              🕐 Recent Loan Applications →
            </Button>
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
            <Button
              variant="ghost"
              className="font-heading font-bold text-sm mb-3 text-gray-800 hover:text-yellow-600 p-0 h-auto w-full justify-start"
              onClick={() => setCurrentPage("admin_notifications")}
            >
              🔔 Recent Notifications →
            </Button>
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
