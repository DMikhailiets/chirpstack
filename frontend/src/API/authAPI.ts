import Notification from '../components/Notification';
import { default as axios } from '../core/axios';
import errorHandler from './utils/errorHandler';

export const authAPI = {
    authUser:  async (authData: any) => {
		try {
			return await axios.post('/api/chirpLogin', authData)
		} catch (err) { 
			return errorHandler (err)
		}
	}
}
export default authAPI