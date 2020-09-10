
import { default as axios } from '../core/axios';
import Notification from '../components/Notification';



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
            if(err.response){
                throw new Error(err),
                Notification({
                    text: err.response.data.error,
                    type: 'error',
                    title: "Access denied or internal service error was received"
                  })
            } else if (err.request){
                throw new Error(err),
                Notification({
                    text: err.response.data.error,
                    type: 'error',
                    title: "Server not found"
                  })
            } else {
                throw new Error(err),
                Notification({
                    text: 'Something went wrong',
                    type: 'error',
                    title: "Oops..."
                  })
            }
        }
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