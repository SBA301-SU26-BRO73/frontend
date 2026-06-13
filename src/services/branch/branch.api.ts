import { axiosClient } from '@/services/http/axios-client'
import { API_ENDPOINTS } from '@/common/constants/api-endpoints'
import type { BranchPage } from '@/types/branch'

export async function getBranches(): Promise<BranchPage> {
  const { data } = await axiosClient.get(API_ENDPOINTS.branches.list, {
    params: { page: 0, size: 100 },
  })
  return data
}
