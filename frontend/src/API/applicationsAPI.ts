import { default as axios } from '../core/axios';
import Notification from '../components/Notification';

const applicationsAPI = {
    getApplications: async () => {
        try {
            let response = await axios.get('/api/applications')
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
    createApplication: async (application: any) => {
        try {
            let response = await axios.post('/api/applications', application)
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
}

export default applicationsAPI