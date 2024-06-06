import HttpClient from '@/services/http/http-client'
import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export type CreateUserProps = {
  name: string
  lastName: string
  email: string
  accessType: string
  dateOfBirth: string
}

export async function createUser({
  name,
  lastName,
  email,
  accessType,
  dateOfBirth
}: CreateUserProps): Promise<void> {
  const httpClient = new HttpClient(getCookie('token'))

  try {
    await httpClient.request<AxiosResponse>(
      'POST',
      `${BASE_URL}/users/create`,
      {
        name,
        lastName,
        email,
        accessType,
        dateOfBirth
      }
    )
  } catch (error: any) {}
}
