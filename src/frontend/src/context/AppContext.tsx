import type React from "react";
import { createContext, useCallback, useContext, useState } from "react";
import { initialState } from "../data/seedData";
import type {
  AppState,
  Branch,
  CurrentUser,
  Loan,
  Notification,
  Reward,
  SHG,
  Staff,
  Training,
  WalletTransaction,
} from "../types";

interface AppContextType {
  state: AppState;
  currentUser: CurrentUser | null;
  currentPage: string;
  sidebarOpen: boolean;
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
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [currentPage, setCurrentPage] = useState("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    const newSHG: SHG = { ...shg, id: `shg${Date.now()}` };
    setState((prev) => ({ ...prev, shgs: [...prev.shgs, newSHG] }));
  }, []);

  const updateSHG = useCallback(
    (shg: SHG) => {
      setState((prev) => ({
        ...prev,
        shgs: prev.shgs.map((s) => (s.id === shg.id ? shg : s)),
      }));
      if (currentUser?.role === "shg" && currentUser.id === shg.id) {
        setCurrentUser((prev) =>
          prev ? { ...prev, data: shg, name: shg.groupName } : prev,
        );
      }
    },
    [currentUser],
  );

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
    const newLoan = {
      ...loan,
      id: `l${Date.now()}`,
      appliedDate: new Date().toISOString().split("T")[0],
    };
    setState((prev) => ({ ...prev, loans: [...prev.loans, newLoan] }));
  }, []);

  const addTraining = useCallback(
    (t: Omit<Training, "id" | "enrolledSHGs" | "completedSHGs">) => {
      const newT: Training = {
        ...t,
        id: `t${Date.now()}`,
        enrolledSHGs: [],
        completedSHGs: [],
      };
      setState((prev) => ({ ...prev, trainings: [...prev.trainings, newT] }));
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
    const newS: Staff = { ...s, id: `s${Date.now()}` };
    setState((prev) => ({ ...prev, staff: [...prev.staff, newS] }));
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
    const newB: Branch = { ...b, id: `b${Date.now()}` };
    setState((prev) => ({ ...prev, branches: [...prev.branches, newB] }));
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
    const newR: Reward = {
      ...r,
      id: `r${Date.now()}`,
      announcedDate: new Date().toISOString().split("T")[0],
    };
    setState((prev) => ({ ...prev, rewards: [...prev.rewards, newR] }));
  }, []);

  const creditWallet = useCallback(
    (shgId: string, amount: number, desc: string) => {
      setState((prev) => {
        const shg = prev.shgs.find((s) => s.id === shgId);
        if (!shg) return prev;
        const newBalance = shg.walletBalance + amount;
        const tx: WalletTransaction = {
          id: `wt${Date.now()}`,
          shgId,
          type: "credit",
          amount,
          description: desc,
          date: new Date().toISOString().split("T")[0],
          balance: newBalance,
        };
        return {
          ...prev,
          shgs: prev.shgs.map((s) =>
            s.id === shgId ? { ...s, walletBalance: newBalance } : s,
          ),
          walletTransactions: [...prev.walletTransactions, tx],
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
        const tx: WalletTransaction = {
          id: `wt${Date.now()}`,
          shgId,
          type: "debit",
          amount,
          description: desc,
          date: new Date().toISOString().split("T")[0],
          balance: newBalance,
        };
        return {
          ...prev,
          shgs: prev.shgs.map((s) =>
            s.id === shgId ? { ...s, walletBalance: newBalance } : s,
          ),
          walletTransactions: [...prev.walletTransactions, tx],
        };
      });
    },
    [],
  );

  const sendNotification = useCallback(
    (n: Omit<Notification, "id" | "date" | "read">) => {
      const newN: Notification = {
        ...n,
        id: `n${Date.now()}`,
        date: new Date().toISOString().split("T")[0],
        read: false,
      };
      setState((prev) => ({
        ...prev,
        notifications: [newN, ...prev.notifications],
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
        mlmLevels: prev.mlmLevels.map((m) =>
          m.level === level ? { ...m, commission } : m,
        ),
      }));
    },
    [],
  );

  const luckyDraw = useCallback((): string | null => {
    const eligible = state.shgs.filter((s) => s.status === "approved");
    if (!eligible.length) return null;
    return eligible[Math.floor(Math.random() * eligible.length)].id;
  }, [state.shgs]);

  return (
    <AppContext.Provider
      value={{
        state,
        currentUser,
        currentPage,
        sidebarOpen,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}
