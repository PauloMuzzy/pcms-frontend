import { OptionResponseModel, convertOptions } from '@/model/option-model'
import HttpClient from '@/services/http/http-client'
import { AxiosResponse } from 'axios'
import { getCookie } from 'cookies-next'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export type FindOptionListProps = {
  id: string
  name: string
}

export async function findOptionList(
  optionName: string
): Promise<OptionResponseModel[]> {
  const httpClient = new HttpClient(getCookie('token'))
  try {
    const response = await httpClient.request<AxiosResponse>(
      'GET',
      `${BASE_URL}/options/${optionName}`
    )
    return convertOptions(response.data)
  } catch (error: any) {
    throw error
  }
}
