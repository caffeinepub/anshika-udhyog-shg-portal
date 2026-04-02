export type UserRole = "admin" | "staff" | "shg";

export type SHGStatus = "pending" | "approved" | "rejected";
export type LoanStatus = "pending" | "approved" | "rejected";
export type TrainingStatus = "upcoming" | "ongoing" | "completed";

export interface SHG {
  id: string;
  groupName: string;
  leaderName: string;
  mobile: string;
  address: string;
  password: string;
  status: SHGStatus;
  walletBalance: number;
  branchId: string;
  joinedDate: string;
  memberCount: number;
  referralCode?: string;
  referredBy?: string;
}

export interface Staff {
  id: string;
  name: string;
  role: "Field Officer" | "Coordinator" | "Office Staff";
  mobile: string;
  branchId: string;
  salary: number;
  password: string;
  joiningDate: string;
  tasks: string[];
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  managerName: string;
  mobile: string;
}

export interface Loan {
  id: string;
  shgId: string;
  shgName: string;
  amount: number;
  purpose: string;
  status: LoanStatus;
  appliedDate: string;
  approvedDate?: string;
  remarks?: string;
}

export interface Training {
  id: string;
  title: string;
  description: string;
  startDate: string;
  duration: string;
  maxParticipants: number;
  enrolledSHGs: string[];
  completedSHGs: string[];
  status: TrainingStatus;
  instructor: string;
  location: string;
}

export interface Reward {
  id: string;
  type: "lucky_draw" | "best_performer";
  prize: string;
  winnerSHGId: string;
  winnerName: string;
  announcedDate: string;
  description: string;
}

export interface WalletTransaction {
  id: string;
  shgId: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
  date: string;
  balance: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  targetRole: "all" | "shg" | "staff" | string;
  date: string;
  read: boolean;
}

export interface MLMLevel {
  level: number;
  commission: number;
  members: string[];
}

export interface CurrentUser {
  role: UserRole;
  id: string;
  name: string;
  data: SHG | Staff | null;
}

export interface HomepageSlide {
  title: string;
  subtitle: string;
  bg: string;
}

export interface HomepageStat {
  value: string;
  label: string;
  icon: string;
}

export interface HomepageContent {
  slides: HomepageSlide[];
  aboutText: string;
  tagline: string;
  stats: HomepageStat[];
  phone: string;
  email: string;
  address: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  date: string;
  type: "photo" | "video";
  src: string;
}

export interface AppState {
  shgs: SHG[];
  staff: Staff[];
  branches: Branch[];
  loans: Loan[];
  trainings: Training[];
  rewards: Reward[];
  walletTransactions: WalletTransaction[];
  notifications: Notification[];
  mlmLevels: MLMLevel[];
  homepageContent: HomepageContent;
  galleryItems: GalleryItem[];
}
