
import { default as axios } from '../core/axios';



export const organizationsAPI = {
    createOrganization:  (organizationData: any) => {
        let response = axios.post('/API/organizations', organizationData)
            .then((res: any) => res
            )
            .catch((error: Error) => {throw new Error()})
        return response    
    },
    getOrganizations: () => {
        let response = axios.get('/API/organizations')
            .then((res: any) => res)
            .catch((error: Error) => {throw new Error()})
        return response
    }
}
export default organizationsAPI