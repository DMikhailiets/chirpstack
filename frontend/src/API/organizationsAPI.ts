
import { default as axios } from '../core/axios';



export const organizationsAPI = {
    createOrganization:  (organizationData: any) => {
        let response = axios.post('/api/chirpOrganization', organizationData)
            .then((res: any) => res
            )
            .catch((error: Error) => {throw new Error()})
        return response    
    },
    getOrganizations: () => {
        let response = axios.get('/api/chirpOrganization')
            .then((res: any) => res)
            .catch((error: Error) => {throw new Error()})
        return response
    },
    getOrganizationsUsers: (id:any) => {
        console.log(id)
        let response = axios.get(`api/listUsersOrg/${id}`)
            .then((res: any) => res)
            .catch((error: Error) => {throw new Error()})
        return response
    }
}
export default organizationsAPI