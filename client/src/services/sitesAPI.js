import axios from 'axios'


const API_BASE_URL = 'http://localhost:3000'

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const sitesAPI = {

  getAllSites: async () => {
    try {
    
      const response = await apiInstance.get('/sites')
      console.log('succes', response.data)
      return response.data
    } catch (error) {
      console.error('err', error)
      throw error
    }
  },




  updateSite: async (id, siteData) => {
    try {
     
      const response = await apiInstance.put(`/sites/${id}`, siteData)
      console.log('update successfully', response.data)
      return response.data
    } catch (error) {
      console.error('err', error)
      throw error
    }
  },


  deleteSite: async (id) => {
    try {
      
      const response = await apiInstance.delete(`/sites/${id}`)
      console.log('del successfully', response.data)
      return response.data
    } catch (error) {
      console.error('err', error)
      throw error
    }
  },


}

export default sitesAPI