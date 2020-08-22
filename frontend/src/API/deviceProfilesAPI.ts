import { default as axios } from '../core/axios';
import Notification from '../components/Notification';

const deviceProfilesAPI = {
    getDeviceProfiles: async () => {
        try {
            let response = await axios.get('/api/deviceProfiles')
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
    createDeviceProfiles: async (deviceProfile: any) => {
        try {
            let response = await axios.post('/api/deviceProfiles', deviceProfile)
            Notification({
                text: 'DeviceProfile was created!',
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
}

export default deviceProfilesAPI