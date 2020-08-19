import { default as axios } from '../core/axios';
import Notification from '../components/Notification';



export const devicesAPI = {
    getDevices: () => {
        let response = axios.get('/api/devices')
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
    createDevice: (device: any) => {
        let response = axios.post('/api/devices', device)
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
}
export default devicesAPI