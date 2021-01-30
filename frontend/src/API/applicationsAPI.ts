import { default as axios } from '../core/axios';
import Notification from '../components/Notification';
import errorHandler from './utils/errorHandler';

const applicationsAPI = {
    getApplications: async () => {
        try {
            return await axios.get('/api/applications')
        } catch(err) {
          errorHandler(err)
        }
    },
    createApplication: async (application: any) => {
        try {
            let response =  await axios.post('/api/applications', application)
            Notification({
                text: 'Application was created!',
                type: 'success',
                title: "Success!"
              })
            return response
        } catch(err) {
           errorHandler(err)
        }
    },
}

export default applicationsAPI