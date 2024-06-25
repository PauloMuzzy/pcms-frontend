import HttpClient from '@/services/http/http-client'
import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export type FindAllPatientsResponseProps = {
  id: string
  name: string
  lastName: string
  email: string
  dateOfBirth: string
  gender: string
  profession: string
  phone: string
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelationship: string
  active: number
}

export async function findAllPatients(): Promise<
  FindAllPatientsResponseProps[]
> {
  const httpClient = new HttpClient(getCookie('token'))

  try {
    const response = await httpClient.request<AxiosResponse>(
      'GET',
      `${BASE_URL}/patients`
    )
    return response.data
  } catch (error: any) {
    throw error
  }
}
