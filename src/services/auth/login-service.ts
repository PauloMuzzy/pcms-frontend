import HttpClient from '@/services/http/http-client'
import { AxiosResponse } from 'axios'
import { setCookie } from 'cookies-next'
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

type loginRequestProps = {
  email: string
  password: string
}

export async function login({
  email,
  password
}: loginRequestProps): Promise<void> {
  try {
    const response = await new HttpClient().request<AxiosResponse>(
      'POST',
      `${BASE_URL}/auth/login`,
      {
        email,
        password
      }
    )
    setCookie('token', response.data.access_token)
  } catch (error: any) {
    throw error
  }
}
