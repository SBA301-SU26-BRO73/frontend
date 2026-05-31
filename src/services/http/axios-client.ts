import axios from 'axios'

import { env } from '@/common/config/env'

export const axiosClient = axios.create({
  baseURL: env.apiUrl,
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => Promise.reject(error),
)
