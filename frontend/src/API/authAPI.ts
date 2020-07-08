
import { default as axios } from '../core/axios';

export const authAPI = {
    authUser:  (authData: any) => {
        let response =  axios.post('/api/internal/login', authData)
            .then((res) => res
            )
            .catch((error) => {
                return {
                    status:error.response.status
                }
            })
            return response
    },
}
export default authAPI