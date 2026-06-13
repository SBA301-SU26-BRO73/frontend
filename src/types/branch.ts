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
