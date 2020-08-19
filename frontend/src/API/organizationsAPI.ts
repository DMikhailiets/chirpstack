
import { default as axios } from '../core/axios';
import Notification from '../components/Notification';



export const organizationsAPI = {
    createOrganization:  (organizationData: any) => {
        let response = axios.post('/api/chirpOrganization', organizationData)
            .then((res: any) => res
            )
            .catch((error: Error) => {
                throw new Error(),
                console.log(error)
            })
        return response    
    },
    getOrganizations: () => {
        let response = axios.get('/api/chirpOrganization')
            .then((res: any) => res)
            .catch((error: any) => {
                throw new Error(),
                Notification({
                    text: error.response.data.error,
                    type: 'error',
                    title: "Oops..."
                  })
                })
        return response
    },
    getOrganizationsUsers: (id:any) => {
        console.log(id)
        let response = axios.get(`api/listUsersOrg/${id}`)
            .then((res: any) => res)
            .catch((error: Error) => {throw new Error()})
        return response
    },
    createUser: (data:any) => {
        let response = axios.post(`api/addUserToOrg`, data)
            .then((res: any) => res)
            .catch((error: Error) => {throw new Error()})
        return response
    }
}
export default organizationsAPI