import { Toaster } from "@/components/ui/sonner";
import { Layout } from "./components/Layout";
import { PublicLayout } from "./components/PublicLayout";
import { AppProvider, useApp } from "./context/AppContext";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ServicesPage } from "./pages/ServicesPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { BranchManagement } from "./pages/admin/BranchManagement";
import { Gallery } from "./pages/admin/Gallery";
import { LoanManagement } from "./pages/admin/LoanManagement";
import { MLMIncome } from "./pages/admin/MLMIncome";
import { NotificationsAdmin } from "./pages/admin/NotificationsAdmin";
import { RewardManagement } from "./pages/admin/RewardManagement";
import { SHGManagement } from "./pages/admin/SHGManagement";
import { StaffManagement } from "./pages/admin/StaffManagement";
import { TrainingManagement } from "./pages/admin/TrainingManagement";
import { WalletControl } from "./pages/admin/WalletControl";
import { IDCard } from "./pages/shg/IDCard";
import { LoanApply } from "./pages/shg/LoanApply";
import { RewardsPage } from "./pages/shg/RewardsPage";
import { SHGDashboard } from "./pages/shg/SHGDashboard";
import { SHGNotifications } from "./pages/shg/SHGNotifications";
import { SHGProfile } from "./pages/shg/SHGProfile";
import { MyTraining, TrainingPage } from "./pages/shg/TrainingPage";
import { WalletPage } from "./pages/shg/WalletPage";
import {
  AssignedSHGs,
  SalaryInfo,
  StaffDashboard,
  StaffProfile,
  WorkAssignment,
} from "./pages/staff/StaffDashboard";

const PUBLIC_PAGES = new Set([
  "home",
  "about",
  "services",
  "gallery",
  "contact",
  "login",
]);

function AppRouter() {
  const { currentPage, currentUser } = useApp();

  // Public pages - shown without login
  if (!currentUser || PUBLIC_PAGES.has(currentPage)) {
    if (currentPage === "login") {
      return (
        <PublicLayout>
          <LoginPage />
        </PublicLayout>
      );
    }
    const publicPageMap: Record<string, React.ReactNode> = {
      home: <HomePage />,
      about: <AboutPage />,
      services: <ServicesPage />,
      gallery: <HomePage />,
      contact: <ContactPage />,
    };
    const publicContent = publicPageMap[currentPage] ?? <HomePage />;
    return <PublicLayout>{publicContent}</PublicLayout>;
  }

  const pageMap: Record<string, React.ReactNode> = {
    // Admin pages
    admin_dashboard: <AdminDashboard />,
    admin_shg: <SHGManagement />,
    admin_loans: <LoanManagement />,
    admin_training: <TrainingManagement />,
    admin_rewards: <RewardManagement />,
    admin_staff: <StaffManagement />,
    admin_branches: <BranchManagement />,
    admin_wallet: <WalletControl />,
    admin_notifications: <NotificationsAdmin />,
    admin_mlm: <MLMIncome />,
    admin_gallery: <Gallery />,
    // SHG pages
    shg_dashboard: <SHGDashboard />,
    shg_profile: <SHGProfile />,
    shg_apply_loan: <LoanApply />,
    shg_my_loans: <LoanApply />,
    shg_trainings: <TrainingPage />,
    shg_my_training: <MyTraining />,
    shg_rewards: <RewardsPage />,
    shg_wallet: <WalletPage />,
    shg_idcard: <IDCard />,
    shg_notifications: <SHGNotifications />,
    // Staff pages
    staff_dashboard: <StaffDashboard />,
    staff_profile: <StaffProfile />,
    staff_shgs: <AssignedSHGs />,
    staff_work: <WorkAssignment />,
    staff_salary: <SalaryInfo />,
  };

  const content =
    pageMap[currentPage] || pageMap[`${currentUser.role}_dashboard`];

  return <Layout>{content}</Layout>;
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
      <Toaster position="top-right" richColors />
    </AppProvider>
  );
}
