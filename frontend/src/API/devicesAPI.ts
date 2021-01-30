import { default as axios } from '../core/axios';
import Notification from '../components/Notification';
import errorHandler from './utils/errorHandler';

export const devicesAPI = {
    getDevices: async () => {
        try {
            return await axios.get('/api/devices')
        } catch(err) {
            errorHandler(err)
        }
    },
    createDevice: async (device: any) => {
        try {
            let response = await axios.post('/api/devices', device)
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
export default devicesAPI