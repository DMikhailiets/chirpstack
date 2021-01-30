
import { default as axios } from '../core/axios';
import Notification from '../components/Notification';
import errorHandler from './utils/errorHandler';

export const organizationsAPI = {
    createOrganization:  async (organizationData: any) => {
        try {
            let response = await axios.post('/api/chirpOrganization', organizationData)
            Notification({
                text: 'Application was created!',
                type: 'success',
                title: "Success!"
              })
            return (response)
        } catch(err) {
            errorHandler(err)
        }
    },
    getOrganizations: async () => {
        try {
            return axios.get('/api/chirpOrganization')
        } catch (err) {
            errorHandler(err)
        }
    },
    getOrganizationsUsers: (id:any) => {
        try {
            return axios.get(`api/listUsersOrg/${id}`)
        } catch (err) {
            errorHandler(err)
        }
    },
    createUser: async (data:any) =>  {
        try {
            const response = await axios.post(`api/addUserToOrg`, data)
            Notification({
                text: 'User was created!',
                type: 'success',
                title: "Success!"
              })
            return response
        } catch (err) {
            errorHandler(err)
        }
    }
}
export default organizationsAPI