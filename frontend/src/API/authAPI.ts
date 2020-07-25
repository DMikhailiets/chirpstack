
import { default as axios } from '../core/axios';

export const authAPI = {
    authUser:  (authData: any) => {
        let response =  axios.post('/API/login', authData)
            .then((res: any) => res
            )
            .catch((error: any) => {
              throw new Error('bla')
            })
            return response
    },
}
export default authAPI