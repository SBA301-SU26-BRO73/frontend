import { axiosClient } from "../http/axios-client";

export interface Branch {
  id: number;
  adminId: number;
  adminName: string;
  name: string;
  address: string;
  ward: string | null;
  city: string;
  phone: string | null;
  openTime: string;
  closeTime: string;
  bankAccountNumber: string | null;
  bankAccountName: string | null;
  bankName: string | null;
  bankQrImageUrl: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface BranchFilterRequest {
  name?: string;
  address?: string;
  ward?: string;
  city?: string;
  phone?: string;
  status?: string;
  courtTypeName?: string; 
}

export interface ApiResponse<T> {
  httpStatus: number;
  data: T;
  message: string;
}

export interface PageContent<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; 
}

export const branchApi = {
  getAll: async (page: number = 0, size: number = 6): Promise<PageContent<Branch>> => {
    const response = await axiosClient.get<ApiResponse<PageContent<Branch>>>('/branches', {
      params: { page, size }
    });
    return response.data.data;
  },

  search: async (filters: BranchFilterRequest, page: number = 0, size: number = 6): Promise<PageContent<Branch>> => {
    const response = await axiosClient.get<ApiResponse<PageContent<Branch>>>('/branches/search', {
      params: { 
        ...filters,
        page: page + 1, 
        size: size 
      }
    });
    return response.data.data;
  },

  getById: async (id: string | number): Promise<Branch> => {
    const response = await axiosClient.get<ApiResponse<Branch>>(`/branches/${id}`);
    return response.data.data;
  },

  getDailyCourtSchedule: async (courtId: number, date: string): Promise<DailySlotResponse[]> => {
    const response = await axiosClient.get<ApiResponse<DailySlotResponse[]>>(`/courts/${courtId}/daily-schedule`, {
      params: { date }
    });
    return response.data.data;
  },
};

export interface DailySlotResponse {
  startTime: string;
  endTime: string;
  price: number;
  status: 'EXPIRED' | 'AVAILABLE' | 'BOOKED';
}