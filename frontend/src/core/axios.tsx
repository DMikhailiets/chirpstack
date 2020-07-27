import axios from "axios"
import dotenv from "dotenv";

axios.defaults.baseURL = 'http://192.168.43.97:5000/'
axios.defaults.headers = {
    'token': localStorage.token 
}


export default axios