import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

class HttpClient {
  private instance: AxiosInstance

  constructor() {
    this.instance = axios.create()
  }

  public setToken(token: string): void {
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
      return response.data
    } catch (error) {
      throw error
    }
  }
}

export default HttpClient
