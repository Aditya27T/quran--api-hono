import { ApiError } from '../types/error'
import { API_BASE_URL } from '../utils/constants'

export class ApiService {
  static async fetch<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`)
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new ApiError(404, 'Data tidak ditemukan')
        }
        throw new ApiError(response.status, `API Error: ${response.statusText}`)
      }
      
      return response.json()
    } catch (error) {
      if (error instanceof ApiError) throw error
      throw new ApiError(500, 'Gagal terhubung ke server')
    }
  }
}