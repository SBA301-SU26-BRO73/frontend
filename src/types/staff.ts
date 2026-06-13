export type UserStatus = 'PENDING_APPROVAL' | 'ACTIVE' | 'INACTIVE' | 'LOCKED'

export interface StaffResponse {
  id: number
  userId: number
  email: string
  phone: string | null
  userStatus: UserStatus
  branchId: number
  branchName: string
  createdAt: string
  updatedAt: string
}

export interface CreateStaffRequest {
  email: string
  password: string
  phone: string
  branchId: number
}

export interface UpdateStaffRequest {
  phone?: string
  branchId?: number
}

export interface StaffPage {
  content: StaffResponse[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}
