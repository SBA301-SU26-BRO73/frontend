import { API_ENDPOINTS } from '@/common/constants/api-endpoints'
import { axiosClient } from '@/services/http/axios-client'
import type {
  ApiResponse,
  Branch,
  BranchListParams,
  CreateBranchRequest,
  SpringPage,
  UpdateBranchRequest,
} from '@/types/branch'

function requireData<T>(response: ApiResponse<T>): T {
  if (response.data === undefined) {
    throw new Error(response.message || 'The server returned no data.')
  }

  return response.data
}

export async function getBranches(params: BranchListParams) {
  const response = await axiosClient.get<ApiResponse<SpringPage<Branch>>>(
    API_ENDPOINTS.branches.list,
    {
      params: {
        page: params.page,
        size: params.size,
        sort: `${params.sortField},${params.sortDirection}`,
      },
    },
  )

  return requireData(response.data)
}

export async function getBranchDetail(branchId: number) {
  const response = await axiosClient.get<ApiResponse<Branch>>(
    API_ENDPOINTS.branches.detail(branchId),
  )

  return requireData(response.data)
}

export async function createBranch(payload: CreateBranchRequest) {
  const response = await axiosClient.post<ApiResponse<Branch>>(
    API_ENDPOINTS.branches.list,
    payload,
  )

  return requireData(response.data)
}

export async function updateBranch(
  branchId: number,
  payload: UpdateBranchRequest,
) {
  const response = await axiosClient.put<ApiResponse<Branch>>(
    API_ENDPOINTS.branches.detail(branchId),
    payload,
  )

  return requireData(response.data)
}

export async function deleteBranch(branchId: number) {
  await axiosClient.delete(API_ENDPOINTS.branches.detail(branchId))
}
