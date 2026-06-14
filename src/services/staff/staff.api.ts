import { axiosClient } from '@/services/http/axios-client'
import { API_ENDPOINTS } from '@/common/constants/api-endpoints'
import type {
  StaffPage,
  StaffResponse,
  CreateStaffRequest,
  UpdateStaffRequest,
  StaffScheduleItem,
  StaffCheckinRequest,
  StaffCheckinResponse,
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

/**
 * Today's court schedule for the given staff user.
 * `date` is optional (ISO date, defaults to today UTC on the backend).
 */
export async function getTodaySchedule(
  staffUserId: number,
  date?: string,
): Promise<StaffScheduleItem[]> {
  const { data } = await axiosClient.get(API_ENDPOINTS.staff.schedule, {
    params: { staffUserId, ...(date ? { date } : {}) },
  })
  return data
}

/** Check a booking in by its UUID check-in code. */
export async function checkIn(
  payload: StaffCheckinRequest,
): Promise<StaffCheckinResponse> {
  const { data } = await axiosClient.post(API_ENDPOINTS.staff.checkin, payload)
  return data
}
