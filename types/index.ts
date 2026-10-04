export type ColorFormat = "hex" | "rgb" | "hsl" | "oklch";

export interface PaginationInfo {
  page: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export type PaginatedResponse<T> = {
  status?: string;
  message?: string;
  data: { data: T[]; paginator: PaginationInfo };
};
enum GenderType {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

export interface User {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  role: string;
  userType: number;
  birthDate: Date;
  birthTime: string;
  birthPlace: {
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
  };
  gender: GenderType;
  credits: number;
  firstTimeLogin: boolean;
}

export enum CHAT_SESSION_STATUS {
  ACTIVE = "active",
  ARCHIVED = "archived",
  DELETED = "deleted",
}
export interface ChatSession {
  id: string;
  userId: string;
  title: string;
  topic: string;
  session_status: CHAT_SESSION_STATUS;
  message_count: number;
  last_message_at: Date;
  isDeleted: boolean;
  is_deleted_at: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
