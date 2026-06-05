// =============================================
// Database Types (matches Supabase schema)
// =============================================

export type UserRole = "client" | "artisan" | "admin";
export type RequestStatus =
  | "pending"
  | "accepted"
  | "rejected"
  | "in_progress"
  | "completed"
  | "cancelled";
export type VerificationStatus = "pending" | "verified" | "rejected";
export type ReportStatus = "open" | "under_review" | "resolved" | "dismissed";

// Algerian Wilayas (48 states)
export const WILAYAS = [
  "أدرار",
  "الشلف",
  "الأغواط",
  "أم البواقي",
  "باتنة",
  "بجاية",
  "بسكرة",
  "بشار",
  "البليدة",
  "البويرة",
  "تمنراست",
  "تبسة",
  "تلمسان",
  "تيارت",
  "تيزي وزو",
  "الجزائر",
  "الجلفة",
  "جيجل",
  "سطيف",
  "سعيدة",
  "سكيكدة",
  "سيدي بلعباس",
  "عنابة",
  "قالمة",
  "قسنطينة",
  "المدية",
  "مستغانم",
  "المسيلة",
  "معسكر",
  "ورقلة",
  "وهران",
  "البيض",
  "إليزي",
  "برج بوعريريج",
  "بومرداس",
  "الطارف",
  "تندوف",
  "تيسمسيلت",
  "الوادي",
  "خنشلة",
  "سوق أهراس",
  "تيبازة",
  "ميلة",
  "عين الدفلى",
  "النعامة",
  "عين تيموشنت",
  "غرداية",
  "غليزان",
] as const;

export type Wilaya = (typeof WILAYAS)[number];

export type ServiceCategory =
  | "electrician"
  | "plumber"
  | "carpenter"
  | "painter"
  | "welder"
  | "appliance_repair"
  | "ac_repair"
  | "cleaning"
  | "cctv_technician"
  | "network_technician";

export const SERVICE_CATEGORIES: Record<
  ServiceCategory,
  { label: string; icon: string; description: string; color: string }
> = {
  electrician: {
    label: "كهربائي",
    icon: "⚡",
    description: "تركيب وإصلاح الأسلاك والكهرباء",
    color: "#F59E0B",
  },
  plumber: {
    label: "سباك",
    icon: "🔧",
    description: "إصلاح وتركيب أنابيب المياه",
    color: "#3B82F6",
  },
  carpenter: {
    label: "نجار",
    icon: "🪚",
    description: "تصنيع وإصلاح الأثاث والخشب",
    color: "#92400E",
  },
  painter: {
    label: "دهان",
    icon: "🎨",
    description: "دهان الجدران والأسطح",
    color: "#EC4899",
  },
  welder: {
    label: "حداد",
    icon: "🔨",
    description: "أعمال الحدادة والألمنيوم",
    color: "#6B7280",
  },
  appliance_repair: {
    label: "مصلح أجهزة منزلية",
    icon: "🔌",
    description: "إصلاح الثلاجات والغسالات والمدافئ",
    color: "#8B5CF6",
  },
  ac_repair: {
    label: "مصلح مكيفات",
    icon: "❄️",
    description: "تركيب وإصلاح وصيانة المكيفات",
    color: "#06B6D4",
  },
  cleaning: {
    label: "عامل تنظيف",
    icon: "🧹",
    description: "تنظيف المنازل والمكاتب",
    color: "#10B981",
  },
  cctv_technician: {
    label: "فني كاميرات",
    icon: "📹",
    description: "تركيب وبرمجة كاميرات المراقبة",
    color: "#EF4444",
  },
  network_technician: {
    label: "فني شبكات",
    icon: "🌐",
    description: "تركيب وإصلاح شبكات الإنترنت",
    color: "#2563EB",
  },
};

// =============================================
// Database Entities
// =============================================

export interface User {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  avatar_url?: string;
  role: UserRole;
  wilaya?: Wilaya;
  municipality?: string;
  is_active: boolean;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface Artisan {
  id: string;
  user_id: string;
  user?: User;
  category: ServiceCategory;
  bio?: string;
  years_experience: number;
  wilaya: Wilaya;
  municipality: string;
  hourly_rate?: number;
  is_available: boolean;
  is_verified: boolean;
  verification_status: VerificationStatus;
  id_card_url?: string;
  total_jobs: number;
  total_earnings?: number;
  average_rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
  // Relations
  portfolio_images?: PortfolioImage[];
  reviews?: Review[];
  favorites_count?: number;
  is_favorited?: boolean;
}

export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  is_active: boolean;
  created_at: string;
}

export interface ServiceRequest {
  id: string;
  client_id: string;
  artisan_id?: string;
  service_category: ServiceCategory;
  title: string;
  description: string;
  images?: string[];
  wilaya: Wilaya;
  municipality: string;
  address?: string;
  scheduled_date?: string;
  budget_min?: number;
  budget_max?: number;
  status: RequestStatus;
  rejection_reason?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
  // Relations
  client?: User;
  artisan?: Artisan;
}

export interface Review {
  id: string;
  request_id: string;
  reviewer_id: string;
  artisan_id: string;
  rating: number;
  comment?: string;
  is_verified: boolean;
  created_at: string;
  // Relations
  reviewer?: User;
  artisan?: Artisan;
}

export interface PortfolioImage {
  id: string;
  artisan_id: string;
  url: string;
  caption?: string;
  service_category?: ServiceCategory;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  request_id?: string;
  content: string;
  is_read: boolean;
  created_at: string;
  // Relations
  sender?: User;
  receiver?: User;
}

export interface Conversation {
  id: string;
  other_user: User;
  last_message?: Message;
  unread_count: number;
  request?: ServiceRequest;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  type:
    | "request_new"
    | "request_accepted"
    | "request_rejected"
    | "request_completed"
    | "review_new"
    | "message_new"
    | "system";
  data?: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
}

export interface Report {
  id: string;
  reporter_id: string;
  reported_user_id?: string;
  reported_artisan_id?: string;
  request_id?: string;
  reason: string;
  description?: string;
  status: ReportStatus;
  admin_note?: string;
  created_at: string;
  updated_at: string;
  // Relations
  reporter?: User;
  reported_user?: User;
}

export interface Favorite {
  id: string;
  user_id: string;
  artisan_id: string;
  created_at: string;
  // Relations
  artisan?: Artisan;
}

export interface Transaction {
  id: string;
  artisan_id: string;
  request_id: string;
  amount: number;
  commission: number;
  net_amount: number;
  status: "pending" | "paid" | "cancelled";
  paid_at?: string;
  created_at: string;
}

// =============================================
// API Response Types
// =============================================

export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface SearchFilters {
  wilaya?: Wilaya;
  municipality?: string;
  category?: ServiceCategory;
  minRating?: number;
  maxHourlyRate?: number;
  sortBy?: "rating" | "price" | "reviews" | "newest";
  query?: string;
  page?: number;
  limit?: number;
}

// =============================================
// Form Types
// =============================================

export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterClientForm {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  wilaya: Wilaya;
  municipality: string;
}

export interface RegisterArtisanForm {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  confirm_password: string;
  category: ServiceCategory;
  wilaya: Wilaya;
  municipality: string;
  years_experience: number;
  bio: string;
  hourly_rate?: number;
  avatar: File | null;
  id_card: File | null;
}

export interface ServiceRequestForm {
  service_category: ServiceCategory;
  title: string;
  description: string;
  images: File[];
  wilaya: Wilaya;
  municipality: string;
  address: string;
  scheduled_date?: string;
  budget_min?: number;
  budget_max?: number;
}

export interface ReviewForm {
  rating: number;
  comment: string;
}

// =============================================
// Dashboard Statistics
// =============================================

export interface ClientStats {
  total_requests: number;
  pending_requests: number;
  completed_requests: number;
  total_spent: number;
}

export interface ArtisanStats {
  total_jobs: number;
  pending_requests: number;
  accepted_requests: number;
  completed_jobs: number;
  total_earnings: number;
  average_rating: number;
  review_count: number;
  this_month_earnings: number;
  this_month_jobs: number;
}

export interface AdminStats {
  total_users: number;
  total_artisans: number;
  total_clients: number;
  total_requests: number;
  pending_verifications: number;
  open_reports: number;
  total_transactions: number;
  platform_revenue: number;
  new_users_this_month: number;
  new_artisans_this_month: number;
}

// =============================================
// UI State Types
// =============================================

export interface Toast {
  id: string;
  type: "success" | "error" | "warning" | "info";
  message: string;
  duration?: number;
}

export interface ModalState {
  isOpen: boolean;
  type?: string;
  data?: unknown;
}

// =============================================
// Auth Types
// =============================================

export interface AuthUser {
  id: string;
  email: string;
  role: UserRole;
  full_name: string;
  avatar_url?: string;
  artisan_id?: string;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}
