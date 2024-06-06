import HttpClient from '@/services/http/http-client'
import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'

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
  const httpClient = new HttpClient(getCookie('token'))

  try {
    const response = await httpClient.request<AxiosResponse>(
      'GET',
      `${BASE_URL}/users`
    )
    return response.data
  } catch (error: any) {
    return []
  }
}
