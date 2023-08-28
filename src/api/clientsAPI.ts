import axios from 'axios'

const clientsAPI = axios.create({
  baseURL: 'http://localhost:4000'
})

export default clientsAPI
