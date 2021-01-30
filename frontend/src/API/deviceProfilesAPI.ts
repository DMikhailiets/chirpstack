import { default as axios } from '../core/axios';
import Notification from '../components/Notification';
import errorHandler from './utils/errorHandler';

const deviceProfilesAPI = {
    getDeviceProfiles: async () => {
        try {
            return await axios.get('/api/deviceProfiles')
        } catch(err) {
            errorHandler(err)
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
            errorHandler(err)
        }
    },
}

export default deviceProfilesAPI