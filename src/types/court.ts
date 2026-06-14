export type CourtStatus = 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE'

/** GET /api/courts — CourtResponse item. */
export interface Court {
  id: number
  branchId: number
  branchName: string
  name: string
  courtTypeId: number
  courtTypeName: string
  description: string | null
  imageUrl: string | null
  status: CourtStatus
  createdAt: string
  updatedAt: string
}

export interface CourtPage {
  content: Court[]
  totalElements: number
  totalPages: number
  number: number
  size: number
}
