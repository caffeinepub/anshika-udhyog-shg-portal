import type React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import { initialState } from "../data/seedData";
import type {
  AppState,
  Award,
  Branch,
  CurrentUser,
  GalleryItem,
  HomepageContent,
  Loan,
  Member,
  Notification,
  PageContent,
  Product,
  Reward,
  SHG,
  SiteSettings,
  Staff,
  TeamMember,
  TeamReview,
  TickerItem,
  Training,
  Vacancy,
  WalletTransaction,
} from "../types";

interface AppContextType {
  state: AppState;
  currentUser: CurrentUser | null;
  currentPage: string;
  sidebarOpen: boolean;
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
  setCurrentPage: (page: string) => void;
  setSidebarOpen: (open: boolean) => void;
  login: (
    role: "admin" | "staff" | "shg",
    username: string,
    password: string,
  ) => boolean;
  logout: () => void;
  approveSHG: (id: string) => void;
  rejectSHG: (id: string) => void;
  addSHG: (shg: Omit<SHG, "id">) => void;
  updateSHG: (shg: SHG) => void;
  approveLoan: (id: string, remarks?: string) => void;
  rejectLoan: (id: string, remarks?: string) => void;
  addLoan: (loan: Omit<Loan, "id" | "appliedDate">) => void;
  addTraining: (
    t: Omit<Training, "id" | "enrolledSHGs" | "completedSHGs">,
  ) => void;
  updateTraining: (t: Training) => void;
  deleteTraining: (id: string) => void;
  enrollTraining: (trainingId: string, shgId: string) => void;
  completeTraining: (trainingId: string, shgId: string) => void;
  addStaff: (s: Omit<Staff, "id">) => void;
  updateStaff: (s: Staff) => void;
  deleteStaff: (id: string) => void;
  addBranch: (b: Omit<Branch, "id">) => void;
  updateBranch: (b: Branch) => void;
  deleteBranch: (id: string) => void;
  addReward: (r: Omit<Reward, "id" | "announcedDate">) => void;
  creditWallet: (shgId: string, amount: number, desc: string) => void;
  debitWallet: (shgId: string, amount: number, desc: string) => void;
  sendNotification: (n: Omit<Notification, "id" | "date" | "read">) => void;
  markNotificationRead: (id: string) => void;
  updateMLMCommission: (level: number, commission: number) => void;
  luckyDraw: () => string | null;
  updateHomepageContent: (content: HomepageContent) => void;
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  deleteGalleryItem: (id: string) => void;
  addTicker: (ticker: Omit<TickerItem, "id">) => void;
  updateTicker: (ticker: TickerItem) => void;
  deleteTicker: (id: string) => void;
  addProduct: (product: Omit<Product, "id">) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  addVacancy: (vacancy: Omit<Vacancy, "id">) => void;
  updateVacancy: (vacancy: Vacancy) => void;
  deleteVacancy: (id: string) => void;
  updatePageContent: (page: string, content: string) => void;
  updateSiteSettings: (settings: SiteSettings) => void;
  addMember: (m: Omit<Member, "id">) => void;
  updateMember: (m: Member) => void;
  deleteMember: (id: string) => void;
  addTeamMember: (m: Omit<TeamMember, "id">) => void;
  updateTeamMember: (m: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  addTeamReview: (r: Omit<TeamReview, "id">) => void;
  updateTeamReview: (r: TeamReview) => void;
  deleteTeamReview: (id: string) => void;
  addAward: (a: Omit<Award, "id">) => void;
  updateAward: (a: Award) => void;
  deleteAward: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [language, setLanguage] = useState<"en" | "hi">("en");

  const login = useCallback(
    (
      role: "admin" | "staff" | "shg",
      username: string,
      password: string,
    ): boolean => {
      if (role === "admin") {
        if (username === "admin" && password === "504560@AUC") {
          setCurrentUser({
            role: "admin",
            id: "admin",
            name: "Super Admin",
            data: null,
          });
          setCurrentPage("admin_dashboard");
          return true;
        }
        return false;
      }
      if (role === "staff") {
        const found = state.staff.find(
          (s) => s.mobile === username && s.password === password,
        );
        if (found) {
          setCurrentUser({
            role: "staff",
            id: found.id,
            name: found.name,
            data: found,
          });
          setCurrentPage("staff_dashboard");
          return true;
        }
        return false;
      }
      if (role === "shg") {
        const found = state.shgs.find(
          (s) =>
            (s.mobile === username ||
              s.groupName.toLowerCase() === username.toLowerCase()) &&
            s.password === password,
        );
        if (found) {
          setCurrentUser({
            role: "shg",
            id: found.id,
            name: found.groupName,
            data: found,
          });
          setCurrentPage("shg_dashboard");
          return true;
        }
        return false;
      }
      return false;
    },
    [state.staff, state.shgs],
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
    setCurrentPage("home");
    setSidebarOpen(false);
  }, []);

  const approveSHG = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      shgs: prev.shgs.map((s) =>
        s.id === id ? { ...s, status: "approved" } : s,
      ),
    }));
  }, []);
  const rejectSHG = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      shgs: prev.shgs.map((s) =>
        s.id === id ? { ...s, status: "rejected" } : s,
      ),
    }));
  }, []);
  const addSHG = useCallback((shg: Omit<SHG, "id">) => {
    setState((prev) => ({
      ...prev,
      shgs: [...prev.shgs, { ...shg, id: `shg${Date.now()}` }],
    }));
  }, []);
  const updateSHG = useCallback((shg: SHG) => {
    setState((prev) => ({
      ...prev,
      shgs: prev.shgs.map((s) => (s.id === shg.id ? shg : s)),
    }));
  }, []);

  const approveLoan = useCallback((id: string, remarks?: string) => {
    setState((prev) => ({
      ...prev,
      loans: prev.loans.map((l) =>
        l.id === id
          ? {
              ...l,
              status: "approved",
              approvedDate: new Date().toISOString().split("T")[0],
              remarks,
            }
          : l,
      ),
    }));
  }, []);
  const rejectLoan = useCallback((id: string, remarks?: string) => {
    setState((prev) => ({
      ...prev,
      loans: prev.loans.map((l) =>
        l.id === id ? { ...l, status: "rejected", remarks } : l,
      ),
    }));
  }, []);
  const addLoan = useCallback((loan: Omit<Loan, "id" | "appliedDate">) => {
    setState((prev) => ({
      ...prev,
      loans: [
        ...prev.loans,
        {
          ...loan,
          id: `l${Date.now()}`,
          appliedDate: new Date().toISOString().split("T")[0],
        },
      ],
    }));
  }, []);

  const addTraining = useCallback(
    (t: Omit<Training, "id" | "enrolledSHGs" | "completedSHGs">) => {
      setState((prev) => ({
        ...prev,
        trainings: [
          ...prev.trainings,
          { ...t, id: `t${Date.now()}`, enrolledSHGs: [], completedSHGs: [] },
        ],
      }));
    },
    [],
  );
  const updateTraining = useCallback((t: Training) => {
    setState((prev) => ({
      ...prev,
      trainings: prev.trainings.map((tr) => (tr.id === t.id ? t : tr)),
    }));
  }, []);
  const deleteTraining = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      trainings: prev.trainings.filter((t) => t.id !== id),
    }));
  }, []);
  const enrollTraining = useCallback((trainingId: string, shgId: string) => {
    setState((prev) => ({
      ...prev,
      trainings: prev.trainings.map((t) =>
        t.id === trainingId && !t.enrolledSHGs.includes(shgId)
          ? { ...t, enrolledSHGs: [...t.enrolledSHGs, shgId] }
          : t,
      ),
    }));
  }, []);
  const completeTraining = useCallback((trainingId: string, shgId: string) => {
    setState((prev) => ({
      ...prev,
      trainings: prev.trainings.map((t) =>
        t.id === trainingId && !t.completedSHGs.includes(shgId)
          ? { ...t, completedSHGs: [...t.completedSHGs, shgId] }
          : t,
      ),
    }));
  }, []);

  const addStaff = useCallback((s: Omit<Staff, "id">) => {
    setState((prev) => ({
      ...prev,
      staff: [...prev.staff, { ...s, id: `s${Date.now()}` }],
    }));
  }, []);
  const updateStaff = useCallback((s: Staff) => {
    setState((prev) => ({
      ...prev,
      staff: prev.staff.map((st) => (st.id === s.id ? s : st)),
    }));
  }, []);
  const deleteStaff = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      staff: prev.staff.filter((s) => s.id !== id),
    }));
  }, []);

  const addBranch = useCallback((b: Omit<Branch, "id">) => {
    setState((prev) => ({
      ...prev,
      branches: [...prev.branches, { ...b, id: `b${Date.now()}` }],
    }));
  }, []);
  const updateBranch = useCallback((b: Branch) => {
    setState((prev) => ({
      ...prev,
      branches: prev.branches.map((br) => (br.id === b.id ? b : br)),
    }));
  }, []);
  const deleteBranch = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      branches: prev.branches.filter((b) => b.id !== id),
    }));
  }, []);

  const addReward = useCallback((r: Omit<Reward, "id" | "announcedDate">) => {
    setState((prev) => ({
      ...prev,
      rewards: [
        ...prev.rewards,
        {
          ...r,
          id: `r${Date.now()}`,
          announcedDate: new Date().toISOString().split("T")[0],
        },
      ],
    }));
  }, []);

  const creditWallet = useCallback(
    (shgId: string, amount: number, desc: string) => {
      setState((prev) => {
        const shg = prev.shgs.find((s) => s.id === shgId);
        if (!shg) return prev;
        const newBalance = shg.walletBalance + amount;
        return {
          ...prev,
          shgs: prev.shgs.map((s) =>
            s.id === shgId ? { ...s, walletBalance: newBalance } : s,
          ),
          walletTransactions: [
            ...prev.walletTransactions,
            {
              id: `wt${Date.now()}`,
              shgId,
              type: "credit",
              amount,
              description: desc,
              date: new Date().toISOString().split("T")[0],
              balance: newBalance,
            },
          ],
        };
      });
    },
    [],
  );

  const debitWallet = useCallback(
    (shgId: string, amount: number, desc: string) => {
      setState((prev) => {
        const shg = prev.shgs.find((s) => s.id === shgId);
        if (!shg || shg.walletBalance < amount) return prev;
        const newBalance = shg.walletBalance - amount;
        return {
          ...prev,
          shgs: prev.shgs.map((s) =>
            s.id === shgId ? { ...s, walletBalance: newBalance } : s,
          ),
          walletTransactions: [
            ...prev.walletTransactions,
            {
              id: `wt${Date.now()}`,
              shgId,
              type: "debit",
              amount,
              description: desc,
              date: new Date().toISOString().split("T")[0],
              balance: newBalance,
            },
          ],
        };
      });
    },
    [],
  );

  const sendNotification = useCallback(
    (n: Omit<Notification, "id" | "date" | "read">) => {
      setState((prev) => ({
        ...prev,
        notifications: [
          {
            ...n,
            id: `n${Date.now()}`,
            date: new Date().toISOString().split("T")[0],
            read: false,
          },
          ...prev.notifications,
        ],
      }));
    },
    [],
  );
  const markNotificationRead = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n,
      ),
    }));
  }, []);
  const updateMLMCommission = useCallback(
    (level: number, commission: number) => {
      setState((prev) => ({
        ...prev,
        mlmLevels: prev.mlmLevels.map((l) =>
          l.level === level ? { ...l, commission } : l,
        ),
      }));
    },
    [],
  );
  const luckyDraw = useCallback((): string | null => {
    const approved = state.shgs.filter((s) => s.status === "approved");
    if (approved.length === 0) return null;
    return approved[Math.floor(Math.random() * approved.length)].groupName;
  }, [state.shgs]);

  const updateHomepageContent = useCallback((content: HomepageContent) => {
    setState((prev) => ({ ...prev, homepageContent: content }));
  }, []);
  const addGalleryItem = useCallback((item: Omit<GalleryItem, "id">) => {
    setState((prev) => ({
      ...prev,
      galleryItems: [...prev.galleryItems, { ...item, id: `g${Date.now()}` }],
    }));
  }, []);
  const deleteGalleryItem = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      galleryItems: prev.galleryItems.filter((g) => g.id !== id),
    }));
  }, []);

  const addTicker = useCallback((ticker: Omit<TickerItem, "id">) => {
    setState((prev) => ({
      ...prev,
      tickers: [...prev.tickers, { ...ticker, id: `tk${Date.now()}` }],
    }));
  }, []);
  const updateTicker = useCallback((ticker: TickerItem) => {
    setState((prev) => ({
      ...prev,
      tickers: prev.tickers.map((t) => (t.id === ticker.id ? ticker : t)),
    }));
  }, []);
  const deleteTicker = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      tickers: prev.tickers.filter((t) => t.id !== id),
    }));
  }, []);

  const addProduct = useCallback((product: Omit<Product, "id">) => {
    setState((prev) => ({
      ...prev,
      products: [...prev.products, { ...product, id: `p${Date.now()}` }],
    }));
  }, []);
  const updateProduct = useCallback((product: Product) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.map((p) => (p.id === product.id ? product : p)),
    }));
  }, []);
  const deleteProduct = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      products: prev.products.filter((p) => p.id !== id),
    }));
  }, []);

  const addVacancy = useCallback((vacancy: Omit<Vacancy, "id">) => {
    setState((prev) => ({
      ...prev,
      vacancies: [...prev.vacancies, { ...vacancy, id: `v${Date.now()}` }],
    }));
  }, []);
  const updateVacancy = useCallback((vacancy: Vacancy) => {
    setState((prev) => ({
      ...prev,
      vacancies: prev.vacancies.map((v) => (v.id === vacancy.id ? vacancy : v)),
    }));
  }, []);
  const deleteVacancy = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      vacancies: prev.vacancies.filter((v) => v.id !== id),
    }));
  }, []);

  const updatePageContent = useCallback((page: string, content: string) => {
    setState((prev) => ({
      ...prev,
      pageContents: prev.pageContents.map((pc) =>
        pc.page === page
          ? {
              ...pc,
              content,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : pc,
      ),
    }));
  }, []);
  const updateSiteSettings = useCallback((settings: SiteSettings) => {
    setState((prev) => ({ ...prev, siteSettings: settings }));
  }, []);

  // Member CRUD
  const addMember = useCallback((m: Omit<Member, "id">) => {
    setState((prev) => ({
      ...prev,
      members: [...prev.members, { ...m, id: `m${Date.now()}` }],
    }));
  }, []);
  const updateMember = useCallback((m: Member) => {
    setState((prev) => ({
      ...prev,
      members: prev.members.map((x) => (x.id === m.id ? m : x)),
    }));
  }, []);
  const deleteMember = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      members: prev.members.filter((m) => m.id !== id),
    }));
  }, []);

  // TeamMember CRUD
  const addTeamMember = useCallback((m: Omit<TeamMember, "id">) => {
    setState((prev) => ({
      ...prev,
      teamMembers: [...prev.teamMembers, { ...m, id: `tm${Date.now()}` }],
    }));
  }, []);
  const updateTeamMember = useCallback((m: TeamMember) => {
    setState((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.map((x) => (x.id === m.id ? m : x)),
    }));
  }, []);
  const deleteTeamMember = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      teamMembers: prev.teamMembers.filter((m) => m.id !== id),
    }));
  }, []);

  // TeamReview CRUD
  const addTeamReview = useCallback((r: Omit<TeamReview, "id">) => {
    setState((prev) => ({
      ...prev,
      teamReviews: [...prev.teamReviews, { ...r, id: `tr${Date.now()}` }],
    }));
  }, []);
  const updateTeamReview = useCallback((r: TeamReview) => {
    setState((prev) => ({
      ...prev,
      teamReviews: prev.teamReviews.map((x) => (x.id === r.id ? r : x)),
    }));
  }, []);
  const deleteTeamReview = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      teamReviews: prev.teamReviews.filter((r) => r.id !== id),
    }));
  }, []);

  // Award CRUD
  const addAward = useCallback((a: Omit<Award, "id">) => {
    setState((prev) => ({
      ...prev,
      awards: [...prev.awards, { ...a, id: `aw${Date.now()}` }],
    }));
  }, []);
  const updateAward = useCallback((a: Award) => {
    setState((prev) => ({
      ...prev,
      awards: prev.awards.map((x) => (x.id === a.id ? a : x)),
    }));
  }, []);
  const deleteAward = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      awards: prev.awards.filter((a) => a.id !== id),
    }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        currentUser,
        currentPage,
        sidebarOpen,
        language,
        setLanguage,
        setCurrentPage,
        setSidebarOpen,
        login,
        logout,
        approveSHG,
        rejectSHG,
        addSHG,
        updateSHG,
        approveLoan,
        rejectLoan,
        addLoan,
        addTraining,
        updateTraining,
        deleteTraining,
        enrollTraining,
        completeTraining,
        addStaff,
        updateStaff,
        deleteStaff,
        addBranch,
        updateBranch,
        deleteBranch,
        addReward,
        creditWallet,
        debitWallet,
        sendNotification,
        markNotificationRead,
        updateMLMCommission,
        luckyDraw,
        updateHomepageContent,
        addGalleryItem,
        deleteGalleryItem,
        addTicker,
        updateTicker,
        deleteTicker,
        addProduct,
        updateProduct,
        deleteProduct,
        addVacancy,
        updateVacancy,
        deleteVacancy,
        updatePageContent,
        updateSiteSettings,
        addMember,
        updateMember,
        deleteMember,
        addTeamMember,
        updateTeamMember,
        deleteTeamMember,
        addTeamReview,
        updateTeamReview,
        deleteTeamReview,
        addAward,
        updateAward,
        deleteAward,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
