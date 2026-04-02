import { Toaster } from "@/components/ui/sonner";
import { Layout } from "./components/Layout";
import { PublicLayout } from "./components/PublicLayout";
import { AppProvider, useApp } from "./context/AppContext";
import { AboutPage } from "./pages/AboutPage";
import { BranchNetworkPage } from "./pages/BranchNetworkPage";
import { ContactPage } from "./pages/ContactPage";
import { CottageIndustryPage } from "./pages/CottageIndustryPage";
import { DocumentsPage } from "./pages/DocumentsPage";
import { FAQPage } from "./pages/FAQPage";
import { GalleryPublicPage } from "./pages/GalleryPublicPage";
import { HomePage } from "./pages/HomePage";
import { JobsPage } from "./pages/JobsPage";
import { LoginPage } from "./pages/LoginPage";
import { MarketingPage } from "./pages/MarketingPage";
import { MissionVisionPage } from "./pages/MissionVisionPage";
import { NewsPage } from "./pages/NewsPage";
import { OurTeamPage } from "./pages/OurTeamPage";
import { PolicyPage } from "./pages/PolicyPage";
import { RewardsPublicPage } from "./pages/RewardsPublicPage";
import { SHGProgramPage } from "./pages/SHGProgramPage";
import { SellerPage } from "./pages/SellerPage";
import { ServicesPage } from "./pages/ServicesPage";
import { ShippingPage } from "./pages/ShippingPage";
import { ShoppingPage } from "./pages/ShoppingPage";
import { SignupPage } from "./pages/SignupPage";
import { SuccessStoriesPage } from "./pages/SuccessStoriesPage";
import { TrainingPublicPage } from "./pages/TrainingPublicPage";
import { VacancyPage } from "./pages/VacancyPage";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminSiteSettings } from "./pages/admin/AdminSiteSettings";
import { AwardManager } from "./pages/admin/AwardManager";
import { BranchManagement } from "./pages/admin/BranchManagement";
import { Gallery } from "./pages/admin/Gallery";
import { HomepageEditor } from "./pages/admin/HomepageEditor";
import { LoanManagement } from "./pages/admin/LoanManagement";
import { MLMIncome } from "./pages/admin/MLMIncome";
import { MemberManager } from "./pages/admin/MemberManager";
import { NotificationsAdmin } from "./pages/admin/NotificationsAdmin";
import { PageContentManager } from "./pages/admin/PageContentManager";
import { ReviewManager } from "./pages/admin/ReviewManager";
import { RewardManagement } from "./pages/admin/RewardManagement";
import { SHGManagement } from "./pages/admin/SHGManagement";
import { ShoppingManager } from "./pages/admin/ShoppingManager";
import { StaffManagement } from "./pages/admin/StaffManagement";
import { TeamManager } from "./pages/admin/TeamManager";
import { TickerManager } from "./pages/admin/TickerManager";
import { TrainingManagement } from "./pages/admin/TrainingManagement";
import { VacancyManager } from "./pages/admin/VacancyManager";
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
  "contact",
  "login",
  "signup",
  "mission",
  "team",
  "branches",
  "shg_program",
  "cottage",
  "training_pub",
  "rewards_pub",
  "jobs",
  "news",
  "gallery_pub",
  "success_stories",
  "documents",
  "faq",
  "marketing",
  "vacancies",
  "shopping",
  "seller",
  "shipping",
  "policy",
]);

function AppRouter() {
  const { currentPage, currentUser } = useApp();

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
      contact: <ContactPage />,
      signup: <SignupPage />,
      mission: <MissionVisionPage />,
      team: <OurTeamPage />,
      branches: <BranchNetworkPage />,
      shg_program: <SHGProgramPage />,
      cottage: <CottageIndustryPage />,
      training_pub: <TrainingPublicPage />,
      rewards_pub: <RewardsPublicPage />,
      jobs: <JobsPage />,
      news: <NewsPage />,
      gallery_pub: <GalleryPublicPage />,
      success_stories: <SuccessStoriesPage />,
      documents: <DocumentsPage />,
      faq: <FAQPage />,
      marketing: <MarketingPage />,
      vacancies: <VacancyPage />,
      shopping: <ShoppingPage />,
      seller: <SellerPage />,
      shipping: <ShippingPage />,
      policy: <PolicyPage />,
    };
    const publicContent = publicPageMap[currentPage] ?? <HomePage />;
    return <PublicLayout>{publicContent}</PublicLayout>;
  }

  const pageMap: Record<string, React.ReactNode> = {
    admin_dashboard: <AdminDashboard />,
    admin_homepage: <HomepageEditor />,
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
    admin_ticker: <TickerManager />,
    admin_shopping: <ShoppingManager />,
    admin_vacancies: <VacancyManager />,
    admin_pagecontent: <PageContentManager />,
    admin_settings: <AdminSiteSettings />,
    admin_members: <MemberManager />,
    admin_team: <TeamManager />,
    admin_reviews: <ReviewManager />,
    admin_awards: <AwardManager />,
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
