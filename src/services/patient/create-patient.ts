import HttpClient from '@/services/http/http-client'
import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export type CreatePatientProps = {
  name: string
  lastName: string
  cpf: string
  email: string
  dateOfBirth: string
  phone: string
  profession: string
  gender: string
  registerDate: string
  emergencyContactName: string
  emergencyContactPhone: string
  emergencyContactRelationship: string
}

export async function createPatient({
  name,
  lastName,
  cpf,
  email,
  dateOfBirth,
  phone,
  profession,
  gender,
  registerDate,
  emergencyContactName,
  emergencyContactPhone,
  emergencyContactRelationship
}: CreatePatientProps): Promise<void> {
  const httpClient = new HttpClient(getCookie('token'))

  try {
    await httpClient.request<AxiosResponse>(
      'POST',
      `${BASE_URL}/patients/create`,
      {
        name,
        lastName,
        cpf,
        email,
        dateOfBirth,
        phone,
        profession: profession.toString(),
        gender: gender.toString(),
        registerDate,
        active: '1',
        emergencyContactName,
        emergencyContactPhone,
        emergencyContactRelationship: emergencyContactRelationship.toString()
      }
    )
  } catch (error: any) {
    throw error
  }
}
