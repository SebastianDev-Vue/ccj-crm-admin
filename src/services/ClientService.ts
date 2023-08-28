import clientsAPI from '@/api/clientsAPI'
import type { AxiosResponse } from 'axios'
import type { Client } from '@/interfaces/interfaces'

interface Status {
  status: boolean
}

export default {
  async getClients(): Promise<AxiosResponse> {
    return clientsAPI.get('/clients')
  },

  async createClient(client: Client): Promise<Client> {
    return clientsAPI.post('/clients', client)
  },

  async getClient(id: string | string[]): Promise<AxiosResponse> {
    return clientsAPI.get(`/clients/${id}`)
  },

  async updateClient(id: string | string[], data: Client): Promise<void> {
    return clientsAPI.patch(`/clients/${id}`, data)
  },

  async changeClientStatus(id: number, data: Status): Promise<void> {
    return clientsAPI.patch(`/clients/${id}`, data)
  },

  async deleteClient(id: number): Promise<void> {
    return clientsAPI.delete(`/clients/${id}`)
  }
}
