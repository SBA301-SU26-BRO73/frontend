export const env = {
  apiUrl: import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api',
  // Temporary front-desk session seed until real staff auth exists.
  staffUserId: import.meta.env.VITE_STAFF_USER_ID ?? '',
  branchId: import.meta.env.VITE_BRANCH_ID ?? '',
}
