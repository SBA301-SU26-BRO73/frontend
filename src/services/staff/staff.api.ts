import { axiosClient } from '@/services/http/axios-client'
import { API_ENDPOINTS } from '@/common/constants/api-endpoints'
import type {
  StaffPage,
  StaffResponse,
  CreateStaffRequest,
  UpdateStaffRequest,
} from '@/types/staff'

export async function getStaffByBranch(
  branchId: number,
  page = 0,
  size = 20,
): Promise<StaffPage> {
  const { data } = await axiosClient.get(
    API_ENDPOINTS.staff.listByBranch(branchId),
    { params: { page, size, sort: 'id,desc' } },
  )
  return data
}

export async function getStaffDetail(id: number): Promise<StaffResponse> {
  const { data } = await axiosClient.get(API_ENDPOINTS.staff.detail(id))
  return data
}

export async function createStaff(
  payload: CreateStaffRequest,
): Promise<StaffResponse> {
  const { data } = await axiosClient.post(API_ENDPOINTS.staff.create, payload)
  return data
}

export async function updateStaff(
  id: number,
  payload: UpdateStaffRequest,
): Promise<StaffResponse> {
  const { data } = await axiosClient.patch(
    API_ENDPOINTS.staff.update(id),
    payload,
  )
  return data
}

export async function deleteStaff(id: number): Promise<void> {
  await axiosClient.delete(API_ENDPOINTS.staff.delete(id))
}
