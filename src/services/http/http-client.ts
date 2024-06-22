import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios'

class HttpClient {
  private instance: AxiosInstance

  constructor(private readonly token?: string) {
    this.instance = axios.create()
    if (this.token)
      this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  public async request<T>(
    method: string,
    url: string,
    data?: object
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      method,
      url,
      data
    }

    try {
      const response = await this.instance.request<T>(config)
      return response as T
    } catch (error) {
      if (error instanceof AxiosError) {
        throw error
      }

      throw new Error(
        'Houve um erro ao realizar a requisição. Tente novamente.'
      )
    }
  }
}

export default HttpClient
