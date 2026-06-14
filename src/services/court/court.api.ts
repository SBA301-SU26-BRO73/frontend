import { axiosClient } from '@/services/http/axios-client'
import { API_ENDPOINTS } from '@/common/constants/api-endpoints'
import type { Court, CourtPage } from '@/types/court'

/**
 * Courts belonging to a branch.
 *
 * The backend exposes a paged, branch-agnostic `GET /api/courts`, so we pull a
 * large page and filter by branch on the client.
 */
export async function getCourtsByBranch(branchId: number): Promise<Court[]> {
  const { data } = await axiosClient.get(API_ENDPOINTS.courts.list, {
    params: { page: 0, size: 200, sort: 'id,asc' },
  })
  const page = data as CourtPage
  return page.content.filter((court) => court.branchId === branchId)
}
