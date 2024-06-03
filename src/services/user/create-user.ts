import HttpClient from '@/services/http/http-client'

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
  try {
    await new HttpClient().request('POST', `${BASE_URL}/users`, {
      name,
      lastName,
      email,
      accessType,
      dateOfBirth
    })
  } catch (error: any) {}
}
