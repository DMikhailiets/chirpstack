import { default as axios } from '../core/axios';
import Notification from '../components/Notification';



export const serviceProfilesAPI = {
    getNetworkServers: async () => {
        try {
            let response = await axios.get('/api/networkServers')
            // Notification({
            //     type: 'success',
            //     title: "Network Servers list was received!"
            //   })
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
    getServiceProfiles: async () => {
        try {
            let response = await axios.get('/api/serviceProfiles')
            // Notification({
            //     type: 'success',
            //     title: "Service profiles list was received!"
            //   })
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
    createServiceProfiles: async (ServiceProfile: any) => {
        try {
            let response = await axios.post('/api/serviceProfiles', ServiceProfile)
            Notification({
                type: 'success',
                title: "Service profiles list was received!"
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
}
export default serviceProfilesAPI