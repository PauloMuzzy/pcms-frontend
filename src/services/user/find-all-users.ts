import HttpClient from '@/services/http/http-client'
import { AxiosResponse } from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export type FindAllUsersResponseProps = {
  id: number
  name: string
  lastName: string
  email: string
  dateOfBirth: string
  active: number
  accessType: string
}

export async function findAllUsers(): Promise<FindAllUsersResponseProps[]> {
  try {
    const response = await new HttpClient().request<AxiosResponse>(
      'GET',
      `${BASE_URL}/users`
    )
    return response.data
  } catch (error: any) {
    return []
  }
}
