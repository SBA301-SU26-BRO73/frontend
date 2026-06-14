export interface BranchOption {
  id: number
  name: string
  city?: string
}

export interface BranchPage {
  content: BranchOption[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}

export type BranchStatus = 'ACTIVE' | 'INACTIVE'

/** GET /api/branches/{id} — BranchResponse (fields used by front-desk). */
export interface BranchDetail {
  id: number
  name: string
  address: string | null
  ward: string | null
  city: string
  phone: string | null
  openTime: string | null // HH:mm:ss
  closeTime: string | null // HH:mm:ss
  status: BranchStatus
}
